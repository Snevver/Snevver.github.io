// Debounce functie om snelle herhaalde calls te voorkomen
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Bijhouden van huidige taal
let currentLanguage = 'nl';

// Translation data
const translations = {
    en: {
        // Navbar
        "Over mij": "About me",
        "Mijn Projecten": "My Projects",
        "Skills": "Skills",
        "Contact": "Contact",

        // Header
        "Wie ben ik?": "Who am I?",
        "Hey! Mijn naam is": "Hey! My name is",
        "Ik ben een gepassioneerde": "I am a passionate",
        "backend-web ontwikkelaar": "backend web developer",
        "met een grote interesse in het worden van een": "with a strong interest in becoming a",
        "fullstack developer": "full-stack developer",
        "Momenteel studeer ik aan de": "Currently, I am studying at",
        "waar ik werk aan innovatieve projecten en moderne technologiën leer": "where I work on innovative projects and learn about modern technologies",
        "Al sinds kinds af aan ben ik": "Ever since I was a child, I've been",
        "geïnteresseerd": "interested",
        "in computers en de werking van technologie": "in computers and how technology works",
        "Naast programmeren verzorg ik ook graag": "Besides programming, I also like taking care of",
        "planten": "plants",
        "speel ik": "I play",
        "gitaar": "guitar",
        "en game ik met": "and I game with",
        "vrienden": "friends",

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
        "informatie": "information!",

        // Skills section
        "Alle onderstaande benoemde": "All the mentioned",
        "technologiën": "technologies",
        "beheers ik op een": "I master at a",
        "goed niveau": "good level",
        "Het": "The",
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
        "en": "and",
        "prestaties": "achievements",
        "bewijzen": "prove",
        "Bekijk": "View",
        "Dit certificaat heb ik behaald na het succesvol afronden van mijn eerste back-end eindproject.": "I earned this certificate after successfully completing my first back-end final project.",
        "Dit certificaat heb ik behaald na het leren hoe complexe databases in elkaar zitten en hoe ik er zelf mee kan werken.": "I earned this certificate after learning how complex databases work and how to work with them.",
        "Dit certificaat bewijst dat ik zowel front-end als back-end beheers en ze ook kan combineren.": "This certificate proves that I master both front-end and back-end and can combine them.",
        "Dit certificaat heb ik behaald na het bewijzen dat ik zowel HTML als CSS beheer op een gevorderd niveau.": "I earned this certificate after proving that I master both HTML and CSS at an advanced level.",
        "Dit certificaat heb ik behaald na het afronden van de OOP intro module. De eindopdracht van deze module was OOP Blackjack, wat te vinden is tussen mijn projecten.": "I earned this certificate after completing the OOP intro module. The final assignment for this module was OOP Blackjack, which can be found among my projects.",
        "Dit certificaat heb ik behaald na het beheersen van PHP in combinatie met talen als HTML, CSS en MySQL.": "I earned this certificate after mastering PHP in combination with languages like HTML, CSS, and MySQL.",

        // Contact section
        "Heb je een vraag of wil je contact opnemen?": "Do you have a question or want to get in touch?",
        "Voel je vrij om een email te sturen naar": "Feel free to send an email to",
        "of stuur direct een mail in het onderstaande formulier!": "or send a direct message using the form below!",
        "Ik ben ook altijd bereikbaar op": "I'm also always available on",
        "of vind mij op": "or find me on",
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

// Function to switch language
const switchLanguage = debounce((newLang) => {
    // Voorkom onnodige vertaling naar dezelfde taal
    if (newLang === currentLanguage) {
        return;
    }

    try {
        // Reset alle tekst eerst naar originele Nederlandse versie als we van EN naar NL gaan
        if (newLang === 'nl' && currentLanguage === 'en') {
            resetToOriginalDutch();
        }

        // Get all text nodes
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        const processed = new Set();

        while (node = walker.nextNode()) {
            if (node.parentElement.tagName === 'SCRIPT' || !node.textContent.trim()) continue;
            if (processed.has(node)) continue;
            
            processed.add(node);
            const originalText = node.textContent.trim();

            // Vertaal alleen als er daadwerkelijk een vertaling beschikbaar is
            if (newLang === 'en' && translations.en[originalText]) {
                node.textContent = node.textContent.replace(
                    new RegExp(`^${originalText}$`, 'm'),
                    translations.en[originalText]
                );
            }
        }

        // Update formulier elementen
        updateFormElements(newLang);
        
        // Update huidige taal
        currentLanguage = newLang;
        
        // Sla voorkeur op
        localStorage.setItem('preferred-language', newLang);

    } catch (error) {
        console.error('Fout bij het wisselen van taal:', error);
        // Herstel naar laatste werkende staat
        currentLanguage = localStorage.getItem('preferred-language') || 'nl';
    }
}, 250); // 250ms debounce tijd

// Helper function om terug te zetten naar originele Nederlandse tekst
function resetToOriginalDutch() {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    const processed = new Set();

    while (node = walker.nextNode()) {
        if (node.parentElement.tagName === 'SCRIPT' || !node.textContent.trim()) continue;
        if (processed.has(node)) continue;

        processed.add(node);
        const currentText = node.textContent.trim();

        // Zoek de originele Nederlandse tekst
        for (const [dutch, english] of Object.entries(translations.en)) {
            if (currentText.includes(english)) {
                node.textContent = node.textContent.replace(
                    new RegExp(english, 'g'),
                    dutch
                );
            }
        }
    }
}

// Event listener voor de taalwissel knop
document.addEventListener('DOMContentLoaded', () => {
    const languageButton = document.getElementById('language-toggle');
    if (languageButton) {
        languageButton.addEventListener('click', () => {
            const newLang = currentLanguage === 'nl' ? 'en' : 'nl';
            switchLanguage(newLang);
        });
    }

    // Initialiseer met opgeslagen taalvoorkeur
    const savedLang = localStorage.getItem('preferred-language') || 'nl';
    switchLanguage(savedLang);
});