/* =========================================================
   UNIVERSITY OF IFEWARA — STUDENT PORTAL
   portal-data.js
   Portal-specific data model and deterministic seed data.
   Depends on the main site's data.js (SCHOOLS / UNIVERSITY).
   ========================================================= */

/* ---------- session context ---------- */

const PORTAL = {
    session: "2025/2026",
    term: "First Term",
    sessionStart: "2025-09-08",
    examStart: "2026-01-12",
    registrationDeadline: "2025-09-26",
    /* The portal is a fixed demonstration of one point in the session, so
       "today" is pinned inside the session instead of following the real
       clock. Every date a student sees is derived from this. */
    today: "2025-09-24",
    todayTime: "09:20",
    portalVersion: "1.0.0",
    registrar: "Office of the Registrar",
    support: "portal@unifewara.edu.ng"
};

function portalToday() { return PORTAL.today; }

function portalTodayStamp() {
    return new Date(PORTAL.today + "T" + PORTAL.todayTime + ":00");
}

function portalWeekday() {
    return portalTodayStamp().toLocaleDateString("en-GB", { weekday: "long" });
}

function portalDaysBetween(fromIso, toIso) {
    const a = new Date(fromIso + "T00:00:00Z");
    const b = new Date(toIso + "T00:00:00Z");
    return Math.round((b - a) / 86400000);
}

/* exact calendar arithmetic, independent of the viewer's time zone */
function portalShiftDate(iso, days) {
    const d = new Date(iso + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() + days);
    return d.toISOString().slice(0, 10);
}

/* 400 and 500 Level students are allowed the extended lending period */
function portalLoanPeriod(student) {
    return student && student.level >= 400 ? 21 : 14;
}

/* ---------- grading ---------- */

const GRADE_SCALE = [
    { grade: "A", points: 5, min: 70, remark: "Excellent" },
    { grade: "B", points: 4, min: 60, remark: "Very good" },
    { grade: "C", points: 3, min: 50, remark: "Good" },
    { grade: "D", points: 2, min: 45, remark: "Satisfactory" },
    { grade: "E", points: 1, min: 40, remark: "Weak but pass" },
    { grade: "F", points: 0, min: 0, remark: "Fail" }
];

const GRADE_POINTS = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };

const CLASS_BANDS = [
    { min: 4.5, label: "First Class", note: "Distinction" },
    { min: 3.5, label: "Second Class Upper", note: "Upper division" },
    { min: 2.5, label: "Second Class Lower", note: "Lower division" },
    { min: 1.5, label: "Third Class", note: "Pass" },
    { min: 0, label: "Not Classified", note: "Below threshold" }
];

const CA_WEIGHT = 30;
const EXAM_WEIGHT = 70;

/* ---------- undergraduate study structure ---------- */

const STUDY_RULES = {
    minUnits: 12,
    maxUnits: 24,
    compulsoryService: 6
};

const LEVELS = [
    { value: 100, label: "Year 1", roman: "100 Level" },
    { value: 200, label: "Year 2", roman: "200 Level" },
    { value: 300, label: "Year 3", roman: "300 Level" },
    { value: 400, label: "Year 4", roman: "400 Level" },
    { value: 500, label: "Year 5", roman: "500 Level" }
];

/* ---------- deterministic helpers
   Every generated record (results, timetable, loan dates) is derived
   from a stable string hash, so a student always sees the same
   "transcript" without needing a server. */

