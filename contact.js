// Contact form specific JavaScript
// This file contains additional functionality for the contact page

document.addEventListener('DOMContentLoaded', function() {
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '(' + value;
            }
            if (value.length > 4) {
                value = value.slice(0, 4) + ') ' + value.slice(4);
            }
            if (value.length > 9) {
                value = value.slice(0, 9) + '-' + value.slice(9);
            }
            if (value.length > 14) {
                value = value.slice(0, 14);
            }
            
            e.target.value = value;
        });
    }
    
    // Form submission animation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                // Get form data
                const formData = new FormData(this);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // In a real application, you would send this data to your server
                console.log('Form data to be sent:', formObject);
                
                // Show success message
                showFormSuccess(formObject.name);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll to success message
                const successMessage = document.querySelector('.form-success-message');
                if (successMessage) {
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 2000);
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item h4');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });
    
    // Add CSS for FAQ animation
    const faqStyle = document.createElement('style');
    faqStyle.textContent = `
        .faq-item h4 {
            cursor: pointer;
            position: relative;
            padding-right: 30px;
        }
        
        .faq-item h4:after {
            content: '+';
            position: absolute;
            right: 0;
            top: 0;
            font-size: 1.5rem;
            font-weight: 300;
            transition: transform 0.3s ease;
        }
        
        .faq-item.active h4:after {
            content: '-';
            transform: rotate(180deg);
        }
        
        .faq-item p {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, margin-top 0.3s ease;
            margin-top: 0;
        }
        
        .faq-item.active p {
            max-height: 200px;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(faqStyle);
});

// Function to show form success message
function showFormSuccess(name) {
    // Remove any existing success message
    const existingMessage = document.querySelector('.form-success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #d4edda, #c3e6cb);
            color: #155724;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            margin: 30px 0;
            border: 1px solid #b1dfbb;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        ">
            <div style="font-size: 4rem; color: #28a745; margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: #155724; margin-bottom: 15px;">Thank You, ${name || 'Valued Client'}!</h3>
            <p style="font-size: 1.1rem; margin-bottom: 20px;">
                Your message has been received successfully. Our digital marketing experts will review 
                your information and contact you within <strong>24 hours</strong> to schedule your free consultation.
            </p>
            <p style="font-style: italic;">
                In the meantime, feel free to browse our <a href="index.html#services" style="color: #155724; text-decoration: underline;">services page</a> 
                to learn more about how we can help grow your business.
            </p>
            <div style="margin-top: 25px;">
                <a href="index.html" class="btn btn-primary" style="background-color: #28a745; border-color: #28a745;">
                    <i class="fas fa-home"></i> Back to Homepage
                </a>
            </div>
        </div>
    `;
    
    // Insert success message after the form
    const contactFormContainer = document.querySelector('.contact-form-container');
    if (contactFormContainer) {
        contactFormContainer.parentNode.insertBefore(successMessage, contactFormContainer.nextSibling);
    }
}

// Function to validate the form (called from main script)
function validateContactForm() {
    // This function is called from script.js
    return true;
}