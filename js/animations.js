/**
 * Animations JavaScript for jjsprojects.online
 * Handles scroll-based animations and interactive element animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation elements
    initScrollAnimations();
    initFloatingElements();
    
    // Add intersection observer for animation elements
    observeElements();
});

/**
 * Initialize scroll animations by adding appropriate classes
 */
function initScrollAnimations() {
    // About section animations
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    
    if (aboutImage) aboutImage.classList.add('scroll-animation', 'from-left');
    if (aboutContent) aboutContent.classList.add('scroll-animation', 'from-right');
    
    // Projects section animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('scroll-animation');
        
        // Alternate animation direction for visual interest
        if (index % 2 === 0) {
            card.classList.add('from-left');
        } else {
            card.classList.add('from-right');
        }
        
        // Add slight delay to each card for cascading effect
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Skills section animations
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.classList.add('scroll-animation', 'from-bottom');
        category.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Contact section animations
    const contactForm = document.querySelector('#contact form');
    const contactInfo = document.querySelector('.contact-info');
    
    if (contactForm) contactForm.classList.add('scroll-animation', 'from-left');
    if (contactInfo) contactInfo.classList.add('scroll-animation', 'from-right');
}

/**
 * Initialize floating elements for decorative animations
 */
function initFloatingElements() {
    // Add random movement to floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        // Randomize animation parameters for each shape
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * 5;
        
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;
    });
}

/**
 * Use Intersection Observer to trigger animations when elements come into view
 */
function observeElements() {
    // Set up Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // trigger slightly before element comes into view
    });
    
    // Observe all elements with scroll-animation class
    const animElements = document.querySelectorAll('.scroll-animation');
    animElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add specific animations for skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        // Initially set width to 0
        bar.style.width = '0';
        
        // Create separate observer for skill bars with different options
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate to the width defined in HTML
                    const targetWidth = entry.target.getAttribute('style').split('width:')[1].trim();
                    
                    // Reset width to 0 then animate to target
                    entry.target.style.width = '0';
                    
                    // Use setTimeout to create a small delay before animation starts
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                        entry.target.style.transition = 'width 1.5s ease-in-out';
                    }, 200);
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillObserver.observe(bar);
    });
}

/**
 * Add hover animations to project cards
 */
document.addEventListener('mouseover', (e) => {
    // Find closest project card if hovering over any part of it
    const projectCard = e.target.closest('.project-card');
    
    if (projectCard) {
        const projectImage = projectCard.querySelector('.project-image img');
        
        if (projectImage) {
            projectImage.style.transform = 'scale(1.1)';
        }
    }
});

document.addEventListener('mouseout', (e) => {
    // Reset transform when mouse leaves
    const projectCard = e.target.closest('.project-card');
    
    if (projectCard) {
        const projectImage = projectCard.querySelector('.project-image img');
        
        if (projectImage) {
            projectImage.style.transform = 'scale(1)';
        }
    }
}); 