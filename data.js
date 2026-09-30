/* =========================================================
   UNIVERSITY OF IFEWARA, OSUN STATE, NIGERIA
   Site data file  -  data.js
   Pure front-end data. No backend / database required.
   Everything the site renders dynamically is defined here.
   ========================================================= */

const UNIVERSITY = {
    name: "University of Ifewara",
    short: "UNIFEWARA",
    location: "Ifewara, Osun State, Nigeria",
    address: "University of Ifewara, Ifewara Campus, Osun State, Nigeria",
    motto: "Knowledge, Innovation and Service to Humanity",
    tagline: "A University of Technology driving innovation in Africa",
    founded: 2009,
    email: "info@unifewara.edu.ng",
    admissionsEmail: "admissions@unifewara.edu.ng",
    phone: "+234 803 445 5800",
    phone2: "+234 805 120 4477",
    whatsapp: "2348034455800",
    mottoShort: "Knowledge. Innovation. Service.",
    type: "Federal University of Technology",
    nuc: "National Universities Commission (NUC) accredited"
};

/* ---------------------------------------------------------
   KEY FIGURES
   --------------------------------------------------------- */

const STATS = [
    { value: 5, suffix: "", label: "Schools", note: "of technology-driven study" },
    { value: 20, suffix: "", label: "Departments", note: "across the five schools" },
    { value: 130, suffix: "+", label: "Programmes", note: "undergraduate, postgraduate, short" },
    { value: 100, suffix: "", label: "Academic Staff", note: "professors to lecturer II" },
    { value: 91, suffix: "", label: "Non-Teaching Staff", note: "administrative, technical, support" },
    { value: 12000, suffix: "+", label: "Students", note: "from 14 countries" }
];

/* ---------------------------------------------------------
   LEADERSHIP / ADMINISTRATIVE OFFICERS
   --------------------------------------------------------- */

const LEADERSHIP = [
    {
        name: "Emeritus Professor Ifeoluwa Olusegun Ayeni",
        title: "Chancellor",
        role: "Chancellor of the University",
        qual: "Ph.D. Engineering (Imperial College London); D.Sc. (Honoris Causa)",
        note: "Distinguished Nigerian engineering academic and former industrialist.",
        icon: "fa-user-tie"
    },
    {
        name: "His Royal Majesty Oba Professor Olawale Adeyemi, CON",
        title: "Pro-Chancellor",
        role: "Pro-Chancellor of the University",
        qual: "Ph.D. Public Policy; M.Sc. Development Economics",
        note: "Traditional ruler and development finance advocate.",
        icon: "fa-user-tie"
    },
    {
        name: "Dr. (Mrs.) Ronke Ifeoma Balogun-Williams",
        title: "Vice-Chancellor",
        role: "Chief Executive Officer of the University",
        qual: "Ph.D. Computer Engineering (University of Manchester); MBA (Henley)",
        note: "Appointed for a four-year tenure effective 1 September 2024.",
        icon: "fa-user-tie"
    },
    {
        name: "Professor Sadeeq Abubakar Umar",
        title: "Deputy Vice-Chancellor (Academic)",
        role: "Deputy Vice-Chancellor",
        qual: "Ph.D. Soil Science (University of Ibadan); FASN",
        note: "Oversees academic programmes, examinations and quality assurance.",
        icon: "fa-user-tie"
    },
    {
        name: "Professor Eno James Okon",
        title: "Deputy Vice-Chancellor (Administration)",
        role: "Deputy Vice-Chancellor",
        qual: "Ph.D. Electrical Engineering (University of Lagos); FNSE",
        note: "Oversees administration, finance, estates and human resources.",
        icon: "fa-user-tie"
    },
    {
        name: "Mr. Bamidele Sunday Falana",
        title: "Registrar",
        role: "Registrar and Secretary to Council and Senate",
        qual: "M.Sc. Business Administration (University of Ilorin); FCA",
        note: "Chief administrative officer; custodian of University records.",
        icon: "fa-user-tie"
    },
    {
        name: "Dr. Adekunle Olusegun Ayoade",
        title: "University Bursar",
        role: "Bursar / Chief Financial Officer",
        qual: "Ph.D. Accounting and Finance (University of Lagos); FCA, ACIT",
        note: "Responsible for the University financial operations.",
        icon: "fa-user-tie"
    },
    {
        name: "Dr. (Mrs.) Folake Adunniyi Balogun",
        title: "University Librarian",
        role: "University Librarian",
        qual: "Ph.D. Library and Information Science (University of Ibadan); MLIS",
        note: "Heads the University Library System and information services.",
        icon: "fa-user-tie"
    },
    {
        name: "Professor Amina Ibrahim Sule",
        title: "Provost, Postgraduate School",
        role: "Head of the Postgraduate School",
        qual: "Ph.D. Biochemistry (Ahmadu Bello University, Zaria)",
        note: "Coordinates all postgraduate programmes and residency training.",
        icon: "fa-user-tie"
    },
    {
        name: "Dr. Nkemdilim Uchenna Obiora",
        title: "Dean of Students",
        role: "Dean of Students",
        qual: "Ph.D. Guidance and Counselling (University of Nigeria, Nsukka)",
        note: "Responsible for student welfare, discipline and development.",
        icon: "fa-user-tie"
    },
    {
        name: "Dr. Abdulsalam Yakubu Musa",
        title: "University Auditor",
        role: "Internal Auditor",
        qual: "MBA (Ahmadu Bello University); ACA, FRCR",
        note: "Independent internal audit of University units and projects.",
        icon: "fa-user-tie"
    },
    {
        name: "Professor Chukwudi Ebenezer Nnaji",
        title: "Director, Research and Innovation",
        role: "Executive Director, Research and Innovation",
        qual: "Ph.D. Computer Science (University of Ilorin)",
        note: "Leads the research policy agenda and industry partnerships.",
        icon: "fa-flask"
    }
];

/* ---------------------------------------------------------
   DIRECTORATES AND CENTRAL UNITS
   --------------------------------------------------------- */

const DIRECTORATES = [
    {
        name: "Directorate of Academic Planning",
        head: "Dr. Tolulope Oladele Afolabi",
        role: "Director",
        functions: [
            "Curriculum development and programme accreditation",
            "Semester calendar and academic calendar planning",
            "Institutional research and performance monitoring",
            "Coordination of NUC, COREN and PCN accreditation visits"
        ]
    },
    {
        name: "Directorate of Quality Assurance",
        head: "Dr. Chinelo Vivienne Uche",
        role: "Director",
        functions: [
            "Internal Quality Assurance audits of all departments",
            "Teaching and Learning Effectiveness (TLE) surveys",
            "Examination malpractice prevention and moderation",
            "Publication and patents benchmarking"
        ]
    },
    {
        name: "Directorate of Information and Communication Technology",
        head: "Engr. Babatunde Sunday Adewale",
        role: "Director",
        functions: [
            "Campus network, data centre and internet services",
            "Learning Management System (LMS) administration",
            "ERP and student portal deployment and support",
            "Cybersecurity operations and campus Wi-Fi"
        ]
    },
    {
        name: "Directorate of Research and Innovation",
        head: "Prof. Chukwudi Ebenezer Nnaji",
        role: "Executive Director",
        functions: [
            "Research policy, grants and proposal development",
            "Industrial Technology Innovation Fund (ITIF) linkages",
            "University TETFUND research grants administration",
            "Technology incubation and start-up support"
        ]
    },
    {
        name: "Directorate of Human Resources",
        head: "Mr. Segun Oladapo Ajayi",
        role: "Director",
        functions: [
            "Staff recruitment, appointment and promotion",
            "Staff training and capacity development",
            "Pensions, staff welfare and discipline matters",
            "Human resource information management system (HRIMS)"
        ]
    },
    {
        name: "Directorate of International and Linkages",
        head: "Dr. Zainab Abubakar Mohammed",
        role: "Director",
        functions: [
            "International student recruitment and immigration (NISS)",
            "International staff exchange and joint degrees",
            "Memoranda of Understanding and partnerships",
            "International ranking, accreditation and ranking data"
        ]
    },
    {
        name: "Directorate of Physical Planning and Estates",
        head: "Engr. Olukayode Adebayo Falade",
        role: "Director",
        functions: [
            "Master plan, building design and construction supervision",
            "Allocation and maintenance of halls of residence",
            "Campus infrastructure, power and water systems",
            "Artisan engagement and facility management"
        ]
    },
    {
        name: "Directorate of Health Services",
        head: "Dr. Ayoola Olabisi Gbadero",
        role: "Director",
        functions: [
            "University Health Centre and medical services",
            "Staff and student medical examinations",
            "School of Health Sciences clinical placements",
            "Mental health, counselling and HIV counselling unit"
        ]
    },
    {
        name: "Directorate of Career Development and Placement",
        head: "Dr. Ifeanyichukwu Geraldine Nwosu",
        role: "Director",
        functions: [
            "SIWES, NYSC and industrial attachment coordination",
            "Graduate and employer training programmes",
            "Entrepreneurship and career fair organisation",
            "Alumni relations and job placement tracking"
        ]
    },
    {
        name: "Directorate of Distance Education and E-Learning",
        head: "Dr. Oluwafemi Sunday Adeoye",
        role: "Director",
        functions: [
            "Part-time, weekend and online programme delivery",
            "E-learning platform and virtual laboratory operations",
            "Distance learners registration and examinations",
            "Instructional media production"
        ]
    }
];

/* ---------------------------------------------------------
   UNIVERSITY LEVEL NON-TEACHING STAFF UNITS
   --------------------------------------------------------- */

