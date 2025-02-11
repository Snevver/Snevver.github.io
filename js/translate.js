// translations.js
const translations = {
    en: {
        // Navbar
        "Over mij": "About me",
        "Mijn Projecten": "My Projects",
        "Skills": "Skills",
        "Contact": "Contact",

        // Header
        "Wie ben ik?": "Who am I?",
        "Hey! Mijn naam is Sven Hoeksema. Ik ben een gepassioneerde backend-web ontwikkelaar met een grote interesse in het worden van een fullstack developer. Momenteel studeer ik aan de BIT Academy, waar ik werk aan innovatieve projecten en moderne technologiën leer. Al sinds kinds af aan ben ik geïnteresseerd in computers en de werking van technologie. Naast programmeren verzorg ik ook graag planten, speel ik gitaar en game ik met vrienden.": "Hey! My name is Sven Hoeksema. I am a passionate backend web developer with a strong interest in becoming a full-stack developer. Currently, I am studying at BIT Academy, where I work on innovative projects and learn about modern technologies. From a young age, I have been fascinated by computers and how technology works. In addition to programming, I also enjoy taking care of plants, playing the guitar, and gaming with friends.",

        // About section text
        "Al sinds kinds af aan ben ik": "Ever since I was a child, I've been",
        "in computers en de werking van technologie. Naast programmeren verzorg ik ook graag": "in computers and how technology works. Besides programming, I also like taking care of",
        "speel ik": "I play",
        "en game ik met": "and I game with",

        // Education
        "Mijn Schoolcarrière": "My Education",
        "HAVO aan het Baken Park Lyceum in Almere": "HAVO at Baken Park Lyceum in Almere",
        "Software Development aan de BIT Academy in Amsterdam": "Software Development at BIT Academy in Amsterdam",

        // Projects section
        "Mijn projecten": "My Projects",
        "In mijn tijd als student bij de": "During my time as a student at",
        "heb ik natuurlijk van alles en nog wat geleerd en ook": "I've learned all sorts of things and also made",
        "veel projecten": "many projects",
        "gemaakt! Hieronder vind je een overzicht van een paar van mijn": "! Below you'll find an overview of some of my",
        "favoriete": "favorite",
        "projecten. Klik op een project om meer": "projects. Click on a project for more",
        "informatie": "information",
        "te krijgen!": "!",

        // Skills section
        "Alle onderstaande benoemde": "All the mentioned",
        "technologiën": "technologies",
        "beheers ik op een": "I master at a",
        "goed niveau": "good level",
        "cirkel diagram": "pie chart",
        "geeft weer in welke taal ik het meeste": "shows in which language I",
        "codeer": "code the most",
        "Mijn": "My",
        "vaardigheden": "skills",

        // Certificates
        "Certificaten": "Certificates",
        "Hier zijn enkele": "Here are some",
        "certificaten": "certificates",
        "te zien die mijn": "that prove my",
        "vaardigheden": "skills",
        "en": "and",
        "prestaties": "achievements",
        "bewijzen": "prove",
        "Bekijk": "View",

        // Contact section
        "Heb je een vraag of wil je contact opnemen?": "Do you have a question or want to get in touch?",
        "Voel je vrij om een email te sturen naar": "Feel free to send an email to",
        "of stuur direct een mail in het onderstaande formulier!": "or send a direct message using the form below!",
        "Ik ben ook altijd bereikbaar op": "I'm also always available on",
        "Stuur een email!": "Send an email!",
        "Uw Naam:": "Your Name:",
        "Uw Email Adres:": "Your Email Address:",
        "Bericht:": "Message:",
        "Verstuur": "Send",
        "Bezig met verzenden...": "Sending...",
        "Uw bericht is verzonden!": "Your message has been sent!",
        "Oops! Er is iets fout gegaan! Probeer het later opnieuw.": "Oops! Something went wrong! Please try again later.",

        // Footer
        "All rights reserved.": "All rights reserved.",
        "Mail system supporterd by": "Mail system supported by"
    }
};

// Language switcher functionality
function initializeLanguageSystem() {
    // Add language switcher to navbar
    const navbarRight = document.querySelector('.container.mx-auto.flex.justify-between.items-center');
    const languageSwitcher = document.createElement('div');
    navbarRight.insertBefore(languageSwitcher, navbarRight.children[1]);

    // Initialize translation attributes
    const translatableElements = document.querySelectorAll('h1, h2, h3, p, a, label, button, span');
    translatableElements.forEach(element => {
        const text = element.textContent.trim();
        if (text && !element.hasAttribute('data-translate')) {
            element.setAttribute('data-translate', '');
            element.setAttribute('data-original', text);
        }
    });

    // Add event listener to language switcher
    document.getElementById('language-switcher').addEventListener('change', (e) => {
        switchLanguage(e.target.value);
        localStorage.setItem('preferred-language', e.target.value);
    });

    // Load preferred language if saved
    const preferredLanguage = localStorage.getItem('preferred-language');
    if (preferredLanguage) {
        document.getElementById('language-switcher').value = preferredLanguage;
        switchLanguage(preferredLanguage);
    }
}

function switchLanguage(language) {
    document.documentElement.setAttribute('lang', language);
    
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const originalText = element.getAttribute('data-original');
        if (language === 'en' && translations.en[originalText]) {
            element.textContent = translations.en[originalText];
        } else if (language === 'nl') {
            element.textContent = element.getAttribute('data-original');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLanguageSystem);