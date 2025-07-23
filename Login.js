// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    const searchInput = document.getElementById('searchInput');

    // Form submission
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        if (email && password) {
            // Simulate login process
            showNotification('Signing in...', 'info');
            
            setTimeout(() => {
                if (email === 'demo@codehal.com' && password === 'demo123') {
                    showNotification('Welcome back! Sign in successful.', 'success');
                    // Here you would typically redirect to the dashboard
                    console.log('Login successful for:', email);
                    if (remember) {
                        console.log('User chose to be remembered');
                    }
                } else {
                    showNotification('Invalid email or password. Try demo@codehal.com / demo123', 'error');
                }
            }, 1500);
        }
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Add smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            showNotification(`Navigating to ${target} section...`, 'info');
        });
    });
});

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        showNotification(`Searching for: "${searchTerm}"`, 'info');
        // Here you would implement actual search functionality
        console.log('Searching for:', searchTerm);
    }
}

// Social media links
function openSocial(platform) {
    const urls = {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com'
    };
    
    showNotification(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`, 'info');
    // In a real implementation, you would open the actual social media page
    console.log(`Would open: ${urls[platform]}`);
}

// Forgot password functionality
function forgotPassword() {
    const email = prompt('Please enter your email address:');
    if (email && isValidEmail(email)) {
        showNotification('Password reset link sent to your email!', 'success');
        console.log('Password reset requested for:', email);
    } else if (email) {
        showNotification('Please enter a valid email address.', 'error');
    }
}

// Sign up functionality
function signUp() {
    showNotification('Redirecting to sign up page...', 'info');
    console.log('Would redirect to sign up page');
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Additional interactive features
function addInteractiveEffects() {
    // Add ripple effect to buttons
    document.querySelectorAll('button, .signin-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize interactive effects when DOM is loaded
document.addEventListener('DOMContentLoaded', addInteractiveEffects);

// Form validation with real-time feedback
function setupFormValidation() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    emailInput.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.style.borderColor = '#dc3545';
            showNotification('Please enter a valid email address', 'error');
        } else if (this.value) {
            this.style.borderColor = '#28a745';
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value && this.value.length < 6) {
            this.style.borderColor = '#dc3545';
            showNotification('Password must be at least 6 characters', 'error');
        } else if (this.value) {
            this.style.borderColor = '#28a745';
        }
    });

    // Reset border color on focus
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#ff6b6b';
        });
    });
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', setupFormValidation);