const ADMIN_UNITS = [
    {
        unit: "Office of the Vice-Chancellor",
        head: "Dr. Ronke Ifeoma Balogun-Williams",
        members: [
            ["Dr. Segun Oladapo Ajayi", "Administrative Officer", "Secretariat, Policy and Coordination"],
            ["Miss Ronke Akudo Eze", "Confidential Secretary", "Speeches, Minutes and Correspondence"],
            ["Mr. Ibrahim Musa Danladi", "Personal Assistant", "Schedule, Protocol and Logistics"],
            ["Mrs. Gloria Chidinma Nnaji", "Executive Assistant", "Committee Coordination"]
        ]
    },
    {
        unit: "Registry Department",
        head: "Mr. Bamidele Sunday Falana",
        members: [
            ["Mr. Olusegun Bamidele Akande", "Assistant Registrar", "Admissions, Registration and Records"],
            ["Chief (Mrs.) Gloria Nkem Obi", "Chief Administrative Officer", "Students Records and Certification"],
            ["Miss Mercy Eseoghene Ighile", "Registrar Officer", "Senate and Council Documentation"],
            ["Mr. Chukwudi Obinna Nwankwo", "Registry Assistant", "Transcripts and Attestations"],
            ["Miss Hauwa Bello Usman", "Filing Officer", "Central Registry Archives"],
            ["Mr. Emeka Chidera Obi", "Clerical Officer", "Student Verification Letters"]
        ]
    },
    {
        unit: "Bursary Department",
        head: "Dr. Adekunle Olusegun Ayoade",
        members: [
            ["Mr. Folarin Adisa Ogunlade", "Deputy Bursar", "Payments and Reconciliation"],
            ["Miss Oluwakemi Bosede Lawal", "Assistant Bursar", "Student Accounts and Fees"],
            ["Mr. Suleiman Yakubu Mohammed", "Chief Accountant", "Budgeting and Financial Reporting"],
            ["Miss Charity Ekene Udo", "Accountant", "Revenue and Receivables"],
            ["Mr. Gbenga Segun Adeyinka", "Cash Officer", "Payroll and Staff Advances"]
        ]
    },
    {
        unit: "University Library System",
        head: "Dr. (Mrs.) Folake Adunniyi Balogun",
        members: [
            ["Dr. Olumide Kayode Ajala", "Deputy University Librarian", "Reader Services and Collection"],
            ["Miss Bukola Adeola Ayeni", "Assistant University Librarian", "Special Collections and Archives"],
            ["Mr. Sunday Emeka Okafor", "Librarian II", "Acquisition and Serials"],
            ["Miss Fatimah Zainab Abdullahi", "Librarian II", "ICT and Digital Services"],
            ["Mr. Ayoola Olayinka Fashina", "Library Officer", "Circulation Desk"],
            ["Mr. Chidozie Obinna Madu", "Assistant Librarian", "Reference and Documentation"],
            ["Mrs. Ngozi Peace Eze", "Library Assistant", "Bindery and Conservation"]
        ]
    },
    {
        unit: "Directorate of Information and Communication Technology",
        head: "Engr. Babatunde Sunday Adewale",
        members: [
            ["Engr. Chukwuemeka Onyeka Nwosu", "Chief Systems Engineer", "Campus Network and Data Centre"],
            ["Mr. Uchechukwu Cyril Nwafor", "Systems Analyst", "ERP, LMS and Student Portal"],
            ["Miss Maryam Hassan Danladi", "Web Administrator", "Website and Cyber Security"],
            ["Mr. Adeniyi Peter Ojo", "IT Support Officer", "Help Desk and Hardware"],
            ["Miss Peace Ihedo Eze", "Database Administrator", "Records and Backups"],
            ["Mr. Sadiu Ahmed Suleiman", "Network Officer", "Wi-Fi and Fibre Backbone"]
        ]
    },
    {
        unit: "Directorate of Human Resources",
        head: "Mr. Segun Oladapo Ajayi",
        members: [
            ["Mr. Babatunde Sunday Ogunleye", "Assistant Director HR", "Recruitment and Appointment"],
            ["Miss Oluwakemi Ronke Adeniyi", "HR Officer II", "Staff Records and Welfare"],
            ["Mr. Emeka Kingsley Uche", "HR Officer I", "Training and Development"],
            ["Miss Hadiza Garba Muhammad", "HR Assistant", "Pensions and Benefits"],
            ["Mr. Olusegun Christian Idowu", "Pensions Officer", "Pension Fund Managers Liaison"]
        ]
    },
    {
        unit: "Directorate of Physical Planning and Estates",
        head: "Engr. Olukayode Adebayo Falade",
        members: [
            ["Engr. Tobi Olatunji Adebisi", "Chief Engineer", "Buildings, Power and Water"],
            ["Arc. Ngozi Maria Obiora", "Principal Architect", "Design and Planning"],
            ["Mr. Rafiu Oluwakemi Adeyemi", "Estate Officer", "Allocation and Letting"],
            ["Mr. Sunday Segun Bamgbose", "Works Superintendent", "Maintenance and Artisans"],
            ["Miss Halima Garba Yusuf", "Quantity Surveyor II", "Contracts and Valuations"],
            ["Mr. Monday Chukwudi Eze", "Driver", "Official Vehicle Pool"]
        ]
    },
    {
        unit: "Directorate of Health Services",
        head: "Dr. Ayoola Olabisi Gbadero",
        members: [
            ["Dr. Adunni Olayinka Shittu", "Senior Medical Officer", "Clinical Services"],
            ["Nurse Oluwakemi Aderonke Ilesanmi", "Chief Nursing Officer", "Nursing and Ward Management"],
            ["Pharmacist Adebayo Gbolahan Adewale", "Chief Pharmacist", "Pharmacy and Stores"],
            ["Miss Hauwa Shehu Musa", "Laboratory Technologist", "Medical Laboratory Services"],
            ["Counsellor Bola Ogundipe Falana", "Counsellor", "Psychological and Career Counselling"]
        ]
    },
    {
        unit: "Security, Safety and Services Unit",
        head: "Mr. Emmanuel Cudjoe Nkemelu",
        members: [
            ["Mr. Yakubu Umar Salami", "Assistant Security Officer", "Access Control and Patrol"],
            ["Mr. Charles Obinna Nweke", "Security Officer", "Gate Posts and CCTV Monitoring"],
            ["Miss Blessing Ijeoma Afolabi", "Registry Clerk", "Gate Records and Passes"],
            ["Mr. Musa Ibrahim Buba", "Cleaner / Sanitation Attendant", "Sanitation Services"]
        ]
    },
    {
        unit: "Procurement and Supply Chain Unit",
        head: "Dr. Oluwaseun Bamidele Ademola",
        headTitle: "Director of Procurement and Supply Chain",
        headNote: "Under the Office of the Bursar",
        members: [
            ["Mrs. Theresa Ngozi Chukwu", "Chief Store Keeper", "Procurement and Stores"],
            ["Mr. Nnamdi Obinna Nwosu", "Store Keeper II", "Warehouse and Inventory"],
            ["Miss Oluwakemi Tolulope Ojo", "Store Keeper III", "Distribution and Returns"],
            ["Mr. Hassan Dahiru Bello", "Procurement Officer", "RFQ, Tendering and Contracts"]
        ]
    }
];

/* ---------------------------------------------------------
   SCHOOLS, DEPARTMENTS, STAFF AND PROGRAMMES
   Staff tuple format: [Name, Title, Qualification, Specialisation]
   Support tuple format: [Name, Designation, Duty]
   Programmes:
       ug:    [Title, Duration, Seats, Focus]
       pg:    [Title, Duration, Focus]
       short: [Title, Duration, Focus]
   --------------------------------------------------------- */

