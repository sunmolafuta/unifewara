/* =========================================================
   UNIVERSITY OF IFEWARA — STUDENT PORTAL
   portal-login.js — sign-in, demo account picker, application tracking
   ========================================================= */

(function () {
    "use strict";

    const $ = function (sel, root) { return (root || document).querySelector(sel); };
    const $$ = function (sel, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(sel));
    };

    function esc(v) {
        return String(v === null || v === undefined ? "" : v)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function fmtDate(iso) {
        if (!iso) return "—";
        const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
        if (isNaN(d.getTime())) return iso;
        return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
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
        el.innerHTML = '<i class="fa-solid fa-circle-' + (type === "err" ? "exclamation" : "check") + '"></i><span>' + esc(message) + "</span>";
        requestAnimationFrame(function () { el.classList.add("show"); });
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { el.classList.remove("show"); }, 3400);
    }

    function findStudent(id) {
        const key = String(id || "").trim().toLowerCase();
        let found = null;
        STUDENTS.forEach(function (s) { if (s.id.toLowerCase() === key) found = s; });
        return found;
    }

    /* ---------------- tabs ---------------- */

    function wireTabs() {
        const buttons = $$(".login-tabs button");
        function show(name) {
            buttons.forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-tab") === name); });
            $$("[data-panel]").forEach(function (p) {
                p.style.display = p.getAttribute("data-panel") === name ? "" : "none";
            });
        }
        buttons.forEach(function (b) { b.addEventListener("click", function () { show(b.getAttribute("data-tab")); }); });
        show("signin");
    }

    /* ---------------- sign in ---------------- */

    function markField(input, bad) {
        const wrap = input.closest(".p-field");
        if (wrap) wrap.classList.toggle("invalid", bad);
    }

    function wireSignIn() {
        const form = $("#signInForm");
        const idInput = $("#studentId");
        const pinInput = $("#studentPin");

        idInput.addEventListener("input", function () { markField(this, false); });
        pinInput.addEventListener("input", function () { markField(this, false); });

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const id = idInput.value.trim();
            const pin = pinInput.value.trim();

            if (!id) { markField(idInput, true); toast("Enter your matriculation number", "err"); return; }
            if (!/^[0-9A-Za-z/\-]{4,24}$/.test(id)) {
                markField(idInput, true);
                toast("Matriculation numbers look like CSC/2023/0142", "err");
                return;
            }
            if (!pin) { markField(pinInput, true); toast("Enter your four-digit PIN", "err"); return; }
            if (!/^\d{4}$/.test(pin)) {
                markField(pinInput, true);
                toast("The PIN is four digits", "err");
                return;
            }

            const student = findStudent(id);
            if (!student) {
                markField(idInput, true);
                toast("No student record matches " + id, "err");
                return;
            }
            if (String(student.pin) !== pin) {
                markField(pinInput, true);
                toast("Incorrect PIN for " + student.name, "err");
                return;
            }

            Store.saveSession(student.id, true);
            const params = new URLSearchParams(window.location.search);
            const next = params.get("next");
            window.location.href = (next && /^#\//.test(next) ? "dashboard.html" + next : "dashboard.html#/dashboard");
        });

        $("#showPin").addEventListener("click", function () {
            const on = pinInput.type === "password";
            pinInput.type = on ? "text" : "password";
            this.setAttribute("aria-label", on ? "Hide PIN" : "Show PIN");
            this.innerHTML = '<i class="fa-regular ' + (on ? "eye-slash" : "eye") + '"></i>';
        });

        function fill(student) {
            idInput.value = student.id;
            pinInput.value = student.pin;
            markField(idInput, false);
            markField(pinInput, false);
            toast("Demo credentials filled — press Sign in");
        }

        const list = $("#demoList");
        STUDENTS.forEach(function (s) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.innerHTML = '<span class="dcode">' + esc(s.id) + "</span>" +
                "<b>" + esc(s.name) + "</b>" +
                '<span style="margin-left:auto;color:var(--muted);font-size:11.5px">' + esc(s.dept) +
                " &middot; " + s.level + "L</span>";
            btn.addEventListener("click", function () { fill(s); });
            list.appendChild(btn);
        });
    }

    /* ---------------- application tracking ---------------- */

    function wireTrack() {
        const form = $("#trackFormLogin");
        if (!form) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const ref = $("#trackRefLogin").value.trim().toUpperCase();
            const email = $("#trackEmailLogin").value.trim().toLowerCase();
            const box = $("#trackOutLogin");

            if (!ref && !email) {
                box.innerHTML = '<div class="p-alert err" style="margin:0"><i class="fa-solid fa-circle-exclamation"></i>' +
                    "<span>Enter an application reference number or the email address you applied with.</span></div>";
                return;
            }

            const apps = Store.getApplications();
            const hit = apps.filter(function (a) {
                return (ref && a.number.toUpperCase() === ref) || (email && a.email.toLowerCase() === email);
            })[0];

            if (!hit) {
                box.innerHTML = '<div class="p-alert err" style="margin:0"><i class="fa-solid fa-circle-xmark"></i>' +
                    "<span>No application matches those details. Check the reference issued at submission, for example <b>UNIF/APP/2025/2214</b>.</span></div>";
                return;
            }

            const idx = APPLICATION_FLOW.map(function (s) { return s.key; }).indexOf(hit.status);
            const step = idx === -1 ? 0 : idx;
            box.innerHTML = '<div class="p-card" style="box-shadow:none;margin-top:16px">' +
                '<div class="p-card-head"><h3><i class="fa-solid fa-timeline"></i> ' + esc(hit.number) + "</h3>" +
                '<span class="tag ' + (hit.status === "Admitted" || hit.status === "Enrolled" ? "" : "amber") + '">' +
                esc(hit.status) + "</span></div>" +
                '<p style="font-size:12.5px;color:var(--muted);margin-bottom:14px">' + esc(hit.name) + " &middot; " +
                esc(hit.programme) + " &middot; " + esc(hit.session) + " &middot; applied " + esc(fmtDate(hit.applied)) + "</p>" +
                APPLICATION_FLOW.map(function (s, i) {
                    const cls = i < step ? "done" : i === step ? "current" : "";
                    return '<div class="track-step ' + cls + '"><div class="track-dot">' +
                        (i < step ? '<i class="fa-solid fa-check"></i>' : i + 1) + "</div><div><h5>" + esc(s.key) +
                        "</h5><p>" + esc(s.note) + "</p></div></div>";
                }).join("") +
                '<div style="margin-top:14px;padding-top:14px;border-top:1px dashed var(--line)">' +
                '<p style="font-size:11.5px;color:var(--muted);line-height:1.6"><b>Latest update:</b> ' +
                esc(hit.updates[hit.updates.length - 1].text) + " (" + esc(fmtDate(hit.updates[hit.updates.length - 1].date)) + ")</p></div>" +
                "</div>";
        });
    }

    /* ---------------- already signed in ---------------- */

    function redirectIfSignedIn() {
        const session = Store.readSession();
        if (session && findStudent(session.id)) {
            $("#alreadyIn").classList.remove("hidden");
            $("#alreadyInName").textContent = findStudent(session.id).name;
        }
    }

    function boot() {
        wireTabs();
        wireSignIn();
        wireTrack();
        redirectIfSignedIn();

        const params = new URLSearchParams(window.location.search);
        if (params.get("signedout") === "1") toast("You have been signed out");
        if (params.get("registered") === "1") toast("Account created — you can now sign in");
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
