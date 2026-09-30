/* =========================================================
   UNIVERSITY OF IFEWARA, OSUN STATE, NIGERIA
   script.js  -  site behaviour (vanilla JavaScript, no backend)
   ========================================================= */

(function () {
    "use strict";

    /* ---------- tiny helpers ---------- */

    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    function esc(str) {
        return String(str === undefined || str === null ? "" : str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function initials(name) {
        const parts = String(name)
            .replace(/^(Prof\.|Dr\.|Mr\.|Mrs\.|Miss|Engr\.|Arc\.|Nurse|Counsellor|Pharmacist|Mr|Mrs|Ms)\s+/i, "")
            .split(/\s+/)
            .filter(Boolean);
        const first = parts[0] ? parts[0][0] : "U";
        const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
        return (first + last).toUpperCase();
    }

    function normalise(text) {
        return String(text || "").toLowerCase();
    }

    /* =========================================================
       1. HEADER: mobile menu + scrolled state
       ========================================================= */

    const menuBtn = $("#menuBtn");
    const navMenu = $("#nav");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function () {
            const open = navMenu.classList.toggle("open");
            menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
            menuBtn.innerHTML = open
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        $$("#nav a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });

        document.addEventListener("click", function (e) {
            if (
                navMenu.classList.contains("open") &&
                !navMenu.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                navMenu.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    }

    const header = $("#siteHeader");

    function onScroll() {
        if (header) header.classList.toggle("scrolled", window.scrollY > 12);
        const top = $("#toTop");
        if (top) top.classList.toggle("show", window.scrollY > 420);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toTop = $("#toTop");
    if (toTop) {
        toTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* =========================================================
       2. SCROLL REVEAL
       ========================================================= */

    const revealItems = $$(".reveal");

    if ("IntersectionObserver" in window && revealItems.length) {
        const io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
        );

        revealItems.forEach(function (el) {
            io.observe(el);
        });
    } else {
        revealItems.forEach(function (el) {
            el.classList.add("visible");
        });
    }

    /* =========================================================
       3. TABS
       ========================================================= */

    $$("[data-tabs]").forEach(function (group) {
        const btns = $$(".tab-btn", group);
        const panels = $$(".tab-panel", group);

        btns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                const target = btn.dataset.tab;

                btns.forEach(function (b) {
                    b.classList.toggle("active", b === btn);
                    b.setAttribute("aria-selected", b === btn ? "true" : "false");
                });

                panels.forEach(function (panel) {
                    panel.classList.toggle("active", panel.dataset.panel === target);
                });

                const url = new URL(window.location.href);
                url.searchParams.set(group.dataset.tabs, target);
                window.history.replaceState({}, "", url);
            });
        });
    });

    /* =========================================================
       4. ACCORDION
       ========================================================= */

    $$(".accordion-head").forEach(function (head) {
        head.addEventListener("click", function () {
            const item = head.closest(".accordion");
            const openNow = !item.classList.contains("open");

            if (item.dataset.single === "true") {
                $$(".accordion.open", item.parentElement).forEach(function (other) {
                    other.classList.remove("open");
                    const b = $(".accordion-head", other);
                    if (b) b.setAttribute("aria-expanded", "false");
                });
            }

            item.classList.toggle("open", openNow);
            head.setAttribute("aria-expanded", openNow ? "true" : "false");
        });
    });

    /* =========================================================
       5. COUNTERS
       ========================================================= */

    function animateCount(el) {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);
            el.textContent = value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    const counters = $$("[data-count]");

    if ("IntersectionObserver" in window && counters.length) {
        const co = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
                        co.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );
        counters.forEach(function (el) {
            co.observe(el);
        });
    } else {
        counters.forEach(function (el) {
            el.textContent =
                Number(el.dataset.count).toLocaleString() + (el.dataset.suffix || "");
        });
    }

    /* =========================================================
       6. FACILITIES, NEWS, STATS, GALLERY (data driven)
       ========================================================= */

    function renderStats() {
        const wrap = $("#statGrid");
        if (!wrap || typeof STATS === "undefined") return;

        wrap.innerHTML = STATS.map(function (s) {
            return (
                '<div class="stat">' +
                '<div class="num" data-count="' + s.value + '" data-suffix="' + esc(s.suffix) + '">0</div>' +
                '<div class="lbl">' + esc(s.label) + "</div>" +
                '<div class="note">' + esc(s.note) + "</div>" +
                "</div>"
            );
        }).join("");

        const localCounters = $$("[data-count]", wrap);
        if ("IntersectionObserver" in window) {
            const co = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            animateCount(entry.target);
                            co.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.4 }
            );
            localCounters.forEach(function (el) {
                co.observe(el);
            });
        }
    }

    function renderFacilities() {
        const wrap = $("#facilityGrid");
        if (!wrap || typeof FACILITIES === "undefined") return;

        wrap.innerHTML = FACILITIES.map(function (f) {
            return (
                '<article class="card reveal">' +
                '<div class="icon-circle"><i class="fa-solid ' + esc(f.icon) + '"></i></div>' +
                "<h3>" + esc(f.name) + "</h3>" +
                "<p>" + esc(f.text) + "</p>" +
                "</article>"
            );
        }).join("");
    }

    function renderNews() {
        const wrap = $("#newsGrid");
        if (!wrap || typeof NEWS === "undefined") return;

        wrap.innerHTML = NEWS.map(function (n) {
            return (
                '<article class="news-card reveal">' +
                '<div class="news-body">' +
                '<div class="news-meta"><span class="badge">' + esc(n.category) + "</span>" +
                "<span>" + esc(n.date) + "</span></div>" +
                "<h3>" + esc(n.title) + "</h3>" +
                "<p>" + esc(n.text) + "</p>" +
                "</div></article>"
            );
        }).join("");
    }

    function renderGallery() {
        const wrap = $("#galleryGrid");
        if (!wrap || typeof CAMPUS_GALLERY === "undefined") return;

        wrap.innerHTML = CAMPUS_GALLERY.map(function (g, i) {
            return (
                "<figure data-index=\"" + i + "\">" +
                '<img src="' + esc(g.src) + '" alt="' + esc(g.label) + '" loading="lazy">' +
                "<figcaption>" + esc(g.label) + "</figcaption>" +
                "</figure>"
            );
        }).join("");

        setupLightbox();
    }

    /* =========================================================
       7. LIGHTBOX
       ========================================================= */

    function setupLightbox() {
        const box = $("#lightbox");
        const img = $("#lightboxImg");
        const cap = $("#lightboxCap");
        const grid = $("#galleryGrid");

        if (!box || !img || !cap || !grid) return;

        let current = 0;

        function show(index) {
            const items = $$("figure", grid);
            if (!items.length) return;
            current = (index + items.length) % items.length;
            const fig = items[current];
            const source = $("img", fig);
            img.src = source.getAttribute("src");
            img.alt = source.getAttribute("alt");
            cap.textContent = source.getAttribute("alt");
        }

        function openAt(index) {
            show(index);
            box.classList.add("open");
            document.body.style.overflow = "hidden";
        }

        function close() {
            box.classList.remove("open");
            document.body.style.overflow = "";
        }

        grid.addEventListener("click", function (e) {
            const fig = e.target.closest("figure");
            if (fig) openAt(parseInt(fig.dataset.index, 10));
        });

        $("#lightboxClose", box).addEventListener("click", close);
        $("#lightboxPrev", box).addEventListener("click", function (e) {
            e.stopPropagation();
            show(current - 1);
        });
        $("#lightboxNext", box).addEventListener("click", function (e) {
            e.stopPropagation();
            show(current + 1);
        });

        box.addEventListener("click", function (e) {
            if (e.target === box) close();
        });

        document.addEventListener("keydown", function (e) {
            if (!box.classList.contains("open")) return;
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") show(current - 1);
            if (e.key === "ArrowRight") show(current + 1);
        });
    }

    /* =========================================================
       8. HOME: SCHOOL CARDS + LEADERSHIP STRIP
       ========================================================= */

    function renderHomeSchools() {
        const wrap = $("#homeSchools");
        if (!wrap || typeof SCHOOLS === "undefined") return;

        wrap.innerHTML = SCHOOLS.map(function (s) {
            const depts = s.departments
                .map(function (d) {
                    return "<span>" + esc(d.name) + "</span>";
                })
                .join("");

            return (
                '<article class="school-card reveal">' +
                '<img src="' + esc(s.image) + '" alt="' + esc(s.name) + '" loading="lazy">' +
                '<div class="school-card-body">' +
                '<span class="school-code">' + esc(s.code) + "</span>" +
                "<h3>" + esc(s.name) + "</h3>" +
                '<p class="tagline">' + esc(s.tagline) + "</p>" +
                "<p>" + esc(s.summary) + "</p>" +
                '<div class="school-dept-list">' + depts + "</div>" +
                '<a class="link" href="schools.html#' + esc(s.id) + '">Explore the School <i class="fa-solid fa-arrow-right"></i></a>' +
                "</div></article>"
            );
        }).join("");
    }

    /* =========================================================
       9. SCHOOLS PAGE
       ========================================================= */

    function renderSchoolsPage() {
        const wrap = $("#schoolDetailWrap");
        if (!wrap || typeof SCHOOLS === "undefined") return;

        wrap.innerHTML = SCHOOLS.map(function (s) {
            const academicTotal = s.departments.reduce(function (t, d) {
                return t + d.staff.length;
            }, 0);
            const supportTotal = s.departments.reduce(function (t, d) {
                return t + d.support.length;
            }, 0);
            const programmeTotal = s.departments.reduce(function (t, d) {
                return t + d.ug.length + d.pg.length + d.short.length;
            }, 0);

            const depts = s.departments
                .map(function (d) {
                    const ugCount = d.ug.length + d.pg.length + d.short.length;
                    return (
                        '<div class="dept-card">' +
                        '<span class="code">' + esc(d.code) + "</span>" +
                        "<h4>" + esc(d.name) + "</h4>" +
                        "<p>" + esc(d.summary) + "</p>" +
                        '<span class="hod"><i class="fa-solid fa-user-tie"></i> Head: ' + esc(d.hod) + "</span>" +
                        '<div class="mini-meta">' +
                        "<span><i class=\"fa-solid fa-book-open\"></i>" + ugCount + " programmes</span>" +
                        "<span><i class=\"fa-solid fa-chalkboard-user\"></i>" + d.staff.length + " academic staff</span>" +
                        "<span><i class=\"fa-solid fa-users-gear\"></i>" + d.support.length + " support staff</span>" +
                        "</div>" +
                        "</div>"
                    );
                })
                .join("");

            return (
                '<section class="school-detail" id="' + esc(s.id) + '">' +
                '<div class="school-detail-head">' +
                '<img src="' + esc(s.image) + '" alt="' + esc(s.name) + '" loading="lazy">' +
                '<div class="sd-text">' +
                '<p class="eyebrow">' + esc(s.code) + " &middot; School</p>" +
                "<h3>" + esc(s.name) + "</h3>" +
                '<p class="dean-line"><i class="fa-solid fa-user-tie"></i> ' + esc(s.dean.name) +
                " &mdash; " + esc(s.dean.qual) + "</p>" +
                "<p>" + esc(s.summary) + "</p>" +
                '<div class="school-stat-row">' +
                "<div class=\"school-stat\"><b>" + s.departments.length + "</b> departments</div>" +
                "<div class=\"school-stat\"><b>" + academicTotal + "</b> academic staff</div>" +
                "<div class=\"school-stat\"><b>" + supportTotal + "</b> non-teaching staff</div>" +
                "<div class=\"school-stat\"><b>" + programmeTotal + "</b> programmes</div>" +
                "</div></div></div>" +
                '<div class="dept-grid">' + depts + "</div>" +
                "</section>"
            );
        }).join("");
    }

    /* =========================================================
       10. PROGRAMMES PAGE
       ========================================================= */

    function collectProgrammes() {
        const rows = [];

        SCHOOLS.forEach(function (s) {
            s.departments.forEach(function (d) {
                d.ug.forEach(function (p) {
                    rows.push({
                        level: "Undergraduate",
                        title: p[0],
                        duration: p[1],
                        seats: p[2],
                        focus: p[3],
                        school: s.name,
                        schoolCode: s.code,
                        schoolId: s.id,
                        dept: d.name,
                        deptCode: d.code,
                        mode: "Full-time / Part-time"
                    });
                });

                d.pg.forEach(function (p) {
                    rows.push({
                        level: "Postgraduate",
                        title: p[0],
                        duration: p[1],
                        seats: null,
                        focus: p[2],
                        school: s.name,
                        schoolCode: s.code,
                        schoolId: s.id,
                        dept: d.name,
                        deptCode: d.code,
                        mode: "Full-time"
                    });
                });

                d.short.forEach(function (p) {
                    rows.push({
                        level: "Short Course",
                        title: p[0],
                        duration: p[1],
                        seats: null,
                        focus: p[2],
                        school: s.name,
                        schoolCode: s.code,
                        schoolId: s.id,
                        dept: d.name,
                        deptCode: d.code,
                        mode: "Part-time"
                    });
                });
            });
        });

        return rows;
    }

    function programmeCard(p) {
        return (
            '<article class="programme-card" data-level="' + esc(p.level) + '" ' +
            'data-school="' + esc(p.schoolId) + '" data-dept="' + esc(p.deptCode) + '">' +
            '<div class="prog-top">' +
            "<h4>" + esc(p.title) + "</h4>" +
            '<span class="badge' + (p.level === "Postgraduate" ? " gold" : "") + '">' + esc(p.level) + "</span>" +
            "</div>" +
            "<p>" + esc(p.focus) + "</p>" +
            '<div class="prog-meta">' +
            '<span class="tag">' + esc(p.schoolCode) + "</span>" +
            '<span class="tag">' + esc(p.dept) + "</span>" +
            '<span class="tag muted">' + esc(p.duration) + "</span>" +
            (p.seats ? '<span class="tag muted">' + p.seats + " seats</span>" : "") +
            "</div></article>"
        );
    }

    function renderProgrammesPage() {
        const wrap = $("#programmeList");
        if (!wrap || typeof SCHOOLS === "undefined") return;

        const rows = collectProgrammes();

        // populate selects
        const schoolSel = $("#progSchool");
        if (schoolSel) {
            schoolSel.innerHTML =
                '<option value="">All schools</option>' +
                SCHOOLS.map(function (s) {
                    return '<option value="' + esc(s.id) + '">' + esc(s.name) + "</option>";
                }).join("");
        }

        const levelSel = $("#progLevel");
        if (levelSel) {
            levelSel.innerHTML =
                '<option value="">All levels</option>' +
                ["Undergraduate", "Postgraduate", "Short Course"]
                    .map(function (l) {
                        return '<option value="' + esc(l) + '">' + esc(l) + "</option>";
                    })
                    .join("");
        }

        const deptSel = $("#progDept");
        function fillDepts(schoolId) {
            if (!deptSel) return;
            let html = '<option value="">All departments</option>';
            SCHOOLS.forEach(function (s) {
                if (schoolId && s.id !== schoolId) return;
                s.departments.forEach(function (d) {
                    html +=
                        '<option value="' + esc(d.code) + '">' + esc(s.code) + " &ndash; " + esc(d.name) + "</option>";
                });
            });
            deptSel.innerHTML = html;
        }
        fillDepts("");

        if (schoolSel) schoolSel.addEventListener("change", function () { fillDepts(this.value); });

        // apply filters
        function apply() {
            const q = normalise($("#progSearch") ? $("#progSearch").value : "");
            const school = schoolSel ? schoolSel.value : "";
            const level = levelSel ? levelSel.value : "";
            const dept = deptSel ? deptSel.value : "";
            const duration = $("#progDuration") ? $("#progDuration").value : "";

            const list = rows.filter(function (p) {
                const matchText =
                    !q ||
                    normalise(
                        p.title + " " + p.school + " " + p.dept + " " + p.focus + " " + p.level
                    ).indexOf(q) !== -1;
                const matchSchool = !school || p.schoolId === school;
                const matchLevel = !level || p.level === level;
                const matchDept = !dept || p.deptCode === dept;
                const matchDuration =
                    !duration ||
                    (duration === "short" && parseInt(p.duration, 10) <= 1) ||
                    (duration === "five" && p.duration.indexOf("5") !== -1) ||
                    (duration === "two" && p.duration.indexOf("2") !== -1);
                return matchText && matchSchool && matchLevel && matchDept && matchDuration;
            });

            const shown = list.length;
            const html = list.map(programmeCard).join("");

            wrap.innerHTML =
                html ||
                '<div class="empty-state"><i class="fa-solid fa-magnifying-glass"></i>' +
                "<p>No programme matches your search. Try a different keyword or clear the filters.</p></div>";

            const count = $("#progCount");
            if (count) {
                count.innerHTML =
                    "Showing <b>" + shown + "</b> of <b>" + rows.length + "</b> programmes";
            }

            const reset = $("#progReset");
            if (reset) {
                reset.hidden = !(q || school || level || dept || duration);
            }
        }

        $("#programmeForm").addEventListener("submit", function (e) {
            e.preventDefault();
            apply();
        });

        $$("#programmeForm input, #programmeForm select").forEach(function (el) {
            el.addEventListener("input", apply);
            el.addEventListener("change", apply);
        });

        const reset = $("#progReset");
        if (reset) {
            reset.addEventListener("click", function () {
                if ($("#progSearch")) $("#progSearch").value = "";
                if (schoolSel) schoolSel.value = "";
                if (levelSel) levelSel.value = "";
                if (deptSel) { fillDepts(""); }
                if ($("#progDuration")) $("#progDuration").value = "";
                apply();
            });
        }

        wrap.innerHTML = rows.map(programmeCard).join("");
        apply();
    }

    /* =========================================================
       11. STAFF DIRECTORY
       ========================================================= */

    function collectStaff() {
        const rows = [];

        SCHOOLS.forEach(function (s) {
            s.departments.forEach(function (d) {
                d.staff.forEach(function (p) {
                    rows.push({
                        kind: "Academic",
                        name: p[0],
                        title: p[1],
                        qual: p[2],
                        area: p[3],
                        school: s.name,
                        schoolCode: s.code,
                        schoolId: s.id,
                        unit: d.name,
                        deptCode: d.code
                    });
                });

                d.support.forEach(function (p) {
                    rows.push({
                        kind: "Non-Teaching",
                        name: p[0],
                        title: p[1],
                        qual: p[3] || "Departmental Support",
                        area: p[2],
                        school: s.name,
                        schoolCode: s.code,
                        schoolId: s.id,
                        unit: d.name,
                        deptCode: d.code
                    });
                });
            });
        });

        ADMIN_UNITS.forEach(function (u) {
            u.members.forEach(function (p) {
                rows.push({
                    kind: "Non-Teaching",
                    name: p[0],
                    title: p[1],
                    qual: p[2],
                    area: p[3],
                    school: "Central Administration",
                    schoolCode: "ADM",
                    schoolId: "adm",
                    unit: u.unit,
                    deptCode: u.unit
                });
            });
        });

        return rows;
    }

    function staffCard(s) {
        return (
            '<article class="staff-card" data-kind="' + esc(s.kind) + '" ' +
            'data-school="' + esc(s.schoolId) + '" data-unit="' + esc(s.deptCode) + '">' +
            '<div class="avatar' + (s.kind === "Non-Teaching" ? " gold" : "") + '">' + esc(initials(s.name)) + "</div>" +
            "<div>" +
            '<p class="s-name">' + esc(s.name) + "</p>" +
            '<p class="s-title">' + esc(s.title) + "</p>" +
            '<p class="s-meta"><span><i class="fa-solid fa-school"></i> ' + esc(s.school) + "</span>" +
            "<span><i class=\"fa-solid fa-building\"></i> " + esc(s.unit) + "</span>" +
            "<span><i class=\"fa-solid fa-graduation-cap\"></i> " + esc(s.qual) + "</span>" +
            "<span><i class=\"fa-solid fa-flask\"></i> " + esc(s.area) + "</span></p>" +
            "</div></article>"
        );
    }

    function renderStaffPage() {
        const wrap = $("#staffList");
        if (!wrap || typeof SCHOOLS === "undefined") return;

        const rows = collectStaff();

        const unitSel = $("#staffUnit");
        if (unitSel) {
            unitSel.innerHTML =
                '<option value="">All departments and units</option>' +
                SCHOOLS.map(function (s) {
                    const opts = s.departments
                        .map(function (d) {
                            return '<option value="' + esc(d.code) + '">' + esc(s.code) + " &ndash; " + esc(d.name) + "</option>";
                        })
                        .join("");
                    return (
                        '<optgroup label="' + esc(s.name) + '">' + opts + "</optgroup>"
                    );
                }).join("") +
                '<optgroup label="Central Administration">' +
                ADMIN_UNITS.map(function (u) {
                    return '<option value="' + esc(u.unit) + '">' + esc(u.unit) + "</option>";
                }).join("") +
                "</optgroup>";
        }

        const schoolSel = $("#staffSchool");
        if (schoolSel) {
            schoolSel.innerHTML =
                '<option value="">All schools and units</option>' +
                SCHOOLS.map(function (s) {
                    return '<option value="' + esc(s.id) + '">' + esc(s.name) + "</option>";
                }).join("") +
                '<option value="adm">Central Administration</option>';
        }

        function apply() {
            const q = normalise($("#staffSearch") ? $("#staffSearch").value : "");
            const kind = $("#staffKind") ? $("#staffKind").value : "";
            const school = schoolSel ? schoolSel.value : "";
            const unit = unitSel ? unitSel.value : "";

            const list = rows.filter(function (s) {
                const hay = normalise(
                    s.name + " " + s.title + " " + s.qual + " " + s.area + " " + s.school + " " + s.unit
                );
                return (
                    (!q || hay.indexOf(q) !== -1) &&
                    (!kind || s.kind === kind) &&
                    (!school || s.schoolId === school) &&
                    (!unit || s.deptCode === unit || s.unit === unit)
                );
            });

            wrap.innerHTML =
                list.map(staffCard).join("") ||
                '<div class="empty-state"><i class="fa-solid fa-user-slash"></i>' +
                "<p>No member of staff matches your search.</p></div>";

            const count = $("#staffCount");
            if (count) {
                count.innerHTML = "Showing <b>" + list.length + "</b> of <b>" + rows.length + "</b> staff records";
            }
        }

        $("#staffForm").addEventListener("submit", function (e) {
            e.preventDefault();
            apply();
        });

        $$("#staffForm input, #staffForm select").forEach(function (el) {
            el.addEventListener("input", apply);
            el.addEventListener("change", apply);
        });

        wrap.innerHTML = rows.map(staffCard).join("");
        apply();

        const totalAcademic = rows.filter(function (r) { return r.kind === "Academic"; }).length;
        const totalNon = rows.filter(function (r) { return r.kind === "Non-Teaching"; }).length;

        const statA = $("#statAcademic");
        const statN = $("#statNonTeaching");
        if (statA) statA.textContent = totalAcademic;
        if (statN) statN.textContent = totalNon;
    }

    /* =========================================================
       12. STRUCTURE PAGE (directorates + admin units)
       ========================================================= */

    function renderStructurePage() {
        const dirWrap = $("#directorateList");
        if (dirWrap && typeof DIRECTORATES !== "undefined") {
            dirWrap.innerHTML = DIRECTORATES.map(function (d) {
                return (
                    '<div class="accordion" data-single="true">' +
                    '<button class="accordion-head" aria-expanded="false">' +
                    '<span class="acc-left"><span class="acc-ico"><i class="fa-solid fa-diagram-project"></i></span>' +
                    "<span>" + esc(d.name) + "</span></span>" +
                    '<i class="fa-solid fa-chevron-down acc-arrow"></i>' +
                    "</button>" +
                    '<div class="accordion-body">' +
                    '<p style="margin:14px 0 12px"><strong>Head:</strong> ' + esc(d.head) + " &mdash; " + esc(d.role) + "</p>" +
                    '<ul class="tick-list">' +
                    d.functions.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") +
                    "</ul></div></div>"
                );
            }).join("");
        }

        const govWrap = $("#governanceList");
        if (govWrap && typeof GOVERNANCE_BODIES !== "undefined") {
            govWrap.innerHTML = GOVERNANCE_BODIES.map(function (g) {
                return (
                    '<div class="accordion" data-single="true">' +
                    '<button class="accordion-head" aria-expanded="false">' +
                    '<span class="acc-left"><span class="acc-ico"><i class="fa-solid ' + esc(g.icon) + '"></i></span>' +
                    "<span>" + esc(g.name) + "</span></span>" +
                    '<i class="fa-solid fa-chevron-down acc-arrow"></i>' +
                    "</button>" +
                    '<div class="accordion-body">' +
                    "<p style=\"margin:14px 0 10px\"><strong>Role:</strong> " + esc(g.role) + "</p>" +
                    '<p style="margin-bottom:10px"><strong>Meeting:</strong> ' + esc(g.meets) + "</p>" +
                    "<strong style=\"font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--green-800)\">Composition</strong>" +
                    '<ul class="dot-list" style="margin-top:10px">' +
                    g.members.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") +
                    "</ul></div></div>"
                );
            }).join("");
        }

        const unitWrap = $("#adminUnitList");
        if (unitWrap && typeof ADMIN_UNITS !== "undefined") {
            unitWrap.innerHTML = ADMIN_UNITS.map(function (u) {
                const rows = u.members
                    .map(function (m) {
                        return (
                            "<tr><td><strong>" + esc(m[0]) + "</strong></td>" +
                            "<td>" + esc(m[1]) + "</td>" +
                            "<td>" + esc(m[2]) + "</td></tr>"
                        );
                    })
                    .join("");

                const headLine = u.headTitle
                    ? esc(u.head) + ", " + esc(u.headTitle)
                    : esc(u.head);

                return (
                    '<div class="accordion" data-single="true">' +
                    '<button class="accordion-head" aria-expanded="false">' +
                    '<span class="acc-left"><span class="acc-ico"><i class="fa-solid fa-briefcase"></i></span>' +
                    "<span>" + esc(u.unit) + " &mdash; <small>" + headLine + "</small></span></span>" +
                    '<i class="fa-solid fa-chevron-down acc-arrow"></i>' +
                    "</button>" +
                    '<div class="accordion-body">' +
                    (u.headNote ? "<p style=\"margin:12px 0 0\"><em>" + esc(u.headNote) + "</em></p>" : "") +
                    '<div class="table-wrap" style="margin-top:14px"><table>' +
                    "<thead><tr><th>Name</th><th>Designation</th><th>Responsibility</th></tr></thead>" +
                    "<tbody>" + rows + "</tbody></table></div>" +
                    "</div></div>"
                );
            }).join("");
        }
    }

    /* =========================================================
       13. ADMISSIONS PAGE
       ========================================================= */

    function renderAdmissionsPage() {
        const routeWrap = $("#admissionRoutes");
        if (routeWrap && typeof ADMISSION_ROUTES !== "undefined") {
            routeWrap.innerHTML = ADMISSION_ROUTES.map(function (r) {
                return (
                    '<div class="accordion" data-single="true">' +
                    '<button class="accordion-head" aria-expanded="false">' +
                    '<span class="acc-left"><span class="acc-ico"><i class="fa-solid ' + esc(r.icon) + '"></i></span>' +
                    "<span>" + esc(r.title) + "</span></span>" +
                    '<i class="fa-solid fa-chevron-down acc-arrow"></i>' +
                    "</button>" +
                    '<div class="accordion-body">' +
                    '<p style="margin:14px 0 12px">' + esc(r.summary) + "</p>" +
                    '<span class="badge gold">Duration: ' + esc(r.duration) + "</span>" +
                    "<h4 style=\"margin-top:18px;font-family:'Inter',sans-serif;font-size:15px\">Entry requirements</h4>" +
                    '<ul class="tick-list" style="margin:10px 0 16px">' +
                    r.requirements.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") +
                    "</ul>" +
                    '<h4 style="font-family:\'Inter\',sans-serif;font-size:15px">Process for this route</h4>' +
                    '<ol class="dot-list" style="margin-top:10px">' +
                    r.stages.map(function (x, i) { return "<li><strong>" + (i + 1) + ".</strong> " + esc(x) + "</li>"; }).join("") +
                    "</ol></div></div>"
                );
            }).join("");
        }

        if (typeof ADMISSION_REQUIREMENTS !== "undefined") {
            const ugWrap = $("#ugRequirements");
            const pgWrap = $("#pgRequirements");

            function requirementGrid(key) {
                return (
                    '<div class="grid grid-2">' +
                    ADMISSION_REQUIREMENTS[key]
                        .map(function (r) {
                            return (
                                '<div class="card"><h3>' + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></div>"
                            );
                        })
                        .join("") +
                    "</div>"
                );
            }

            if (ugWrap) ugWrap.innerHTML = requirementGrid("undergraduate");
            if (pgWrap) pgWrap.innerHTML = requirementGrid("postgraduate");
        }

        const timeWrap = $("#admissionTimeline");
        if (timeWrap && typeof ADMISSION_TIMELINE !== "undefined") {
            timeWrap.innerHTML = ADMISSION_TIMELINE.map(function (t) {
                return (
                    '<div class="timeline-item reveal">' +
                    "<h4>" + esc(t.period) + "</h4>" +
                    "<p>" + esc(t.activity) + "</p></div>"
                );
            }).join("");
        }

        const feeWrap = $("#feesTable");
        if (feeWrap && typeof FEES_TABLE !== "undefined") {
            feeWrap.innerHTML = FEES_TABLE.map(function (f) {
                const value = f.note || [f.arts, f.science, f.tech].filter(Boolean).join(" | ");
                return (
                    "<tr><td><strong>" + esc(f.level) + "</strong></td>" +
                    '<td colspan="2">' + esc(value) + "</td></tr>"
                );
            }).join("");
        }
    }

    /* =========================================================
       14. ABOUT PAGE: leadership
       ========================================================= */

    function renderLeadership() {
        const wrap = $("#leadershipGrid");
        if (!wrap || typeof LEADERSHIP === "undefined") return;

        wrap.innerHTML = LEADERSHIP.map(function (p) {
            return (
                '<article class="person reveal">' +
                '<div class="avatar' + (p.icon === "fa-flask" ? " gold" : "") + '">' + esc(initials(p.name)) + "</div>" +
                "<h3>" + esc(p.name) + "</h3>" +
                '<p class="role">' + esc(p.title) + "</p>" +
                '<p class="qual">' + esc(p.qual) + "</p>" +
                '<p class="note">' + esc(p.note) + "</p>" +
                "</article>"
            );
        }).join("");
    }

    /* =========================================================
       15. FAQ accordion
       ========================================================= */

    function renderFaqs() {
        const wrap = $("#faqList");
        if (!wrap || typeof FAQS === "undefined") return;

        wrap.innerHTML = FAQS.map(function (f) {
            return (
                '<div class="accordion" data-single="true">' +
                '<button class="accordion-head" aria-expanded="false">' +
                '<span class="acc-left"><span class="acc-ico"><i class="fa-solid fa-circle-question"></i></span>' +
                "<span>" + esc(f.q) + "</span></span>" +
                '<i class="fa-solid fa-chevron-down acc-arrow"></i>' +
                "</button>" +
                '<div class="accordion-body"><p style="margin:14px 0 4px">' + esc(f.a) + "</p></div></div>"
            );
        }).join("");
    }

    /* =========================================================
       16. FORMS (front-end validation only)
       ========================================================= */

    $$("form[data-validate]").forEach(function (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const msg = $("#" + form.dataset.validate);
            const required = $$("[required]", form);
            let firstBad = null;

            required.forEach(function (field) {
                const value = (field.value || "").trim();
                let bad = !value;

                if (!bad && field.type === "email") {
                    bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
                }

                if (!bad && field.type === "tel") {
                    bad = value.replace(/[^0-9]/g, "").length < 8;
                }

                field.style.borderColor = bad ? "var(--danger)" : "";
                if (bad && !firstBad) firstBad = field;
            });

            if (firstBad) {
                if (msg) {
                    msg.className = "form-message show err";
                    msg.textContent = "Please complete all required fields correctly before submitting.";
                }
                firstBad.focus();
                return;
            }

            const name = form.querySelector("[name='name']");
            const firstName = name ? name.value.trim().split(" ")[0] : "";

            if (msg) {
                msg.className = "form-message show ok";
                msg.textContent =
                    "Thank you" +
                    (firstName ? ", " + firstName : "") +
                    ". Your enquiry has been recorded on this device. " +
                    "Please also send a copy to " +
                    UNIVERSITY.email +
                    " so that the relevant office can respond.";

                window.setTimeout(function () {
                    if (msg) msg.className = "form-message show ok";
                }, 8000);
            }

            form.reset();
        });
    });

    /* =========================================================
       17. WhatsApp helper
       ========================================================= */

    const whatsappBtn = $("#whatsappBtn");

    if (whatsappBtn && typeof UNIVERSITY !== "undefined") {
        whatsappBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const nameField = $("form[data-validate] [name='name']");
            const name = nameField && nameField.value.trim() ? nameField.value.trim() : "";

            const message =
                "Hello " +
                (name ? name + ", " : "") +
                "I would like to make an enquiry about programmes and admission at the University of Ifewara, Osun State.";

            window.open(
                "https://wa.me/" + UNIVERSITY.whatsapp + "?text=" + encodeURIComponent(message),
                "_blank",
                "noopener"
            );
        });
    }

    /* =========================================================
       18. Footer year
       ========================================================= */

    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* =========================================================
       19. Boot
       ========================================================= */

    function boot() {
        renderStats();
        renderHomeSchools();
        renderSchoolsPage();
        renderProgrammesPage();
        renderStaffPage();
        renderStructurePage();
        renderAdmissionsPage();
        renderLeadership();
        renderFacilities();
        renderNews();
        renderFaqs();
        renderGallery();

        // dynamic content is added after the observer set-up above,
        // so reveal any new elements now
        if ("IntersectionObserver" in window) {
            const io2 = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("visible");
                            io2.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.08 }
            );
            $$(".reveal").forEach(function (el) {
                if (!el.classList.contains("visible")) io2.observe(el);
            });
        } else {
            $$(".reveal").forEach(function (el) { el.classList.add("visible"); });
        }

        // wire the dynamic accordions created after boot
        $$(".accordion-head").forEach(function (head) {
            if (head.dataset.wired) return;
            head.dataset.wired = "true";
            head.addEventListener("click", function () {
                const item = head.closest(".accordion");
                const openNow = !item.classList.contains("open");

                if (item.dataset.single === "true") {
                    $$(".accordion.open", item.parentElement).forEach(function (other) {
                        other.classList.remove("open");
                        const b = $(".accordion-head", other);
                        if (b) b.setAttribute("aria-expanded", "false");
                    });
                }

                item.classList.toggle("open", openNow);
                head.setAttribute("aria-expanded", openNow ? "true" : "false");
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
