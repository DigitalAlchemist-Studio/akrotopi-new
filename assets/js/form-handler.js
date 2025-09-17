/**
 * Secure Form Handler for Akrotopi Apartments
 * Handles form submissions with validation, security, and user feedback
 */

class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('.contact-form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            this.setupForm(form);
        });
    }

    setupForm(form) {
        // Add honeypot field for bot detection
        this.addHoneypotField(form);
        
        // Add form event listeners
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    addHoneypotField(form) {
        // Add hidden field to catch bots
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.display = 'none';
        honeypot.style.position = 'absolute';
        honeypot.style.left = '-9999px';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';
        form.appendChild(honeypot);
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation (Greek format)
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^(\+30|0030|30)?[0-9]{10}$/;
            const cleanPhone = value.replace(/[^0-9+]/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                isValid = false;
                errorMessage = 'Please enter a valid Greek phone number';
            }
        }

        // Name validation
        if (fieldName === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            } else if (value.length > 100) {
                isValid = false;
                errorMessage = 'Name is too long';
            }
        }

        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            } else if (value.length > 2000) {
                isValid = false;
                errorMessage = 'Message is too long (max 2000 characters)';
            }
        }

        // Show error if invalid
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    validateForm(form) {
        const fields = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;

        // Validate form
        if (!this.validateForm(form)) {
            this.showFormMessage(form, 'Please correct the errors above', 'error');
            return;
        }

        // Disable submit button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');

        try {
            // Prepare form data
            const formData = new FormData(form);
            
            // Add additional security data
            formData.append('timestamp', Date.now());
            formData.append('user_agent', navigator.userAgent);
            formData.append('referrer', document.referrer);

            // Send request
            const response = await fetch('assets/php/form-handler.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const result = await response.json();

            if (result.success) {
                this.showFormMessage(form, result.message, 'success');
                form.reset();
                this.clearAllErrors(form);
            } else {
                this.showFormMessage(form, result.message, 'error');
                
                // Show specific field errors if provided
                if (result.errors && Array.isArray(result.errors)) {
                    result.errors.forEach(error => {
                        console.error('Form error:', error);
                    });
                }
            }

        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage(form, 'Network error. Please check your connection and try again.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.classList.remove('loading');
        }
    }

    showFormMessage(form, message, type) {
        // Remove existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        // Insert message after form header or at the beginning
        const formHeader = form.querySelector('.contact-form-header, .contact-form-header-simple');
        if (formHeader) {
            formHeader.insertAdjacentElement('afterend', messageDiv);
        } else {
            form.insertBefore(messageDiv, form.firstChild);
        }

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }

        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    clearAllErrors(form) {
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => {
            this.clearFieldError(field);
        });

        const errorMessages = form.querySelectorAll('.field-error');
        errorMessages.forEach(message => {
            message.remove();
        });
    }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});

// Add CSS for form validation styles
const style = document.createElement('style');
style.textContent = `
    .contact-form input.error,
    .contact-form textarea.error {
        border-color: #e74c3c;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.1);
    }

    .field-error {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }

    .form-message {
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1.5rem;
        font-weight: 500;
    }

    .form-message.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .form-message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .submit-btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    /* Honeypot field - ensure it's hidden */
    input[name="website"] {
        display: none !important;
        position: absolute !important;
        left: -9999px !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }
`;
document.head.appendChild(style);