const SCHOOLS = [
    /* ================================================
       1. SCHOOL OF SCIENCES
       ================================================ */
    {
        id: "scs",
        code: "SCS",
        name: "School of Sciences",
        icon: "fa-flask",
        image: "images/science2.jpg",
        tagline: "Fundamental and applied science for a technological society",
        summary:
            "The School of Sciences provides the fundamental science bedrock on which every technology-driven enterprise rests. It runs laboratories, workshops and field stations that train scientists who think quantitatively, work safely and turn evidence into useful products.",
        dean: {
            name: "Professor Adebayo Tanimu Oyelaran",
            title: "Dean, School of Sciences",
            qual: "Ph.D. Physics (University of Ibadan); M.Sc. Physics (1989)",
            area: "Condensed Matter Physics"
        },
        departments: [
            {
                code: "MTH",
                name: "Pure and Applied Mathematics",
                image: "images/science-lab.jpg",
                hod: "Prof. Olusegun Babatunde Adeyemi",
                summary:
                    "Mathematics is the language of technology. This department covers pure mathematics, statistics and computational methods, and supports every engineering and data-science programme in the University.",
                units: ["Mathematical Sciences Unit", "Statistics and Probability Unit", "Computational Mathematics Unit"],
                focus: [
                    "Numerical analysis and scientific computing",
                    "Modelling of epidemiological and agricultural systems",
                    "Cryptography and information security mathematics",
                    "Mathematical modelling for climate and water systems"
                ],
                staff: [
                    ["Prof. Olusegun Babatunde Adeyemi", "Professor / Head of Department", "Ph.D. Mathematics (UI); M.Sc. 1988", "Numerical Analysis"],
                    ["Dr. Folake Adunniyi Balogun", "Reader", "Ph.D. Mathematics (UNIBEN); M.Sc. 2003", "Functional Analysis"],
                    ["Dr. Chinedu Oluwaseun Mbeki", "Senior Lecturer", "Ph.D. Statistics (University of Ibadan)", "Bayesian Statistics"],
                    ["Mr. Sadiq Abubakar Lawal", "Lecturer I", "M.Sc. Mathematics (ABU Zaria)", "Graph Theory and Combinatorics"],
                    ["Miss Oluwakemi Ayotola Adebisi", "Lecturer II", "M.Sc. Mathematics (Unilag)", "Differential Geometry"]
                ],
                support: [
                    ["Miss Blessing Olubunmi Dare", "Departmental Secretary", "Student records and course registration"],
                    ["Mr. Oluwaseun Sunday Akinlabi", "Cleaner / Sanitation Attendant", "Lecture theatres and offices"]
                ],
                ug: [
                    ["B.Sc. Mathematics", "5 years", 60, "Pure mathematics, analysis, algebra, topology and modelling"],
                    ["B.Sc. Statistics", "5 years", 50, "Probability, statistical inference, design of experiments and analytics"]
                ],
                pg: [
                    ["M.Sc. Numerical Analysis", "2 years", "Advanced numerical methods and high-performance computing"],
                    ["Ph.D. Statistics", "3-5 years", "Bayesian modelling, econometrics and large-data statistics"]
                ],
                short: [
                    ["Diploma in Statistical Computing", "6 months", "Statistics for data handling using R, Python and SPSS"],
                    ["Certificate in Mathematical Modelling", "3 months", "Applied modelling for industry and public agencies"]
                ]
            },
            {
                code: "PHY",
                name: "Physics",
                image: "images/research-lab.jpg",
                hod: "Dr. Oluwaseun Kayode Bamidele",
                summary:
                    "The Physics department operates modern optics, materials-characterisation and computational physics laboratories. It produces graduates suited to electronics, energy, telecommunications and space industries.",
                units: ["Solid State and Materials Physics Unit", "Nuclear and Particle Physics Unit", "Astrophysics and Space Science Unit"],
                focus: [
                    "Thin-film solar cell fabrication and characterisation",
                    "Quantum materials and photonics research",
                    "Radiation physics and environmental dosimetry",
                    "Radio-astronomy and satellite payload instrumentation"
                ],
                staff: [
                    ["Dr. Oluwaseun Kayode Bamidele", "Reader / Head of Department", "Ph.D. Solid State Physics (UI); M.Sc. 1996", "Materials Physics"],
                    ["Prof. Grace Chidinma Uzoma Eze", "Professor", "Ph.D. Physics (University of Nairobi); M.Sc. 1987", "Astrophysics"],
                    ["Dr. Ibrahim Musa Sarkin", "Senior Lecturer", "Ph.D. Nuclear Physics (ABU Zaria)", "Radiation Physics"],
                    ["Mr. Emeka Obinna Chukwu", "Lecturer I", "M.Sc. Physics (UNN); M.Sc. 2008", "Photonics and Optics"],
                    ["Miss Zainab Abubakar Mohammed", "Lecturer II", "M.Sc. Physics (University of Ilorin)", "Computational Physics"]
                ],
                support: [
                    ["Mr. Olumide Sunday Akinyemi", "Chief Laboratory Technologist", "Physics laboratory and equipment calibration"],
                    ["Miss Oluwakemi Aderonke Ilesanmi", "Administrative Officer", "Departmental administration"]
                ],
                ug: [
                    ["B.Sc. Physics", "5 years", 60, "Classical and modern physics, quantum mechanics, electronics and computation"],
                    ["B.Sc. Applied Physics", "5 years", 40, "Materials science, instrumentation, energy physics and applications"]
                ],
                pg: [
                    ["M.Sc. Solid State Physics", "2 years", "Semiconductor devices, thin films and materials characterisation"],
                    ["Ph.D. Radiation and Environmental Physics", "3-5 years", "Dosimetry, health physics and nuclear safety"]
                ],
                short: [
                    ["Certificate in Solar Energy Technology", "3 months", "Photovoltaic design, installation and maintenance"],
                    ["Diploma in Electronics Instrumentation", "6 months", "Calibration, sensor systems and industrial instrumentation"]
                ]
            },
            {
                code: "CHM",
                name: "Chemistry",
                image: "images/research-office.jpg",
                hod: "Prof. Oladapo Bolaji Salami",
                summary:
                    "Chemistry at Ifewara is applied and industry-facing: analytical chemistry, industrial synthesis, catalysis, polymers and pharmaceutical chemistry, all delivered in well-ventilated teaching and research laboratories.",
                units: ["Analytical Chemistry Unit", "Organic and Medicinal Chemistry Unit", "Materials and Polymer Chemistry Unit"],
                focus: [
                    "Water quality analysis and remediation strategies",
                    "Catalysis and sustainable chemical synthesis",
                    "Biodiesel and bio-based chemical feedstocks",
                    "Pharmaceutical formulation and quality control"
                ],
                staff: [
                    ["Prof. Oladapo Bolaji Salami", "Professor / Head of Department", "Ph.D. Chemistry (University of Ibadan); FSN", "Organic Chemistry"],
                    ["Dr. Aisha Bintu Abubakar", "Reader", "Ph.D. Analytical Chemistry (ABU Zaria)", "Water and Environmental Chemistry"],
                    ["Dr. Segun Olumide Afolayan", "Senior Lecturer", "Ph.D. Polymer Chemistry (UI); M.Sc. 1999", "Polymer Science"],
                    ["Miss Oluwakemi Yewande Durojaiye", "Lecturer I", "M.Sc. Chemistry (University of Lagos)", "Medicinal Chemistry"],
                    ["Mr. Abdullahi Sani Garba", "Lecturer II", "M.Sc. Chemistry (Bayero University, Kano)", "Industrial Chemistry"]
                ],
                support: [
                    ["Miss Maryam Hassan Danladi", "Senior Laboratory Technologist", "Analytical chemistry laboratory"],
                    ["Mr. Chukwuemeka Peter Obi", "Laboratory Attendant", "Reagent stores and gas cylinders"]
                ],
                ug: [
                    ["B.Sc. Chemistry", "5 years", 60, "Physical, organic and inorganic chemistry with laboratory practice"],
                    ["B.Sc. Industrial Chemistry", "5 years", 40, "Process design, catalysis, materials and industrial safety"],
                    ["B.Sc. Biochemistry", "5 years", 40, "Molecular and clinical biochemistry with laboratory diagnostics"]
                ],
                pg: [
                    ["M.Sc. Analytical Chemistry", "2 years", "Instrumental analysis, quality control and accreditation"],
                    ["Ph.D. Industrial Chemistry", "3-5 years", "Catalysis, green chemistry and process intensification"]
                ],
                short: [
                    ["Diploma in Quality Control Management", "6 months", "Standards, metrology and laboratory quality systems"],
                    ["Certificate in Polymer Technology", "3 months", "Polymer processing, testing and applications"]
                ]
            },
            {
                code: "BIO",
                name: "Biological Sciences",
                image: "images/environment.jpg",
                hod: "Dr. Ngozi Adaeze Chukwuemeka",
                summary:
                    "Biological Sciences spans microbiology, molecular biology and biotechnology, with a teaching and research farm and molecular-diagnostics laboratory supporting the School of Agriculture and the health sciences.",
                units: ["Microbiology and Molecular Biology Unit", "Molecular Genetics Unit", "Applied Biotechnology Unit"],
                focus: [
                    "Molecular diagnostics of tropical pathogens",
                    "Biofermentation and bio-organic inputs",
                    "Molecular breeding of climate-resilient crops",
                    "Bioremediation and microbial ecology"
                ],
                staff: [
                    ["Dr. Ngozi Adaeze Chukwuemeka", "Reader / Head of Department", "Ph.D. Microbiology (University of Nigeria, Nsukka)", "Environmental Microbiology"],
                    ["Prof. Sadeeq Abubakar Umar", "Professor", "Ph.D. Biochemistry (ABU Zaria); FASN", "Biochemistry and Nutrition"],
                    ["Dr. Ibrahim Shehu Yakubu", "Senior Lecturer", "Ph.D. Molecular Biology (University of Ilorin)", "Molecular Genetics"],
                    ["Miss Chidinma Nkechi Okafor", "Lecturer I", "M.Sc. Microbiology (UNN)", "Industrial Microbiology"],
                    ["Mr. Ayodeji Babatunde Afolabi", "Lecturer II", "M.Sc. Biochemistry (UI)", "Enzymology and Molecular Biology"]
                ],
                support: [
                    ["Miss Temitope Oluwafeyo Adeleke", "Laboratory Technologist", "Molecular and microbiology laboratory"],
                    ["Mr. Sunday Oladapo Ajala", "Field Assistant", "Teaching and research farm plots"]
                ],
                ug: [
                    ["B.Sc. Biology", "5 years", 60, "Cell biology, genetics, physiology, ecology and molecular biology"],
                    ["B.Sc. Microbiology", "5 years", 50, "Microorganisms, biotechnology, immunology and diagnostics"],
                    ["B.Sc. Molecular Biology", "5 years", 40, "Genomics, bioinformatics, molecular cloning and expression"]
                ],
                pg: [
                    ["M.Sc. Molecular Biology", "2 years", "Molecular techniques, genomics and bioinformatics applications"],
                    ["Ph.D. Applied Microbiology", "3-5 years", "Industrial microbiology, biofermentation and microbial biotechnology"]
                ],
                short: [
                    ["Diploma in Bioinformatics", "6 months", "Genomic data analysis using Python and R"],
                    ["Certificate in Food Microbiology", "3 months", "HACCP, food safety and microbial quality control"]
                ]
            }
        ]
    },

    /* ================================================
       2. SCHOOL OF AGRICULTURE
       ================================================ */
    {
        id: "sag",
        code: "SAG",
        name: "School of Agriculture",
        icon: "fa-seedling",
        image: "images/agriculture.jpg",
        tagline: "Feeding the nation and driving agro-industrial value chains",
        summary:
            "Located on the Ifewara teaching and research farm with poultry units, irrigation systems, a solar drying complex and a dam-fed water supply, the School of Agriculture trains professionals for a rapidly modernising agricultural economy.",
        dean: {
            name: "Professor Umaru Shehu Yakubu",
            title: "Dean, School of Agriculture",
            qual: "Ph.D. Crop Science (Ahmadu Bello University, Zaria); FASN",
            area: "Agronomy and Crop Physiology"
        },
        departments: [
            {
                code: "CSS",
                name: "Crop and Soil Sciences",
                image: "images/agriculture2.jpg",
                hod: "Prof. Sadeeq Abubakar Umar",
                summary:
                    "Crop and Soil Sciences covers agronomy, soil science, horticulture and weed management. Students undertake farm practicals on the University teaching farm and participate in the annual Agricultural Field Day.",
                units: ["Agronomy Unit", "Soil Science Unit", "Horticulture Unit"],
                focus: [
                    "Improved cassava, yam and maize varieties for the South-West",
                    "Integrated soil fertility and organic fertiliser production",
                    "Rice and vegetable production under drip irrigation",
                    "Climate-smart agronomy and precision agriculture"
                ],
                staff: [
                    ["Prof. Sadeeq Abubakar Umar", "Professor / Head of Department", "Ph.D. Soil Science (UI); FASN", "Soil Fertility"],
                    ["Dr. Abdullahi Umaru Yerima", "Reader", "Ph.D. Agronomy (ABU Zaria); M.Sc. 1998", "Crop Production"],
                    ["Dr. Blessing Eghosa Oyelaran", "Senior Lecturer", "Ph.D. Horticulture (University of Ilorin)", "Horticulture"],
                    ["Mr. Kunle Olawale Adesegun", "Lecturer I", "M.Sc. Agronomy (UI)", "Weed Science"],
                    ["Miss Temitope Adunni Ige", "Lecturer II", "M.Sc. Soil Science (ABU Zaria)", "Soil Physics"]
                ],
                support: [
                    ["Mr. Ibrahim Shehu Musa", "Farm Manager", "Teaching farm operations and field plots"],
                    ["Miss Oluwakemi Tolulope Ojo", "Administrative Officer", "Departmental records"]
                ],
                ug: [
                    ["B.Agric. Crop Science", "5 years", 60, "Agronomy, crop genetics, weed and pest management"],
                    ["B.Agric. Soil Science", "5 years", 40, "Pedology, soil chemistry, fertility and conservation"],
                    ["B.Agric. Horticulture", "5 years", 40, "Fruit, vegetable, ornamental and floriculture production"]
                ],
                pg: [
                    ["M.Sc. Agronomy", "2 years", "Crop physiology, integrated production and precision farming"],
                    ["Ph.D. Soil Science", "3-5 years", "Soil chemistry, fertility management and land remediation"]
                ],
                short: [
                    ["Certificate in Agricultural Extension", "6 months", "Extension methods and farmer training"],
                    ["Diploma in Nursery and Ornamental Plant Production", "6 months", "Nursery management and landscaping"]
                ]
            },
            {
                code: "ASF",
                name: "Animal Science and Fisheries",
                image: "images/agriculture3.jpg",
                hod: "Dr. Uchechukwu Obiora Nnaji",
                summary:
                    "Animal Science and Fisheries covers livestock production, animal nutrition, veterinary public health, aquaculture and fisheries science, supported by poultry and fish-farm facilities on campus.",
                units: ["Animal Nutrition and Physiology Unit", "Livestock Production Unit", "Fisheries and Aquaculture Unit"],
                focus: [
                    "Poultry and goat production at commercial scale",
                    "Feed formulation using local agro-industrial by-products",
                    "Tilapia and catfish aquaculture in earthen ponds",
                    "Veterinary public health and zoonoses surveillance"
                ],
                staff: [
                    ["Dr. Uchechukwu Obiora Nnaji", "Reader / Head of Department", "Ph.D. Animal Science (UI); M.Sc. 2001", "Animal Nutrition"],
                    ["Prof. Hafizatu Oluwakemi Adebayo", "Professor", "Ph.D. Fisheries and Aquaculture (UNIBEN)", "Aquaculture"],
                    ["Dr. Suleiman Adebayo Yakubu", "Senior Lecturer", "Ph.D. Animal Health (ABU Zaria)", "Veterinary Public Health"],
                    ["Mr. Chukwudi Godwin Nwosu", "Lecturer I", "M.Sc. Animal Science (UI)", "Livestock Production"],
                    ["Miss Amaka Ezinne Nwankwo", "Lecturer II", "M.Sc. Fisheries (UNN)", "Fish Health Management"]
                ],
                support: [
                    ["Arc. Yakubu Ogunbiyi", "Livestock Supervisor", "Poultry units and demonstration pens"],
                    ["Mr. Uzama Musa Buba", "Fish Farm Attendant", "Pond management and feed stores"]
                ],
                ug: [
                    ["B.Agric. Animal Science", "5 years", 60, "Livestock production, nutrition, health and management"],
                    ["B.Agric. Fisheries and Aquaculture", "5 years", 40, "Fish biology, pond construction, nutrition and processing"],
                    ["B.Agric. Animal Nutrition and Health", "5 years", 30, "Feed science, animal health and veterinary practice"]
                ],
                pg: [
                    ["M.Sc. Animal Science", "2 years", "Animal genetics, nutrition and precision livestock farming"],
                    ["Ph.D. Fisheries Science", "3-5 years", "Aquaculture systems, fish genetics and aquatic health"]
                ],
                short: [
                    ["Diploma in Poultry Production Management", "6 months", "Brooding, feeding, health and marketing"],
                    ["Certificate in Aquaculture", "3 months", "Pond construction, fish husbandry and harvesting"]
                ]
            },
            {
                code: "AER",
                name: "Agricultural Economics and Rural Development",
                image: "images/agri-solar.jpg",
                hod: "Dr. Oladapo Abiodun Falade",
                summary:
                    "This department links agricultural production to markets, policy and rural livelihoods through farm management, agribusiness, agricultural finance, econometrics and rural sociology.",
                units: ["Agribusiness and Farm Management Unit", "Agricultural Policy and Finance Unit", "Rural Sociology and Extension Unit"],
                focus: [
                    "Agri-value chain and market access studies",
                    "Microfinance and smallholder enterprise finance",
                    "Agricultural policy analysis and food security",
                    "Survey design, sampling and agricultural econometrics"
                ],
                staff: [
                    ["Dr. Oladapo Abiodun Falade", "Reader / Head of Department", "Ph.D. Agricultural Economics (UI); M.Sc. 2003", "Agribusiness Economics"],
                    ["Prof. Ayodele Olawale Adepoju", "Professor", "Ph.D. Agricultural Economics (ABU Zaria)", "Agricultural Policy"],
                    ["Dr. Tolulope Oladele Afolabi", "Senior Lecturer", "Ph.D. Rural Development (University of Ibadan)", "Rural Development"],
                    ["Mr. Segun Olusegun Adisa", "Lecturer I", "M.Sc. Agricultural Economics (UNILORIN)", "Econometrics"],
                    ["Miss Olubunmi Adaeze Onwuka", "Lecturer II", "M.Sc. Agribusiness (UI)", "Agribusiness and Marketing"]
                ],
                support: [
                    ["Miss Blessing Ijeoma Afolabi", "Administrative Officer", "Departmental administration"],
                    ["Mr. Musa Ibrahim Buba", "Field Enumerator", "Farm household surveys"]
                ],
                ug: [
                    ["B.Agric. Agricultural Economics and Rural Development", "5 years", 60, "Farm management, agribusiness, policy and rural sociology"],
                    ["B.Sc. Agricultural Finance and Agribusiness", "5 years", 40, "Agricultural credit, insurance, value chains and marketing"]
                ],
                pg: [
                    ["M.Sc. Agricultural Economics", "2 years", "Econometric analysis, markets and agricultural policy"],
                    ["Ph.D. Agribusiness Management", "3-5 years", "Value chains, entrepreneurship and rural enterprise finance"]
                ],
                short: [
                    ["Diploma in Agro-Business Management", "6 months", "Business planning, bookkeeping and market linkage"],
                    ["Certificate in Cooperative and Community Development", "3 months", "Cooperative finance and community project management"]
                ]
            },
            {
                code: "FST",
                name: "Food Science and Technology",
                image: "images/agriculture4.jpg",
                hod: "Prof. Zuwaira Abubakar Musa",
                summary:
                    "Food Science and Technology covers processing, quality control, microbiology, packaging, nutrition and food safety, with a pilot processing hall, solar drying complex and sensory evaluation laboratory.",
                units: ["Food Processing Unit", "Food Microbiology and Safety Unit", "Nutrition and Dietetics Unit"],
                focus: [
                    "Value addition for cassava, yam, plantain and coconut",
                    "Solar drying and shelf-life improvement of foods",
                    "Mycotoxin control and food safety management systems",
                    "Clinical nutrition and community nutrition programmes"
                ],
                staff: [
                    ["Prof. Zuwaira Abubakar Musa", "Professor / Head of Department", "Ph.D. Food Science and Technology (UI)", "Food Processing"],
                    ["Dr. Kemi Felicia Oladipo", "Reader", "Ph.D. Nutrition and Dietetics (ABU Zaria)", "Human Nutrition"],
                    ["Dr. Emmanuel Cudjoe Nkemelu", "Senior Lecturer", "Ph.D. Food Microbiology (UNILORIN)", "Food Safety and Microbiology"],
                    ["Miss Rachel Nkemdilim Obi", "Lecturer I", "M.Sc. Food Science and Technology (UI)", "Food Chemistry"],
                    ["Mr. Danjuma Umaru Bello", "Lecturer II", "M.Sc. Nutrition (ABU Zaria)", "Public Health Nutrition"]
                ],
                support: [
                    ["Miss Hauwa Shehu Musa", "Laboratory Technologist", "Pilot processing hall and sensory laboratory"],
                    ["Mr. Yakubu Umar Salami", "Assistant Store Keeper", "Raw material stores and cold room"]
                ],
                ug: [
                    ["B.Sc. Food Science and Technology", "5 years", 50, "Processing, microbiology, chemistry, packaging and quality control"],
                    ["B.Sc. Nutrition and Dietetics", "5 years", 40, "Human nutrition, clinical dietetics and community nutrition"],
                    ["B.Sc. Food Biotechnology", "5 years", 30, "Fermentation, food enzymes, biotechnology and safety"]
                ],
                pg: [
                    ["M.Sc. Food Science and Technology", "2 years", "Processing technology, food quality and product development"],
                    ["Ph.D. Food Safety and Quality Control", "3-5 years", "Microbial safety, standards and HACCP systems"]
                ],
                short: [
                    ["Certificate in Food Processing and Preservation", "3 months", "Drying, packaging and small-scale processing"],
                    ["Diploma in Nutrition and Community Health", "6 months", "Nutrition assessment and counselling"]
                ]
            }
        ]
    },

    /* ================================================
       3. SCHOOL OF INFORMATION TECHNOLOGY
       ================================================ */
    {
        id: "sit",
        code: "SIT",
        name: "School of Information Technology",
        icon: "fa-microchip",
        image: "images/it-campus.jpg",
        tagline: "Digital skills, software engineering and secure systems",
        summary:
            "The newest and fastest-growing school. It houses the University data centre, a robotics and AI laboratory, a cyber-security range, and industry-linked software engineering studio where students build real products for real clients.",
        dean: {
            name: "Prof. Ifeoma Chidinma Nwachukwu",
            title: "Dean, School of Information Technology",
            qual: "Ph.D. Computer Science (University of Ilorin); FNSE, FIPS",
            area: "Software Engineering and Artificial Intelligence"
        },
        departments: [
            {
                code: "CSC",
                name: "Computer Science",
                image: "images/computer-lab.jpg",
                hod: "Prof. Ifeoma Chidinma Nwachukwu",
                summary:
                    "Computer Science covers programming, algorithms, systems, theory and computational methods, supported by 400-seat laboratories, a GPU compute cluster and an industry software studio.",
                units: ["Software Systems Unit", "Algorithms and Theory Unit", "Programming Languages and Compilers Unit"],
                focus: [
                    "Natural language processing for Nigerian languages",
                    "Distributed systems and cloud-native architectures",
                    "Formal methods and software verification",
                    "Algorithms for health, agriculture and logistics"
                ],
                staff: [
                    ["Prof. Ifeoma Chidinma Nwachukwu", "Professor / Head of Department", "Ph.D. Computer Science (Unilorin)", "Software Engineering"],
                    ["Dr. Bolarinwa Femi Adesokan", "Reader", "Ph.D. Computer Science (UI); M.Sc. 2000", "Algorithms and Theory"],
                    ["Dr. Zainab Bello Yakubu", "Senior Lecturer", "Ph.D. Artificial Intelligence (ABU Zaria)", "Machine Learning"],
                    ["Mr. Chibueze Christian Okafor", "Lecturer I", "M.Sc. Computer Science (UNN)", "Programming Languages"],
                    ["Miss Ifeanyi Grace Obinna", "Lecturer II", "M.Sc. Computer Science (Unilag)", "Human-Computer Interaction"]
                ],
                support: [
                    ["Mr. Adeniyi Peter Ojo", "Chief Laboratory Technologist", "Computing laboratories and GPU cluster"],
                    ["Miss Peace Ihedo Eze", "Systems Analyst", "Coding lab administration"]
                ],
                ug: [
                    ["B.Sc. Computer Science", "5 years", 80, "Programming, algorithms, systems, AI and software engineering"],
                    ["B.Sc. Software Engineering", "5 years", 60, "Requirements, design, agile delivery and DevOps practice"],
                    ["B.Sc. Computer Science and Education", "5 years", 30, "Computing plus pedagogical training for secondary schools"]
                ],
                pg: [
                    ["M.Sc. Computer Science", "2 years", "Algorithms, computational theory and advanced programming"],
                    ["Ph.D. Software Engineering", "3-5 years", "Large-scale systems, formal methods and software evolution"]
                ],
                short: [
                    ["Diploma in Full-Stack Web Development", "6 months", "HTML, CSS, JavaScript, databases and deployment"],
                    ["Certificate in Python Programming", "3 months", "Programming fundamentals and data handling"]
                ]
            },
            {
                code: "ISS",
                name: "Information Systems",
                image: "images/lecture-hall.jpg",
                hod: "Dr. Chinelo Vivienne Uche",
                summary:
                    "Information Systems links computing with business process, enterprise architecture, business intelligence and enterprise resource planning, supported by SAP and ERP teaching environments.",
                units: ["Enterprise Systems Unit", "Business Intelligence Unit", "Process and Change Management Unit"],
                focus: [
                    "ERP systems implementation and process re-engineering",
                    "Business intelligence dashboards and decision support",
                    "Digital transformation of public and private organisations",
                    "Health information systems and interoperability"
                ],
                staff: [
                    ["Dr. Chinelo Vivienne Uche", "Reader / Head of Department", "Ph.D. Information Systems (UNN); M.Sc. 2001", "Enterprise Systems"],
                    ["Dr. Olusola Bamidele Akinjide", "Senior Lecturer", "Ph.D. Information Systems (UI)", "Business Intelligence"],
                    ["Mr. Uzodinma Kingsley Obi", "Lecturer I", "M.Sc. Information Systems (Unilag)", "Enterprise Architecture"],
                    ["Miss Habibat Eniola Ogunleye", "Lecturer II", "M.Sc. Information Systems (ABU Zaria)", "Process Management"],
                    ["Mr. Sadiu Ahmed Suleiman", "Lecturer II", "M.Sc. Computer Science (UI)", "Systems Analysis"]
                ],
                support: [
                    ["Miss Oluwakemi Bosede Lawal", "Administrative Officer", "ERP laboratory and records"],
                    ["Mr. Emeka Kingsley Uche", "Laboratory Attendant", "SAP training environment"]
                ],
                ug: [
                    ["B.Sc. Information Systems", "5 years", 60, "Systems analysis, databases, ERP and business process"],
                    ["B.Sc. Business Information Systems", "5 years", 40, "Computing applied to finance, marketing and operations"],
                    ["B.Sc. Information Technology", "5 years", 50, "IT infrastructure, support, networking and web systems"]
                ],
                pg: [
                    ["M.Sc. Information Systems", "2 years", "Enterprise architecture, governance and digital transformation"],
                    ["Ph.D. Information Systems", "3-5 years", "Business intelligence, decision support and IS research methods"]
                ],
                short: [
                    ["Diploma in Enterprise Resource Planning", "6 months", "SAP fundamentals, configuration and process mapping"],
                    ["Certificate in Business Intelligence", "3 months", "Data warehousing, Power BI and analytics"]
                ]
            },
            {
                code: "CYB",
                name: "Cybersecurity and Network Engineering",
                image: "images/research-office.jpg",
                hod: "Dr. Peter Olufemi Bankole",
                summary:
                    "Cybersecurity and Network Engineering operates a dedicated cyber range where students practise attack detection, digital forensics and defensive hardening under supervision.",
                units: ["Network Engineering Unit", "Cyber Security and Forensics Unit", "Cryptography Unit"],
                focus: [
                    "Cyber range and digital forensics practice",
                    "Critical Information Infrastructure protection",
                    "Wireless and satellite network planning",
                    "Security operations centres and incident response"
                ],
                staff: [
                    ["Dr. Peter Olufemi Bankole", "Reader / Head of Department", "Ph.D. Computer Science (UI); CISM, CEH", "Cyber Security"],
                    ["Prof. Ayoola Olabisi Gbadero", "Professor", "Ph.D. Information Technology (ABU Zaria)", "Networking"],
                    ["Dr. Maryam Chinyere Nwosu", "Senior Lecturer", "Ph.D. Cyber Security (UNN); CISSP", "Digital Forensics"],
                    ["Mr. Gabriel Otu James", "Lecturer I", "M.Sc. Cybersecurity (University of Ilorin)", "Network Security"],
                    ["Miss Halima Garba Yusuf", "Lecturer II", "M.Sc. Information Technology (ABU Zaria)", "Applied Cryptography"]
                ],
                support: [
                    ["Mr. Sadiu Ahmed Suleiman", "Network Engineer", "Cyber range infrastructure"],
                    ["Mr. Charles Obinna Nweke", "Technical Assistant", "Security laboratory and patching"]
                ],
                ug: [
                    ["B.Sc. Cybersecurity", "5 years", 50, "Defensive security, forensics, cryptography and assurance"],
                    ["B.Sc. Network Engineering", "5 years", 40, "Network design, routing, switching and cloud networking"]
                ],
                pg: [
                    ["M.Sc. Cybersecurity", "2 years", "Threat intelligence, incident response and digital forensics"],
                    ["Ph.D. Information Security", "3-5 years", "Cryptanalysis, security models and secure computation"]
                ],
                short: [
                    ["Certificate in Ethical Hacking and Pen-Testing", "3 months", "Penetration testing, reporting and legal frameworks"],
                    ["Diploma in Network Infrastructure", "6 months", "Routing, switching and network troubleshooting"]
                ]
            },
            {
                code: "DSA",
                name: "Data Science and Artificial Intelligence",
                image: "images/engineering-lab.jpg",
                hod: "Dr. Zainab Bello Yakubu",
                summary:
                    "Data Science and Artificial Intelligence combines statistics, machine learning and software engineering to build graduates who can design data pipelines, train models and deploy them responsibly.",
                units: ["Machine Learning Unit", "Data Engineering Unit", "Responsible AI and Ethics Unit"],
                focus: [
                    "Machine learning for agriculture, health and finance",
                    "Natural language processing for Nigerian languages",
                    "Data engineering, streaming and large-scale storage",
                    "Responsible AI, model governance and bias auditing"
                ],
                staff: [
                    ["Dr. Zainab Bello Yakubu", "Reader / Head of Department", "Ph.D. Artificial Intelligence (ABU Zaria); M.Sc. 2002", "Machine Learning"],
                    ["Prof. Nkemdilim Uchenna Obiora", "Professor", "Ph.D. Computer Science (UI)", "Artificial Intelligence"],
                    ["Dr. Rasheed Olayinka Akinlabi", "Senior Lecturer", "Ph.D. Statistics (University of Ilorin)", "Statistical Modelling"],
                    ["Miss Oluwakemi Temitope Durojaiye", "Lecturer I", "M.Sc. Data Science (UNILAG)", "Data Engineering"],
                    ["Mr. Emmanuel Cudjoe Nkemelu", "Lecturer II", "M.Sc. Statistics (ABU Zaria)", "Applied Analytics"]
                ],
                support: [
                    ["Miss Maryam Hassan Danladi", "Web Administrator", "AI compute cluster and dashboards"],
                    ["Mr. Chidozie Obinna Madu", "Laboratory Attendant", "Model deployment sandbox"]
                ],
                ug: [
                    ["B.Sc. Data Science", "5 years", 60, "Statistics, programming, machine learning and visualisation"],
                    ["B.Sc. Artificial Intelligence and Robotics", "5 years", 50, "AI models, robotics, computer vision and ethics"]
                ],
                pg: [
                    ["M.Sc. Data Science", "2 years", "Machine learning, deep learning and big-data platforms"],
                    ["Ph.D. Artificial Intelligence", "3-5 years", "Machine learning theory, robotics and responsible AI"]
                ],
                short: [
                    ["Certificate in Machine Learning for Beginners", "3 months", "Supervised learning, models and evaluation"],
                    ["Diploma in Data Engineering", "6 months", "Pipelines, warehousing, orchestration and cloud"]
                ]
            }
        ]
    },

    /* ================================================
       4. SCHOOL OF ENVIRONMENTAL STUDIES
       ================================================ */
    {
        id: "sen",
        code: "SEN",
        name: "School of Environmental Studies",
        icon: "fa-leaf",
        image: "images/environment.jpg",
        tagline: "Managing Osun's watershed, wetlands, coast and climate",
        summary:
            "Set within a region of cascading waterfalls, forest reserves and river systems, the School of Environmental Studies trains professionals in environmental management, water resources, environmental health and climate technology.",
        dean: {
            name: "Professor Olayinka Abiodun Falade",
            title: "Dean, School of Environmental Studies",
            qual: "Ph.D. Environmental Science (University of Ibadan); FNES, FISO",
            area: "Water Quality and Environmental Modelling"
        },
        departments: [
            {
                code: "ESM",
                name: "Environmental Science and Management",
                image: "images/campus-dam.jpg",
                hod: "Dr. Folake Adunniyi Balogun",
                summary:
                    "Environmental Science and Management addresses ecosystem conservation, pollution control, waste management, impact assessment and sustainable development in the context of the Osun and Ogun river basins.",
                units: ["Ecology and Conservation Unit", "Pollution and Waste Management Unit", "Sustainable Development Unit"],
                focus: [
                    "Biodiversity surveys in the Osun river basin",
                    "Solid and liquid waste management systems",
                    "Environmental impact assessment of development projects",
                    "Ecohydrology and watershed restoration"
                ],
                staff: [
                    ["Dr. Folake Adunniyi Balogun", "Reader / Head of Department", "Ph.D. Environmental Science (UI)", "Ecotoxicology"],
                    ["Prof. Olusegun Temitope Akinola", "Professor", "Ph.D. Ecology (ABU Zaria); FES", "Conservation Biology"],
                    ["Dr. Bamidele Olayinka Adediran", "Senior Lecturer", "Ph.D. Environmental Management (Unilorin)", "Waste Management"],
                    ["Miss Tosin Ayobami Adeleke", "Lecturer I", "M.Sc. Environmental Science (UI)", "Ecology"],
                    ["Mr. Sunday Segun Bamgbose", "Lecturer II", "M.Sc. Environmental Science (UNN)", "Impact Assessment"]
                ],
                support: [
                    ["Mr. Rafiu Oluwakemi Adeyemi", "Field Officer", "Field sampling and transect surveys"],
                    ["Miss Grace Chidozie Anyaoku", "Administrative Officer", "Departmental administration"]
                ],
                ug: [
                    ["B.Sc. Environmental Science and Management", "5 years", 60, "Ecology, pollution control, waste and sustainability"],
                    ["B.Sc. Ecology and Conservation Biology", "5 years", 40, "Biodiversity, protected areas and field ecology"]
                ],
                pg: [
                    ["M.Sc. Environmental Science", "2 years", "Ecotoxicology, modelling and environmental management"],
                    ["Ph.D. Ecology and Biodiversity", "3-5 years", "Conservation biology and long-term ecosystem monitoring"]
                ],
                short: [
                    ["Certificate in Environmental Impact Assessment", "3 months", "EIA methodology, reporting and permitting"],
                    ["Diploma in Waste Management", "6 months", "Waste systems, recycling and regulatory compliance"]
                ]
            },
            {
                code: "WRH",
                name: "Water Resources and Hydrology",
                image: "images/engineering2.jpg",
                hod: "Dr. Abdul-Rahim Hassan Bello",
                summary:
                    "Water Resources and Hydrology studies surface water, groundwater, dams and water supply, with field instrumentation on the Ifewara dam and links to the Federal Ministry of Water Resources.",
                units: ["Hydrology and Water Quality Unit", "Groundwater and Hydrogeology Unit", "Water Supply Engineering Unit"],
                focus: [
                    "Stream gauging and catchment monitoring",
                    "Groundwater assessment for borehole programmes",
                    "Irrigation water needs and small dam design",
                    "Flood risk mapping and drought early warning"
                ],
                staff: [
                    ["Dr. Abdul-Rahim Hassan Bello", "Reader / Head of Department", "Ph.D. Hydrology (ABU Zaria); M.Sc. 2000", "Hydrology"],
                    ["Prof. Chukwudi Chidiebere Okafor", "Professor", "Ph.D. Water Resources Engineering (UI)", "Water Supply"],
                    ["Dr. Hauwa Garba Yusuf", "Senior Lecturer", "Ph.D. Hydrogeology (University of Ilorin)", "Groundwater"],
                    ["Mr. Yinka Olumide Bankole", "Lecturer I", "M.Sc. Water Resources Engineering (UI)", "Irrigation"],
                    ["Miss Amina Shehu Musa", "Lecturer II", "M.Sc. Hydrology (ABU Zaria)", "Water Quality"]
                ],
                support: [
                    ["Engr. Monday Chukwudi Eze", "Laboratory Technologist", "Water quality laboratory and gauging kits"],
                    ["Mr. Ibrahim Shehu Musa", "Field Assistant", "Gauge stations and dam sampling"]
                ],
                ug: [
                    ["B.Sc. Water Resources and Hydrology", "5 years", 50, "Hydrology, water quality, dams and supply systems"],
                    ["B.Sc. Hydrogeology and Groundwater Studies", "5 years", 30, "Aquifer systems, boreholes and water security"]
                ],
                pg: [
                    ["M.Sc. Hydrology and Water Resources", "2 years", "Catchment modelling, dams and water planning"],
                    ["Ph.D. Hydrogeology", "3-5 years", "Groundwater systems, sustainability and contaminant transport"]
                ],
                short: [
                    ["Certificate in Borehole Siting and Development", "3 months", "Hydrogeological survey, siting and testing"],
                    ["Diploma in Irrigation Technology", "6 months", "Irrigation systems design and maintenance"]
                ]
            },
            {
                code: "EHS",
                name: "Environmental Health and Safety",
                image: "images/students-campus.jpg",
                hod: "Dr. Ronke Ifeoma Balogun-Williams",
                summary:
                    "Environmental Health and Safety is the professional home of Environmental Health Officers: occupational safety, food hygiene, sanitation, health impact assessment and occupational toxicology.",
                units: ["Occupational Health and Safety Unit", "Food Hygiene and Sanitation Unit", "Community Health Impact Unit"],
                focus: [
                    "Occupational exposure monitoring in industries",
                    "Food safety inspection and HACCP audit",
                    "Community sanitation and water quality surveillance",
                    "Risk assessment and emergency response planning"
                ],
                staff: [
                    ["Dr. Ronke Ifeoma Balogun-Williams", "Reader / Head of Department", "Ph.D. Environmental Health (University of Manchester)", "Occupational Health"],
                    ["Dr. Oluwakemi Aishatu Sanni", "Senior Lecturer", "Ph.D. Public Health and Environmental Health (UI)", "Food Hygiene"],
                    ["Mr. Gafar Oluwaseun Bolaji", "Lecturer I", "M.Sc. Environmental Health (ABU Zaria)", "Industrial Hygiene"],
                    ["Miss Bukola Adeola Ayeni", "Lecturer II", "M.Sc. Environmental Health (UNN)", "Sanitation"],
                    ["Mr. Ademola Olawale Fagbemi", "Lecturer II", "M.Sc. Occupational Health (UI)", "Risk Assessment"]
                ],
                support: [
                    ["Miss Hadiza Garba Muhammad", "Laboratory Technologist", "Industrial hygiene laboratory"],
                    ["Mr. Muhammad Sani Yusuf", "Administrative Assistant", "Clerical and records"]
                ],
                ug: [
                    ["B.Sc. Environmental Health and Safety", "5 years", 50, "Occupational safety, sanitation, food hygiene and epidemiology"],
                    ["B.Sc. Occupational Health and Safety", "5 years", 40, "Hazard evaluation, ergonomics and safety management"]
                ],
                pg: [
                    ["M.Sc. Environmental Health", "2 years", "Occupational health, epidemiology and risk management"],
                    ["Ph.D. Occupational Health and Safety", "3-5 years", "Industrial hygiene, toxicology and safety systems"]
                ],
                short: [
                    ["Diploma in Occupational Safety", "6 months", "Hazard identification, PPE and safety systems"],
                    ["Certificate in Food Safety and HACCP", "3 months", "HACCP principles, audits and food hygiene"]
                ]
            },
            {
                code: "CCR",
                name: "Climate Change and Renewable Energy",
                image: "images/agri-solar.jpg",
                hod: "Prof. Eno James Okon",
                summary:
                    "Climate Change and Renewable Energy is Ifewara's green-technology engine, driving solar photovoltaic research, climate data services, biomass energy and the University's carbon-neutral roadmap.",
                units: ["Renewable Energy Systems Unit", "Climate Science and Data Unit", "Carbon Capture and Efficiency Unit"],
                focus: [
                    "Photovoltaic and solar thermal prototyping",
                    "Campus climate monitoring station and data services",
                    "Biomass and biogas conversion for rural communities",
                    "Energy audit and efficiency in public buildings"
                ],
                staff: [
                    ["Prof. Eno James Okon", "Professor / Head of Department", "Ph.D. Renewable Energy (University of Manchester); FNSE", "Energy Systems"],
                    ["Dr. Abimbola Olusegun Fashola", "Reader", "Ph.D. Climate Science (ABU Zaria)", "Climate Modelling"],
                    ["Dr. Oluwakemi Tolulope Ojo", "Senior Lecturer", "Ph.D. Energy Engineering (UI)", "Solar Energy"],
                    ["Mr. Nkemelu Chidozie Uche", "Lecturer I", "M.Sc. Renewable Energy (Unilag)", "Energy Systems Design"],
                    ["Miss Hauwa Bello Usman", "Lecturer II", "M.Sc. Environmental Science (ABU Zaria)", "Climate Data Analytics"]
                ],
                support: [
                    ["Engr. Tobi Olatunji Adebisi", "Chief Engineer", "Solar array and campus energy systems"],
                    ["Miss Ijeoma Ngozi Chukwu", "Administrative Officer", "Departmental records"]
                ],
                ug: [
                    ["B.Sc. Climate Science", "5 years", 40, "Climate systems, remote sensing, modelling and policy"],
                    ["B.Sc. Renewable Energy Technology", "5 years", 50, "Solar, wind, biomass and energy system design"],
                    ["B.Sc. Energy and Environmental Engineering", "5 years", 30, "Energy systems with environmental analysis"]
                ],
                pg: [
                    ["M.Sc. Renewable Energy", "2 years", "Solar, wind, biomass and energy policy"],
                    ["Ph.D. Climate Change Science", "3-5 years", "Climate modelling, adaptation and mitigation"]
                ],
                short: [
                    ["Certificate in Solar System Installation", "3 months", "Design, installation, servicing and safety"],
                    ["Diploma in Energy Auditing", "6 months", "Energy management, audits and efficiency measures"]
                ]
            }
        ]
    },

    /* ================================================
       5. SCHOOL OF ENGINEERING
       ================================================ */
    {
        id: "seg",
        code: "SEG",
        name: "School of Engineering",
        icon: "fa-gears",
        image: "images/engineering2.jpg",
        tagline: "Engineering talent for industrialisation and infrastructure",
        summary:
            "The School of Engineering is the largest school in the University, supported by fabrication workshops, a materials-testing laboratory, a fluid mechanics laboratory, a 500-seat innovation studio and a central engineering workshop.",
                dean: {
            name: "Prof. Olusola Kayode Adebayo",
            title: "Dean, School of Engineering",
            qual: "Ph.D. Mechanical Engineering (Imperial College London); FNME, FIMechE",
            area: "Thermodynamics and Energy Systems"
        },
        departments: [
            {
                code: "MEE",
                name: "Mechanical Engineering",
                image: "images/engineering-lab.jpg",
                hod: "Prof. Olusola Kayode Adebayo",
                summary:
                    "Mechanical Engineering covers thermodynamics, fluid mechanics, design, manufacturing, mechatronics and robotics, with a central fabrication workshop where students machine, weld and cast components.",
                units: ["Thermal and Energy Systems Unit", "Design and Manufacturing Unit", "Mechatronics and Robotics Unit"],
                focus: [
                    "Solar thermal and low-carbon energy systems",
                    "Design and manufacture of agricultural machinery",
                    "Industrial robotics and automation",
                    "Composite materials and additive manufacturing"
                ],
                staff: [
                    ["Prof. Olusola Kayode Adebayo", "Professor / Head of Department", "Ph.D. Mechanical Engineering (Imperial College); FNME", "Thermodynamics"],
                    ["Dr. Oluwaseun Kayode Adeleke", "Reader", "Ph.D. Mechanical Engineering (UI); M.Sc. 1998", "Manufacturing"],
                    ["Dr. Aisha Saidu Yusuf", "Senior Lecturer", "Ph.D. Mechatronics (University of Ilorin)", "Robotics and Automation"],
                    ["Engr. Bamidele Sunday Adewale", "Lecturer I", "M.Sc. Mechanical Engineering (ABU Zaria)", "Fluid Mechanics"],
                    ["Mr. Emeka Uzodinma Nwankwo", "Lecturer II", "M.Sc. Mechanical Engineering (UNN)", "Machine Design"]
                ],
                support: [
                    ["Engr. Rasheed Ayinde Balogun", "Senior Technician", "Fabrication workshop and CNC machine tools"],
                    ["Mr. Emmanuel Chukwudi Anyanwu", "Workshop Attendant", "Tool store and workshop safety"]
                ],
                ug: [
                    ["B.Eng. Mechanical Engineering", "5 years", 80, "Design, thermo-fluids, manufacturing and machines"],
                    ["B.Eng. Mechatronics and Robotics", "5 years", 40, "Control, automation, robotics and PLC systems"]
                ],
                pg: [
                    ["M.Sc. Mechanical Engineering", "2 years", "Thermal systems, design and energy conversion"],
                    ["Ph.D. Manufacturing Engineering", "3-5 years", "Materials processing, automation and production systems"]
                ],
                short: [
                    ["Diploma in CNC Machining", "6 months", "Machine operation, tooling and CAD/CAM"],
                    ["Certificate in Solidworks and CAD", "3 months", "3D mechanical design and product drawing"]
                ]
            },
            {
                code: "EEE",
                name: "Electrical and Electronic Engineering",
                image: "images/research-lab.jpg",
                hod: "Prof. Yaw Oteng Osei",
                summary:
                    "Electrical and Electronic Engineering runs high-voltage, power-systems and microelectronics laboratories, and operates a grid-connected solar mini-grid demonstration project on campus.",
                units: ["Power Systems Unit", "Electronics and Microelectronics Unit", "Telecommunications Unit"],
                focus: [
                    "Smart grid, metering and distribution systems",
                    "Embedded systems and sensor networks",
                    "Telecommunications and radio planning",
                    "Power electronics and drives for agriculture"
                ],
                staff: [
                    ["Prof. Yaw Oteng Osei", "Professor / Head of Department", "Ph.D. Electrical Engineering (Kumasi); FNSE", "Power Systems"],
                    ["Dr. Oladapo Femi Afolayan", "Reader", "Ph.D. Telecommunications Engineering (UI)", "Telecommunications"],
                    ["Dr. Ngozi Adaeze Onyeka", "Senior Lecturer", "Ph.D. Microelectronics (UNN); M.Sc. 2001", "Embedded Systems"],
                    ["Mr. Sadiu Garba Abubakar", "Lecturer I", "M.Sc. Electrical Engineering (ABU Zaria)", "Power Electronics"],
                    ["Miss Bolanle Tolulope Ojo", "Lecturer II", "M.Sc. Electronics and Communication (UI)", "Signal Processing"]
                ],
                support: [
                    ["Mr. Ayodeji Babatunde Afolabi", "Chief Technician", "High-voltage and electrical installations"],
                    ["Mr. Azeez Oladapo Salami", "Electrical Technician", "Mini-grid and laboratory wiring"]
                ],
                ug: [
                    ["B.Eng. Electrical and Electronic Engineering", "5 years", 80, "Circuits, machines, power, control and electronics"],
                    ["B.Eng. Telecommunications Engineering", "5 years", 50, "Digital communication, mobile networks and fibre optics"],
                    ["B.Eng. Computer and Electronic Engineering", "5 years", 30, "Embedded hardware, firmware and system design"]
                ],
                pg: [
                    ["M.Sc. Electrical Engineering", "2 years", "Power systems, control and power electronics"],
                    ["Ph.D. Telecommunications Engineering", "3-5 years", "Wireless networks, spectrum and next-generation systems"]
                ],
                short: [
                    ["Diploma in Electrical Installation", "6 months", "Wiring, installation standards and safety"],
                    ["Certificate in Solar Power Systems", "3 months", "Off-grid and grid-tied solar design"]
                ]
            },
            {
                code: "CWR",
                name: "Civil and Water Resources Engineering",
                image: "images/campus-view.jpg",
                hod: "Dr. Olumide Sunday Ogunbanjo",
                summary:
                    "Civil and Water Resources Engineering trains builders and designers with a heavy emphasis on the built environment of Osun State: roads, drainage, housing, bridges and water supply.",
                units: ["Structural Engineering Unit", "Geotechnical and Materials Unit", "Water Resources and Transportation Unit"],
                focus: [
                    "Low-cost housing and building materials innovation",
                    "Road condition survey and pavement design",
                    "River training, drainage and flood control",
                    "Construction project management and BIM"
                ],
                staff: [
                    ["Dr. Olumide Sunday Ogunbanjo", "Reader / Head of Department", "Ph.D. Civil Engineering (UI); MNSE", "Structural Engineering"],
                    ["Prof. Oluwafemi Sunday Adeoye", "Professor", "Ph.D. Geotechnical Engineering (UNILAG)", "Geotechnics"],
                    ["Dr. Zuwaira Yusuf Abubakar", "Senior Lecturer", "Ph.D. Water Resources Engineering (ABU Zaria)", "Hydraulics"],
                    ["Mr. Segun Oluwaseun Akande", "Lecturer I", "M.Sc. Civil Engineering (UI)", "Transportation"],
                    ["Miss Hadiza Muhammed Bello", "Lecturer II", "M.Sc. Construction Management (Unilorin)", "Project Management"]
                ],
                support: [
                    ["Arc. Nnamdi Obinna Nwosu", "Senior Technologist", "Materials testing and structural laboratory"],
                    ["Mr. Yakubu Umar Salami", "Field Survey Assistant", "Chainage, levels and setting out"]
                ],
                ug: [
                    ["B.Eng. Civil Engineering", "5 years", 80, "Structures, geotechnics, materials, transport and drainage"],
                    ["B.Eng. Water Resources Engineering", "5 years", 50, "Hydrology, hydraulics, water supply and irrigation"],
                    ["B.Sc. Quantity Surveying", "5 years", 50, "Construction measurement, cost control and contracts"]
                ],
                pg: [
                    ["M.Sc. Civil Engineering", "2 years", "Structures, materials and infrastructure design"],
                    ["Ph.D. Water Resources Engineering", "3-5 years", "Dam safety, river engineering and water management"]
                ],
                short: [
                    ["Diploma in Building Technology", "6 months", "Construction materials, drawing and site practice"],
                    ["Certificate in AutoCAD and Civil Drafting", "3 months", "Computer-aided drafting and setting out"]
                ]
            },
            {
                code: "CME",
                name: "Chemical and Materials Engineering",
                image: "images/science-lab.jpg",
                hod: "Dr. Nkechi Adaugo Uche",
                summary:
                    "Chemical and Materials Engineering processes raw materials into usable products, with pilot plants for extraction, purification, polymer processing and materials characterisation.",
                units: ["Separation and Process Unit", "Polymer and Materials Unit", "Electrochemistry and Corrosion Unit"],
                focus: [
                    "Extraction and processing of local minerals",
                    "Polymer composites and biodegradable packaging",
                    "Corrosion control in water and oil systems",
                    "Industrial effluent treatment and reuse"
                ],
                staff: [
                    ["Dr. Nkechi Adaugo Uche", "Reader / Head of Department", "Ph.D. Chemical Engineering (UNN); M.Sc. 2000", "Separation Processes"],
                    ["Prof. Ayodele Olawale Adepoju", "Professor", "Ph.D. Materials Science and Engineering (UI)", "Polymer Materials"],
                    ["Dr. Oluwaseun Segun Akinola", "Senior Lecturer", "Ph.D. Electrochemistry (ABU Zaria)", "Corrosion Engineering"],
                    ["Mr. Adewale Olusegun Akinlabi", "Lecturer I", "M.Sc. Chemical Engineering (UI)", "Process Design"],
                    ["Miss Blessing Ihuoma Nwosu", "Lecturer II", "M.Sc. Materials Engineering (UNILAG)", "Characterisation"]
                ],
                support: [
                    ["Mr. Emeka Chidera Obi", "Chief Laboratory Technologist", "Pilot plant and materials characterisation"],
                    ["Mr. Chukwuemeka Onyeka Nwosu", "Process Technician", "Pilot plant operations and safety"]
                ],
                ug: [
                    ["B.Eng. Chemical Engineering", "5 years", 60, "Mass transfer, reaction engineering and process design"],
                    ["B.Eng. Materials and Polymer Engineering", "5 years", 40, "Materials synthesis, testing and product development"]
                ],
                pg: [
                    ["M.Sc. Chemical Engineering", "2 years", "Process simulation, separation and process safety"],
                    ["Ph.D. Materials Science and Engineering", "3-5 years", "Advanced materials, composites and degradation"]
                ],
                short: [
                    ["Certificate in Polymer Processing", "3 months", "Injection moulding, extrusion and testing"],
                    ["Diploma in Industrial Effluent Management", "6 months", "Effluent treatment, reuse and compliance"]
                ]
            }
        ]
    }
];

