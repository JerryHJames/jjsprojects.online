/**
 * Projects JavaScript for jjsprojects.online
 * Handles project filtering and interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize project filtering
    initProjectFilters();
    
    // Add event listeners for project cards
    initProjectCardInteractions();
});

/**
 * Initialize project filtering functionality
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category
            const filterCategory = this.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterCategory, projectCards);
        });
    });
}

/**
 * Filter project cards based on category
 * 
 * @param {string} category - Category to filter by ('all' or specific category)
 * @param {NodeList} cards - Collection of project card elements
 */
function filterProjects(category, cards) {
    cards.forEach(card => {
        // First remove any existing animation classes
        card.classList.remove('fade-in');
        
        // Reset any inline styles that might have been added
        card.style.display = '';
        
        // Get the card's categories
        const cardCategory = card.getAttribute('data-category');
        
        // Show or hide based on filter
        if (category === 'all' || cardCategory === category) {
            // Add fade-in animation
            setTimeout(() => {
                card.classList.add('fade-in');
            }, 10);
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Initialize interactions for project cards
 */
function initProjectCardInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add click event for the whole card to make it more interactive
        card.addEventListener('click', function(e) {
            // Ignore clicks on links inside the card
            if (e.target.tagName === 'A') return;
            
            // Find the "View Project" link and simulate click
            const viewProjectLink = this.querySelector('.view-project');
            if (viewProjectLink) {
                const href = viewProjectLink.getAttribute('href');
                
                // If it's a real URL, navigate to it
                if (href && href !== '#') {
                    window.open(href, '_blank');
                }
            }
        });
        
        // Add hover states with JavaScript for more control
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Add functionality to project links
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default if the link is just a placeholder
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                alert('Project link will be added soon!');
            }
            
            // Otherwise allow normal link behavior
        });
    });
}

/**
 * Load more projects functionality
 * This would typically be used if you want to add pagination
 * or load more projects dynamically
 */
function loadMoreProjects() {
    // Example of how you might implement this
    // In a real implementation, this would fetch data from an API
    
    // Simulate loading delay
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Add loading state
            this.innerHTML = 'Loading...';
            this.disabled = true;
            
            // Simulate API request delay
            setTimeout(() => {
                // Add new projects to the grid
                const projectsGrid = document.querySelector('.projects-grid');
                
                // In a real implementation, you would append new project cards here
                // For demo purposes, we'll just reset the button
                this.innerHTML = 'Load More';
                this.disabled = false;
                
                // Example alert
                alert('In a real implementation, this would load more projects from a database or API.');
            }, 1500);
        });
    }
} 