/* =========================================================
   UNIVERSITY OF IFEWARA — STUDENT PORTAL
   portal-store.js
   localStorage persistence: session, per-student state, e-forms.
   No backend. All writes are namespaced under "unifPortal:".
   ========================================================= */

const Store = (function () {
    const NS = "unifPortal:";
    const KEYS = {
        session: NS + "session",
        reg: NS + "registration:" + "",
        profile: NS + "profile:",
        loans: NS + "loans:",
        applications: NS + "applications",
        notice: NS + "notices",
        prefs: NS + "prefs"
    };

    function read(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? fallback : JSON.parse(raw);
        } catch (e) {
            return fallback;
        }
    }

    function write(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn("portal: storage write failed", e);
            return false;
        }
    }

    function drop(key) {
        try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
    }

    function available() {
        try {
            const t = NS + "__t";
            localStorage.setItem(t, "1");
            localStorage.removeItem(t);
            return true;
        } catch (e) {
            return false;
        }
    }

    /* ---------- session ---------- */

    function saveSession(studentId, remember) {
        write(KEYS.session, { id: studentId, at: Date.now(), remember: !!remember });
    }

    function readSession() {
        const s = read(KEYS.session, null);
        if (!s || !s.id) return null;
        return s;
    }

    function clearSession() {
        drop(KEYS.session);
    }

    /* ---------- per-student state ---------- */

    function studentKey(base, id) { return base + id; }

    function getRegistration(id, defaults) {
        const stored = read(studentKey(KEYS.reg, id), null);
        if (!stored || !Array.isArray(stored.codes) || !stored.codes.length) {
            return { codes: defaults.slice(), updated: Date.now(), confirmed: false };
        }
        return stored;
    }

    function setRegistration(id, codes, confirmed) {
        write(studentKey(KEYS.reg, id), {
            codes: codes,
            updated: Date.now(),
            confirmed: confirmed === undefined ? false : confirmed
        });
    }

    function getProfileEdits(id) {
        return read(studentKey(KEYS.profile, id), {});
    }

    function setProfileEdits(id, patch) {
        const current = getProfileEdits(id);
        write(studentKey(KEYS.profile, id), Object.assign({}, current, patch));
    }

    function getLoanEdits(id) {
        return read(studentKey(KEYS.loans, id), {});
    }

    function setLoanEdits(id, patch) {
        const current = getLoanEdits(id);
        write(studentKey(KEYS.loans, id), Object.assign({}, current, patch));
    }

    function getPrefs() {
        return read(KEYS.prefs, { density: "comfortable", notices: true });
    }

    function setPrefs(patch) {
        write(KEYS.prefs, Object.assign(getPrefs(), patch));
    }

    /* ---------- applications (e-forms) ---------- */

    function getApplications() {
        const list = read(KEYS.applications, null);
        if (list && Array.isArray(list) && list.length) return list;
        write(KEYS.applications, SEED_APPLICATIONS);
        return SEED_APPLICATIONS;
    }

    function addApplication(app) {
        const list = getApplications().slice();
        list.unshift(app);
        write(KEYS.applications, list);
        return app;
    }

    function nextApplicationNumber() {
        const year = String(PORTAL.session).split("/")[0];
        const list = getApplications();
        let max = 0;
        list.forEach(function (a) {
            const m = /\/(\d+)$/.exec(a.number);
            if (m) max = Math.max(max, parseInt(m[1], 10));
        });
        const serial = max + 87 + (max % 13);
        return "UNIF/APP/" + year + "/" + String(serial).padStart(4, "0");
    }

    /* ---------- dismissed notices ---------- */

    function getDismissedNotices() {
        return read(KEYS.notice, []);
    }

    function dismissNotice(id) {
        const list = getDismissedNotices();
        if (list.indexOf(id) === -1) list.push(id);
        write(KEYS.notice, list);
    }

    function restoreNotices() {
        drop(KEYS.notice);
    }

    /* ---------- maintenance ---------- */

    function resetAll() {
        Object.keys(localStorage)
            .filter(function (k) { return k.indexOf(NS) === 0; })
            .forEach(function (k) { drop(k); });
    }

    return {
        NS: NS,
        available: available,
        saveSession: saveSession,
        readSession: readSession,
        clearSession: clearSession,
        getRegistration: getRegistration,
        setRegistration: setRegistration,
        getProfileEdits: getProfileEdits,
        setProfileEdits: setProfileEdits,
        getLoanEdits: getLoanEdits,
        setLoanEdits: setLoanEdits,
        getPrefs: getPrefs,
        setPrefs: setPrefs,
        getApplications: getApplications,
        addApplication: addApplication,
        nextApplicationNumber: nextApplicationNumber,
        getDismissedNotices: getDismissedNotices,
        dismissNotice: dismissNotice,
        restoreNotices: restoreNotices,
        resetAll: resetAll
    };
})();
