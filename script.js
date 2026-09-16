// ==========================================
// ABAIDULLAH - CYBERSECURITY PORTFOLIO
// ==========================================

const CONFIG = {
    name: "Abaidullah",
    initials: "AU",

    roles: [
        "Cybersecurity Enthusiast",
        "SOC Analyst",
        "IT Security",
        "GRC"
    ],

    email: "abaidullahali92@gmail.com",

    github: "https://github.com/ubi-sec",

    linkedin: "https://www.linkedin.com/in/abaid-ullah-1229492ba/",

    location: "Faisalabad, Pakistan",

    availability: "Open to cybersecurity internship and junior opportunities",

    // Profile links
    htbProfile: "",
    thmProfile: "",

    // Certifications
    certifications: [
        "Google Cybersecurity Professional Certificate — Completed",
        "Cisco Introduction to Cyber Security",
        "Cisco Ethical Hacker",
        "Cisco Help Desk Technician",
        "Python Essentials 1"
    ],

    // Current training
    training: [
        "IBM Ethical Hacking with Open Source Tools Professional Certificate — In Progress",
        "Hack The Box — 6 courses completed",
        "Hack The Box — SOC Level 1 currently studying"
    ],

    // Skills
    skills: [
        "Linux Command Line & Bash",
        "SQL Basics",
        "Network Security Fundamentals",
        "NIST Cybersecurity Framework",
        "SIEM Concepts",
        "Wireshark",
        "Threat & Vulnerability Assessment Basics"
    ],

    // Portfolio statistics
    stats: {
        labsCTF: 6,
        exercisesCompleted: 8,
        certificates: 5,
        inProgress: 1,
        handsOnLab: 7,
        homeLabPractice: 1
    }
};


// ==========================================
// HELPER FUNCTIONS
// ==========================================

function setText(selector, value) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        element.textContent = value;
    });
}


function setLink(selector, url) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        if (url) {
            element.href = url;
            element.target = "_blank";
            element.rel = "noopener noreferrer";
        }
    });
}



// ==========================================
// HELPER FUNCTIONS
// ==========================================

function setText(selector, value) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        element.textContent = value;
    });
}


function setLink(selector, url) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        if (url) {
            element.href = url;
            element.target = "_blank";
            element.rel = "noopener noreferrer";
        }
    });
}


function replacePlaceholder(oldText, newText) {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
    );

    const nodes = [];

    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }

    nodes.forEach(node => {
        if (node.nodeValue && node.nodeValue.includes(oldText)) {
            node.nodeValue = node.nodeValue.replaceAll(
                oldText,
                newText
            );
        }
    });
}


// ==========================================
// UPDATE NAME
// ==========================================

function updateName() {

    const selectors = [
        "#name",
        "#user-name",
        "#hero-name",
        ".name",
        ".user-name",
        ".hero-name",
        "[data-name]"
    ];

    selectors.forEach(selector => {
        setText(selector, CONFIG.name);
    });

    // Fallback for hard-coded placeholder
    replacePlaceholder("Your Name", CONFIG.name);
    replacePlaceholder("YOUR NAME", CONFIG.name);
}


// ==========================================
// UPDATE INITIALS / LOGO
// ==========================================

function updateInitials() {

    const selectors = [
        "#initials",
        ".initials",
        ".logo-initials",
        "[data-initials]"
    ];

    selectors.forEach(selector => {
        setText(selector, CONFIG.initials);
    });

    replacePlaceholder("YN", CONFIG.initials);
}


// ==========================================
// UPDATE ROLE
// ==========================================

function updateRole() {

    const role = "Cybersecurity Enthusiast";

    const selectors = [
        "#role",
        "#hero-role",
        ".role",
        ".hero-role",
        ".job-title",
        ".hero-title",
        "[data-role]"
    ];

    selectors.forEach(selector => {
        setText(selector, role);
    });

    replacePlaceholder("SOC Analyst", role);
}


// ==========================================
// UPDATE LOCATION
// ==========================================

function updateLocation() {

    const selectors = [
        "#location",
        ".location",
        "[data-location]"
    ];

    selectors.forEach(selector => {
        setText(selector, CONFIG.location);
    });

    replacePlaceholder("Your Location", CONFIG.location);
}


// ==========================================
// UPDATE EMAIL
// ==========================================

function updateEmail() {

    const elements = document.querySelectorAll(
        'a[href^="mailto:"], #email, .email, [data-email]'
    );

    elements.forEach(element => {
        element.textContent = CONFIG.email;

        if (element.tagName.toLowerCase() === "a") {
            element.href = `mailto:${CONFIG.email}`;
        }
    });

    replacePlaceholder("your@email.com", CONFIG.email);
}


// ==========================================
// UPDATE GITHUB
// ==========================================

function updateGithub() {

    const selectors = [
        'a[href*="github.com"]',
        "#github",
        ".github",
        "[data-github]"
    ];

    selectors.forEach(selector => {
        setLink(selector, CONFIG.github);
    });
}


// ==========================================
// UPDATE LINKEDIN
// ==========================================

function updateLinkedin() {

    const selectors = [
        'a[href*="linkedin.com"]',
        "#linkedin",
        ".linkedin",
        "[data-linkedin]"
    ];

    selectors.forEach(selector => {
        setLink(selector, CONFIG.linkedin);
    });
}


// ==========================================
// UPDATE AVAILABILITY
// ==========================================

function updateAvailability() {

    const selectors = [
        "#availability",
        ".availability",
        "[data-availability]"
    ];

    selectors.forEach(selector => {
        setText(selector, CONFIG.availability);
    });

    replacePlaceholder(
        "Open to SOC Analyst, IT Security & GRC opportunities",
        CONFIG.availability
    );
}


// ==========================================
// REMOVE FAKE / SAMPLE CONTENT
// ==========================================

function removeFakeContent() {

    const fakeTexts = [
        "Completed TryHackMe room — Intro to SOC Level 1",
        "Finished Google Cybersecurity Professional Certificate",
        "Built a home SOC lab with Security Onion + Splunk",
        "Mapped a sample risk register to the NIST CSF"
    ];

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
    );

    const nodes = [];

    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }

    nodes.forEach(node => {

        const text = node.nodeValue.trim();

        fakeTexts.forEach(fakeText => {

            if (text.includes(fakeText)) {

                const parent = node.parentElement;

                if (parent) {
                    parent.style.display = "none";
                }
            }
        });
    });
}


// ==========================================
// FIX SAMPLE STATS
// ==========================================

function fixStats() {

    // Do not show fake numbers such as 0 projects,
    // 0 certifications, etc. unless they are actually
    // represented correctly by the HTML.

    replacePlaceholder("0+", "");
    replacePlaceholder("0", "");
}


// ==========================================
// INITIALIZE PORTFOLIO
// ==========================================

function initializePortfolio() {

    try {

        updateName();
        updateInitials();
        updateRole();
        updateLocation();
        updateEmail();
        updateGithub();
        updateLinkedin();
        updateAvailability();

        removeFakeContent();

        console.log(
            "Abaidullah portfolio initialized successfully."
        );

    } catch (error) {

        console.error(
            "Portfolio initialization error:",
            error
        );
    }
}


// ==========================================
// RUN AFTER PAGE LOAD
// ==========================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializePortfolio
    );

} else {

    initializePortfolio();
}