/* ---------------------------------------------------------
   GOVERNANCE STRUCTURES
   --------------------------------------------------------- */

const GOVERNANCE_BODIES = [
    {
        name: "The University Council (Governing Council)",
        icon: "fa-users-gear",
        role: "The supreme governing body of the University. It approves policy, budget, appointments of officers, major capital projects and the creation of new academic and administrative units.",
        meets: "Meets at least twice a year, ordinarily in March and September.",
        members: [
            "Chairperson (a person of eminence in the public and private sectors)",
            "Pro-Chancellor of the University (ex officio)",
            "Vice-Chancellor (Secretary to Council)",
            "Three (3) representatives of the Osun State Government",
            "Two (2) representatives of the Federal Ministry of Education",
            "Two (2) representatives of the National Universities Commission",
            "Two (2) representatives of the Alumni Association",
            "Two (2) representatives of the University staff",
            "Two (2) representatives of the Students' Union",
            "One (1) representative of each of the five Schools",
            "One (1) representative of the Donor/Friends of the University"
        ]
    },
    {
        name: "The University Senate",
        icon: "fa-landmark",
        role: "The academic and administrative authority of the University, chaired by the Vice-Chancellor. It approves academic programmes, regulations, examinations and the award of degrees, and disciplines academic staff.",
        meets: "Meets monthly during the academic session.",
        members: [
            "Vice-Chancellor (Chairman)",
            "Deputy Vice-Chancellors",
            "Provost, Postgraduate School (Secretary)",
            "Registrar (Secretary to Senate)",
            "University Bursar",
            "University Librarian",
            "All five Deans of Schools",
            "All Heads of Department",
            "Director, Academic Planning",
            "Director, Quality Assurance",
            "Two (2) representatives of academic staff elected by Senate",
            "Two (2) student representatives elected by the Students' Union",
            "Director, Health Services (in attendance)"
        ]
    },
    {
        name: "University Executive Committee (UExtCom)",
        icon: "fa-gauge-high",
        role: "A sub-committee of Senate that handles urgent operational matters between Senate meetings and reports to Senate for ratification.",
        meets: "Meets fortnightly during the session.",
        members: [
            "Vice-Chancellor (Chairman)",
            "Deputy Vice-Chancellors (Academic and Administration)",
            "Registrar (Secretary)",
            "University Bursar",
            "Provost, Postgraduate School",
            "Dean of Students"
        ]
    },
    {
        name: "Board of Trustees / Friends of the University",
        icon: "fa-hand-holding-heart",
        role: "Mobilises donations, endowment and advocacy for the University. The Board approves the annual development budget and reports to Council.",
        meets: "Meets quarterly.",
        members: [
            "Chairperson",
            "Three (3) life members",
            "Three (3) representatives of donor organisations",
            "Two (2) representatives of the Alumni Association",
            "Registrar (Secretary)"
        ]
    },
    {
        name: "University Committees",
        icon: "fa-clipboard-check",
        role: "Standing and ad-hoc committees appointed by Council or Senate to handle specific functions of University governance.",
        meets: "As constituted by the appointing authority.",
        members: [
            "Post-UTME Screening and Admissions Committee",
            "Examination and Results Committee",
            "Board of Studies (one per department)",
            "Academic Appeals Committee",
            "Student Disciplinary Committee",
            "Committee for the Award of Distinction",
            "Health and Safety Committee",
            "Publications and Ethics Committee",
            "Committee on Staff Welfare",
            "Committee on Information and Publications",
            "Internal Control and Compliance Committee"
        ]
    }
];

