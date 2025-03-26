document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // API URL configuration - using relative path for production compatibility
    const API_URL = '';  // Empty string for relative path
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        submitButton.innerHTML = 'Sending...';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all fields', 'error');
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            submitButton.innerHTML = 'Send Message';
            return;
        }
        
        try {
            console.log('Sending request to:', `/api/contact`);
            console.log('Form data:', formData);
            
            const response = await fetch(`/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            console.log('Response:', result);
            
            if (!response.ok) {
                throw new Error(result.detail || 'Failed to submit form');
            }
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Show error message with more details
            console.error('Error details:', error);
            showNotification(`Failed to send message: ${error.message}`, 'error');
            
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            submitButton.innerHTML = 'Send Message';
        }
    });
});

// Notification helper function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.animation = 'slideIn 0.5s ease-out';
    notification.style.zIndex = '1000';
    
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#f44336';
        notification.style.color = 'white';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
} 