/**
 * Main JavaScript for jjsprojects.online
 * Handles navigation, scroll effects, and general site functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const scrollAnimElements = document.querySelectorAll('.scroll-animation');
    const contactForm = document.getElementById('contact-form');

    // Functions
    
    // Handle header scroll effect
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    // Close mobile menu after clicking a link
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }

    // Smooth scroll to section
    function scrollToSection(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
        
        closeMobileMenu();
    }

    // Highlight active section in navigation
    function highlightActiveSection() {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Handle scroll animations
    function handleScrollAnimations() {
        scrollAnimElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }

    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real implementation, you would send the form data to a server
        // For demonstration, we'll just show a success message
        alert('Message sent successfully! I will get back to you soon.');
        contactForm.reset();
    }

    // Event Listeners
    window.addEventListener('scroll', handleHeaderScroll);
    window.addEventListener('scroll', highlightActiveSection);
    window.addEventListener('scroll', handleScrollAnimations);
    hamburger.addEventListener('click', toggleMobileMenu);
    
    navLinksItems.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Initialize
    handleHeaderScroll();
    highlightActiveSection();
    handleScrollAnimations();

    // Add animation classes to elements on page load
    document.querySelector('.hero-content h1').classList.add('fade-in-delay-1');
    document.querySelector('.hero-content h2').classList.add('fade-in-delay-2');
    document.querySelector('.hero-content p').classList.add('fade-in-delay-3');
    document.querySelector('.hero-content .btn').classList.add('fade-in-delay-4');
    document.querySelector('.hero-content .social-icons').classList.add('fade-in-delay-5');
    document.querySelector('.hero-image').classList.add('scale-in');
}); 