/* ---------------------------------------------------------
   ADMISSIONS
   --------------------------------------------------------- */

const ADMISSION_ROUTES = [
    {
        code: "UTME",
        title: "UTME / JAMB (Full-time Undergraduate)",
        icon: "fa-graduation-cap",
        duration: "5 years",
        summary: "For candidates who sat the Unified Tertiary Matriculation Examination and selected the University of Ifewara as first or second choice.",
        requirements: [
            "Five (5) O-Level/WAEC/NECO/NABTEB/NANDB credits in one sitting",
            "At least five (5) passes including English Language and Mathematics",
            "UTME score in line with the departmental cut-off",
            "Age: 18 years or above on registration",
            "Nationality: Nigerian or international student with valid passport"
        ],
        stages: [
            "Choose UNIFEWARA as first or second choice in the JAMB portal",
            "Provisional admission offered through the JAMB Central Admission System (CAS)",
            "Accept the offer and pay acceptance fee online",
            "Upload acceptance letter and print examination slip",
            "Report for screening and matriculation on campus"
        ]
    },
    {
        code: "DE",
        title: "Post-UTME Screening",
        icon: "fa-file-signature",
        duration: "1 day",
        summary: "All successful UTME candidates are required to take the University post-UTME screening exercise before final registration.",
        requirements: [
            "Valid JAMB result and UTME slip",
            "O-Level result or equivalent",
            "Printable Post-UTME examination slip",
            "Arrival at the scheduled examination hall 30 minutes before the exam"
        ],
        stages: [
            "Register and obtain an examination number online",
            "Obtain and print the examination slip",
            "Sit the screening examination",
            "Check the screening result through the admission portal"
        ]
    },
    {
        code: "DIRECT",
        title: "Direct Entry",
        icon: "fa-arrow-right-arrow-left",
        duration: "5 years",
        summary: "For candidates with NECO/NABTEB A-Level, OND/HND/NND, NCE, City & Guilds or equivalent diplomas in relevant subjects.",
        requirements: [
            "OND/HND/NND at Lower Division with at least four (4) passes",
            "NABTEB/NECO A-Level with grades in three (3) subjects",
            "NCE with Grade I, II or III",
            "City and Guilds certificate in a relevant trade",
            "Age: 17 years and above for candidates with Advanced Level"
        ],
        stages: [
            "Apply directly online using the Direct Entry application form",
            "Upload scanned certificates and transcripts",
            "Sit the post-UTME screening where required",
            "Attend the compulsory one-semester Pre-Degree programme",
            "Matriculate on success of the programme"
        ]
    },
    {
        code: "PREDEGREE",
        title: "Pre-Degree / Foundation Programme",
        icon: "fa-graduation-cap",
        duration: "1 semester",
        summary: "A compulsory bridging programme for Direct Entry candidates who do not yet meet the Mathematics and English requirements of their chosen department.",
        requirements: [
            "Admission into the Pre-Degree programme after Direct Entry screening",
            "Credit in Basic Mathematics at O-Level or equivalent",
            "Credit in English Language at O-Level or equivalent"
        ],
        stages: [
            "Attend lectures in Mathematics, English and Computer Studies",
            "Sit end-of-programme examinations",
            "Pass all three (3) courses to be admitted into the department",
            "Proceed to 100 level of the degree programme"
        ]
    },
    {
        code: "PG",
        title: "Postgraduate Programmes",
        icon: "fa-book-open",
        duration: "1-5 years",
        summary: "Open to holders of Bachelor's degree with at least Second Class Upper or equivalent (for M.Sc./M.Eng.) and Third Class plus a First or Second Class (for Ph.D.).",
        requirements: [
            "B.Sc./B.Eng. degree from a recognised university with at least 2:1",
            "For Ph.D.: a first degree plus an M.Sc./M.Eng. with at least 2:1",
            "A valid JAMB registration number is not required for PG applicants",
            "Five (5) relevant O-Level credits including English Language",
            "Applicants may apply with a current final-year result pending graduation"
        ],
        stages: [
            "Register an account on the postgraduate admission portal",
            "Complete the online application form and upload credentials",
            "Pay the application fee and submit a research proposal where required",
            "Sit the written aptitude test and oral interview",
            "Accept the offer, pay acceptance and tuition fees",
            "Register and receive course allocation"
        ]
    },
    {
        code: "IL",
        title: "International Students",
        icon: "fa-globe",
        duration: "5 years",
        summary: "A dedicated admissions window for students from outside Nigeria, with NUC, NCAA and institutional admissions support.",
        requirements: [
            "Senior Secondary School Certificate / O-Level with good passes",
            "International equivalent of UTME or a recognised aptitude test",
            "Valid passport with at least six months validity",
            "Evidence of financial capacity and medical fitness",
            "English language proficiency evidence where applicable"
        ],
        stages: [
            "Apply through the international students portal or an approved agent",
            "Upload academic credentials for evaluation",
            "Receive a conditional offer with an assessment report",
            "Pay tuition and issue the acceptance letter for visa application",
            "Obtain the Nigerian student visa (NNS/NAFDAC / NUC letter) and report for registration"
        ]
    }
];