function portalHash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function portalRnd(seed) {
    let t = portalHash(String(seed));
    return function () {
        t += 0x6d2b79f5;
        let x = t;
        x = Math.imul(x ^ (x >>> 15), 1 | x);
        x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
}

function portalPick(list, seed) {
    return list[Math.floor(portalRnd(seed)() * list.length)];
}

function portalInt(min, max, seed) {
    return min + Math.floor(portalRnd(seed)() * (max - min + 1));
}

/* ---------- course catalogue
   [code, title, units, level, deptCode, type] */

const COURSES = [
    /* ---- School of Sciences ---- */
    ["MTH101", "Elementary Mathematics I", 3, 100, "MTH", "Core"],
    ["MTH102", "Elementary Mathematics II", 3, 100, "MTH", "Core"],
    ["MTH103", "Introductory Statistics I", 3, 100, "MTH", "Core"],
    ["MTH201", "Calculus I", 3, 200, "MTH", "Core"],
    ["MTH202", "Linear Algebra", 3, 200, "MTH", "Core"],
    ["MTH203", "Introductory Statistics II", 3, 200, "MTH", "Core"],
    ["MTH301", "Calculus II", 3, 300, "MTH", "Core"],
    ["MTH302", "Differential Equations", 3, 300, "MTH", "Core"],
    ["MTH303", "Numerical Analysis", 3, 300, "MTH", "Elective"],
    ["MTH401", "Real Analysis", 3, 400, "MTH", "Core"],
    ["MTH402", "Probability and Measure Theory", 3, 400, "MTH", "Core"],

    ["PHY101", "General Physics I", 3, 100, "PHY", "Core"],
    ["PHY102", "General Physics II", 3, 100, "PHY", "Core"],
    ["PHY103", "Physics Practical I", 2, 100, "PHY", "Core"],
    ["PHY201", "General Physics III", 3, 200, "PHY", "Core"],
    ["PHY202", "Oscillation and Waves", 3, 200, "PHY", "Core"],
    ["PHY203", "Physics Practical II", 2, 200, "PHY", "Core"],
    ["PHY301", "Electricity and Magnetism", 3, 300, "PHY", "Core"],
    ["PHY302", "Thermodynamics and Statistical Physics", 3, 300, "PHY", "Core"],
    ["PHY401", "Quantum Mechanics I", 3, 400, "PHY", "Core"],
    ["PHY402", "Solid State Physics", 3, 400, "PHY", "Elective"],

    ["CHM101", "General Chemistry I", 3, 100, "CHM", "Core"],
    ["CHM102", "General Chemistry II", 3, 100, "CHM", "Core"],
    ["CHM201", "Organic Chemistry I", 3, 200, "CHM", "Core"],
    ["CHM202", "Inorganic Chemistry", 3, 200, "CHM", "Core"],
    ["CHM203", "Analytical Chemistry", 3, 200, "CHM", "Core"],
    ["CHM301", "Physical Chemistry", 3, 300, "CHM", "Core"],
    ["CHM302", "Organic Chemistry II", 3, 300, "CHM", "Core"],
    ["CHM401", "Instrumental Analysis", 3, 400, "CHM", "Core"],
    ["CHM402", "Medicinal and Pharmaceutical Chemistry", 3, 400, "CHM", "Core"],

    ["BIO101", "General Biology I", 3, 100, "BIO", "Core"],
    ["BIO102", "General Biology II", 3, 100, "BIO", "Core"],
    ["BIO201", "Cell and Molecular Biology", 3, 200, "BIO", "Core"],
    ["BIO202", "Genetics", 3, 200, "BIO", "Core"],
    ["BIO203", "Ecology and Conservation", 3, 200, "BIO", "Core"],
    ["BIO301", "Microbiology", 3, 300, "BIO", "Core"],
    ["BIO302", "Biochemistry", 3, 300, "BIO", "Core"],
    ["BIO401", "Molecular Biotechnology", 3, 400, "BIO", "Core"],
    ["BIO402", "Environmental and Applied Genetics", 3, 400, "BIO", "Core"],

    /* ---- School of Agriculture ---- */
    ["CSS101", "Introduction to Crop Production", 3, 100, "CSS", "Core"],
    ["CSS102", "Introductory Soil Science", 3, 100, "CSS", "Core"],
    ["CSS201", "Crop Physiology", 3, 200, "CSS", "Core"],
    ["CSS202", "Agricultural Genetics and Breeding", 3, 200, "CSS", "Core"],
    ["CSS203", "Weed Science", 3, 200, "CSS", "Elective"],
    ["CSS301", "Crop Production and Farming Systems", 3, 300, "CSS", "Core"],
    ["CSS302", "Soil and Water Management", 3, 300, "CSS", "Core"],
    ["CSS401", "Agricultural Extension and Rural Sociology", 3, 400, "CSS", "Core"],
    ["CSS402", "Land Resources Management", 3, 400, "CSS", "Core"],

    ["ASF101", "Introduction to Animal Science", 3, 100, "ASF", "Core"],
    ["ASF102", "General Fisheries Science", 3, 100, "ASF", "Core"],
    ["ASF201", "Animal Nutrition", 3, 200, "ASF", "Core"],
    ["ASF202", "Principles of Fisheries Biology", 3, 200, "ASF", "Core"],
    ["ASF203", "Aquaculture", 3, 200, "ASF", "Core"],
    ["ASF301", "Animal Health and Hygiene", 3, 300, "ASF", "Core"],
    ["ASF302", "Fish Physiology and Husbandry", 3, 300, "ASF", "Core"],
    ["ASF401", "Livestock Production Systems", 3, 400, "ASF", "Core"],
    ["ASF402", "Fisheries and Aquaculture Management", 3, 400, "ASF", "Core"],

    ["AER101", "Introduction to Agricultural Economics", 3, 100, "AER", "Core"],
    ["AER102", "Farm Management and Accounting", 3, 100, "AER", "Core"],
    ["AER201", "Microeconomics", 3, 200, "AER", "Core"],
    ["AER202", "Agricultural Policy and Programmes", 3, 200, "AER", "Core"],
    ["AER203", "Agricultural Marketing", 3, 200, "AER", "Elective"],
    ["AER301", "Econometrics", 3, 300, "AER", "Core"],
    ["AER302", "Rural Development Planning", 3, 300, "AER", "Core"],
    ["AER401", "Project Appraisal and Feasibility", 3, 400, "AER", "Core"],
    ["AER402", "Agricultural Finance and Risk Management", 3, 400, "AER", "Core"],

    ["FST101", "Introduction to Food Science", 3, 100, "FST", "Core"],
    ["FST102", "Food Microbiology", 3, 100, "FST", "Core"],
    ["FST201", "Food Chemistry", 3, 200, "FST", "Core"],
    ["FST202", "Food Processing and Preservation", 3, 200, "FST", "Core"],
    ["FST203", "Nutrition and Dietetics", 3, 200, "FST", "Core"],
    ["FST301", "Food Quality Control", 3, 300, "FST", "Core"],
    ["FST302", "Food Biotechnology", 3, 300, "FST", "Core"],
    ["FST401", "Food and Industrial Microbiology", 3, 400, "FST", "Core"],
    ["FST402", "Food Regulatory Affairs and Standards", 3, 400, "FST", "Core"],

    /* ---- School of Information Technology ---- */
    ["CSC101", "Introduction to Computer Programming", 3, 100, "CSC", "Core"],
    ["CSC102", "Computer Organisation", 3, 100, "CSC", "Core"],
    ["CSC103", "Computing Practical I", 2, 100, "CSC", "Core"],
    ["CSC201", "Object-Oriented Programming", 3, 200, "CSC", "Core"],
    ["CSC202", "Discrete Structures for Computing", 3, 200, "CSC", "Core"],
    ["CSC203", "Computing Practical II", 2, 200, "CSC", "Core"],
    ["CSC301", "Algorithms and Data Structures", 3, 300, "CSC", "Core"],
    ["CSC302", "Computer Networks", 3, 300, "CSC", "Core"],
    ["CSC303", "Database Systems", 3, 300, "CSC", "Core"],
    ["CSC304", "Software Engineering", 3, 300, "CSC", "Elective"],
    ["CSC401", "Operating Systems", 3, 400, "CSC", "Core"],
    ["CSC402", "Computer Organisation and Architecture", 3, 400, "CSC", "Core"],
    ["CSC403", "Human Computer Interaction", 3, 400, "CSC", "Elective"],

    ["ISS101", "Introduction to Information Systems", 3, 100, "ISS", "Core"],
    ["ISS102", "Introduction to Web Technologies", 3, 100, "ISS", "Core"],
    ["ISS201", "Systems Analysis and Design", 3, 200, "ISS", "Core"],
    ["ISS202", "File and Database Management", 3, 200, "ISS", "Core"],
    ["ISS203", "Quantitative Methods for Business", 3, 200, "ISS", "Core"],
    ["ISS301", "Enterprise Resource Planning", 3, 300, "ISS", "Core"],
    ["ISS302", "Management Information Systems", 3, 300, "ISS", "Core"],
    ["ISS401", "Systems Security and Control", 3, 400, "ISS", "Core"],
    ["ISS402", "Business Intelligence and Analytics", 3, 400, "ISS", "Core"],

    ["CYB101", "Foundations of Cybersecurity", 3, 100, "CYB", "Core"],
    ["CYB102", "Networking Essentials", 3, 100, "CYB", "Core"],
    ["CYB201", "Network Programming", 3, 200, "CYB", "Core"],
    ["CYB202", "Applied Cryptography", 3, 200, "CYB", "Core"],
    ["CYB203", "Linux Systems Administration", 3, 200, "CYB", "Core"],
    ["CYB301", "Ethical Hacking and Penetration Testing", 3, 300, "CYB", "Core"],
    ["CYB302", "Digital Forensics", 3, 300, "CYB", "Elective"],
    ["CYB401", "Cyber Risk and Governance", 3, 400, "CYB", "Core"],
    ["CYB402", "Secure Software Development", 3, 400, "CYB", "Core"],

    ["DSA101", "Introduction to Data Science", 3, 100, "DSA", "Core"],
    ["DSA102", "Programming for Data Science", 3, 100, "DSA", "Core"],
    ["DSA201", "Statistical Modelling", 3, 200, "DSA", "Core"],
    ["DSA202", "Data Engineering Fundamentals", 3, 200, "DSA", "Core"],
    ["DSA301", "Machine Learning", 3, 300, "DSA", "Core"],
    ["DSA302", "Deep Learning", 3, 300, "DSA", "Core"],
    ["DSA303", "Natural Language Processing", 3, 300, "DSA", "Core"],
    ["DSA401", "Responsible AI and Data Ethics", 3, 400, "DSA", "Core"],
    ["DSA402", "Big Data Engineering", 3, 400, "DSA", "Core"],

    /* ---- School of Environmental Studies ---- */
    ["ESM101", "Introduction to Environmental Science", 3, 100, "ESM", "Core"],
    ["ESM102", "Ecology and Environmental Biology", 3, 100, "ESM", "Core"],
    ["ESM201", "Environmental Chemistry", 3, 200, "ESM", "Core"],
    ["ESM202", "Meteorology and Climatology", 3, 200, "ESM", "Core"],
    ["ESM203", "Environmental Microbiology", 3, 200, "ESM", "Core"],
    ["ESM301", "Environmental Impact Assessment", 3, 300, "ESM", "Core"],
    ["ESM302", "Pollution Control and Waste Management", 3, 300, "ESM", "Core"],
    ["ESM401", "Environmental Modelling", 3, 400, "ESM", "Core"],
    ["ESM402", "Ecology and Ecosystem Restoration", 3, 400, "ESM", "Core"],

    ["WRH101", "Introduction to Hydrology", 3, 100, "WRH", "Core"],
    ["WRH102", "Fluid Mechanics", 3, 100, "WRH", "Core"],
    ["WRH201", "Hydraulic Engineering", 3, 200, "WRH", "Core"],
    ["WRH202", "Water Supply Engineering", 3, 200, "WRH", "Core"],
    ["WRH203", "Water Quality Analysis", 3, 200, "WRH", "Core"],
    ["WRH301", "Irrigation and Drainage Engineering", 3, 300, "WRH", "Core"],
    ["WRH302", "Groundwater Hydrology", 3, 300, "WRH", "Core"],
    ["WRH401", "River Engineering", 3, 400, "WRH", "Core"],
    ["WRH402", "Dam and Embankment Engineering", 3, 400, "WRH", "Core"],

    ["EHS101", "Introduction to Environmental Health", 3, 100, "EHS", "Core"],
    ["EHS102", "Occupational Health and Safety I", 3, 100, "EHS", "Core"],
    ["EHS201", "Industrial Hygiene", 3, 200, "EHS", "Core"],
    ["EHS202", "Public Health Microbiology", 3, 200, "EHS", "Core"],
    ["EHS203", "Risk Assessment", 3, 200, "EHS", "Core"],
    ["EHS301", "Environmental Toxicology", 3, 300, "EHS", "Core"],
    ["EHS302", "Occupational Health and Safety II", 3, 300, "EHS", "Core"],
    ["EHS401", "Disaster Preparedness and Response", 3, 400, "EHS", "Core"],
    ["EHS402", "Epidemiology and Community Health", 3, 400, "EHS", "Core"],

    ["CCR101", "Introduction to Climate Science", 3, 100, "CCR", "Core"],
    ["CCR102", "Renewable Energy Fundamentals", 3, 100, "CCR", "Core"],
    ["CCR201", "Energy Systems and Policy", 3, 200, "CCR", "Core"],
    ["CCR202", "Solar Energy Engineering", 3, 200, "CCR", "Core"],
    ["CCR203", "Carbon Accounting", 3, 200, "CCR", "Core"],
    ["CCR301", "Wind and Hydro Power Systems", 3, 300, "CCR", "Core"],
    ["CCR302", "Climate Change Mitigation", 3, 300, "CCR", "Core"],
    ["CCR401", "Smart Grids and Energy Storage", 3, 400, "CCR", "Core"],
    ["CCR402", "Sustainable Development and Climate Finance", 3, 400, "CCR", "Core"],

    /* ---- School of Engineering ---- */
    ["MEE101", "Engineering Mathematics I", 3, 100, "MEE", "Core"],
    ["MEE102", "Engineering Graphics", 2, 100, "MEE", "Core"],
    ["MEE103", "Engineering Workshop Practice I", 2, 100, "MEE", "Core"],
    ["MEE201", "Engineering Thermodynamics", 3, 200, "MEE", "Core"],
    ["MEE202", "Engineering Fluid Mechanics", 3, 200, "MEE", "Core"],
    ["MEE203", "Strength of Materials", 3, 200, "MEE", "Core"],
    ["MEE301", "Machine Design", 3, 300, "MEE", "Core"],
    ["MEE302", "Heat Transfer", 3, 300, "MEE", "Core"],
    ["MEE303", "Manufacturing Processes", 3, 300, "MEE", "Core"],
    ["MEE401", "Mechanical Engineering Design Project", 6, 400, "MEE", "Core"],
    ["MEE402", "Refrigeration and Air Conditioning", 3, 400, "MEE", "Elective"],

    ["EEE101", "Basic Electrical Engineering", 3, 100, "EEE", "Core"],
    ["EEE102", "Engineering Circuit Analysis I", 3, 100, "EEE", "Core"],
    ["EEE201", "Electrical Machines", 3, 200, "EEE", "Core"],
    ["EEE202", "Electronic Circuits", 3, 200, "EEE", "Core"],
    ["EEE203", "Engineering Circuit Analysis II", 3, 200, "EEE", "Core"],
    ["EEE301", "Power Systems Analysis", 3, 300, "EEE", "Core"],
    ["EEE302", "Control Systems Engineering", 3, 300, "EEE", "Core"],
    ["EEE303", "Microelectronics", 3, 300, "EEE", "Elective"],
    ["EEE401", "Electrical Engineering Design Project", 6, 400, "EEE", "Core"],
    ["EEE402", "Renewable Power Systems", 3, 400, "EEE", "Elective"],

    ["CWR101", "Introduction to Civil Engineering", 3, 100, "CWR", "Core"],
    ["CWR102", "Engineering Surveying I", 2, 100, "CWR", "Core"],
    ["CWR201", "Structural Mechanics", 3, 200, "CWR", "Core"],
    ["CWR202", "Engineering Hydrology", 3, 200, "CWR", "Core"],
    ["CWR203", "Engineering Surveying II", 2, 200, "CWR", "Core"],
    ["CWR301", "Reinforced Concrete Design", 3, 300, "CWR", "Core"],
    ["CWR302", "Transportation Engineering", 3, 300, "CWR", "Core"],
    ["CWR303", "Geotechnical Engineering", 3, 300, "CWR", "Core"],
    ["CWR401", "Civil Engineering Design Project", 6, 400, "CWR", "Core"],
    ["CWR402", "Water Supply and Sanitation Design", 3, 400, "CWR", "Core"],

    ["CME101", "Principles of Chemical Engineering", 3, 100, "CME", "Core"],
    ["CME102", "Engineering Materials", 3, 100, "CME", "Core"],
    ["CME201", "Material and Energy Balances", 3, 200, "CME", "Core"],
    ["CME202", "Unit Operations I", 3, 200, "CME", "Core"],
    ["CME203", "Organic Process Technology", 3, 200, "CME", "Core"],
    ["CME301", "Unit Operations II", 3, 300, "CME", "Core"],
    ["CME302", "Process Control", 3, 300, "CME", "Core"],
    ["CME303", "Materials Engineering", 3, 300, "CME", "Elective"],
    ["CME401", "Process Design Project", 6, 400, "CME", "Core"],
    ["CME402", "Separation Process Design", 3, 400, "CME", "Core"],

    /* ---- 500 Level: final year ---- */
    ["MTH501", "Advanced Mathematical Methods", 3, 500, "MTH", "Core"],
    ["MTH502", "Mathematical Modelling and Applications", 3, 500, "MTH", "Elective"],
    ["PHY501", "Quantum Mechanics II", 3, 500, "PHY", "Core"],
    ["PHY502", "Nuclear and Particle Physics", 3, 500, "PHY", "Elective"],
    ["CHM501", "Advanced Organic Chemistry", 3, 500, "CHM", "Core"],
    ["CHM502", "Polymer and Materials Chemistry", 3, 500, "CHM", "Elective"],
    ["BIO501", "Molecular Genetics and Biotechnology", 3, 500, "BIO", "Core"],
    ["BIO502", "Conservation Biology", 3, 500, "BIO", "Elective"],
    ["CSS501", "Advanced Crop Management", 3, 500, "CSS", "Core"],
    ["CSS502", "Integrated Pest Management", 3, 500, "CSS", "Elective"],
    ["ASF501", "Livestock and Aquaculture Systems", 3, 500, "ASF", "Core"],
    ["ASF502", "Fish Health Management", 3, 500, "ASF", "Elective"],
    ["AER501", "Agricultural Policy Analysis", 3, 500, "AER", "Core"],
    ["AER502", "International Agricultural Trade", 3, 500, "AER", "Elective"],
    ["FST501", "Food Product Development", 3, 500, "FST", "Core"],
    ["FST502", "Food Safety Management Systems", 3, 500, "FST", "Elective"],
    ["CSC501", "Final Year Project", 6, 500, "CSC", "Core"],
    ["CSC502", "Cloud Computing and Distributed Systems", 3, 500, "CSC", "Elective"],
    ["ISS501", "Final Year Project", 6, 500, "ISS", "Core"],
    ["ISS502", "Digital Transformation Strategy", 3, 500, "ISS", "Elective"],
    ["CYB501", "Final Year Project", 6, 500, "CYB", "Core"],
    ["CYB502", "Advanced Threat Hunting", 3, 500, "CYB", "Elective"],
    ["DSA501", "Final Year Project", 6, 500, "DSA", "Core"],
    ["DSA502", "Machine Learning Operations", 3, 500, "DSA", "Elective"],
    ["ESM501", "Final Year Project", 6, 500, "ESM", "Core"],
    ["ESM502", "Environmental Governance and Law", 3, 500, "ESM", "Elective"],
    ["WRH501", "Final Year Project", 6, 500, "WRH", "Core"],
    ["WRH502", "Integrated Water Resources Planning", 3, 500, "WRH", "Elective"],
    ["EHS501", "Final Year Project", 6, 500, "EHS", "Core"],
    ["EHS502", "Environmental Health Systems Management", 3, 500, "EHS", "Elective"],
    ["CCR501", "Final Year Project", 6, 500, "CCR", "Core"],
    ["CCR502", "Energy Transition Policy", 3, 500, "CCR", "Elective"],
    ["MEE501", "Final Year Project", 6, 500, "MEE", "Core"],
    ["MEE502", "Advanced Engineering Design", 3, 500, "MEE", "Elective"],
    ["EEE501", "Final Year Project", 6, 500, "EEE", "Core"],
    ["EEE502", "Power Electronics and Drives", 3, 500, "EEE", "Elective"],
    ["CWR501", "Final Year Project", 6, 500, "CWR", "Core"],
    ["CWR502", "Sustainable Infrastructure", 3, 500, "CWR", "Elective"],
    ["CME501", "Final Year Project", 6, 500, "CME", "Core"],
    ["CME502", "Process Safety and Management", 3, 500, "CME", "Elective"],

    /* ---- University-wide service courses ---- */
    ["GNS101", "Use of English I", 2, 100, "GNS", "Service"],
    ["GST101", "General Studies I", 2, 100, "GST", "Service"],
    ["CCE101", "Communication Skills I", 2, 100, "CCE", "Service"],
    ["ICT101", "Information and Communication Technology", 2, 100, "ICT", "Service"],
    ["GNS201", "Use of English II", 2, 200, "GNS", "Service"],
    ["GST201", "General Studies II", 2, 200, "GST", "Service"],
    ["CCE201", "Communication Skills II", 2, 200, "CCE", "Service"],
    ["ICT201", "Web Authoring", 2, 200, "ICT", "Service"],
    ["GST301", "General Studies III", 2, 300, "GST", "Service"],
    ["CCE301", "Entrepreneurship I", 2, 300, "CCE", "Service"],
    ["ICT301", "Research Methods and Data Presentation", 2, 300, "ICT", "Service"],
    ["GST401", "General Studies IV", 2, 400, "GST", "Service"],
    ["CCE401", "Entrepreneurship II", 2, 400, "CCE", "Service"],
    ["CCE402", "Industrial Practice and Internship", 6, 400, "CCE", "Service"],
    ["CCE501", "Industrial Practice and SIWES Report", 6, 500, "CCE", "Service"],
    ["GST501", "Entrepreneurship and Innovation", 2, 500, "GST", "Service"],
    ["GNS301", "Use of English III", 2, 300, "GNS", "Service"]
];

const COURSE_MAP = {};
COURSES.forEach(function (c) {
    COURSE_MAP[c[0]] = { code: c[0], title: c[1], unit: c[2], level: c[3], dept: c[4], type: c[5] };
});

/* lecture slots, days and venues used to build timetables */
const LECTURE_SLOTS = [
    { id: "S1", start: "08:00", end: "09:00" },
    { id: "S2", start: "09:00", end: "10:00" },
    { id: "S3", start: "10:00", end: "11:00" },
    { id: "S4", start: "11:00", end: "12:00" },
    { id: "S5", start: "12:00", end: "13:00" },
    { id: "S6", start: "14:00", end: "15:00" },
    { id: "S7", start: "15:00", end: "16:00" },
    { id: "S8", start: "16:00", end: "17:00" }
];

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const VENUE_PREFIX = ["LT", "LT", "LT", "LR", "LAB", "LAB", "E", "E"];
const VENUE_NUMBER = { LT: [1, 2, 3, 4], LR: [1, 2], LAB: [1, 2, 3], E: [1, 2, 3, 4, 5] };

function portalVenue(seed) {
    const p = portalPick(VENUE_PREFIX, seed + "v");
    const nums = VENUE_NUMBER[p];
    return p + "-" + portalPick(nums, seed + "vn");
}

/* ---------- student accounts ---------- */

const STUDENTS = [
    {
        id: "CSC/2023/0142",
        pin: "1234",
        name: "Amara Chidinma Okonkwo",
        gender: "Female",
        school: "SIT",
        dept: "CSC",
        programme: "B.Sc. Computer Science",
        level: 300,
        session: "2023/2024",
        matric: "2023/00781",
        status: "Active",
        profile: "good",
        email: "a.okonkwo@unifewara.edu.ng",
        phone: "+234 803 441 2287",
        dob: "2004-03-18",
        nationality: "Nigerian",
        state: "Imo",
        address: "17 Azikiwe Street, Owerri, Imo State",
        bloodGroup: "O+",
        genotype: "AA",
        maritalStatus: "Single",
        religion: "Christianity",
        sponsor: "Mr. Obinna Okonkwo",
        sponsorPhone: "+234 806 220 9014",
        nextOfKin: "Chioma Okonkwo (Sister)",
        nextOfKinPhone: "+234 811 774 3380"
    },
    {
        id: "MEE/2022/0308",
        pin: "1234",
        name: "Tunde Babatunde Alabi",
        gender: "Male",
        school: "SEG",
        dept: "MEE",
        programme: "B.Eng. Mechanical Engineering",
        level: 400,
        session: "2022/2023",
        matric: "2022/00613",
        status: "Active",
        profile: "excellent",
        email: "t.alabi@unifewara.edu.ng",
        phone: "+234 705 118 6634",
        dob: "2003-07-02",
        nationality: "Nigerian",
        state: "Kwara",
        address: "42 Gambari Road, Ilorin, Kwara State",
        bloodGroup: "B+",
        genotype: "AS",
        maritalStatus: "Single",
        religion: "Islam",
        sponsor: "Alhaji Rasaq Alabi",
        sponsorPhone: "+234 802 335 7701",
        nextOfKin: "Aisha Alabi (Sister)",
        nextOfKinPhone: "+234 810 447 2298"
    },
    {
        id: "AER/2024/0917",
        pin: "1234",
        name: "Fatima Bello Yusuf",
        gender: "Female",
        school: "SAG",
        dept: "AER",
        programme: "B.Sc. Agricultural Economics and Rural Development",
        level: 200,
        session: "2024/2025",
        matric: "2024/01204",
        status: "Active",
        profile: "average",
        email: "f.yusuf@unifewara.edu.ng",
        phone: "+234 916 552 0093",
        dob: "2005-11-24",
        nationality: "Nigerian",
        state: "Kano",
        address: "8 Zaria Road, Kano",
        bloodGroup: "A+",
        genotype: "AA",
        maritalStatus: "Single",
        religion: "Islam",
        sponsor: "Musa Yusuf",
        sponsorPhone: "+234 813 990 4416",
        nextOfKin: "Ibrahim Yusuf (Brother)",
        nextOfKinPhone: "+234 702 664 8812"
    },
    {
        id: "PHY/2021/0155",
        pin: "1234",
        name: "Emeka Uchenna Nwosu",
        gender: "Male",
        school: "SCS",
        dept: "PHY",
        programme: "B.Sc. Physics",
        level: 500,
        session: "2021/2022",
        matric: "2021/00572",
        status: "Active",
        profile: "good",
        email: "e.nwosu@unifewara.edu.ng",
        phone: "+234 809 224 5517",
        dob: "2002-01-30",
        nationality: "Nigerian",
        state: "Enugu",
        address: "23 Ekwoeze Layout, Enugu",
        bloodGroup: "O-",
        genotype: "AA",
        maritalStatus: "Married",
        religion: "Christianity",
        sponsor: "Dr. Obiora Nwosu",
        sponsorPhone: "+234 806 771 3390",
        nextOfKin: "Ifeoma Nwosu (Wife)",
        nextOfKinPhone: "+234 814 220 6675"
    },
    {
        id: "ESM/2025/0341",
        pin: "1234",
        name: "Zainab Yahaya Mohammed",
        gender: "Female",
        school: "SEN",
        dept: "ESM",
        programme: "B.Sc. Environmental Science and Management",
        level: 100,
        session: "2025/2026",
        matric: "2025/01488",
        status: "Active",
        profile: "excellent",
        email: "z.mohammed@unifewara.edu.ng",
        phone: "+234 807 663 2285",
        dob: "2006-05-09",
        nationality: "Nigerian",
        state: "Bauchi",
        address: "5 Central Road, Bauchi",
        bloodGroup: "AB+",
        genotype: "AA",
        maritalStatus: "Single",
        religion: "Islam",
        sponsor: "Haji Muhammad Goni",
        sponsorPhone: "+234 818 447 0062",
        nextOfKin: "Halima Mohammed (Sister)",
        nextOfKinPhone: "+234 813 559 1174"
    },
    {
        id: "CWR/2023/0266",
        pin: "1234",
        name: "Obinna Chukwuemeka Ibeh",
        gender: "Male",
        school: "SEG",
        dept: "CWR",
        programme: "B.Eng. Civil and Water Resources Engineering",
        level: 300,
        session: "2023/2024",
        matric: "2023/00935",
        status: "Probation (Medical Hold)",
        profile: "at-risk",
        email: "o.ibeh@unifewara.edu.ng",
        phone: "+234 809 113 7742",
        dob: "2003-09-14",
        nationality: "Nigerian",
        state: "Abia",
        address: "30 Obea Avenue, Umuahia, Abia State",
        bloodGroup: "O+",
        genotype: "SS",
        maritalStatus: "Single",
        religion: "Christianity",
        sponsor: "Mr. Kingsley Ibeh",
        sponsorPhone: "+234 803 559 1180",
        nextOfKin: "Ngozi Ibeh (Mother)",
        nextOfKinPhone: "+234 705 884 3327"
    }
];

/* ---------- academics available for registration blocking ---------- */

function portalLecturer(deptCode) {
    let school = null;
    let dept = null;
    if (typeof SCHOOLS === "undefined") return "To be assigned";
    SCHOOLS.forEach(function (s) {
        s.departments.forEach(function (d) {
            if (d.code === deptCode) { school = s; dept = d; }
        });
    });
    if (!dept || !dept.staff.length) return "To be assigned";
    return portalPick(dept.staff.map(function (m) { return m[0]; }), deptCode + "lect");
}

function portalHodName(deptCode) {
    if (typeof SCHOOLS === "undefined") return "";
    let name = "";
    SCHOOLS.forEach(function (s) {
        s.departments.forEach(function (d) {
            if (d.code === deptCode) name = d.hod;
        });
    });
    return name;
}

function portalSchoolOf(deptCode) {
    if (typeof SCHOOLS === "undefined") return null;
    let found = null;
    SCHOOLS.forEach(function (s) {
        s.departments.forEach(function (d) { if (d.code === deptCode) found = s; });
    });
    return found;
}

function portalDeptName(deptCode) {
    if (typeof SCHOOLS === "undefined") return deptCode;
    let name = deptCode;
    SCHOOLS.forEach(function (s) {
        s.departments.forEach(function (d) { if (d.code === deptCode) name = d.name; });
    });
    return name;
}

/* ---------- results ---------- */

const PROFILE_BIAS = {
    excellent: 22,
    good: 10,
    average: -2,
    "at-risk": -16
};

function portalScore(student, code, level) {
    const r = portalRnd(student.id + code + level);
    const bias = PROFILE_BIAS[student.profile] || 0;
    const raw = 46 + r() * 46 + bias;
    const total = Math.max(12, Math.min(100, Math.round(raw)));
    const ca = Math.max(5, Math.min(CA_WEIGHT, Math.round((total * (0.28 + r() * 0.14)))));
    const exam = Math.max(0, Math.min(EXAM_WEIGHT, total - ca));
    return { ca: ca, exam: exam, total: ca + exam };
}

function portalGrade(total) {
    for (let i = 0; i < GRADE_SCALE.length; i++) {
        if (total >= GRADE_SCALE[i].min) return GRADE_SCALE[i];
    }
    return GRADE_SCALE[GRADE_SCALE.length - 1];
}

/* courses that make up each level for a given department */
function portalLevelCourses(deptCode, level) {
    return COURSES
        .filter(function (c) { return c[3] === level && c[4] === deptCode; })
        .map(function (c) { return c[0]; });
}

function portalServiceCourses(level) {
    return COURSES
        .filter(function (c) { return c[3] === level && c[5] === "Service"; })
        .map(function (c) { return c[0]; });
}

/* Builds the full academic record. Levels below the current level are
   completed; the current level is "in progress" and carries no marks yet. */
function portalBuildRecord(student) {
    const levels = [];
    for (let lvl = 100; lvl < student.level; lvl += 100) {
        const codes = portalLevelCourses(student.dept, lvl)
            .concat(portalServiceCourses(lvl))
            .slice(0, 8);
        const rows = codes.map(function (code) {
            const c = COURSE_MAP[code];
            const s = portalScore(student, code, lvl);
            const g = portalGrade(s.total);
            return {
                code: code,
                title: c.title,
                unit: c.unit,
                level: lvl,
                type: c.type,
                ca: s.ca,
                exam: s.exam,
                total: s.total,
                grade: g.grade,
                points: g.points,
                remark: g.remark
            };
        });
        const units = rows.reduce(function (t, r) { return t + r.unit; }, 0);
        const points = rows.reduce(function (t, r) { return t + r.points * r.unit; }, 0);
        const gpa = units ? Math.round((points / units) * 100) / 100 : 0;
        const failed = rows.filter(function (r) { return r.grade === "F"; }).map(function (r) { return r.code; });
        levels.push({
            level: lvl,
            label: (lvl / 100) + " Level",
            rows: rows,
            units: units,
            gpa: gpa,
            failed: failed,
            band: portalClassify(gpa, failed.length)
        });
    }
    return levels;
}

function portalClassify(gpa, failedCount) {
    let band = CLASS_BANDS[CLASS_BANDS.length - 1];
    for (let i = 0; i < CLASS_BANDS.length; i++) {
        if (gpa >= CLASS_BANDS[i].min) { band = CLASS_BANDS[i]; break; }
    }
    if (failedCount > 0) {
        return { label: "Provisional", note: failedCount + " course unit(s) to carry over" };
    }
    return band;
}

function portalCGPA(record) {
    const units = record.reduce(function (t, l) { return t + l.units; }, 0);
    const points = record.reduce(function (t, l) { return t + l.gpa * l.units; }, 0);
    return units ? Math.round((points / units) * 100) / 100 : 0;
}

/* the courses a student is sitting this term
   Core and Service courses are compulsory; Electives are added only while the
   student is below the minimum unit load, plus one optional extra. */
function portalCurrentRegistration(student) {
    const dept = portalLevelCourses(student.dept, student.level);
    const service = portalServiceCourses(student.level);
    const pool = dept.concat(service);
    const r = portalRnd(student.id + "reg");

    const mandatory = pool.filter(function (code) { return COURSE_MAP[code].type !== "Elective"; });
    const electives = pool.filter(function (code) { return COURSE_MAP[code].type === "Elective"; });

    const take = mandatory.slice();
    const units = function () {
        return take.reduce(function (t, c) { return t + COURSE_MAP[c].unit; }, 0);
    };

    electives.forEach(function (code) {
        if (units() < STUDY_RULES.minUnits && units() + COURSE_MAP[code].unit <= STUDY_RULES.maxUnits) {
            take.push(code);
        }
    });

    electives.forEach(function (code) {
        if (take.indexOf(code) !== -1) return;
        if (r() > 0.35 && units() + COURSE_MAP[code].unit <= STUDY_RULES.maxUnits) take.push(code);
    });

    return take;
}

/* ---------- fees ---------- */

const FEE_ITEMS = [
    { code: "TUI", name: "Tuition", amount: 185000, type: "UG" },
    { code: "REG", name: "Registration", amount: 7500, type: "ALL" },
    { code: "ACCM", name: "Accommodation (Hall)", amount: 45000, type: "ALL" },
    { code: "LIB", name: "Library and Information Services", amount: 6000, type: "ALL" },
    { code: "MED", name: "Health and Medical Services", amount: 5000, type: "ALL" },
    { code: "ICTL", name: "ICT and Network Levy", amount: 4000, type: "ALL" },
    { code: "EXAM", name: "Examination Fee", amount: 15000, type: "ALL" },
    { code: "SDV", name: "Student Development Levy", amount: 3500, type: "ALL" },
    { code: "CLA", name: "College of Science Laboratory Levy", amount: 5000, type: "SCIENCE" },
    { code: "ENG", name: "Engineering Workshop and Studio Levy", amount: 8500, type: "ENGINEERING" }
];

const SCIENCE_DEPTS = ["MTH", "PHY", "CHM", "BIO", "ESM", "WRH", "EHS", "CCR"];
const ENGINEERING_DEPTS = ["MEE", "EEE", "CWR", "CME"];

function portalFeeLines(student) {
    const science = SCIENCE_DEPTS.indexOf(student.dept) !== -1;
    const engineering = ENGINEERING_DEPTS.indexOf(student.dept) !== -1;
    const r = portalRnd(student.id + "fee");
    const settled = portalSettledFees(student);
    return FEE_ITEMS.filter(function (it) {
        if (it.type === "ALL") return true;
        if (it.type === "SCIENCE") return science;
        if (it.type === "ENGINEERING") return engineering;
        return it.type === "UG";
    }).map(function (it) {
        const paid = r() > 0.28;
        const line = {
            code: it.code,
            name: it.name,
            amount: it.amount,
            paid: paid,
            paidOn: paid ? portalPick(PAID_DATES, student.id + it.code) : null,
            reference: paid ? "RCT/" + PORTAL.session.replace("/", "") + "/" + portalHash(student.id + it.code).toString(36).toUpperCase().slice(0, 7) : null
        };
        const override = settled[it.code];
        if (!override) return line;
        return {
            code: line.code,
            name: line.name,
            amount: line.amount,
            paid: !!override.paid,
            paidOn: override.paid ? (override.paidOn || line.paidOn) : null,
            reference: override.paid ? (override.reference || line.reference) : null
        };
    });
}

/* payments made in this browser override the seeded history */
function portalSettledFees(student) {
    if (typeof Store === "undefined" || !Store || typeof Store.getProfileEdits !== "function") return {};
    const edits = Store.getProfileEdits(student.id);
    return (edits && edits.paidFees) || {};
}

const PAID_DATES = [
    "2025-09-08", "2025-09-09", "2025-09-10", "2025-09-11", "2025-09-12",
    "2025-09-15", "2025-09-16", "2025-09-17", "2025-09-18", "2025-09-19"
];

function portalFeeTotal(lines) {
    return lines.reduce(function (t, l) { return t + l.amount; }, 0);
}
function portalFeePaid(lines) {
    return lines.reduce(function (t, l) { return t + (l.paid ? l.amount : 0); }, 0);
}
function portalFeeOutstanding(lines) {
    return lines.reduce(function (t, l) { return t + (l.paid ? 0 : l.amount); }, 0);
}

/* ---------- hostel ---------- */

const HALLS = [
    { code: "KA", name: "Kolawole Hall", gender: "Male", block: "Block A", rooms: 120, occupancy: 0.92, rent: 45000, roomType: "2 students per room", facilities: ["Wi-Fi", "Study room", "Laundry", "Water storage"] },
    { code: "AB", name: "Adeniyi Bello Hall", gender: "Male", block: "Block B", rooms: 96, occupancy: 0.87, rent: 45000, roomType: "2 students per room", facilities: ["Wi-Fi", "Study room", "Laundry", "Games room"] },
    { code: "MA", name: "Marian Hall", gender: "Female", block: "Block A", rooms: 140, occupancy: 0.95, rent: 50000, roomType: "2 students per room", facilities: ["Wi-Fi", "Study room", "Laundry", "Water storage"] },
    { code: "FU", name: "Funmilayo Hall", gender: "Female", block: "Block C", rooms: 88, occupancy: 0.81, rent: 50000, roomType: "2 students per room", facilities: ["Wi-Fi", "Study room", "Laundry", "Games room"] },
    { code: "GR", name: "Graduate Hall", gender: "Mixed", block: "Block D", rooms: 40, occupancy: 0.68, rent: 78000, roomType: "Single occupancy", facilities: ["Wi-Fi", "En-suite", "Study room", "Air conditioning"] }
];

const MAINTENANCE_TICKETS = [
    { id: "MNT-2291", unit: "Electrical", detail: "Flickering light in room", status: "Resolved", raised: "2025-09-18", closed: "2025-09-19" },
    { id: "MNT-2314", unit: "Plumbing", detail: "Slow drainage in bathroom", status: "In progress", raised: "2025-10-02", closed: null },
    { id: "MNT-2340", unit: "Carpentry", detail: "Window latch replacement", status: "Scheduled", raised: "2025-10-09", closed: null }
];

function portalHostelFor(student) {
    if (student.level >= 500) {
        return {
            allocated: true,
            hall: HALLS[4],
            block: "Block D",
            room: "D-" + portalInt(1, 8, student.id + "rm") + String(portalInt(1, 4, student.id + "bd")),
            bed: "Single",
            session: PORTAL.session,
            since: "2025-09-10",
            keyCard: "KC/" + portalHash(student.id).toString(36).toUpperCase().slice(0, 8)
        };
    }
    if (portalRnd(student.id + "hostel")() < 0.22) return { allocated: false };
    const pool = HALLS.filter(function (h) {
        if (h.code === "GR") return false;
        return h.gender === student.gender;
    });
    const hall = portalPick(pool, student.id + "hall");
    const num = portalInt(1, Math.floor(hall.rooms / 6), student.id + "room");
    return {
        allocated: true,
        hall: hall,
        block: hall.block,
        room: String.fromCharCode(65 + (num % 3)) + "-" + num,
        bed: portalPick(["Lower bunk", "Upper bunk"], student.id + "bed"),
        session: PORTAL.session,
        since: "2025-09-09",
        keyCard: "KC/" + portalHash(student.id).toString(36).toUpperCase().slice(0, 8)
    };
}

/* ---------- library ---------- */

const LIBRARY_BOOKS = [
    { acc: "LIB/QT/0021", title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest and Stein", edition: "3rd", publisher: "MIT Press", year: 2009, shelf: "Q 76.6 .C76 2009", subject: "Computer Science", copies: 4, taken: 3 },
    { acc: "LIB/QT/0087", title: "Operating System Concepts", author: "Silberschatz, Galvin and Gagne", edition: "10th", publisher: "Wiley", year: 2018, shelf: "Q 76.76 .S52 2018", subject: "Computer Science", copies: 3, taken: 3 },
    { acc: "LIB/QT/0134", title: "Fluid Mechanics", author: "Kundu, Cohen and Dowling", edition: "6th", publisher: "Wiley", year: 2016, shelf: "TA 357 .K86 2016", subject: "Engineering", copies: 2, taken: 1 },
    { acc: "LIB/QT/0198", title: "Principles of Agronomy", author: "Acquaah and Boateng", edition: "2nd", publisher: "Cengage", year: 2021, shelf: "S 495 .A33 2021", subject: "Agriculture", copies: 3, taken: 2 },
    { acc: "LIB/QT/0245", title: "Environmental Chemistry", author: "Manahan", edition: "9th", publisher: "CRC Press", year: 2017, shelf: "TD 193 .M36 2017", subject: "Environmental Science", copies: 2, taken: 0 },
    { acc: "LIB/QT/0301", title: "Fundamentals of Physics", author: "Halliday, Resnick and Walker", edition: "11th", publisher: "Wiley", year: 2018, shelf: "QC 21.3 .H34 2018", subject: "Physics", copies: 4, taken: 2 },
    { acc: "LIB/QT/0366", title: "Statistical Methods for Biology", author: "Zar", edition: "7th", publisher: "Pearson", year: 2010, shelf: "QH 308.8 .Z37 2010", subject: "Biological Science", copies: 2, taken: 1 },
    { acc: "LIB/QT/0412", title: "Plant Physiology", author: "Taiz and Zeiger", edition: "6th", publisher: "Sinauer", year: 2015, shelf: "QK 659 .T35 2015", subject: "Agriculture", copies: 2, taken: 0 },
    { acc: "LIB/QT/0478", title: "Network Security Essentials", author: "Stallings and Lawrie", edition: "2nd", publisher: "Pearson", year: 2019, shelf: "TK 510.5 .S78 2019", subject: "Cybersecurity", copies: 3, taken: 2 },
    { acc: "LIB/QT/0533", title: "Data Science for Business", author: "Provost and Fawcett", edition: "2nd", publisher: "O'Reilly", year: 2016, shelf: "QA 76.9 .P76 2016", subject: "Data Science", copies: 3, taken: 3 },
    { acc: "LIB/QT/0590", title: "Thermodynamics: An Engineering Approach", author: "Cengel and Boles", edition: "8th", publisher: "McGraw-Hill", year: 2014, shelf: "TJ 265 .C36 2014", subject: "Engineering", copies: 2, taken: 1 },
    { acc: "LIB/QT/0644", title: "Water Resources Engineering", author: "Chin", edition: "3rd", publisher: "McGraw-Hill", year: 2013, shelf: "GB 501 .C55 2013", subject: "Civil Engineering", copies: 2, taken: 0 }
];

const RESEARCH_REPOSITORY = [
    { title: "Machine Learning Models for Cassava Disease Detection", author: "Okonkwo, A. C. and Yusuf, F. B.", dept: "CSC", year: 2025, type: "Conference paper", venue: "UNIFEWARA Annual Research Colloquium", views: 812, downloads: 246, file: "UNIF/CSC/2025/014" },
    { title: "Assessment of Groundwater Recharge in Osun Basin", author: "Ibeh, O. C.", dept: "WRH", year: 2025, type: "Journal article", venue: "Nigerian Journal of Hydrology, 14(2)", views: 634, downloads: 188, file: "UNIF/WRH/2025/009" },
    { title: "Proximate Analysis of Snakehead Fish from Lake Ibara", author: "Alabi, T. B. and Iwu, E. O.", dept: "ASF", year: 2024, type: "Journal article", venue: "Ifewara Journal of Fisheries, 9(1)", views: 471, downloads: 121, file: "UNIF/ASF/2024/027" },
    { title: "Design of a Solar-Drying System for Cocoa Beans", author: "Nwosu, E. U. and Bello, A.", dept: "CCR", year: 2024, type: "Conference paper", venue: "Nigerian Institute of Engineers, Annual Meeting", views: 398, downloads: 97, file: "UNIF/CCR/2024/011" },
    { title: "Comparative Study of Quantum Dot Solar Cells", author: "Nwosu, E. U.", dept: "PHY", year: 2023, type: "PhD thesis", venue: "University of Ifewara Library", views: 1502, downloads: 604, file: "UNIF/PHY/2023/004" },
    { title: "Epidemiological Survey of Malaria Indices in Osun State", author: "Yusuf, F. B. and Mohammed, Z. Y.", dept: "EHS", year: 2024, type: "Journal article", venue: "African Journal of Public Health, 18(3)", views: 522, downloads: 143, file: "UNIF/EHS/2024/019" }
];

function portalLoans(student) {
    const r = portalRnd(student.id + "loan");
    const edits = portalLoanEdits(student);
    const count = 1 + Math.floor(r() * 3);
    const out = [];
    for (let i = 0; i < count; i++) {
        const book = portalPick(LIBRARY_BOOKS, student.id + "bk" + i);
        const borrowed = portalPick(PAID_DATES, student.id + "bw" + i);
        const returned = r() > 0.5;
        const period = portalLoanPeriod(student);
        const due = portalShiftDate(borrowed, period);
        const daysLate = returned ? 0 : Math.max(0, portalDaysBetween(due, PORTAL.today));
        const ref = "LN/" + portalHash(student.id + book.acc + i).toString(36).toUpperCase().slice(0, 8);
        const edit = edits[ref] || {};
        const settled = edit.returned || returned;
        /* an item can only come back on or before today */
        const backOn = portalShiftDate(borrowed, 2 + Math.floor(r() * 10));
        const backDate = backOn > PORTAL.today ? PORTAL.today : backOn;
        out.push({
            ref: ref,
            acc: book.acc,
            title: book.title,
            author: book.author,
            edition: book.edition,
            shelf: book.shelf,
            borrowed: borrowed,
            period: period,
            due: edit.due || due,
            returned: settled ? (edit.returned || backDate) : null,
            fine: edit.fine !== undefined ? edit.fine : (settled ? 0 : daysLate * 100),
            renewals: edit.renewals || 0
        });
    }
    return out;
}

/* renewals and returns made in this browser override the seeded history */
function portalLoanEdits(student) {
    if (typeof Store === "undefined" || !Store || typeof Store.getLoanEdits !== "function") return {};
    return Store.getLoanEdits(student.id) || {};
}

/* ---------- announcements ---------- */

const PORTAL_ANNOUNCEMENTS = [
    { id: "AN-1041", date: "2025-09-23", priority: "high", audience: "All students", title: "Mid-term continuous assessment timetable published", body: "The approved schedule for the mid-term continuous assessment is now available in your portal. Candidates should confirm their venue and report fifteen minutes before each paper. Electronic device policy applies.", tag: "Examinations" },
    { id: "AN-1042", date: "2025-09-22", priority: "high", audience: "400 and 500 Levels", title: "Industrial Practice and SIWES documentation", body: "Students proceeding on industrial practice must upload the acceptance letter, supervisor details and indemnity form before the closing date of 17 October 2025.", tag: "Industrial Training" },
    { id: "AN-1043", date: "2025-09-19", priority: "normal", audience: "All students", title: "Second instalment of tuition now payable", body: "The portal is open for payment of the second instalment. Students are advised to pay early to avoid congestion at the Bursary and to complete course registration before the deadline.", tag: "Fees" },
    { id: "AN-1044", date: "2025-09-18", priority: "normal", audience: "SIT and SEG", title: "Hackathon and Cyber Security Challenge", body: "The School of Information Technology and the School of Engineering will jointly host a 72-hour hackathon at the Innovation Hub. Registration through the portal closes on 3 October 2025.", tag: "Student Development" },
    { id: "AN-1045", date: "2025-09-15", priority: "normal", audience: "Library users", title: "Extended lending period for final-year students", body: "Lending period for 400 and 500 Level students has been extended to twenty-one days per item. Kindly return items on or before the due date to avoid penalties.", tag: "Library" },
    { id: "AN-1046", date: "2025-09-12", priority: "normal", audience: "All students", title: "Matriculation and clearance procedure", body: "Matriculation number verification, hostel and library clearance can now be completed entirely from your portal. Print the clearance slip and present it to the Registrar.", tag: "Registration" },
    { id: "AN-1047", date: "2025-09-10", priority: "low", audience: "Resident students", title: "Water supply interruption in male halls", body: "Borehole maintenance will take place on Saturday 13 September between 06:00 and 14:00. Please store water in advance.", tag: "Hostel" }
];

/* ---------- seed applications for the application tracker ---------- */

const SEED_APPLICATIONS = [
    {
        number: "UNIF/APP/2025/2214",
        name: "Amara Chidinma Okonkwo",
        email: "a.okonkwo@unifewara.edu.ng",
        programme: "B.Sc. Computer Science",
        school: "SIT",
        session: "2025/2026",
        applied: "2025-07-18",
        status: "Admitted",
        owner: "UG/2025/2214",
        updates: [
            { date: "2025-07-18", text: "Application submitted and acknowledged." },
            { date: "2025-07-24", text: "Application verified against uploaded credentials." },
            { date: "2025-08-06", text: "Oversubscribed department placed on the merit waiting list." },
            { date: "2025-09-11", text: "Offer of admission issued. Accepted by applicant." },
            { date: "2025-09-15", text: "Matriculation number allocated." }
        ]
    },
    {
        number: "UNIF/APP/2025/2287",
        name: "Zainab Yahaya Mohammed",
        email: "z.mohammed@unifewara.edu.ng",
        programme: "B.Eng. Civil and Water Resources Engineering",
        school: "SEG",
        session: "2026/2027",
        applied: "2025-08-29",
        status: "Under Review",
        owner: "UG/2025/2287",
        updates: [
            { date: "2025-08-29", text: "Application submitted and acknowledged." },
            { date: "2025-09-03", text: "O-Level and A-Level results verified." },
            { date: "2025-09-12", text: "Application assigned to the School of Engineering panel." }
        ]
    }
];

const APPLICATION_FLOW = [
    { key: "Submitted", note: "Form received and reference issued" },
    { key: "Screening", note: "Credentials and O-Level results being verified" },
    { key: "Under Review", note: "Departmental panel assessment in progress" },
    { key: "Merit List", note: "Provisional list published" },
    { key: "Admitted", note: "Offer of admission issued" },
    { key: "Enrolled", note: "Matriculation number allocated" }
];

const PROGRAMME_OPTIONS = (function () {
    if (typeof SCHOOLS === "undefined") return [];
    const rows = [];
    SCHOOLS.forEach(function (s) {
        s.departments.forEach(function (d) {
            d.ug.forEach(function (p) {
                rows.push({ title: p[0], school: s.name, schoolCode: s.code, dept: d.name, deptCode: d.code });
            });
            d.pg.forEach(function (p) {
                rows.push({ title: p[0], school: s.name, schoolCode: s.code, dept: d.name, deptCode: d.code, postgraduate: true });
            });
        });
    });
    return rows;
})();

/* ---------- documents a student can download ---------- */

function portalDocuments(student) {
    return [
        { code: "ADM", name: "Admission letter", meta: "Issued " + portalPick(PAID_DATES, student.id + "ad"), kind: "pdf", size: "184 KB" },
        { code: "MAT", name: "Matriculation certificate", meta: "Number " + student.matric, kind: "pdf", size: "212 KB" },
        { code: "IDM", name: "Examination identity card", meta: "Valid to December 2026", kind: "pdf", size: "96 KB" },
        { code: "RCT", name: "Tuition receipts " + PORTAL.session, meta: "Verified by Bursary", kind: "pdf", size: "148 KB" },
        { code: "TRN", name: "Academic transcript", meta: portalLevelCourses(student.dept, student.level).length + " completed levels", kind: "pdf", size: "276 KB" },
        { code: "CLN", name: "Matriculation clearance slip", meta: "Bursary, Library, Hall", kind: "pdf", size: "88 KB" },
        { code: "HST", name: "Hostel allocation letter", meta: PORTAL.session, kind: "pdf", size: "102 KB" },
        { code: "STU", name: "Student handbook and code of conduct", meta: "Revised edition 2025", kind: "pdf", size: "3.4 MB" }
    ];
}

/* ---------- timetable ---------- */

function portalTimetable(student, codes) {
    const rows = [];
    const used = {};
    codes.forEach(function (code, i) {
        const c = COURSE_MAP[code];
        if (!c) return;
        const rnd = portalRnd(student.id + code + "tt");
        let placed = false;
        let guard = 0;
        while (!placed && guard < 60) {
            guard++;
            const day = WEEK_DAYS[Math.floor(rnd() * WEEK_DAYS.length)];
            const slot = LECTURE_SLOTS[Math.floor(rnd() * LECTURE_SLOTS.length)];
            const key = day + slot.id;
            if (used[key]) continue;
            used[key] = true;
            rows.push({
                code: code,
                title: c.title,
                unit: c.unit,
                type: c.type,
                day: day,
                dayIndex: WEEK_DAYS.indexOf(day),
                start: slot.start,
                end: slot.end,
                venue: portalVenue(code),
                lecturer: portalLecturer(c.dept),
                session: "First Term " + PORTAL.session
            });
            placed = true;
        }
    });
    return rows.sort(function (a, b) {
        if (a.dayIndex !== b.dayIndex) return a.dayIndex - b.dayIndex;
        return a.start.localeCompare(b.start);
    });
}

/* ---------- consolidated student snapshot ---------- */

function portalSnapshot(student) {
    const record = portalBuildRecord(student);
    const registration = portalCurrentRegistration(student);
    const fees = portalFeeLines(student);
    return {
        student: student,
        record: record,
        cgpa: portalCGPA(record),
        registration: registration,
        units: registration.reduce(function (t, code) { return t + (COURSE_MAP[code] ? COURSE_MAP[code].unit : 0); }, 0),
        fees: fees,
        feeTotal: portalFeeTotal(fees),
        feePaid: portalFeePaid(fees),
        feeOutstanding: portalFeeOutstanding(fees),
        hostel: portalHostelFor(student),
        loans: portalLoans(student),
        timetable: portalTimetable(student, registration),
        school: portalSchoolOf(student.dept),
        deptName: portalDeptName(student.dept),
        hod: portalHodName(student.dept)
    };
}
