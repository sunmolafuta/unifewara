/* =========================================================
   UNIVERSITY OF IFEWARA — STUDENT PORTAL
   portal-app.js — shell, router, auth guard and views
   ========================================================= */

(function () {
    "use strict";

    /* ---------------------------------------------------------
       helpers
       --------------------------------------------------------- */

    const $ = function (sel, root) { return (root || document).querySelector(sel); };
    const $$ = function (sel, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(sel));
    };

    function esc(value) {
        return String(value === null || value === undefined ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function money(n) {
        return "₦" + Number(n || 0).toLocaleString("en-NG");
    }

    function fmtDate(iso) {
        if (!iso) return "—";
        const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
        if (isNaN(d.getTime())) return iso;
        return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    }

    function initials(name) {
        return String(name).split(/\s+/).filter(Boolean).slice(0, 2)
            .map(function (w) { return w[0].toUpperCase(); }).join("");
    }

    function daysBetween(a, b) {
        return Math.round((new Date(b) - new Date(a)) / 86400000);
    }

    let toastTimer = null;
    function toast(message, type) {
        let el = $("#portalToast");
        if (!el) {
            el = document.createElement("div");
            el.id = "portalToast";
            el.className = "portal-toast";
            document.body.appendChild(el);
        }
        el.className = "portal-toast" + (type ? " " + type : "");
        el.innerHTML = '<i class="fa-solid fa-circle-check"></i><span>' + esc(message) + "</span>";
        requestAnimationFrame(function () { el.classList.add("show"); });
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { el.classList.remove("show"); }, 3200);
    }

    /* ---------------------------------------------------------
       auth
       --------------------------------------------------------- */

    function findStudent(id) {
        const key = String(id || "").trim().toLowerCase();
        let found = null;
        STUDENTS.forEach(function (s) {
            if (s.id.toLowerCase() === key) found = s;
        });
        return found;
    }

    function currentStudent() {
        const session = Store.readSession();
        if (!session) return null;
        return findStudent(session.id);
    }

    function signIn(id, pin) {
        const student = findStudent(id);
        if (!student) return { ok: false, error: "No student record matches that matriculation number." };
        if (String(student.pin) !== String(pin).trim()) {
            return { ok: false, error: "The PIN you entered is incorrect." };
        }
        Store.saveSession(student.id, true);
        return { ok: true, student: student };
    }

    function requireAuth() {
        const student = currentStudent();
        if (!student) {
            window.location.replace("login.html?next=" + encodeURIComponent(window.location.hash || "#/dashboard"));
            return null;
        }
        return student;
    }

    /* ---------------------------------------------------------
       nav definition
       --------------------------------------------------------- */

    const NAV = [
        { group: "Overview", items: [
            { hash: "#/dashboard", icon: "fa-gauge-high", label: "Dashboard" },
            { hash: "#/announcements", icon: "fa-bullhorn", label: "Announcements", badge: "notices" }
        ] },
        { group: "Academics", items: [
            { hash: "#/registration", icon: "fa-file-signature", label: "Course Registration" },
            { hash: "#/timetable", icon: "fa-table-cells", label: "Timetable" },
            { hash: "#/results", icon: "fa-chart-simple", label: "Results & Transcript" }
        ] },
        { group: "Finance", items: [
            { hash: "#/fees", icon: "fa-receipt", label: "Fees & Payments", badge: "fees" },
            { hash: "#/hostel", icon: "fa-bed", label: "Hostel & Accommodation", badge: "hostel" }
        ] },
        { group: "Resources", items: [
            { hash: "#/library", icon: "fa-book", label: "Library & Research", badge: "loans" },
            { hash: "#/documents", icon: "fa-folder-open", label: "Documents" }
        ] },
        { group: "Account", items: [
            { hash: "#/applications", icon: "fa-pen-to-square", label: "Applications & E-forms" },
            { hash: "#/profile", icon: "fa-user-gear", label: "Profile & Settings" }
        ] }
    ];

    const VIEWS = {
        dashboard: { title: "Dashboard", crumb: "Overview", render: viewDashboard },
        announcements: { title: "Announcements", crumb: "Overview", render: viewAnnouncements },
        registration: { title: "Course Registration", crumb: "Academics", render: viewRegistration },
        timetable: { title: "Examination & Lecture Timetable", crumb: "Academics", render: viewTimetable },
        results: { title: "Results & Transcript", crumb: "Academics", render: viewResults },
        fees: { title: "Fees & Payments", crumb: "Finance", render: viewFees },
        hostel: { title: "Hostel & Accommodation", crumb: "Finance", render: viewHostel },
        library: { title: "Library & Research", crumb: "Resources", render: viewLibrary },
        documents: { title: "Document Centre", crumb: "Resources", render: viewDocuments },
        applications: { title: "Applications & E-forms", crumb: "Account", render: viewApplications },
        profile: { title: "Profile & Settings", crumb: "Account", render: viewProfile }
    };

    /* ---------------------------------------------------------
       shell
       --------------------------------------------------------- */

    function badgeValue(key, ctx) {
        if (key === "notices") {
            const dismissed = Store.getDismissedNotices();
            return PORTAL_ANNOUNCEMENTS.filter(function (a) {
                return dismissed.indexOf(a.id) === -1;
            }).length;
        }
        if (key === "fees") {
            return ctx && ctx.feeOutstanding > 0 ? "Due" : "";
        }
        if (key === "hostel") {
            return ctx && !ctx.hostel.allocated ? "Apply" : "";
        }
        if (key === "loans") {
            if (!ctx) return "";
            const open = ctx.loans.filter(function (l) { return !l.returned; }).length;
            return open ? String(open) : "";
        }
        return "";
    }

    function buildSidebar(student, ctx) {
        const wrap = $("#portalSide");
        wrap.innerHTML =
            '<a class="side-brand" href="../index.html">' +
            '<img src="../images/logo.svg" alt="University of Ifewara crest">' +
            "<span><strong>University of Ifewara</strong><span>Student Portal</span></span></a>" +

            '<div class="side-user">' +
            '<div class="side-avatar">' + esc(initials(student.name)) + "</div>" +
            '<div class="side-user-info"><b>' + esc(student.name) + "</b>" +
            "<span>" + esc(student.id) + " &middot; " + esc(student.level) + " Level</span></div>" +
            "</div>" +

            '<nav class="side-nav">' +
            NAV.map(function (group) {
                return '<p class="side-nav-label">' + esc(group.group) + "</p>" +
                    group.items.map(function (item) {
                        const count = badgeValue(item.badge, ctx);
                        const cls = item.badge === "fees" && count ? " alert" : "";
                        return '<a href="' + item.hash + '" data-route="' + item.hash.slice(2) + '">' +
                            '<i class="fa-solid ' + item.icon + '"></i><span>' + esc(item.label) + "</span>" +
                            (count ? '<span class="pill' + cls + '">' + esc(count) + "</span>" : "") +
                            "</a>";
                    }).join("");
            }).join("") +
            "</nav>" +

            '<div class="side-foot">' +
            "Session " + esc(PORTAL.session) + " &middot; " + esc(PORTAL.term) + "<br>" +
            "Portal v" + esc(PORTAL.portalVersion) +
            '<button type="button" id="sideSignOut"><i class="fa-solid fa-right-from-bracket"></i> Sign out</button>' +
            "</div>";

        $("#sideSignOut").addEventListener("click", function () {
            if (window.confirm("Sign out of the student portal?")) {
                Store.clearSession();
                window.location.href = "login.html";
            }
        });
    }

    function buildTopbar(viewKey) {
        const view = VIEWS[viewKey];
        $("#topTitle").textContent = view.title;
        $("#topCrumb").textContent = view.crumb + " / " + PORTAL.session;
    }

    function markActive(route) {
        $$(".side-nav a").forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("data-route") === route);
        });
    }

    function setSidebarBadges(ctx) {
        NAV.forEach(function (group) {
            group.items.forEach(function (item) {
                if (!item.badge) return;
                const a = $('.side-nav a[data-route="' + item.hash.slice(2) + '"]');
                if (!a) return;
                const old = $(".pill", a);
                const count = badgeValue(item.badge, ctx);
                if (!count) {
                    if (old) a.removeChild(old);
                    return;
                }
                if (old) {
                    old.textContent = count;
                    old.className = "pill" + (item.badge === "fees" ? " alert" : "");
                } else {
                    const span = document.createElement("span");
                    span.className = "pill" + (item.badge === "fees" ? " alert" : "");
                    span.textContent = count;
                    a.appendChild(span);
                }
            });
        });
    }

    /* ---------------------------------------------------------
       router
       --------------------------------------------------------- */

    let activeRoute = null;

    function currentRoute() {
        const hash = window.location.hash || "#/dashboard";
        const key = hash.replace("#/", "").split("?")[0];
        return VIEWS[key] ? key : "dashboard";
    }

    function route() {
        const student = requireAuth();
        if (!student) return;

        const key = currentRoute();
        const ctx = currentContext(student);

        buildSidebar(student, ctx);
        buildTopbar(key);
        markActive(key);
        setSidebarBadges(ctx);

        const host = $("#portalView");
        host.innerHTML = VIEWS[key].render(student, ctx);

        afterRender(key, student, ctx);

        document.title = VIEWS[key].title + " | UNIFEWARA Student Portal";
        activeRoute = key;
        window.scrollTo(0, 0);
        closeSidebar();
    }

    function currentContext(student) {
        const snap = portalSnapshot(student);
        const reg = Store.getRegistration(student.id, snap.registration);
        snap.registration = reg.codes.filter(function (c) { return COURSE_MAP[c]; });
        snap.regState = reg;
        snap.units = snap.registration.reduce(function (t, c) { return t + COURSE_MAP[c].unit; }, 0);
        snap.timetable = portalTimetable(student, snap.registration);
        return snap;
    }

    function afterRender(key, student, ctx) {
        if (key === "announcements") wireAnnouncements(student, ctx);
        if (key === "registration") wireRegistration(student, ctx);
        if (key === "results") wireResults(student, ctx);
        if (key === "fees") wireFees(student, ctx);
        if (key === "hostel") wireHostel(student, ctx);
        if (key === "library") wireLibrary(student, ctx);
        if (key === "documents") wireDocuments(student, ctx);
        if (key === "applications") wireApplications(student, ctx);
        if (key === "profile") wireProfile(student, ctx);
        if (key === "timetable") wireTimetable(ctx);
        if (key === "dashboard") wireDashboard(student, ctx);
    }

    function rerender() {
        const key = currentRoute();
        const student = currentStudent();
        if (!student) { requireAuth(); return; }
        const ctx = currentContext(student);
        buildSidebar(student, ctx);
        markActive(key);
        setSidebarBadges(ctx);
        $("#portalView").innerHTML = VIEWS[key].render(student, ctx);
        afterRender(key, student, ctx);
    }

    /* ---------------------------------------------------------
       view: dashboard
       --------------------------------------------------------- */

    function viewDashboard(student, ctx) {
        const daysToReg = portalDaysBetween(PORTAL.today, PORTAL.registrationDeadline);
        const openLoans = ctx.loans.filter(function (l) { return !l.returned; });
        const overdue = openLoans.filter(function (l) { return l.fine > 0; });
        const fineTotal = overdue.reduce(function (t, l) { return t + l.fine; }, 0);
        const payPct = ctx.feeTotal ? Math.round((ctx.feePaid / ctx.feeTotal) * 100) : 0;
        const nextClass = nextLecture(ctx);
        const dismissed = Store.getDismissedNotices();
        const notices = PORTAL_ANNOUNCEMENTS.filter(function (a) {
            return dismissed.indexOf(a.id) === -1;
        });

        return '' +
            '<div class="view-head">' +
            "<h2>Welcome back, " + esc(student.name.split(" ")[0]) + "</h2>" +
            "<p>" + esc(ctx.school ? ctx.school.name : student.school) + " &middot; " + esc(ctx.deptName) +
            " &middot; " + esc(student.programme) + " &middot; " + esc(student.level) + " Level, " +
            esc(student.session) + " intake.</p>" +
            "</div>" +

            '<div class="p-grid g4" style="margin-bottom:16px">' +
            tile("fa-chart-simple", "", ctx.units + " units", "Registered this term",
                ctx.registration.length + " courses") +
            tile("fa-award", "blue", ctx.cgpa ? ctx.cgpa.toFixed(2) : "—", "Cumulative GPA",
                ctx.record.length ? ctx.record[ctx.record.length - 1].band.label : "No results yet") +
            tile("fa-magnifying-glass-dollar", ctx.feeOutstanding ? "amber" : "",
                money(ctx.feeOutstanding), "Outstanding fees", payPct + "% of " + money(ctx.feeTotal) + " paid") +
            tile("fa-book-open", overdue.length ? "red" : "violet", String(openLoans.length),
                openLoans.length === 1 ? "Book on loan" : "Books on loan",
                fineTotal ? money(fineTotal) + " in penalties" : "No penalties") +
            "</div>" +

            (student.status.indexOf("Probation") !== -1
                ? '<div class="p-alert warn"><i class="fa-solid fa-triangle-exclamation"></i><span><b>Medical hold noted.</b> Your record carries a probation flag. Visit the University Health Centre for clearance before you can be issued an examination card.</span></div>'
                : "") +

            (daysToReg >= 0
                ? '<div class="p-alert info"><i class="fa-solid fa-clock"></i><span>Course registration closes on <b>' +
                  esc(fmtDate(PORTAL.registrationDeadline)) + "</b> &mdash; " + daysToReg +
                  " day" + (daysToReg === 1 ? "" : "s") + " remaining. You are carrying <b>" + ctx.units +
                  " units</b> this term.</span></div>"
                : '<div class="p-alert err"><i class="fa-solid fa-circle-exclamation"></i><span>Course registration for ' +
                  esc(PORTAL.term) + " has closed. Contact the Registrar's office for late registration.</span></div>") +

            '<div class="p-grid g2" style="margin-bottom:16px">' +

            '<div class="p-card">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-calendar-day"></i> Next scheduled class</h3>' +
            '<span class="link" data-goto="timetable">Full timetable</span></div>' +
            (nextClass
                ? '<div class="mini-list"><div class="mini-item">' +
                  '<span class="course-code">' + esc(nextClass.code) + "</span>" +
                  '<div class="mi-main"><b>' + esc(nextClass.title) + "</b><span>" +
                  esc(nextClass.lecturer) + "</span></div>" +
                  '<div class="mi-side"><b>' + esc(nextClass.start) + "</b><span>" + esc(nextClass.day) +
                  "</span></div></div>" +
                  '<div class="mini-item"><i class="fa-solid fa-location-dot" style="color:var(--green-600)"></i>' +
                  '<div class="mi-main"><b>Lecture venue ' + esc(nextClass.venue) + "</b><span>" +
                  esc(nextClass.start) + " &ndash; " + esc(nextClass.end) + "</span></div>" +
                  '<div class="mi-side"><span>Room</span></div></div></div>'
                : emptyState("fa-mug-hot", "No lectures scheduled", "Your timetable is clear for the rest of the week.")) +
            "</div>" +

            '<div class="p-card">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-graduation-cap"></i> Academic standing</h3>' +
            '<span class="link" data-goto="results">Full transcript</span></div>' +
            (ctx.record.length
                ? '<div class="progress-ring" style="margin-bottom:14px">' +
                  ring(payPct === 0 ? 0 : Math.min(100, Math.round((ctx.cgpa / 5) * 100)), ctx.cgpa.toFixed(2), "GPA") +
                  '<div><b style="font-size:14px;color:var(--ink)">' + esc(ctx.record[ctx.record.length - 1].band.label) + "</b>" +
                  '<p style="font-size:12.5px;color:var(--muted);margin-top:3px">' +
                  esc(ctx.record[ctx.record.length - 1].band.note) + "</p>" +
                  '<p style="font-size:12px;color:var(--muted);margin-top:6px">' +
                  esc(ctx.record.length) + " level" + (ctx.record.length === 1 ? "" : "s") +
                  " completed &middot; " + esc(student.level) + " Level in progress</p></div></div>" +
                  ctx.record.slice().reverse().map(function (l) {
                    return '<div class="bar-row" style="margin-top:9px"><span style="width:74px;color:var(--muted)">' +
                      esc(l.label) + '</span><span class="bar"><i style="width:' +
                      Math.min(100, (l.gpa / 5) * 100) + '%"></i></span>' +
                      '<span class="bv">' + l.gpa.toFixed(2) + "</span></div>";
                  }).join("")
                : emptyState("fa-chart-simple", "No results published yet",
                    "Your first set of results will appear here once the first term examinations are marked.")) +
            "</div>" +

            "</div>" +

            '<div class="p-grid g2">' +

            '<div class="p-card">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-bullhorn"></i> Latest announcements</h3>' +
            '<span class="link" data-goto="announcements">View all</span></div>' +
            (notices.length
                ? notices.slice(0, 4).map(function (a) {
                    return '<div class="notice"><div class="notice-ico ' + esc(a.priority) + '">' +
                      noticeIcon(a.tag) + '</div><div class="notice-body">' +
                      "<h4>" + esc(a.title) + "</h4><p>" + esc(a.body.slice(0, 110)) + "…</p>" +
                      '<div class="notice-meta"><span class="tag ' + tagClass(a.tag) + '">' + esc(a.tag) + "</span>" +
                      "<span>" + esc(fmtDate(a.date)) + "</span><span>&middot; " + esc(a.audience) + "</span></div></div></div>";
                }).join("")
                : emptyState("fa-bell-slash", "You are all caught up", "Dismissed announcements will reappear here after a reset.")) +
            "</div>" +

            '<div class="p-card">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-list-check"></i> Quick actions</h3></div>' +
            '<div class="mini-list">' +
            quickAction("file-signature", "Register courses", ctx.regState.confirmed
                ? "Registration confirmed for " + esc(PORTAL.term.toLowerCase()) + " - view your courses"
                : "Choose and confirm your " + esc(PORTAL.term.toLowerCase()) + " courses", "registration") +
            quickAction("receipt", "Pay outstanding fees", ctx.feeOutstanding ? money(ctx.feeOutstanding) + " due" : "All settled", "fees") +
            quickAction("bed", "Hostel allocation", ctx.hostel.allocated ? "Allocated &middot; " + esc(ctx.hostel.hall.name) : "Apply for a hall", "hostel") +
            quickAction("file-arrow-down", "Download transcript", "Academic transcript and receipts", "documents") +
            "</div>" +
            '<div style="margin-top:14px;padding-top:14px;border-top:1px dashed var(--line)">' +
            '<p style="font-size:11.5px;color:var(--muted);line-height:1.6">Signed in as <b style="color:var(--ink-2)">' +
            esc(student.email) + "</b>. Your session is stored on this device only &mdash; this is a demonstration portal with no server connection.</p></div>" +
            "</div>" +

            "</div>";
    }

    function tile(icon, tone, value, label, detail) {
        return '<div class="stat-tile"><div class="stat-ico ' + (tone || "") + '">' +
            '<i class="fa-solid ' + icon + '"></i></div><div><div class="v">' + esc(value) +
            '</div><div class="l">' + esc(label) + "</div>" +
            (detail ? '<div class="d">' + detail + "</div>" : "") + "</div></div>";
    }

    function quickAction(icon, title, sub, route) {
        return '<div class="mini-item" data-goto="' + route + '" style="cursor:pointer">' +
            '<div class="stat-ico" style="width:36px;height:36px;font-size:12px"><i class="fa-solid fa-' + icon + '"></i></div>' +
            '<div class="mi-main"><b>' + esc(title) + "</b><span>" + sub + "</span></div>" +
            '<i class="fa-solid fa-chevron-right" style="color:var(--line);font-size:11px"></i></div>';
    }

    function ring(pct, text, caption) {
        const r = 38;
        const c = 2 * Math.PI * r;
        const off = c - (c * Math.max(0, Math.min(100, pct))) / 100;
        return '<div class="ring"><svg width="92" height="92" viewBox="0 0 92 92">' +
            '<circle class="bgc" cx="46" cy="46" r="' + r + '"></circle>' +
            '<circle class="fgc" cx="46" cy="46" r="' + r + '" stroke-dasharray="' + c.toFixed(1) +
            '" stroke-dashoffset="' + off.toFixed(1) + '"></circle></svg><b>' + esc(text) + "</b></div>";
    }

    function emptyState(icon, title, text) {
        return '<div class="empty-state"><i class="fa-solid ' + icon + '"></i><h4>' + esc(title) +
            "</h4><p>" + esc(text) + "</p></div>";
    }

    function kv(key, value) {
        return "<div><span class=\"k\">" + esc(key) + '</span><span class="v">' + esc(value) + "</span></div>";
    }

    function noticeIcon(tag) {
        if (/examin/i.test(tag)) return '<i class="fa-solid fa-file-pen"></i>';
        if (/fee|payment/i.test(tag)) return '<i class="fa-solid fa-receipt"></i>';
        if (/library/i.test(tag)) return '<i class="fa-solid fa-book"></i>';
        if (/hostel/i.test(tag)) return '<i class="fa-solid fa-bed"></i>';
        if (/training|siwes|practice/i.test(tag)) return '<i class="fa-solid fa-industry"></i>';
        if (/student|development/i.test(tag)) return '<i class="fa-solid fa-people-group"></i>';
        return '<i class="fa-solid fa-bell"></i>';
    }

    function tagClass(tag) {
        if (/examin/i.test(tag)) return "red";
        if (/fee/i.test(tag)) return "amber";
        if (/library/i.test(tag)) return "blue";
        if (/hostel/i.test(tag)) return "violet";
        if (/student/i.test(tag)) return "grey";
        return "";
    }

    function nextLecture(ctx) {
        if (!ctx.timetable.length) return null;
        const order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const todayIdx = order.indexOf(portalWeekday());
        const now = PORTAL.todayTime;
        const upcoming = ctx.timetable
            .filter(function (t) { return t.dayIndex > todayIdx || (t.dayIndex === todayIdx && t.start > now); })
            .sort(function (a, b) { return a.dayIndex - b.dayIndex; });
        if (upcoming.length) return upcoming[0];
        return ctx.timetable[0];
    }

    function wireDashboard() {
        $$("[data-goto]").forEach(function (el) {
            el.addEventListener("click", function () {
                window.location.hash = "#/" + el.getAttribute("data-goto");
            });
        });
    }

    /* ---------------------------------------------------------
       view: announcements
       --------------------------------------------------------- */

    function viewAnnouncements(student, ctx) {
        const dismissed = Store.getDismissedNotices();
        const live = PORTAL_ANNOUNCEMENTS.filter(function (a) { return dismissed.indexOf(a.id) === -1; });
        const gone = PORTAL_ANNOUNCEMENTS.filter(function (a) { return dismissed.indexOf(a.id) !== -1; });

        return '' +
            '<div class="view-head"><h2>Announcements</h2>' +
            "<p>Notices from the Registrar, your school and the Bursary. Dismissed notices are stored on this device and can be restored from Profile &amp; Settings.</p></div>" +

            '<div class="p-card pad-lg" style="margin-bottom:16px">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-inbox"></i> Notice board</h3>' +
            '<div class="chip-row">' +
            '<button type="button" class="p-btn ghost sm" data-filter="all">All ' +
            PORTAL_ANNOUNCEMENTS.length + "</button>" +
            '<button type="button" class="p-btn ghost sm" data-filter="high">Priority ' +
            PORTAL_ANNOUNCEMENTS.filter(function (a) { return a.priority === "high"; }).length + "</button>" +
            '<button type="button" class="p-btn ghost sm" id="restoreNotices">Restore ' + gone.length + " dismissed</button>" +
            "</div></div>" +
            '<div id="noticeList">' + noticeRows(PORTAL_ANNOUNCEMENTS) + "</div>" +
            "</div>" +

            '<div class="p-grid g3">' +
            '<div class="p-card"><h3><i class="fa-solid fa-envelope-open-text"></i> How notices reach you</h3>' +
            '<p style="font-size:12.5px;color:var(--muted);line-height:1.7;margin-top:8px">Notices published to your school and level are mirrored here. In the live system this is where SMS and email delivery receipts would appear.</p>' +
            '<div class="kv" style="margin-top:12px">' +
            kv("Email", student.email) +
            kv("Phone", student.phone) +
            kv("Delivery", "Portal, SMS and email") +
            "</div></div>" +
            '<div class="p-card"><h3><i class="fa-solid fa-tag"></i> Categories in use</h3>' +
            '<div class="chip-row" style="margin-top:10px">' +
            Array.from(new Set(PORTAL_ANNOUNCEMENTS.map(function (a) { return a.tag; })))
                .map(function (t) { return '<span class="tag ' + tagClass(t) + '">' + esc(t) + "</span>"; }).join("") +
            "</div>" +
            '<p style="font-size:12px;color:var(--muted);margin-top:12px;line-height:1.6">' +
            "High priority notices are highlighted in red and are never auto-dismissed by the portal.</p></div>" +
            '<div class="p-card"><h3><i class="fa-solid fa-envelope"></i> Messaging</h3>' +
            '<p style="font-size:12.5px;color:var(--muted);line-height:1.7;margin-top:8px">Send a message to your school or the Registrar from the <b>Contact</b> page, or request a callback through the portal help desk.</p>' +
            '<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">' +
            '<a class="p-btn ghost sm" href="../contact.html"><i class="fa-solid fa-envelope"></i> Contact us</a>' +
            '<a class="p-btn ghost sm" href="../admissions.html"><i class="fa-solid fa-circle-question"></i> FAQs</a>' +
            "</div></div>" +
            "</div>";
    }

    function noticeRows(list) {
        if (!list.length) return emptyState("fa-bell-slash", "Nothing to show", "No announcements match this filter.");
        return list.map(function (a) {
            return '<div class="notice" data-priority="' + esc(a.priority) + '">' +
                '<div class="notice-ico ' + esc(a.priority) + '">' + noticeIcon(a.tag) + "</div>" +
                '<div class="notice-body"><h4>' + esc(a.title) + "</h4><p>" + esc(a.body) + "</p>" +
                '<div class="notice-meta"><span class="tag ' + tagClass(a.tag) + '">' + esc(a.tag) + "</span>" +
                "<span>" + esc(fmtDate(a.date)) + "</span><span>&middot; " + esc(a.audience) + "</span>" +
                "<span>&middot; Ref " + esc(a.id) + "</span></div></div>" +
                '<button type="button" class="dismiss-btn" data-dismiss="' + esc(a.id) +
                '" title="Dismiss"><i class="fa-solid fa-xmark"></i></button></div>';
        }).join("");
    }

    function wireAnnouncements() {
        function applyFilter(mode) {
            const list = $("#noticeList");
            const rows = $$(".notice", list);
            $$("[data-filter]").forEach(function (b) { b.classList.remove("gold"); });
            const active = $('[data-filter="' + mode + '"]');
            if (active) active.classList.add("gold");
            if (mode === "all") {
                rows.forEach(function (r) { r.style.display = ""; });
            } else {
                rows.forEach(function (r) { r.style.display = r.getAttribute("data-priority") === mode ? "" : "none"; });
            }
        }
        $$("[data-filter]").forEach(function (b) {
            b.addEventListener("click", function () { applyFilter(b.getAttribute("data-filter")); });
        });
        applyFilter("all");

        $("#noticeList").addEventListener("click", function (e) {
            const btn = e.target.closest("[data-dismiss]");
            if (!btn) return;
            Store.dismissNotice(btn.getAttribute("data-dismiss"));
            toast("Notice dismissed");
            rerender();
        });

        $("#restoreNotices").addEventListener("click", function () {
            Store.restoreNotices();
            toast("All notices restored");
            rerender();
        });
    }

    /* ---------------------------------------------------------
       view: course registration
       --------------------------------------------------------- */

    function viewRegistration(student, ctx) {
        const deptCourses = COURSES.filter(function (c) { return c[4] === student.dept && c[3] === student.level; });
        const serviceCourses = COURSES.filter(function (c) { return c[5] === "Service" && c[3] === student.level; });
        const pool = deptCourses.concat(serviceCourses);
        const selected = ctx.registration.slice();

        const cgpa = ctx.cgpa;
        const needsPermit = cgpa > 0 && cgpa < 2.0;

        return '' +
            '<div class="view-head"><h2>Course Registration &mdash; ' + esc(PORTAL.term) + " " + esc(PORTAL.session) + "</h2>" +
            "<p>Select the courses you intend to sit this term. Core and service courses are compulsory; " +
            "electives are optional. Registration closes on <b>" + esc(fmtDate(PORTAL.registrationDeadline)) + "</b>.</p></div>" +

            (needsPermit
                ? '<div class="p-alert warn"><i class="fa-solid fa-triangle-exclamation"></i><span><b>Academic warning.</b> Your cumulative GPA of ' +
                  cgpa.toFixed(2) + " is below the 2.00 threshold for automatic registration. Tick the Dean's permit box below to proceed, or visit the Registrar.</span></div>"
                : "") +

            '<div class="p-grid g4" style="margin-bottom:16px">' +
            tile("fa-layer-group", "", String(ctx.units), "Units selected",
                "Minimum " + STUDY_RULES.minUnits + ", maximum " + STUDY_RULES.maxUnits) +
            tile("fa-list-check", "blue", String(selected.length), "Courses selected", student.level + " Level offering") +
            tile("fa-gauge-high", ctx.cgpa >= 3.5 ? "" : "amber", ctx.cgpa ? ctx.cgpa.toFixed(2) : "—", "Cumulative GPA", "Required: 2.00 to register") +
            tile("fa-coins", "violet", "Compulsory " + STUDY_RULES.compulsoryService, "Service units", "General Studies, Use of English") +
            "</div>" +

            '<div class="p-grid g2" style="align-items:start">' +

            '<div class="p-card pad-lg">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-list-ul"></i> Available courses</h3>' +
            '<div class="chip-row"><button type="button" class="p-btn ghost sm" id="selCore">Select all core</button>' +
            '<button type="button" class="p-btn ghost sm" id="clearAll">Clear all</button></div></div>' +
            pool.map(function (c) {
                const code = c[0];
                const on = selected.indexOf(code) !== -1;
                const done = ctx.record.some(function (l) {
                    return l.rows.some(function (r) { return r.code === code && r.grade !== "F"; });
                });
                return '<label class="course-row' + (on ? " selected" : "") + '" data-code="' + esc(code) + '">' +
                    '<input type="checkbox" value="' + esc(code) + '"' + (on ? " checked" : "") + " style=\"width:17px;height:17px;accent-color:var(--green-700)\">" +
                    '<span class="course-code">' + esc(code) + "</span>" +
                    '<span class="course-main"><b>' + esc(c[1]) + "</b><span>" +
                    esc(portalDeptName(c[4])) + " &middot; " + esc(c[5]) +
                    (done ? " &middot; already passed" : "") + "</span></span>" +
                    '<span class="course-side"><span class="unit-chip">' + c[2] + " units</span></span></label>";
            }).join("") +
            "</div>" +

            '<div class="p-card pad-lg" style="position:sticky;top:84px">' +
            '<h3><i class="fa-solid fa-receipt"></i> Registration summary</h3>' +
            '<p class="card-sub">Your selected courses carry the following units.</p>' +
            '<div id="regSummary">' + regSummary(selected) + "</div>" +
            '<div style="margin-top:16px">' +
            '<label style="display:flex;gap:9px;align-items:flex-start;font-size:12.5px;color:var(--ink-2);cursor:pointer">' +
            '<input type="checkbox" id="deanPermit" style="width:16px;height:16px;accent-color:var(--green-700);margin-top:2px">' +
            "<span>I have been granted Dean's permit to register below 2.00 GPA</span></label>" +
            "</div>" +
            '<div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">' +
            '<button type="button" class="p-btn" id="saveReg"><i class="fa-solid fa-floppy-disk"></i> Save selection</button>' +
            '<button type="button" class="p-btn ghost" id="confirmReg" disabled><i class="fa-solid fa-circle-check"></i> Confirm registration</button>' +
            "</div>" +
            '<div id="regStatus" style="margin-top:14px">' + (ctx.regState.confirmed
                ? '<div class="p-alert ok" style="margin:0"><i class="fa-solid fa-circle-check"></i><span>Registration confirmed on ' +
                  esc(fmtDate(new Date(ctx.regState.updated).toISOString().slice(0, 10))) + ". Amendments are locked; contact the Registrar to change your courses.</span></div>"
                : "") + "</div>" +
            '<div style="margin-top:16px;padding-top:14px;border-top:1px dashed var(--line)">' +
            '<p style="font-size:11.5px;color:var(--muted);line-height:1.65">A course already passed cannot be repeated for credit. Dropping below ' +
            STUDY_RULES.minUnits + " units requires written approval from your Head of Department, " +
            esc(ctx.hod) + ".</p></div>" +
            "</div>" +

            "</div>";
    }

    function regSummary(codes) {
        const units = codes.reduce(function (t, c) { return t + (COURSE_MAP[c] ? COURSE_MAP[c].unit : 0); }, 0);
        const byType = { Core: 0, Service: 0, Elective: 0 };
        codes.forEach(function (c) {
            if (COURSE_MAP[c] && byType[COURSE_MAP[c].type] !== undefined) byType[COURSE_MAP[c].type] += COURSE_MAP[c].unit;
        });
        return '<div class="bar-row" style="margin-bottom:12px"><span class="bar' +
            (units > STUDY_RULES.maxUnits ? " red" : units < STUDY_RULES.minUnits ? " amber" : "") + '">' +
            '<i style="width:' + Math.min(100, (units / STUDY_RULES.maxUnits) * 100) + '%"></i></span>' +
            '<span class="bv">' + units + " / " + STUDY_RULES.maxUnits + " units</span></div>" +
            '<div class="kv">' +
            kv("Core courses", byType.Core + " units") +
            kv("Service courses", byType.Service + " units") +
            kv("Electives", byType.Elective + " units") +
            kv("Total courses", codes.length) +
            kv("Status", units < STUDY_RULES.minUnits ? "Below minimum" : units > STUDY_RULES.maxUnits ? "Above maximum" : "Within range") +
            "</div>";
    }

    function wireRegistration(student, ctx) {
        const boxes = $$('#portalView input[type="checkbox"][value]');
        const saveBtn = $("#saveReg");
        const confirmBtn = $("#confirmReg");
        const permit = $("#deanPermit");

        function selectedCodes() {
            return boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
        }

        function refresh() {
            const codes = selectedCodes();
            $("#regSummary").innerHTML = regSummary(codes);
            const units = codes.reduce(function (t, c) { return t + COURSE_MAP[c].unit; }, 0);
            const over = units > STUDY_RULES.maxUnits;
            const under = units < STUDY_RULES.minUnits;
            const cgpa = ctx.cgpa;
            const needsPermit = cgpa > 0 && cgpa < 2.0;
            const blockedByCgpa = needsPermit && !(permit && permit.checked);
            saveBtn.disabled = over || ctx.regState.confirmed;
            confirmBtn.disabled = over || under || blockedByCgpa || ctx.regState.confirmed;
            saveBtn.title = over ? "You have exceeded the maximum unit load" : "";
            confirmBtn.title = blockedByCgpa
                ? "Dean's permit required"
                : under ? "Minimum unit load is " + STUDY_RULES.minUnits : "";
            boxes.forEach(function (b) {
                b.closest(".course-row").classList.toggle("selected", b.checked);
            });
        }

        boxes.forEach(function (b) { b.addEventListener("change", refresh); });
        if (permit) permit.addEventListener("change", refresh);
        refresh();

        $("#selCore").addEventListener("click", function () {
            if (ctx.regState.confirmed) return toast("Registration is confirmed and locked", "warn");
            boxes.forEach(function (b) {
                if (COURSE_MAP[b.value] && COURSE_MAP[b.value].type === "Core") b.checked = true;
            });
            refresh();
        });

        $("#clearAll").addEventListener("click", function () {
            if (ctx.regState.confirmed) return toast("Registration is confirmed and locked", "warn");
            boxes.forEach(function (b) { b.checked = false; });
            refresh();
        });

        saveBtn.addEventListener("click", function () {
            const codes = selectedCodes();
            Store.setRegistration(student.id, codes, false);
            toast("Selection saved — " + codes.length + " courses, " +
                codes.reduce(function (t, c) { return t + COURSE_MAP[c].unit; }, 0) + " units");
            rerender();
        });

        confirmBtn.addEventListener("click", function () {
            const codes = selectedCodes();
            const units = codes.reduce(function (t, c) { return t + COURSE_MAP[c].unit; }, 0);
            if (units < STUDY_RULES.minUnits) return toast("Minimum load is " + STUDY_RULES.minUnits + " units", "err");
            if (units > STUDY_RULES.maxUnits) return toast("Maximum load is " + STUDY_RULES.maxUnits + " units", "err");
            if (!window.confirm("Confirm registration of " + codes.length + " courses (" + units +
                " units) for " + PORTAL.term + " " + PORTAL.session + "?\n\nThis cannot be edited from the portal afterwards.")) return;
            Store.setRegistration(student.id, codes, true);
            toast("Course registration confirmed");
            rerender();
        });
    }

    /* ---------------------------------------------------------
       view: timetable
       --------------------------------------------------------- */

    function viewTimetable(student, ctx) {
        if (!ctx.timetable.length) {
            return '<div class="view-head"><h2>Timetable</h2><p>Register courses to generate your timetable.</p></div>' +
                '<div class="p-card pad-lg">' + emptyState("fa-table-cells", "No timetable yet",
                    "Once you register courses for " + PORTAL.term + " your lecture and practical slots will appear here.") + "</div>";
        }

        const slots = LECTURE_SLOTS;
        let html = '<div class="p-grid g4" style="margin-bottom:16px">' +
            tile("fa-calendar-week", "", String(ctx.registration.length), "Courses", student.level + " Level") +
            tile("fa-clock", "blue", String(ctx.registration.reduce(function (t, c) { return t + COURSE_MAP[c].unit * 3; }, 0)) + "h",
                "Contact hours", "3 hours per unit") +
            tile("fa-location-dot", "violet", String(new Set(ctx.timetable.map(function (t) { return t.venue; })).size),
                "Venues in use", "Lecture rooms and laboratories") +
            tile("fa-user-tie", "amber", String(new Set(ctx.timetable.map(function (t) { return t.lecturer; })).size),
                "Lecturers", "Departmental staff") +
            "</div>";

        html += '<div class="p-card pad-lg" style="margin-bottom:16px">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-table-cells"></i> Weekly lecture grid &mdash; ' +
            esc(PORTAL.term) + "</h3>" +
            '<div style="display:flex;gap:8px"><button type="button" class="p-btn ghost sm" id="ttPrint"><i class="fa-solid fa-print"></i> Print</button>' +
            '<button type="button" class="p-btn ghost sm" id="ttDownload"><i class="fa-solid fa-file-arrow-down"></i> Download</button></div></div>' +
            '<div style="overflow-x:auto"><div class="tt-grid">' +
            '<div class="tt-cell head">Time</div>' +
            WEEK_DAYS.map(function (d) { return '<div class="tt-cell head">' + esc(d) + "</div>"; }).join("") +
            slots.map(function (s) {
                const cells = WEEK_DAYS.map(function (day) {
                    const hit = ctx.timetable.filter(function (t) { return t.day === day && t.start === s.start; })[0];
                    if (!hit) return '<div class="tt-cell"></div>';
                    return '<div class="tt-cell has-class" data-code="' + esc(hit.code) + '">' +
                        "<b>" + esc(hit.code) + "</b><span>" + esc(hit.title.slice(0, 34)) + "</span>" +
                        "<em>" + esc(hit.venue) + "</em></div>";
                }).join("");
                return '<div class="tt-cell time">' + esc(s.start) + "</div>" + cells;
            }).join("") +
            "</div></div></div>";

        html += '<div class="p-card pad-lg">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-list"></i> Course and lecturer details</h3></div>' +
            '<div class="table-wrap"><table class="p-table"><thead><tr>' +
            "<th>Code</th><th>Course title</th><th>Type</th><th>Lecturer</th><th>Day</th><th>Time</th><th>Venue</th>" +
            "</tr></thead><tbody>" +
            ctx.timetable.map(function (t) {
                return "<tr><td class='strong'>" + esc(t.code) + "</td><td>" + esc(t.title) + "</td>" +
                    "<td><span class='tag " + (t.type === "Service" ? "grey" : t.type === "Elective" ? "violet" : "") + "'>" +
                    esc(t.type) + "</span></td><td>" + esc(t.lecturer) + "</td><td>" + esc(t.day) + "</td>" +
                    "<td>" + esc(t.start) + " &ndash; " + esc(t.end) + "</td><td class='strong'>" + esc(t.venue) + "</td></tr>";
            }).join("") +
            "</tbody></table></div></div>";

        return html;
    }

    function wireTimetable(ctx) {
        $("#ttPrint").addEventListener("click", function () { window.print(); });
        $("#ttDownload").addEventListener("click", function () {
            const lines = ["UNIVERSITY OF IFEWARA", "LECTURE TIMETABLE - " + PORTAL.term + " " + PORTAL.session, ""];
            lines.push("Code\tCourse\tDay\tStart\tEnd\tVenue");
            ctx.timetable.forEach(function (t) {
                lines.push([t.code, t.title, t.day, t.start, t.end, t.venue].join("\t"));
            });
            downloadText("unifewara-timetable-" + ctx.student.id.replace(/\//g, "-") + ".txt", lines.join("\n"));
            toast("Timetable downloaded");
        });
    }

    /* ---------------------------------------------------------
       view: results & transcript
       --------------------------------------------------------- */

    function viewResults(student, ctx) {
        if (!ctx.record.length) {
            return '<div class="view-head"><h2>Results &amp; Transcript</h2>' +
                "<p>No results have been published for your programme yet.</p></div>" +
                '<div class="p-card pad-lg">' + emptyState("fa-chart-simple", "No results published",
                    "Continuous assessment scores appear here after the first ca. release, and end-of-term results appear after the examinations are marked.") + "</div>";
        }

        const last = ctx.record[ctx.record.length - 1];
        const cumulative = ctx.record.reduce(function (t, l) { return t + l.units; }, 0);
        const passedUnits = ctx.record.reduce(function (t, l) {
            return t + l.rows.filter(function (r) { return r.grade !== "F"; }).reduce(function (s, r) { return s + r.unit; }, 0);
        }, 0);

        let html = '<div class="view-head"><h2>Results &amp; Transcript</h2>' +
            "<p>Continuous assessment is weighted " + CA_WEIGHT + " marks and the end-of-term examination " +
            EXAM_WEIGHT + " marks. A CGPA below 2.00 is not classifiable at the end of a programme.</p></div>" +

            '<div class="p-grid g4" style="margin-bottom:16px">' +
            tile("fa-award", "", ctx.cgpa.toFixed(2), "Cumulative GPA", "Scale of 5.00") +
            tile("fa-layer-group", "blue", String(cumulative), "Units completed", passedUnits + " units passed") +
            tile("fa-percent", "violet", last.band.label, "Class of degree", last.band.note) +
            tile("fa-book-open", ctx.record.length === 1 ? "amber" : "",
                String(ctx.record.length) + " of " + Math.ceil((student.level / 100)), "Levels completed", "Current: " + student.level + " Level") +
            "</div>" +

            '<div class="p-card pad-lg" style="margin-bottom:16px">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-layer-group"></i> Performance by level</h3></div>' +
            ctx.record.slice().reverse().map(function (l) {
                const pct = (l.gpa / 5) * 100;
                return '<div class="bar-row" style="margin-bottom:11px"><span style="width:88px;color:var(--ink-2);font-weight:700">' +
                    esc(l.label) + '</span><span class="bar' + (l.gpa < 2 ? " red" : l.gpa < 3.5 ? " amber" : "") +
                    '"><i style="width:' + pct.toFixed(1) + '%"></i></span>' +
                    '<span class="bv">GPA ' + l.gpa.toFixed(2) + "</span>" +
                    '<span class="tag ' + (l.gpa >= 3.5 ? "" : l.gpa >= 2 ? "amber" : "red") + '" style="width:150px;text-align:center">' +
                    esc(l.band.label) + "</span></div>";
            }).join("") +
            "</div>";

        html += '<div class="p-card pad-lg" style="margin-bottom:16px">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-table-list"></i> Detailed results</h3>' +
            '<div style="display:flex;gap:8px"><button type="button" class="p-btn ghost sm" id="resPrint"><i class="fa-solid fa-print"></i> Print transcript</button>' +
            '<button type="button" class="p-btn ghost sm" id="resDownload"><i class="fa-solid fa-file-arrow-down"></i> Download</button></div></div>' +
            '<div class="chip-row" style="margin-bottom:16px">' +
            ctx.record.map(function (l, i) {
                return '<button type="button" class="p-btn ghost sm lvl-tab" data-level="' + l.level + '"' +
                    (i === ctx.record.length - 1 ? " style=\"background:var(--green-700);color:#fff;border-color:var(--green-700)\"" : "") +
                    ">" + esc(l.label) + " &middot; " + l.gpa.toFixed(2) + "</button>";
            }).join("") +
            "</div>" +
            '<div id="resultPanels">' +
            ctx.record.map(function (l, i) {
                return '<div class="level-panel" data-level="' + l.level + '"' + (i === ctx.record.length - 1 ? "" : " style=\"display:none\"") + ">" +
                    resultTable(l) + "</div>";
            }).join("") +
            "</div></div>";

        html += '<div class="p-grid g2">' +
            '<div class="p-card"><h3><i class="fa-solid fa-ruler"></i> Grading scale</h3>' +
            '<div class="table-wrap" style="margin-top:10px"><table class="p-table"><thead><tr>' +
            "<th>Grade</th><th>Points</th><th>Range</th><th>Remark</th></tr></thead><tbody>" +
            GRADE_SCALE.map(function (g) {
                return '<tr><td><span class="grade-badge g-' + esc(g.grade) + '">' + esc(g.grade) + "</span></td>" +
                    "<td class='num'>" + g.points + "</td><td class='num'>" + g.min + " &ndash; " + (g.min + 9) +
                    "</td><td>" + esc(g.remark) + "</td></tr>";
            }).join("") +
            "</tbody></table></div></div>" +
            '<div class="p-card"><h3><i class="fa-solid fa-scale-balanced"></i> Classification bands</h3>' +
            '<div class="table-wrap" style="margin-top:10px"><table class="p-table"><thead><tr>' +
            "<th>Class</th><th>Minimum GPA</th><th>Interpretation</th></tr></thead><tbody>" +
            CLASS_BANDS.map(function (b) {
                return "<tr><td class='strong'>" + esc(b.label) + "</td><td class='num'>" + b.min.toFixed(2) +
                    "</td><td>" + esc(b.note) + "</td></tr>";
            }).join("") +
            "</tbody></table></div>" +
            '<p style="font-size:11.5px;color:var(--muted);margin-top:12px;line-height:1.6">A student who carries any failed unit is classified ' +
            "<b>Provisional</b> until the unit is passed, at the next sitting.</p></div>" +
            "</div>";

        return html;
    }

    function resultTable(level) {
        const units = level.rows.reduce(function (t, r) { return t + r.unit; }, 0);
        const points = level.rows.reduce(function (t, r) { return t + r.points * r.unit; }, 0);
        return '<div class="table-wrap"><table class="p-table"><thead><tr>' +
            "<th>Code</th><th>Course title</th><th>Unit</th><th>Type</th>" +
            '<th class="num">CA (' + CA_WEIGHT + ')</th><th class="num">Exam (' + EXAM_WEIGHT + ')</th>' +
            '<th class="num">Total</th><th>Grade</th><th>Points</th><th>Remark</th>' +
            "</tr></thead><tbody>" +
            level.rows.map(function (r) {
                return "<tr><td class='strong'>" + esc(r.code) + "</td><td>" + esc(r.title) + "</td>" +
                    "<td class='num'>" + r.unit + "</td>" +
                    "<td><span class='tag " + (r.type === "Service" ? "grey" : r.type === "Elective" ? "violet" : "") + "'>" +
                    esc(r.type) + "</span></td>" +
                    "<td class='num'>" + r.ca + "</td><td class='num'>" + r.exam + "</td>" +
                    "<td class='num strong'>" + r.total + "</td>" +
                    "<td><span class='grade-badge g-" + esc(r.grade) + "'>" + esc(r.grade) + "</span></td>" +
                    "<td class='num'>" + r.points + "</td><td>" + esc(r.remark) + "</td></tr>";
            }).join("") +
            "</tbody><tfoot><tr><td colspan='2'>Level total</td><td class='num'>" + units + "</td><td></td>" +
            "<td></td><td></td><td></td><td></td>" +
            "<td class='num'>" + points + "</td><td>GPA " + level.gpa.toFixed(2) + "</td></tr></tfoot></table></div>";
    }

    function wireResults(student, ctx) {
        $$(".lvl-tab").forEach(function (btn) {
            btn.addEventListener("click", function () {
                const lvl = btn.getAttribute("data-level");
                $$(".lvl-tab").forEach(function (b) { b.removeAttribute("style"); });
                btn.setAttribute("style", "background:var(--green-700);color:#fff;border-color:var(--green-700)");
                $$(".level-panel").forEach(function (p) {
                    p.style.display = p.getAttribute("data-level") === lvl ? "" : "none";
                });
            });
        });
        $("#resPrint").addEventListener("click", function () { window.print(); });
        $("#resDownload").addEventListener("click", function () {
            const lines = [
                "UNIVERSITY OF IFEWARA",
                "ACADEMIC TRANSCRIPT",
                "Student: " + student.name,
                "Matriculation number: " + student.matric,
                "Programme: " + student.programme,
                "Session: " + PORTAL.session,
                "CGPA: " + ctx.cgpa.toFixed(2) + " of 5.00",
                ""
            ];
            ctx.record.forEach(function (l) {
                lines.push(l.label.toUpperCase() + "   GPA " + l.gpa.toFixed(2) + "   " + l.band.label);
                lines.push("CODE\tCOURSE\tUNIT\tCA\tEXAM\tTOTAL\tGRADE\tPOINTS");
                l.rows.forEach(function (r) {
                    lines.push([r.code, r.title, r.unit, r.ca, r.exam, r.total, r.grade, r.points].join("\t"));
                });
                lines.push("");
            });
            lines.push("This is a demonstration transcript generated by the UNIFEWARA student portal.");
            downloadText("unifewara-transcript-" + student.matric.replace(/\//g, "-") + ".txt", lines.join("\n"));
            toast("Transcript downloaded");
        });
    }

    /* ---------------------------------------------------------
       view: fees
       --------------------------------------------------------- */

    function viewFees(student, ctx) {
        const pct = ctx.feeTotal ? Math.round((ctx.feePaid / ctx.feeTotal) * 100) : 0;
        const paid = ctx.fees.filter(function (f) { return f.paid; });
        const due = ctx.fees.filter(function (f) { return !f.paid; });

        return '' +
            '<div class="view-head"><h2>Fees &amp; Payments</h2>' +
            "<p>Bill breakdown for " + esc(PORTAL.session) + ". Payments are recorded against your matriculation number and a receipt reference is issued immediately.</p></div>" +

            '<div class="p-grid g4" style="margin-bottom:16px">' +
            tile("fa-file-invoice", "blue", money(ctx.feeTotal), "Total bill", PORTAL.session) +
            tile("fa-circle-check", "", money(ctx.feePaid), "Paid to date", paid.length + " of " + ctx.fees.length + " items") +
            tile("fa-hourglass-half", ctx.feeOutstanding ? "amber" : "", money(ctx.feeOutstanding), "Outstanding", due.length + (due.length === 1 ? " item pending" : " items pending")) +
            tile("fa-percent", "violet", pct + "%", "Payment progress", "Instalment plan available") +
            "</div>" +

            '<div class="p-card pad-lg" style="margin-bottom:16px">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-chart-pie"></i> Settlement progress</h3></div>' +
            '<div class="bar-row" style="margin-bottom:10px"><span class="bar' +
            (pct < 100 ? " amber" : "") + '"><i style="width:' + pct + '%"></i></span>' +
            '<span class="bv">' + money(ctx.feePaid) + " / " + money(ctx.feeTotal) + "</span></div>" +
            (ctx.feeOutstanding
                ? '<div class="p-alert warn" style="margin:16px 0 0"><i class="fa-solid fa-circle-info"></i><span>You have <b>' +
                  money(ctx.feeOutstanding) + "</b> outstanding. Course registration and examination card issuance are blocked until at least 60% is settled.</span></div>"
                : '<div class="p-alert ok" style="margin:16px 0 0"><i class="fa-solid fa-circle-check"></i><span>Your account is fully settled for ' +
                  esc(PORTAL.session) + ". No further action is required.</span></div>") +
            '<div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">' +
            '<button type="button" class="p-btn gold" id="payAll"' + (ctx.feeOutstanding ? "" : " disabled") + '><i class="fa-solid fa-money-bill-wave"></i> Pay all outstanding</button>' +
            '<button type="button" class="p-btn ghost" id="payInstalment"' + (ctx.feeOutstanding >= 50000 ? "" : " disabled") + '><i class="fa-solid fa-calendar-week"></i> Pay half instalment</button>' +
            "</div>" +
            '<p style="font-size:11.5px;color:var(--muted);margin-top:12px;line-height:1.6">Demonstration portal: payments are simulated and no money moves. ' +
            "In production this view would redirect to a PCI-DSS compliant payment gateway.</p>" +
            "</div>" +

            '<div class="p-card pad-lg">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-list-ul"></i> Bill items</h3>' +
            '<div class="chip-row"><button type="button" class="p-btn ghost sm" data-fees-filter="all">All ' + ctx.fees.length + "</button>" +
            '<button type="button" class="p-btn ghost sm" data-fees-filter="due">Outstanding ' + due.length + "</button>" +
            '<button type="button" class="p-btn ghost sm" data-fees-filter="paid">Settled ' + paid.length + "</button></div></div>" +
            '<div class="table-wrap"><table class="p-table" id="feeTable"><thead><tr>' +
            "<th>Code</th><th>Item</th><th class='num'>Amount</th><th>Status</th><th>Date paid</th><th>Receipt</th><th></th>" +
            "</tr></thead><tbody>" +
            ctx.fees.map(function (f) {
                return '<tr data-state="' + (f.paid ? "paid" : "due") + '">' +
                    "<td class='strong'>" + esc(f.code) + "</td><td>" + esc(f.name) + "</td>" +
                    "<td class='num strong'>" + money(f.amount) + "</td>" +
                    "<td><span class='tag " + (f.paid ? "" : "amber") + "'>" + (f.paid ? "Settled" : "Outstanding") + "</span></td>" +
                    "<td>" + esc(f.paid ? fmtDate(f.paidOn) : "—") + "</td>" +
                    "<td><span style='font-family:ui-monospace,Consolas,monospace;font-size:11.5px;color:var(--muted)'>" +
                    esc(f.paid ? f.reference : "—") + "</span></td>" +
                    "<td>" + (f.paid
                        ? "<button type='button' class='p-btn ghost sm' data-receipt='" + esc(f.reference) + "'><i class='fa-solid fa-file-arrow-down'></i> Receipt</button>"
                        : "<button type='button' class='p-btn sm' data-pay='" + esc(f.code) + "'>Pay</button>") + "</td></tr>";
            }).join("") +
            "</tbody><tfoot><tr><td colspan='2'>Total</td><td class='num'>" + money(ctx.feeTotal) + "</td>" +
            "<td colspan='2'>Outstanding balance</td><td class='num'>" + money(ctx.feeOutstanding) + "</td><td></td></tr></tfoot></table></div>" +
            "</div>";
    }

    function wireFees(student, ctx) {
        const table = $("#feeTable");

        $$("[data-fees-filter]").forEach(function (b) {
            b.addEventListener("click", function () {
                const mode = b.getAttribute("data-fees-filter");
                $$("[data-fees-filter]").forEach(function (x) { x.classList.remove("gold"); });
                b.classList.add("gold");
                $$("tr[data-state]", table).forEach(function (tr) {
                    tr.style.display = mode === "all" || tr.getAttribute("data-state") === mode ? "" : "none";
                });
            });
        });

        table.addEventListener("click", function (e) {
            const pay = e.target.closest("[data-pay]");
            const rec = e.target.closest("[data-receipt]");
            if (pay) {
                const code = pay.getAttribute("data-pay");
                const line = ctx.fees.filter(function (f) { return f.code === code; })[0];
                if (!line) return;
                if (!window.confirm("Pay " + money(line.amount) + " for " + line.name + "?\n\nThis is a simulated payment.")) return;
                payFees(student, [code]);
                return;
            }
            if (rec) {
                const ref = rec.getAttribute("data-receipt");
                const line = ctx.fees.filter(function (f) { return f.reference === ref; })[0];
                if (line) downloadReceipt(student, line);
            }
        });

        $("#payAll").addEventListener("click", function () {
            const codes = ctx.fees.filter(function (f) { return !f.paid; }).map(function (f) { return f.code; });
            if (!codes.length) return;
            if (!window.confirm("Pay the full outstanding balance of " + money(ctx.feeOutstanding) + "?")) return;
            payFees(student, codes);
        });

        $("#payInstalment").addEventListener("click", function () {
            const due = ctx.fees.filter(function (f) { return !f.paid; });
            let budget = Math.floor(ctx.feeOutstanding / 2);
            const codes = [];
            due.forEach(function (f) {
                if (budget - f.amount >= 0) { codes.push(f.code); budget -= f.amount; }
            });
            if (!codes.length) return toast("No single item fits within the instalment amount", "warn");
            if (!window.confirm("Pay " + codes.length + " item(s) totalling " +
                money(codes.reduce(function (t, c) { return t + ctx.fees.filter(function (f) { return f.code === c; })[0].amount; }, 0)) + "?")) return;
            payFees(student, codes);
        });
    }

    function payFees(student, codes) {
        const paidRef = Store.getProfileEdits(student.id).paidFees || {};
        const lines = portalFeeLines(student);
        const today = PORTAL.today;
        codes.forEach(function (code) {
            const line = lines.filter(function (f) { return f.code === code; })[0];
            if (!line) return;
            paidRef[code] = {
                paid: true,
                paidOn: today,
                reference: "RCT/" + PORTAL.session.replace("/", "") + "/" +
                    portalHash(student.id + code + today).toString(36).toUpperCase().slice(0, 7)
            };
        });
        Store.setProfileEdits(student.id, { paidFees: paidRef });
        toast(codes.length + " item(s) settled — receipt(s) issued");
        rerender();
    }

    function downloadReceipt(student, line) {
        const body = [
            "UNIVERSITY OF IFEWARA, IFEWARA, OSUN STATE",
            "BURSARY - PAYMENT RECEIPT",
            "",
            "Receipt reference : " + line.reference,
            "Date of payment   : " + fmtDate(line.paidOn),
            "Student           : " + student.name,
            "Matriculation no. : " + student.matric,
            "Programme         : " + student.programme,
            "Session           : " + PORTAL.session,
            "",
            "ITEM                             AMOUNT",
            line.name + " (" + line.code + ")" + " ".repeat(Math.max(1, 38 - line.name.length - line.code.length - 3)) + money(line.amount),
            "",
            "TOTAL PAID                     " + money(line.amount),
            "",
            "This is a demonstration receipt generated by the UNIFEWARA student portal."
        ].join("\n");
        downloadText(line.reference + ".txt", body);
        toast("Receipt " + line.reference + " downloaded");
    }

    /* ---------------------------------------------------------
       view: hostel
       --------------------------------------------------------- */

    function viewHostel(student, ctx) {
        const h = ctx.hostel;

        if (!h.allocated) {
            const requests = Store.getProfileEdits(student.id).hostelRequest;
            return '' +
                '<div class="view-head"><h2>Hostel &amp; Accommodation</h2>' +
                "<p>You have no hall allocation for " + esc(PORTAL.session) +
                ". Submit a request below and the hostel management committee will allocate within seven working days.</p></div>" +

                (requests
                    ? '<div class="p-alert ok"><i class="fa-solid fa-clipboard-check"></i><span>Request submitted on <b>' +
                      esc(fmtDate(requests.date)) + "</b> &mdash; reference " + esc(requests.reference) +
                      ". Your preference has been recorded. Allocation is confirmed through this portal.</span></div>"
                    : "") +

                '<div class="p-grid g2" style="align-items:start">' +
                '<div class="p-card pad-lg">' +
                '<h3><i class="fa-solid fa-door-open"></i> Allocation request</h3>' +
                '<p class="card-sub">Halls are allocated by gender, level and payment status.</p>' +
                '<form id="hostelForm" novalidate>' +
                field("Preferred hall", "select", "hostelHall",
                    HALLS.filter(function (x) { return x.gender === student.gender || x.gender === "Mixed"; })
                        .map(function (x) { return '<option value="' + esc(x.code) + '">' + esc(x.name) + " (" + esc(x.gender) + ")</option>"; }).join(""),
                    true) +
                field("Bed preference", "select", "hostelBed",
                    "<option>Lower bunk</option><option>Upper bunk</option><option>No preference</option>") +
                field("Medical or accessibility need", "textarea", "hostelNote", "",
                    "Leave blank if none. Supporting documents are requested by the clinic.") +
                '<div class="p-alert info" style="margin:0 0 14px"><i class="fa-solid fa-circle-info"></i><span>Hall fees are part of your ' +
                esc(PORTAL.session) + " bill. Payment is required before a key card is issued.</span></div>" +
                '<button type="submit" class="p-btn block"' + (requests ? " disabled" : "") + '><i class="fa-solid fa-paper-plane"></i> ' +
                (requests ? "Request already submitted" : "Submit allocation request") + "</button>" +
                "</form></div>" +

                '<div class="p-card pad-lg"><h3><i class="fa-solid fa-building-columns"></i> Available halls</h3>' +
                hallRows(HALLS.filter(function (x) { return x.gender === student.gender || x.gender === "Mixed"; })) +
                "</div></div>";
        }

        return '' +
            '<div class="view-head"><h2>Hostel &amp; Accommodation</h2>' +
            "<p>Your accommodation for " + esc(PORTAL.session) + ". The allocation is renewed automatically until you graduate or withdraw.</p></div>" +

            '<div class="p-grid g4" style="margin-bottom:16px">' +
            tile("fa-bed", "", h.hall.name, "Hall", h.block + " &middot; " + h.hall.roomType) +
            tile("fa-door-open", "blue", h.room, "Room number", h.hall.code + " block") +
            tile("fa-arrow-up-down", "violet", h.bed, "Bed position", h.keyCard) +
            tile("fa-money-bill", "amber", money(h.hall.rent), "Annual rent", "Included in your " + PORTAL.session + " bill") +
            "</div>" +

            '<div class="p-grid g2" style="align-items:start">' +
            '<div class="p-card pad-lg">' +
            '<h3><i class="fa-solid fa-address-card"></i> Allocation details</h3>' +
            '<div class="kv" style="margin-top:10px">' +
            kv("Hall", h.hall.name) +
            kv("Block", h.block) +
            kv("Room", h.room) +
            kv("Bed", h.bed) +
            kv("Room type", h.hall.roomType) +
            kv("Session", h.session) +
            kv("Occupied since", fmtDate(h.since)) +
            kv("Key card number", h.keyCard) +
            "</div>" +
            '<div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">' +
            '<button type="button" class="p-btn ghost sm" id="hostelLetter"><i class="fa-solid fa-file-arrow-down"></i> Allocation letter</button>' +
            '<button type="button" class="p-btn ghost sm" id="hostelPrint"><i class="fa-solid fa-print"></i> Print</button>' +
            "</div>" +
            '<h3 style="margin-top:22px"><i class="fa-solid fa-wifi"></i> In-hall facilities</h3>' +
            '<div class="chip-row" style="margin-top:10px">' +
            h.hall.facilities.map(function (f) { return '<span class="tag">' + esc(f) + "</span>"; }).join("") +
            "</div></div>" +

            '<div class="p-card pad-lg"><h3><i class="fa-solid fa-screwdriver-wrench"></i> Maintenance requests</h3>' +
            '<p class="card-sub">Log a fault in your room or a common area.</p>' +
            '<div class="mini-list" style="margin-bottom:14px">' +
            MAINTENANCE_TICKETS.map(function (t) {
                return '<div class="mini-item"><i class="fa-solid fa-screwdriver-wrench" style="color:var(--green-600)"></i>' +
                    '<div class="mi-main"><b>' + esc(t.detail) + "</b><span>" + esc(t.unit) + " &middot; " + esc(t.id) + "</span></div>" +
                    '<div class="mi-side"><span class="tag ' + (t.status === "Resolved" ? "" : t.status === "In progress" ? "amber" : "blue") + '">' +
                    esc(t.status) + "</span><span>" + esc(fmtDate(t.raised)) + "</span></div></div>";
            }).join("") +
            "</div>" +
            '<form id="maintForm" novalidate>' +
            field("Category", "select", "maintUnit", "<option>Electrical</option><option>Plumbing</option><option>Carpentry</option><option>Cleaning</option><option>Security</option>") +
            field("Describe the fault", "textarea", "maintDetail", "", "Be as specific as possible to speed up the repair.") +
            '<button type="submit" class="p-btn block"><i class="fa-solid fa-plus"></i> Log a request</button>' +
            "</form></div></div>";
    }

    function hallRows(halls) {
        return '<div class="mini-list">' + halls.map(function (x) {
            const free = Math.round(x.rooms * (1 - x.occupancy));
            return '<div class="mini-item">' +
                '<div class="stat-ico" style="width:36px;height:36px;font-size:12px"><i class="fa-solid fa-building-columns"></i></div>' +
                '<div class="mi-main"><b>' + esc(x.name) + "</b><span>" + esc(x.block) + " &middot; " +
                esc(x.roomType) + " &middot; " + esc(x.gender) + "</span></div>" +
                '<div class="mi-side"><b>' + money(x.rent) + "</b><span>" + free + " rooms free</span></div></div>";
        }).join("") + "</div>";
    }

    function wireHostel(student, ctx) {
        const requestForm = $("#hostelForm");
        if (requestForm) {
            requestForm.addEventListener("submit", function (e) {
                e.preventDefault();
                if (!validateForm(requestForm)) return;
                const ref = "HR/" + PORTAL.session.replace("/", "") + "/" +
                    portalHash(student.id + Date.now()).toString(36).toUpperCase().slice(0, 6);
                Store.setProfileEdits(student.id, {
                    hostelRequest: {
                        reference: ref,
                        hall: $("#hostelHall").value,
                        bed: $("#hostelBed").value,
                        note: $("#hostelNote").value.trim(),
                        date: PORTAL.today
                    }
                });
                toast("Allocation request " + ref + " submitted");
                rerender();
            });
        }

        const maint = $("#maintForm");
        if (maint) {
            maint.addEventListener("submit", function (e) {
                e.preventDefault();
                if (!validateForm(maint)) return;
                toast("Maintenance request logged with the hall office");
                maint.reset();
            });
        }

        if ($("#hostelPrint")) $("#hostelPrint").addEventListener("click", function () { window.print(); });
        if ($("#hostelLetter")) $("#hostelLetter").addEventListener("click", function () {
            const h = ctx.hostel;
            downloadText("hostel-allocation-" + student.matric.replace(/\//g, "-") + ".txt", [
                "UNIVERSITY OF IFEWARA",
                "HOSTEL ALLOCATION LETTER - " + PORTAL.session,
                "",
                "Dear " + student.name + ",",
                "",
                "You have been allocated the following accommodation for the " + PORTAL.session + " session:",
                "",
                "Hall        : " + h.hall.name,
                "Block       : " + h.block,
                "Room        : " + h.room,
                "Bed         : " + h.bed,
                "Key card    : " + h.keyCard,
                "Annual rent : " + money(h.hall.rent),
                "",
                "Resident welfare rules apply. Report faults through the portal.",
                "",
                "Hostel Management Committee, University of Ifewara"
            ].join("\n"));
            toast("Allocation letter downloaded");
        });
    }

    /* ---------------------------------------------------------
       view: library & research
       --------------------------------------------------------- */

    function viewLibrary(student, ctx) {
        const edits = Store.getLoanEdits(student.id);
        const loans = ctx.loans.map(function (l) {
            const e = edits[l.ref] || {};
            return Object.assign({}, l, e);
        });
        const open = loans.filter(function (l) { return !l.returned; });
        const fines = open.reduce(function (t, l) { return t + (l.fine || 0); }, 0);
        const maxRenewals = {};

        return '' +
            '<div class="view-head"><h2>Library &amp; Research</h2>' +
            "<p>Borrowed items, catalogue search, penalties and the institutional repository. Loans run for " +
            (student.level >= 400 ? "21" : "14") + " days for students at 400 Level and above.</p></div>" +

            '<div class="p-grid g4" style="margin-bottom:16px">' +
            tile("fa-book", "", String(open.length), "Items on loan", "Limit: 4 concurrent items") +
            tile("fa-clock-rotate-left", "blue", String(loans.filter(function (l) { return l.returned; }).length), "Returned", "Lifetime of this account") +
            tile("fa-coins", fines ? "red" : "", money(fines), "Outstanding penalties", fines ? "Blocks borrowing" : "Clear to borrow") +
            tile("fa-id-card", "violet", "LIB-" + portalHash(student.id).toString(36).toUpperCase().slice(0, 6), "Library card", "Issued by the University Library") +
            "</div>" +

            (fines ? '<div class="p-alert err"><i class="fa-solid fa-circle-exclamation"></i><span>You owe <b>' +
                money(fines) + "</b> in lending penalties. Settle this at the library circulation desk to restore borrowing rights.</span></div>" : "") +

            '<div class="p-grid g2" style="align-items:start;margin-bottom:16px">' +
            '<div class="p-card pad-lg">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-book-reader"></i> My loans</h3>' +
            '<span class="tag">' + open.length + " of 4 in use</span></div>" +
            (loans.length
                ? '<div class="table-wrap"><table class="p-table"><thead><tr>' +
                  "<th>Title</th><th>Borrowed</th><th>Due</th><th>Status</th><th>Fine</th><th></th></tr></thead><tbody>" +
                  loans.map(function (l) {
                    const late = l.returned ? 0 : Math.max(0, portalDaysBetween(l.due, PORTAL.today));
                    const status = l.returned ? "Returned" : late > 0 ? "Overdue " + late + "d" : "On loan";
                    return "<tr><td><b style='color:var(--ink)'>" + esc(l.title) + "</b><br><span style='font-size:11.5px;color:var(--muted)'>" +
                      esc(l.author) + " &middot; " + esc(l.acc) + "</span></td>" +
                      "<td>" + esc(fmtDate(l.borrowed)) + "</td><td>" + esc(fmtDate(l.due)) + "</td>" +
                      "<td><span class='tag " + (l.returned ? "" : late > 0 ? "red" : "blue") + "'>" + esc(status) + "</span></td>" +
                      "<td class='num'>" + (l.fine ? "<b style='color:var(--danger)'>" + money(l.fine) + "</b>" : "—") + "</td>" +
                      "<td>" + (l.returned
                        ? "<span style='color:var(--muted);font-size:11.5px'>" + esc(fmtDate(l.returned)) + "</span>"
                        : "<div style='display:flex;gap:5px'><button type='button' class='p-btn ghost sm' data-renew='" + esc(l.ref) + "'>Renew</button>" +
                          "<button type='button' class='p-btn sm' data-ret='" + esc(l.ref) + "'>Return</button></div>") +
                      "</td></tr>";
                  }).join("") + "</tbody></table></div>"
                : emptyState("fa-book", "No items on loan", "Search the catalogue below and borrow your first item.")) +
            "</div>" +

            '<div class="p-card pad-lg">' +
            '<h3><i class="fa-solid fa-magnifying-glass"></i> Catalogue search</h3>' +
            '<p class="card-sub">Search by title, author or shelf mark.</p>' +
            '<div style="position:relative;margin-bottom:12px">' +
            '<input type="search" id="catSearch" placeholder="e.g. algorithms, hydrology, Cormen…" ' +
            'style="width:100%;padding:11px 13px 11px 36px;border:1px solid var(--line);border-radius:9px;font:inherit;font-size:13.5px">' +
            '<i class="fa-solid fa-magnifying-glass" style="position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:12.5px"></i>' +
            "</div>" +
            '<div id="catResults">' + catalogueRows(LIBRARY_BOOKS) + "</div>" +
            "</div></div>" +

            '<div class="p-card pad-lg">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-flask"></i> Institutional repository</h3>' +
            '<span class="link" id="repoToggle">Show all</span></div>' +
            '<p class="card-sub">Peer-reviewed output, theses and conference papers by University of Ifewara academics.</p>' +
            '<div class="table-wrap"><table class="p-table" id="repoTable"><thead><tr>' +
            "<th>Title</th><th>Author</th><th>Department</th><th>Type</th><th>Year</th><th class='num'>Views</th><th></th>" +
            "</tr></thead><tbody>" +
            RESEARCH_REPOSITORY.map(function (r) {
                return "<tr><td><b style='color:var(--ink)'>" + esc(r.title) + "</b><br>" +
                  "<span style='font-size:11.5px;color:var(--muted)'>" + esc(r.venue) + "</span></td>" +
                  "<td>" + esc(r.author) + "</td>" +
                  "<td><span class='tag'>" + esc(r.dept) + "</span></td>" +
                  "<td>" + esc(r.type) + "</td><td class='num'>" + r.year + "</td>" +
                  "<td class='num'>" + r.views + "</td>" +
                  "<td><button type='button' class='p-btn ghost sm' data-repo='" + esc(r.file) + "'>View</button></td></tr>";
            }).join("") + "</tbody></table></div>" +
            '<p style="font-size:11.5px;color:var(--muted);margin-top:12px">Repository records are indexed by department. ' +
            "You are browsing as a member of the " + esc(ctx.school ? ctx.school.name : "University") + " community.</p>" +
            "</div>";
    }

    function catalogueRows(books, filter) {
        const list = filter
            ? books.filter(function (b) {
                const hay = (b.title + " " + b.author + " " + b.shelf + " " + b.subject).toLowerCase();
                return hay.indexOf(filter.toLowerCase()) !== -1;
            })
            : books;
        if (!list.length) return emptyState("fa-magnifying-glass", "No match", "Try a different title, author or shelf mark.");
        return '<div class="mini-list">' + list.map(function (b) {
            const free = b.copies - b.taken;
            return '<div class="mini-item">' +
                '<div class="stat-ico" style="width:36px;height:36px;font-size:12px"><i class="fa-solid fa-book"></i></div>' +
                '<div class="mi-main"><b>' + esc(b.title) + "</b><span>" + esc(b.author) + " &middot; " +
                esc(b.edition) + " ed. &middot; " + b.year + "</span><span>Shelf " + esc(b.shelf) + "</span></div>" +
                '<div class="mi-side"><b>' + (free ? free + " of " + b.copies : "On shelf") + "</b>" +
                "<span>" + (free ? "available" : "copy available") + "</span></div></div>";
        }).join("") + "</div>";
    }

    function wireLibrary(student, ctx) {
        const search = $("#catSearch");
        if (search) {
            search.addEventListener("input", function () {
                $("#catResults").innerHTML = catalogueRows(LIBRARY_BOOKS, search.value.trim());
            });
        }

        $("#catResults").addEventListener("click", function (e) {
            const btn = e.target.closest("button");
            if (btn) toast("Borrowing is handled at the circulation desk in the live system");
        });

        const body = $("#portalView");
        body.addEventListener("click", function (e) {
            const renew = e.target.closest("[data-renew]");
            const ret = e.target.closest("[data-ret]");
            const repo = e.target.closest("[data-repo]");
            if (renew) {
                const ref = renew.getAttribute("data-renew");
                const loan = ctx.loans.filter(function (l) { return l.ref === ref; })[0];
                if (!loan) return;
                if ((loan.renewals || 0) >= 2) return toast("This item has already been renewed twice - please return it", "warn");
                const nextDue = portalShiftDate(loan.due, loan.period || portalLoanPeriod(student));
                const patch = {};
                patch[ref] = { due: nextDue, fine: 0, renewals: (loan.renewals || 0) + 1 };
                Store.setLoanEdits(student.id, patch);
                toast("Loan renewed — new due date " + fmtDate(nextDue));
                rerender();
            }
            if (ret) {
                const ref = ret.getAttribute("data-ret");
                const patch = {};
                patch[ref] = { returned: PORTAL.today, fine: 0 };
                Store.setLoanEdits(student.id, patch);
                toast("Item marked as returned");
                rerender();
            }
            if (repo) {
                const rec = RESEARCH_REPOSITORY.filter(function (r) { return r.file === repo.getAttribute("data-repo"); })[0];
                if (!rec) return;
                downloadText(rec.file + ".txt", [
                    "UNIVERSITY OF IFEWARA INSTITUTIONAL REPOSITORY",
                    "",
                    rec.title,
                    "Author(s) : " + rec.author,
                    "Department : " + rec.dept + " - " + portalDeptName(rec.dept),
                    "Type      : " + rec.type,
                    "Year      : " + rec.year,
                    "Published : " + rec.venue,
                    "Handle    : " + rec.file,
                    "",
                    "This is a demonstration record. In the live repository a full-text PDF",
                    "would be served from this handle.",
                    "",
                    "UNIVERSITY OF IFEWARA LIBRARY, IFEWARA, OSUN STATE, NIGERIA"
                ].join("\n"));
                toast("Repository record " + rec.file + " downloaded");
            }
        });
    }

    /* ---------------------------------------------------------
       view: documents
       --------------------------------------------------------- */

    function viewDocuments(student, ctx) {
        const docs = portalDocuments(student);
        return '' +
            '<div class="view-head"><h2>Document Centre</h2>' +
            "<p>Certificates, letters and receipts issued to you. Each document is generated on demand and stamped with your matriculation number.</p></div>" +

            '<div class="p-grid g4" style="margin-bottom:16px">' +
            tile("fa-folder-open", "", String(docs.length), "Documents available", "Updated as records change") +
            tile("fa-id-badge", "blue", student.matric, "Matriculation number", "Primary identifier") +
            tile("fa-calendar-check", "violet", PORTAL.session, "Current session", PORTAL.term) +
            tile("fa-print", "amber", "PDF / TXT", "Download format", "Text records in this demo") +
            "</div>" +

            '<div class="p-grid g2" style="align-items:start">' +
            '<div class="p-card pad-lg"><h3><i class="fa-solid fa-folder-open"></i> Your documents</h3>' +
            '<p class="card-sub">Click the download icon on any row. Records are rendered live from your portal data.</p>' +
            docs.map(function (d) {
                return '<div class="doc-row"><div class="doc-ico"><i class="fa-solid fa-file-pdf"></i></div>' +
                    '<div class="doc-main"><b>' + esc(d.name) + "</b><span>" + esc(d.meta) + " &middot; " + esc(d.size) + "</span></div>" +
                    '<button type="button" class="p-btn ghost sm" data-doc="' + esc(d.code) + '">' +
                    '<i class="fa-solid fa-download"></i> Get</button></div>';
            }).join("") +
            '<div style="margin-top:14px;padding-top:14px;border-top:1px dashed var(--line)">' +
            '<p style="font-size:11.5px;color:var(--muted);line-height:1.65">Certificates and transcripts are issued only after the ' +
            "Bursary confirms your account is cleared for the session.</p></div></div>" +

            '<div class="p-card pad-lg"><h3><i class="fa-solid fa-file-circle-question"></i> Requesting a document</h3>' +
            '<p class="card-sub">Documents not listed above can be requested from the Registrar.</p>' +
            '<form id="docForm" novalidate>' +
            field("Document type", "select", "docType",
                "<option>Statement of account</option><option>Certificate of current student status</option>" +
                "<option>Course registration slip</option><option>Result slip</option>" +
                "<option>Examination card</option><option>Transnational clearance</option>") +
            field("Delivery", "select", "docDelivery", "<option>Portal download</option><option>Collection at the Registrar</option>") +
            field("Additional note", "textarea", "docNote", "", "Optional. Explain any special requirement.") +
            '<div class="p-alert info" style="margin:0 0 14px"><i class="fa-solid fa-clock"></i><span>Requests are processed within two working days. ' +
            "You will receive an announcement when the document is ready.</span></div>" +
            '<button type="submit" class="p-btn block"><i class="fa-solid fa-paper-plane"></i> Submit request</button>' +
            "</form></div></div>";
    }

    function wireDocuments(student, ctx) {
        $("#portalView").addEventListener("click", function (e) {
            const btn = e.target.closest("[data-doc]");
            if (!btn) return;
            const code = btn.getAttribute("data-doc");
            const doc = portalDocuments(student).filter(function (d) { return d.code === code; })[0];
            if (!doc) return;
            buildDocument(student, ctx, doc);
            toast(doc.name + " generated");
        });

        $("#docForm").addEventListener("submit", function (e) {
            e.preventDefault();
            if (!validateForm(e.target)) return;
            toast("Document request submitted — reference DR/" + portalHash(Date.now()).toString(36).toUpperCase().slice(0, 6));
            e.target.reset();
        });
    }

    function buildDocument(student, ctx, doc) {
        const head = [
            "================================================================",
            "          UNIVERSITY OF IFEWARA, IFEWARA, OSUN STATE",
            "              OFFICE OF THE REGISTRAR",
            "================================================================",
            "",
            "DOCUMENT : " + doc.name.toUpperCase(),
            "REFERENCE: " + doc.code + "/" + student.matric.replace(/\//g, "") + "/" + PORTAL.session.replace("/", ""),
            "",
            "NAME             : " + student.name,
            "MATRICULATION NO.: " + student.matric,
            "PROGRAMME        : " + student.programme,
            "SCHOOL           : " + (ctx.school ? ctx.school.name : student.school),
            "DEPARTMENT       : " + ctx.deptName,
            "LEVEL            : " + student.level + " Level",
            "SESSION          : " + PORTAL.session + " (" + PORTAL.term + ")",
            ""
        ];
        let body = [];
        if (doc.code === "TRN") {
            body = [
                "CGPA: " + ctx.cgpa.toFixed(2) + " of 5.00",
                ""
            ];
            ctx.record.forEach(function (l) {
                body.push(l.label.toUpperCase() + "  GPA " + l.gpa.toFixed(2) + "  " + l.band.label);
                l.rows.forEach(function (r) {
                    body.push("  " + r.code + "  " + pad(r.title, 46) + " " + r.unit + "u  CA " + pad3(r.ca) +
                        "  EX " + pad3(r.exam) + "  TOT " + pad3(r.total) + "  " + r.grade);
                });
                body.push("");
            });
        } else if (doc.code === "RCT") {
            body = ["PAYMENT RECORD - " + PORTAL.session, ""];
            ctx.fees.filter(function (f) { return f.paid; }).forEach(function (f) {
                body.push("  " + pad(f.code, 6) + pad(f.name, 40) + pad(money(f.amount), 14) + "  " + fmtDate(f.paidOn) + "  " + f.reference);
            });
            body.push("", "TOTAL SETTLED : " + money(ctx.feePaid));
            body.push("BALANCE DUE   : " + money(ctx.feeOutstanding));
        } else if (doc.code === "HST") {
            body = [
                ctx.hostel.allocated
                    ? ["HALL        : " + ctx.hostel.hall.name, "BLOCK       : " + ctx.hostel.block,
                        "ROOM        : " + ctx.hostel.room, "BED         : " + ctx.hostel.bed,
                        "ANNUAL RENT : " + money(ctx.hostel.hall.rent), "KEY CARD    : " + ctx.hostel.keyCard]
                    : ["NO HALL ALLOCATION FOR " + PORTAL.session + "."]
            ];
        } else if (doc.code === "IDM") {
            body = ["CANDIDATE  : " + student.name, "NUMBER     : " + student.matric,
                "PROGRAMME  : " + student.programme, "VALIDITY   : 01 Sep 2025 to 31 Dec 2026",
                "EXAMINATION VENUE: assigned by the Examinations and Records Unit."];
        } else {
            body = [
                "This is to certify that " + student.name + " (" + student.matric + ")",
                "is a bona fide student of the University of Ifewara, enrolled in",
                student.programme + " at " + student.level + " Level for the " + PORTAL.session + " session.",
                "", "Issued: " + fmtDate(PORTAL.today)
            ];
        }
        const foot = [
            "",
            "----------------------------------------------------------------",
            "  Registrar, University of Ifewara",
            "  P.O. Box " + (UNIVERSITY && UNIVERSITY.address ? "1042, Ifewara" : "1042, Ifewara") + ", Osun State, Nigeria",
            "----------------------------------------------------------------",
            "",
            "Demonstration document generated by the UNIFEWARA student portal.",
            "It is not a legal instrument."
        ];
        downloadText(doc.code.toLowerCase() + "-" + student.matric.replace(/\//g, "-") + ".txt", head.concat(body, foot).join("\n"));
    }

    function pad(s, n) {
        s = String(s);
        while (s.length < n) s += " ";
        return s;
    }
    function pad3(n) {
        s = String(n);
        while (s.length < 3) s = " ";
        return s;
    }

    /* ---------------------------------------------------------
       view: applications & e-forms
       --------------------------------------------------------- */

    function viewApplications(student, ctx) {
        const mine = Store.getApplications().filter(function (a) {
            return a.email.toLowerCase() === student.email.toLowerCase();
        });
        const all = Store.getApplications();
        const showAll = all.length > mine.length;

        return '' +
            '<div class="view-head"><h2>Applications &amp; E-forms</h2>' +
            "<p>Submit a new application, or track the status of an application you previously made. Reference numbers are issued on submission.</p></div>" +

            '<div class="p-grid g4" style="margin-bottom:16px">' +
            tile("fa-file-signature", "", String(mine.length), "Applications on your email", "Linked to " + student.email) +
            tile("fa-list-check", "blue", String(all.filter(function (a) { return a.status === "Admitted"; }).length), "Admitted", "Across all tracked records") +
            tile("fa-magnifying-glass", "violet", String(all.filter(function (a) { return a.status === "Under Review"; }).length), "Under review", "Departmental assessment") +
            tile("fa-folder-open", "amber", "Online", "Submission channel", "No physical visits required") +
            "</div>" +

            '<div class="p-card pad-lg" style="margin-bottom:16px">' +
            '<div class="p-card-head"><h3><i class="fa-solid fa-magnifying-glass"></i> Track an application</h3></div>' +
            '<form id="trackForm" novalidate" style="max-width:560px">' +
            '<div class="p-field-row">' +
            field("Reference number", "text", "trackRef", "", "e.g. UNIF/APP/2025/2214") +
            field("or registered email", "email", "trackEmail", "", "e.g. name@example.com") +
            "</div>" +
            '<button type="submit" class="p-btn"><i class="fa-solid fa-magnifying-glass"></i> Track</button>' +
            "</form>" +
            '<div id="trackResult" style="margin-top:18px"></div>' +
            "</div>" +

            '<div class="p-grid g2" style="align-items:start">' +
            '<div class="p-card pad-lg"><h3><i class="fa-solid fa-folder-open"></i> Applications linked to you</h3>' +
            '<p class="card-sub">Records matching ' + esc(student.email) + ".</p>" +
            (mine.length
                ? mine.map(function (a) { return appCard(a); }).join("")
                : emptyState("fa-inbox", "No applications linked", "Submit a new application or track an existing reference below.")) +
            (showAll ? '<p style="font-size:11.5px;color:var(--muted);margin-top:14px">' +
                (all.length - mine.length) + " other application record(s) exist on this device and can be tracked by reference.</p>" : "") +
            "</div>" +

            '<div class="p-card pad-lg"><h3><i class="fa-solid fa-pen-to-square"></i> New application</h3>' +
            '<p class="card-sub">Undergraduate and postgraduate applications for the next intake.</p>' +
            '<form id="appForm" novalidate>' +
            fieldRow3("First name", "text", "appFirst", true, "Other names", "text", "appOther", true, "Email", "email", "appEmail", true) +
            field("Phone number", "tel", "appPhone", true, "Include the country code for international applicants.") +
            field("Programme of interest", "select", "appProgramme", "<option value=''>Select a programme</option>" +
                PROGRAMME_OPTIONS.slice(0, 400).map(function (p) {
                    return '<option value="' + esc(p.title) + '">' + esc(p.title) + " — " + esc(p.deptCode) + "</option>";
                }).join(""), true) +
            fieldRow3("Intake session", "select", "appSession", false, "O-Level", "text", "appOlevel", true, "UTME score", "text", "appUtme", false) +
            field("Statement of purpose", "textarea", "appSop", "", "Why do you wish to study at the University of Ifewara? Minimum 40 characters.") +
            field("Upload supporting documents", "file", "appDocs", false, "PDF or image, 5 MB maximum per file. Held on this device only.") +
            '<div class="p-alert warn" style="margin:0 0 14px"><i class="fa-solid fa-lock"></i><span><b>Demonstration form.</b> Submissions are stored in your browser only. ' +
            "No document leaves this device and nothing is sent to a server.</span></div>" +
            '<button type="submit" class="p-btn block"><i class="fa-solid fa-paper-plane"></i> Submit application</button>' +
            "</form></div></div>" +

            '<div class="p-card pad-lg" style="margin-top:16px">' +
            '<h3><i class="fa-solid fa-route"></i> How an application is processed</h3>' +
            '<div class="p-grid g3" style="margin-top:12px">' +
            APPLICATION_FLOW.map(function (s, i) {
                return '<div class="p-card" style="box-shadow:none;background:var(--cream)">' +
                    '<div class="track-dot" style="background:var(--green-700);color:#fff;border-color:var(--green-700)">' + (i + 1) + "</div>" +
                    '<h4 style="font-size:13px;color:var(--ink);margin:10px 0 3px">' + esc(s.key) + "</h4>" +
                    '<p style="font-size:12px;color:var(--muted);line-height:1.55">' + esc(s.note) + "</p></div>";
            }).join("") + "</div></div>";
    }

    function appCard(a) {
        return '<div class="p-card" style="box-shadow:none;background:var(--cream);margin-bottom:10px">' +
            '<div class="p-card-head" style="margin-bottom:8px"><h3 style="font-size:13.5px">' + esc(a.programme) + "</h3>" +
            '<span class="tag ' + (a.status === "Admitted" ? "" : a.status === "Enrolled" ? "blue" : "amber") + '">' + esc(a.status) + "</span></div>" +
            '<div class="kv">' +
            kv("Reference", a.number) +
            kv("Session", a.session) +
            kv("Applied", fmtDate(a.applied)) +
            kv("Updates", a.updates.length + " recorded") +
            "</div>" +
            '<button type="button" class="p-btn ghost sm" style="margin-top:10px" data-view-app="' + esc(a.number) + '">' +
            '<i class="fa-solid fa-timeline"></i> View progress</button></div>';
    }

    function wireApplications(student, ctx) {
        $("#trackForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const form = e.target;
            if (!validateForm(form)) return;
            const ref = $("#trackRef").value.trim().toUpperCase();
            const email = $("#trackEmail").value.trim().toLowerCase();
            const all = Store.getApplications();
            const hit = all.filter(function (a) {
                return (ref && a.number.toUpperCase() === ref) || (email && a.email.toLowerCase() === email);
            })[0];
            const box = $("#trackResult");
            if (!hit) {
                box.innerHTML = '<div class="p-alert err"><i class="fa-solid fa-circle-xmark"></i><span>No application matches that reference or email. ' +
                    "Check the reference issued at submission, or clear the fields to browse by email only.</span></div>";
                return;
            }
            box.innerHTML = '<div class="p-card" style="box-shadow:none;border-color:var(--green-500)">' +
                '<div class="p-card-head"><h3><i class="fa-solid fa-timeline"></i> ' + esc(hit.number) + "</h3>" +
                '<span class="tag">' + esc(hit.status) + "</span></div>" +
                '<p style="font-size:12.5px;color:var(--muted);margin-bottom:14px">' + esc(hit.name) + " &middot; " +
                esc(hit.programme) + " &middot; " + esc(hit.session) + "</p>" +
                progressTracker(hit) +
                '<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">' +
                '<button type="button" class="p-btn ghost sm" data-print-app="' + esc(hit.number) + '"><i class="fa-solid fa-print"></i> Print status</button>' +
                "</div></div>";
        });

        $("#portalView").addEventListener("click", function (e) {
            const viewBtn = e.target.closest("[data-view-app]");
            const printBtn = e.target.closest("[data-print-app]");
            const ref = (viewBtn && viewBtn.getAttribute("data-view-app")) ||
                (printBtn && printBtn.getAttribute("data-print-app"));
            if (ref) {
                const hit = Store.getApplications().filter(function (a) { return a.number === ref; })[0];
                if (!hit) return;
                if (viewBtn) {
                    $("#trackResult").innerHTML = '<div class="p-card" style="box-shadow:none;border-color:var(--green-500)">' +
                        '<div class="p-card-head"><h3><i class="fa-solid fa-timeline"></i> ' + esc(hit.number) + "</h3>" +
                        '<span class="tag">' + esc(hit.status) + "</span></div>" +
                        progressTracker(hit) + "</div>";
                    $("#trackResult").scrollIntoView({ behavior: "smooth", block: "center" });
                } else {
                    downloadText("application-status-" + hit.number.replace(/\//g, "-") + ".txt", [
                        "UNIVERSITY OF IFEWARA - APPLICATION STATUS",
                        "",
                        "Reference : " + hit.number,
                        "Applicant : " + hit.name,
                        "Email     : " + hit.email,
                        "Programme : " + hit.programme,
                        "Session   : " + hit.session,
                        "Applied   : " + fmtDate(hit.applied),
                        "Status    : " + hit.status,
                        "",
                        "PROGRESS",
                        ...hit.updates.map(function (u) { return "  " + fmtDate(u.date) + "   " + u.text; }),
                        "",
                        "Demonstration record held in your browser only."
                    ].join("\n"));
                    toast("Status letter downloaded");
                }
            }
        });

        $("#appForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const form = e.target;
            if (!validateForm(form)) return;

            const sop = $("#appSop").value.trim();
            if (sop && sop.length < 40) {
                $("#appSop").closest(".p-field").classList.add("invalid");
                toast("Statement of purpose must be at least 40 characters", "err");
                return;
            }

            const programme = $("#appProgramme").value;
            const opt = PROGRAMME_OPTIONS.filter(function (p) { return p.title === programme; })[0] || {};
            const first = $("#appFirst").value.trim();
            const other = $("#appOther").value.trim();
            const number = Store.nextApplicationNumber();
            const today = PORTAL.today;

            const app = {
                number: number,
                name: (first + " " + other).trim(),
                email: $("#appEmail").value.trim(),
                phone: $("#appPhone").value.trim(),
                programme: programme,
                school: opt.school || "",
                dept: opt.deptCode || "",
                session: $("#appSession").value,
                olevel: $("#appOlevel").value.trim(),
                utme: $("#appUtme").value.trim(),
                sop: sop,
                applied: today,
                status: "Submitted",
                owner: "UG/" + number.split("/").pop(),
                updates: [{ date: today, text: "Application submitted and reference issued." }]
            };
            Store.addApplication(app);
            toast("Application " + number + " submitted");
            $("#appForm").reset();
            window.location.hash = "#/applications";
            rerender();
            setTimeout(function () {
                $("#trackResult").innerHTML = '<div class="p-alert ok"><i class="fa-solid fa-circle-check"></i><span>Application <b>' +
                    esc(number) + "</b> received. Save this reference &mdash; you can track it above at any time.</span></div>";
            }, 60);
        });
    }

    function progressTracker(app) {
        const idx = APPLICATION_FLOW.findIndex(function (s) { return s.key === app.status; });
        const flowIndex = idx === -1 ? 0 : idx;
        const updateByStatus = {};
        app.updates.forEach(function (u) { updateByStatus[u.date] = u.text; });
        let lastDate = null;
        return APPLICATION_FLOW.map(function (s, i) {
            const cls = i < flowIndex ? "done" : i === flowIndex ? "current" : "";
            return '<div class="track-step ' + cls + '"><div class="track-dot">' +
                (i < flowIndex ? '<i class="fa-solid fa-check"></i>' : i + 1) + "</div><div>" +
                "<h5>" + esc(s.key) + "</h5><p>" + esc(s.note) + "</p></div></div>";
        }).join("");
    }

    /* ---------------------------------------------------------
       view: profile & settings
       --------------------------------------------------------- */

    function viewProfile(student, ctx) {
        const edits = Store.getProfileEdits(student.id);
        const merged = Object.assign({}, student, edits);
        const prefs = Store.getPrefs();

        return '' +
            '<div class="view-head"><h2>Profile &amp; Settings</h2>' +
            "<p>Your record as held by the Registrar. Some fields are locked because they are the legal record of your enrolment.</p></div>" +

            '<div class="p-grid g4" style="margin-bottom:16px">' +
            tile("fa-id-card", "", student.id, "Matriculation number", "Primary identifier") +
            tile("fa-school", "blue", student.level + " Level", "Current level", "Intake " + student.session) +
            tile("fa-book", "violet", String(ctx.cgpa ? ctx.cgpa.toFixed(2) : "—"), "Cumulative GPA", "5.00 scale") +
            tile("fa-circle-info", merged.status === "Active" ? "" : "red", merged.status, "Student status", "Set by the Registrar") +
            "</div>" +

            '<div class="p-grid g2" style="align-items:start">' +
            '<div class="p-card pad-lg"><h3><i class="fa-solid fa-user"></i> Personal record</h3>' +
            '<p class="card-sub">Edit your contact details. Changes are stored on this device and flagged for verification.</p>' +
            '<form id="profileForm" novalidate>' +
            fieldRow3("Full name", "text", "pName", false, "Email", "email", "pEmail", true, "Phone", "tel", "pPhone", true) +
            fieldRow3("Date of birth", "date", "pDob", false, "Gender", "select", "pGender", false, "Marital status", "select", "pMarital", false) +
            fieldRow3("Nationality", "text", "pNation", false, "State of origin", "text", "pState", false, "Blood group", "select", "pBlood", false) +
            field("Residential address", "textarea", "pAddress", false, "As given to the University. Include the city and state.") +
            fieldRow3("Next of kin", "text", "pKin", false, "Kin's phone", "tel", "pKinPhone", false, "Sponsor", "text", "pSponsor", false) +
            '<div class="p-alert info" style="margin:0 0 14px"><i class="fa-solid fa-circle-info"></i><span>Legal name, date of birth and matriculation number can only be corrected by visiting the Registrar. ' +
            "Everything else can be amended here and will be verified at the next registration.</span></div>" +
            '<button type="submit" class="p-btn"><i class="fa-solid fa-floppy-disk"></i> Save profile</button>' +
            "</form></div>" +

            '<div>' +
            '<div class="p-card pad-lg" style="margin-bottom:16px"><h3><i class="fa-solid fa-graduation-cap"></i> Enrolment record</h3>' +
            '<div class="kv" style="margin-top:10px">' +
            kv("Matriculation number", student.matric) +
            kv("Programme", student.programme) +
            kv("School", ctx.school ? ctx.school.name : student.school) +
            kv("Department", ctx.deptName) +
            kv("Head of Department", ctx.hod) +
            kv("Intake session", student.session) +
            kv("Current level", student.level + " Level") +
            kv("Student status", merged.status) +
            kv("Email", student.email) +
            kv("Registered email", merged.email) +
            "</div></div>" +

            '<div class="p-card pad-lg" style="margin-bottom:16px"><h3><i class="fa-solid fa-key"></i> Portal PIN</h3>' +
            '<p class="card-sub">The PIN is used together with your matriculation number to sign in.</p>' +
            '<form id="pinForm" novalidate>' +
            field("Current PIN", "password", "pinOld", true, "Four digits.") +
            field("New PIN", "password", "pinNew", true, "Four digits, different from the current PIN.") +
            field("Confirm new PIN", "password", "pinNew2", true, "") +
            '<button type="submit" class="p-btn block"><i class="fa-solid fa-shield-halved"></i> Change PIN</button>' +
            "</form></div>" +

            '<div class="p-card pad-lg" style="margin-bottom:16px"><h3><i class="fa-solid fa-sliders"></i> Preferences</h3>' +
            '<div class="p-field"><label for="prefDensity">Display density</label>' +
            '<select id="prefDensity"><option value="comfortable">Comfortable</option>' +
            '<option value="compact">Compact</option></select>' +
            '<p class="hint">Compact reduces the spacing in tables for smaller screens.</p></div>' +
            '<label style="display:flex;gap:9px;align-items:center;font-size:13px;color:var(--ink-2);cursor:pointer">' +
            '<input type="checkbox" id="prefNotices"' + (prefs.notices ? " checked" : "") + ' style="width:16px;height:16px;accent-color:var(--green-700)">' +
            "<span>Show announcements on the dashboard</span></label>" +
            "</div>" +

            '<div class="p-card pad-lg"><h3><i class="fa-solid fa-database"></i> Stored data</h3>' +
            '<p class="card-sub">This demonstration portal keeps everything in your browser.</p>' +
            '<div class="kv">' +
            kv("Storage available", Store.available() ? "Yes" : "No — private mode") +
            kv("Session", Store.readSession() ? "Active" : "Signed out") +
            kv("Registration", ctx.regState.confirmed ? "Confirmed" : ctx.registration.length + " courses selected") +
            kv("Applications on device", String(Store.getApplications().length)) +
            kv("Dismissed notices", String(Store.getDismissedNotices().length)) +
            "</div>" +
            '<div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">' +
            '<button type="button" class="p-btn ghost sm" id="exportData"><i class="fa-solid fa-file-export"></i> Export my data</button>' +
            '<button type="button" class="p-btn danger sm" id="resetData"><i class="fa-solid fa-eraser"></i> Reset portal</button>' +
            "</div></div>" +
            "</div></div>";
    }

    function wireProfile(student, ctx) {
        const form = $("#profileForm");
        const edits = Store.getProfileEdits(student.id);
        const setVal = function (id, value) {
            if (value === undefined || value === null || value === "") return;
            const el = $("#" + id);
            if (el) el.value = value;
        };
        setVal("pName", edits.name !== undefined ? edits.name : student.name);
        setVal("pEmail", edits.email !== undefined ? edits.email : student.email);
        setVal("pPhone", edits.phone !== undefined ? edits.phone : student.phone);
        setVal("pGender", edits.gender !== undefined ? edits.gender : student.gender);
        setVal("pMarital", edits.maritalStatus !== undefined ? edits.maritalStatus : student.maritalStatus);
        setVal("pNation", edits.nationality !== undefined ? edits.nationality : student.nationality);
        setVal("pState", edits.state !== undefined ? edits.state : student.state);
        setVal("pBlood", edits.bloodGroup !== undefined ? edits.bloodGroup : student.bloodGroup);
        setVal("pDob", student.dob);
        setVal("pAddress", edits.address);
        setVal("pKin", edits.nextOfKin);
        setVal("pKinPhone", edits.nextOfKinPhone);
        setVal("pSponsor", edits.sponsor);

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!validateForm(form)) return;
            Store.setProfileEdits(student.id, {
                name: $("#pName").value.trim(),
                email: $("#pEmail").value.trim(),
                phone: $("#pPhone").value.trim(),
                gender: $("#pGender").value,
                maritalStatus: $("#pMarital").value,
                nationality: $("#pNation").value.trim(),
                state: $("#pState").value.trim(),
                bloodGroup: $("#pBlood").value,
                address: $("#pAddress").value.trim(),
                nextOfKin: $("#pKin").value.trim(),
                nextOfKinPhone: $("#pKinPhone").value.trim(),
                sponsor: $("#pSponsor").value.trim()
            });
            toast("Profile saved on this device");
            rerender();
        });

        $("#pinForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const f = e.target;
            if (!validateForm(f)) return;
            if (String($("#pinOld").value).trim() !== String(student.pin)) {
                toast("Current PIN is incorrect", "err");
                return;
            }
            const a = $("#pinNew").value.trim();
            const b = $("#pinNew2").value.trim();
            if (a.length !== 4 || !/^\d{4}$/.test(a)) { toast("New PIN must be four digits", "err"); return; }
            if (a !== b) { toast("The two PIN entries do not match", "err"); return; }
            if (a === String(student.pin)) { toast("New PIN must differ from the current one", "err"); return; }
            student.pin = a;
            toast("PIN changed to " + a + " for this session only");
            f.reset();
        });

        const prefs = Store.getPrefs();
        $("#prefDensity").value = prefs.density;
        $("#prefDensity").addEventListener("change", function () {
            Store.setPrefs({ density: this.value });
            toast("Display density: " + this.value);
        });
        $("#prefNotices").addEventListener("change", function () {
            Store.setPrefs({ notices: this.checked });
        });

        $("#exportData").addEventListener("click", function () {
            const payload = {
                exported: PORTAL.today + "T" + PORTAL.todayTime + ":00",
                student: student,
                registration: ctx.registration,
                units: ctx.units,
                cgpa: ctx.cgpa,
                fees: ctx.fees,
                hostel: ctx.hostel,
                loans: ctx.loans,
                applications: Store.getApplications(),
                edits: Store.getProfileEdits(student.id)
            };
            downloadText("unifewara-portal-export-" + student.id.replace(/\//g, "-") + ".json",
                JSON.stringify(payload, null, 2));
            toast("Portal data exported");
        });

        $("#resetData").addEventListener("click", function () {
            if (!window.confirm("Reset the entire portal?\n\nThis clears your session, course selection, payments, applications and profile edits stored in this browser. The seeded student records are restored.")) return;
            Store.resetAll();
            window.location.href = "login.html";
        });
    }

    /* ---------------------------------------------------------
       shared form helpers
       --------------------------------------------------------- */

    function field(label, type, id, options, required) {
        let control;
        if (type === "select") {
            control = '<select id="' + esc(id) + '">' + (options || "") + "</select>";
        } else if (type === "textarea") {
            control = '<textarea id="' + esc(id) + '"></textarea>';
        } else {
            control = '<input type="' + esc(type) + '" id="' + esc(id) + '">';
        }
        return '<div class="p-field" data-field="' + esc(id) + '">' +
            "<label for=\"" + esc(id) + "\">" + esc(label) + (required ? ' <span class="req">*</span>' : "") + "</label>" +
            control + '<p class="err">This field is required.</p></div>';
    }

    function fieldRow3(l1, t1, id1, r1, l2, t2, id2, r2, l3, t3, id3, r3) {
        return '<div class="p-field-row three">' +
            field(l1, t1, id1, null, r1) +
            field(l2, t2, id2, null, r2) +
            field(l3, t3, id3, null, r3) +
            "</div>";
    }

    function validateForm(form) {
        let ok = true;
        let firstBad = null;
        $$("[required]", form).forEach(function () { firstBad = firstBad; });
        $$(".p-field", form).forEach(function (wrap) {
            const input = $("input, select, textarea", wrap);
            if (!input) return;
            const label = $("label", wrap);
            const isRequired = label && label.querySelector(".req");
            const value = (input.value || "").trim();
            let bad = false;
            if (isRequired && !value) bad = true;
            if (!bad && value && input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) bad = true;
            if (!bad && value && input.type === "tel" && value.replace(/[^0-9]/g, "").length < 7) bad = true;
            wrap.classList.toggle("invalid", bad);
            if (bad) {
                ok = false;
                if (!firstBad) firstBad = input;
            }
        });
        if (!ok && firstBad) {
            firstBad.focus();
            toast("Please complete the highlighted fields", "err");
        }
        return ok;
    }

    function downloadText(filename, content) {
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    /* ---------------------------------------------------------
       topbar search + sidebar toggles
       --------------------------------------------------------- */

    function searchIndex() {
        const rows = [];
        NAV.forEach(function (g) {
            g.items.forEach(function (i) {
                rows.push({ type: "Page", title: i.label, sub: g.group, hash: i.hash });
            });
        });
        COURSES.forEach(function (c) {
            if (c[5] === "Service") return;
            rows.push({ type: "Course", title: c[0] + " — " + c[1], sub: c[2] + " units, " + c[3] + " Level", hash: "#/registration" });
        });
        PORTAL_ANNOUNCEMENTS.forEach(function (a) {
            rows.push({ type: "Notice", title: a.title, sub: a.tag + " · " + fmtDate(a.date), hash: "#/announcements" });
        });
        return rows;
    }

    function wireSearch() {
        const input = $("#topSearchInput");
        const pop = $("#topSearchPop");
        if (!input || !pop) return;
        const index = searchIndex();

        function close() { pop.classList.remove("open"); }

        input.addEventListener("input", function () {
            const q = input.value.trim().toLowerCase();
            if (q.length < 2) return close();
            const hits = index.filter(function (r) {
                return (r.title + " " + r.sub + " " + r.type).toLowerCase().indexOf(q) !== -1;
            }).slice(0, 9);
            pop.innerHTML = hits.length
                ? hits.map(function (r) {
                    return '<a href="' + r.hash + '"><b>' + esc(r.title) + "</b><span>" + esc(r.type) + " · " + esc(r.sub) + "</span></a>";
                }).join("")
                : '<div class="no-hit">No page, course or notice matches "' + esc(input.value) + '".</div>';
            pop.classList.add("open");
        });

        input.addEventListener("keydown", function (e) {
            if (e.key === "Escape") { close(); input.blur(); }
        });

        document.addEventListener("click", function (e) {
            if (!pop.contains(e.target) && e.target !== input) close();
        });

        pop.addEventListener("click", function () { setTimeout(close, 40); });
    }

    function openSidebar() {
        $("#portalSide").classList.add("open");
        $("#sideScrim").classList.add("open");
    }
    function closeSidebar() {
        $("#portalSide").classList.remove("open");
        $("#sideScrim").classList.remove("open");
    }

    /* ---------------------------------------------------------
       boot
       --------------------------------------------------------- */

    function boot() {
        const student = requireAuth();
        if (!student) return;

        $("#menuToggle").addEventListener("click", openSidebar);
        $("#sideScrim").addEventListener("click", closeSidebar);

        $("#topBell").addEventListener("click", function () {
            window.location.hash = "#/announcements";
        });
        $("#topHelp").addEventListener("click", function () {
            window.location.hash = "#/profile";
        });

        wireSearch();
        window.addEventListener("hashchange", route);

        const prefs = Store.getPrefs();
        if (prefs.density === "compact") document.body.classList.add("compact");

        route();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