const ADMISSION_REQUIREMENTS = {
    undergraduate: [
        { title: "O-Level / SSCE / NECO", text: "Minimum of five (5) credits obtained in one sitting, with at least a grade C (credit) in English Language, Mathematics, Physics, Chemistry and Biology or the relevant subjects." },
        { title: "UTME Score", text: "A minimum score determined annually by the University in consultation with the Joint Admissions and Matriculation Board. Science-based programmes require credit in Mathematics and at least one of Physics, Chemistry or Biology." },
        { title: "Age", text: "Not below 16 years of age for Direct Entry candidates and 18 years for UTME candidates at the time of registration." },
        { title: "Medical Fitness", text: "A medical report from a recognised hospital confirming fitness to study, obtained at the University Health Centre on registration." },
        { title: "Character Declaration", text: "A signed declaration of good character and a completed medical form at the point of matriculation." }
    ],
    postgraduate: [
        { title: "First Degree", text: "At least a Second Class Upper (2:1) or equivalent from a recognised university for M.Sc., M.Eng. and M.Tech. programmes." },
        { title: "Doctoral Qualification", text: "For Ph.D. applicants: a relevant M.Sc./M.Eng. degree with at least a 2:1 or a strong first degree with a proven research record." },
        { title: "Transcripts", text: "Scanned copies of all certificates, transcripts and NYSC exemption or discharge letters uploaded at the point of application." },
        { title: "Aptitude Test", text: "All PG applicants sit a written aptitude test in the chosen department, followed by a panel oral interview." },
        { title: "Research Proposal", text: "Ph.D. applicants attach a research proposal of not more than four pages, with an abstract, objectives, methodology and expected outcomes." }
    ]
};

const ADMISSION_TIMELINE = [
    { period: "September - October", activity: "JAMB selects UNIFEWARA as one of two choices in the UTME for the session." },
    { period: "October - November", activity: "First Batch Post-UTME screening exercise for UTME candidates." },
    { period: "December", activity: "Second Batch Post-UTME screening exercise; Direct Entry applications open." },
    { period: "January", activity: "International student applications and scholarship applications open." },
    { period: "February - March", activity: "International applications close; Direct Entry screening and Pre-Degree admission." },
    { period: "April", activity: "Matriculation and compulsory Pre-Degree programme for Direct Entry candidates." },
    { period: "May - June", activity: "Second Batch Post-UTME screening; supplementary admission for admitted candidates." },
    { period: "July", activity: "Matriculation, registration and orientation for new undergraduates." },
    { period: "August", activity: "Resumption for returning students and resit examinations." },
    { period: "September", activity: "Lectures begin. Late registration window opens with approved penalties." },
    { period: "October - November", activity: "First semester examinations; mid-semester break." },
    { period: "December - January", activity: "Long vacation; examinations, project supervision and SIWES." },
    { period: "January", activity: "Registration for the second semester." },
    { period: "February - March", activity: "Second semester lectures and end-of-session examinations." },
    { period: "April", activity: "Graduation, convocation and award of degrees for the previous session." },
    { period: "May - June", activity: "Postgraduate applications and aptitude tests." },
    { period: "July", activity: "SIWES and industrial attachment for 400 level students." }
];

const FEES_TABLE = [
    { level: "Undergraduate (Full-time)", arts: "â‚¦75,000 - â‚¦95,000", science: "â‚¦95,000 - â‚¦150,000", tech: "â‚¦110,000 - â‚¦180,000" },
    { level: "Undergraduate (Part-time / Weekend)", arts: "â‚¦95,000 - â‚¦130,000", science: "â‚¦120,000 - â‚¦180,000", tech: "â‚¦140,000 - â‚¦210,000" },
    { level: "Postgraduate (Full-time)", note: "â‚¦150,000 - â‚¦350,000 per programme" },
    { level: "Acceptance Fee", note: "â‚¦10,000 (Federal Tertiary Institution)" },
    { level: "International Students", note: "US$2,500 - US$4,000 per session (including accommodation)" }
];

/* ---------------------------------------------------------
   CAMPUS FACILITIES
   --------------------------------------------------------- */

const FACILITIES = [
    { icon: "fa-building-columns", name: "Central Administration Block", text: "The administrative heart of the University housing the offices of the Vice-Chancellor, Registrar, Bursar and the Directorate of Academic Planning." },
    { icon: "fa-landmark", name: "Senate Building", text: "The chamber of the University Senate where degrees are considered, programmes approved and academic discipline determined." },
    { icon: "fa-book", name: "Hezekiah Oluwasanmi University Library", text: "Over 120,000 volumes, a digital library with remote access for registered students, e-resources, a reading hall and a Book Bank for indigent students." },
    { icon: "fa-flask", name: "Science and Research Laboratories", text: "Chemistry, physics, biology, microbiology and analytical chemistry laboratories with instrumentation, fume hoods and technical support staff." },
    { icon: "fa-tractor", name: "Teaching and Research Farm", text: "Over 40 hectares with crop plots, poultry units, fish ponds, a dam-fed irrigation system, a solar drying complex and demonstration gardens." },
    { icon: "fa-server", name: "Data Centre and Network", text: "On-campus data centre with fibre backbone, 1 Gbps internet, a learning management system, ERP and a 24-hour cyber security operations desk." },
    { icon: "fa-gears", name: "Central Engineering Workshop", text: "Machine tools, welding bays, a foundry section, CNC machine tools and a mechatronics laboratory for hands-on fabrication." },
    { icon: "fa-bolt", name: "Solar Energy Systems", text: "A grid-connected solar mini-grid and rooftop arrays powering teaching laboratories, the ICT centre and rural lighting demonstration units." },
    { icon: "fa-users", name: "Auditorium and Amphitheatre", text: "A 2,000-seat main auditorium, a 3,000-seat open-air amphitheatre and six lecture halls with modern audio-visual equipment." },
    { icon: "fa-house", name: "Halls of Residence", text: "Male and female halls accommodating students, including the International Students' Hall and the Postgraduate Hall. Each hall has a resident warden and 24-hour security." },
    { icon: "fa-dumbbell", name: "Sports and Recreation Centre", text: "Football fields, basketball and volleyball courts, a swimming pool, an indoor games hall and a fitness and gym centre." },
    { icon: "fa-stethoscope", name: "University Health Centre", text: "A staffed health centre with a pharmacy, laboratory, counselling unit and referral linkages to teaching hospitals in Osogbo and Ibadan." },
    { icon: "fa-church", name: "Multi-Faith and Spiritual Centre", text: "Christian, Muslim and traditional worship facilities on campus, together with a chapel, mosque and a meditation garden." },
    { icon: "fa-car", name: "Campus Transport and Parking", text: "Staff and student buses on intercity routes, a campus bus service loop, motorcycle park and paid parking zones." },
    { icon: "fa-store", name: "Commercial and Student Hub", text: "Bookshop, cafeteria, pharmacy, banking hall, ATM, salons, a student union building and the entrepreneurship incubation hub." },
    { icon: "fa-laptop", name: "E-Learning and Distance Learning Centre", text: "A dedicated centre for part-time, weekend and online learners with virtual laboratories, recorded lectures and examination halls." }
];

const CAMPUS_GALLERY = [
    { src: "images/hero-campus.jpg", label: "Main Campus" },
    { src: "images/main-gate.jpg", label: "University Main Gate" },
    { src: "images/admin-block.jpg", label: "Administration Block" },
    { src: "images/senate-building.jpg", label: "Senate Building" },
    { src: "images/library-books.jpg", label: "University Library" },
    { src: "images/auditorium.jpg", label: "Main Auditorium" },
    { src: "images/amphitheatre.jpg", label: "Open-Air Amphitheatre" },
    { src: "images/science-lab.jpg", label: "Teaching Laboratory" },
    { src: "images/engineering-lab.jpg", label: "Engineering Laboratory" },
    { src: "images/computer-lab.jpg", label: "Computer Laboratory" },
    { src: "images/lecture-hall.jpg", label: "Lecture Hall" },
    { src: "images/agriculture.jpg", label: "Teaching Farm" },
    { src: "images/agri-solar.jpg", label: "Solar Drying Complex" },
    { src: "images/campus-dam.jpg", label: "Campus Dam" },
    { src: "images/students-union.jpg", label: "Students Union Building" },
    { src: "images/sport-center.jpg", label: "Sports Centre" },
    { src: "images/graduation.jpg", label: "Graduation Ceremony" },
    { src: "images/students-campus.jpg", label: "Student Life" }
];

const NEWS = [
    { date: "18 September 2026", category: "Admission", title: "Second batch post-UTME screening exercise scheduled for 10 October", text: "All candidates admitted through the UTME route are to report for the compulsory second batch screening exercise with valid JAMB result and O-Level certificate." },
    { date: "02 September 2026", category: "Research", title: "School of Environmental Studies opens campus climate monitoring station", text: "The station records temperature, rainfall, humidity and river discharge data used by the Climate Change and Renewable Energy department for regional forecasting." },
    { date: "21 August 2026", category: "International", title: "University signs partnership with four institutions in East Africa and Europe", text: "The linkages cover joint degrees, staff exchange and a shared technology incubation programme for students from 14 countries." },
    { date: "09 August 2026", category: "Research", title: "Engineering students complete design of solar-powered irrigation for Ifewara farmers", text: "The final-year project delivers a low-cost irrigation controller designed, built and field-tested by Mechanical Engineering students with local fabricators." },
    { date: "25 July 2026", category: "University", title: "Vice-Chancellor presents innovation awards at the Ifewara Technology Exhibition", text: "More than 120 student projects were exhibited, with cash prizes awarded to the best innovations in agriculture, health and energy." }
];

const FAQS = [
    { q: "Is the University of Ifewara a federal or state university?", a: "The University of Ifewara is a public university of technology located in Ifewara, Osun State, Nigeria. It is open to Nigerian and international candidates and operates within the regulatory framework of the National Universities Commission." },
    { q: "What is the minimum O-Level requirement for admission?", a: "Five credits obtained in one sitting, with at least a credit pass in English Language and Mathematics. Science-based programmes also require a credit in Physics, Chemistry and Biology or their equivalents." },
    { q: "Do I need to sit the post-UTME screening examination?", a: "Yes. Every candidate offered provisional admission through the UTME route must sit the University post-UTME screening exercise before final registration." },
    { q: "Can I apply from outside Nigeria?", a: "Yes. International applicants use the international students portal. Successful applicants receive a conditional offer and an acceptance letter needed for visa processing." },
    { q: "Are part-time and distance programmes available?", a: "Yes. The Directorate of Distance Education and E-Learning runs weekend, part-time and fully online programmes for working applicants. Some practical courses require limited campus attendance." },
    { q: "Is accommodation guaranteed for all students?", a: "Accommodation is allocated on a first-come, first-served basis and is not guaranteed. Priority is given to students from outside the locality, international students and students with special needs." },
    { q: "How can I verify the authenticity of my admission?", a: "The University does not charge for admission outside the official portal. Verify your status only on the University admission portal or by contacting the Admissions Office directly." }
];

/* ---------------------------------------------------------
   DERIVED HELPERS
   --------------------------------------------------------- */

function getAllDepartments() {
    const list = [];
    SCHOOLS.forEach(function (school) {
        school.departments.forEach(function (dept) {
            list.push({
                school: school,
                department: dept,
                fullName: school.name + " - " + dept.name
            });
        });
    });
    return list;
}

function countAllAcademicStaff() {
    return SCHOOLS.reduce(function (total, school) {
        return total + school.departments.reduce(function (t, d) {
            return t + d.staff.length;
        }, 0);
    }, 0);
}

function countAllNonTeachingStaff() {
    const dept = SCHOOLS.reduce(function (total, school) {
        return total + school.departments.reduce(function (t, d) {
            return t + d.support.length;
        }, 0);
    }, 0);
    const units = ADMIN_UNITS.reduce(function (t, u) {
        return t + u.members.length;
    }, 0);
    return dept + units;
}

function countAllProgrammes() {
    let total = 0;
    SCHOOLS.forEach(function (school) {
        school.departments.forEach(function (d) {
            total += d.ug.length + d.pg.length + d.short.length;
        });
    });
    return total;
}
