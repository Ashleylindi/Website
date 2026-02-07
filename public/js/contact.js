const FORMSPREE_FORM_ID = 'mykdynzd'; // Replace this with your Formspree form ID
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Get form elements
    const submitButton = event.target.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('formMessage');
    
    // Validate form
    if (!name || !email || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.textContent = '';
    formMessage.style.display = 'none';

    // Prepare form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    // Send to Formspree
    fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success
            showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon! 🎉', 'success');
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            console.log('Form submitted successfully');
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Form submission failed');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        
        // Show error with mailto fallback
        showMessage(
            'Oops! Unable to send. Opening your email client as a backup...',
            'error'
        );
        
        // Fallback to mailto
        setTimeout(() => {
            const subject = encodeURIComponent('Portfolio Contact - Message from ' + name);
            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`
            );
            window.location.href = `mailto:axaba023@student.wethinkcode.co.za?subject=${subject}&body=${body}`;
        }, 2000);
    })
    .finally(() => {
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.textContent = 'Send Message';
    });
});

// Function to show success or error messages
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide success messages after 6 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 6000);
    }
}

// Input validation feedback
const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        
        if (this.value.trim() === '') {
            this.style.borderColor = '#f5576c';
        } else {
            this.style.borderColor = '#43e97b';
        }
    });
    
    input.addEventListener('input', function() {
        this.style.borderColor = '#e0e0e0';
    });
});

// Character limit for message
const messageField = document.getElementById('message');
const maxChars = 1000;

messageField.addEventListener('input', function() {
    const remaining = maxChars - this.value.length;
    if (remaining < 0) {
        this.value = this.value.substring(0, maxChars);
    }
});

console.log('Contact form ready! Using Formspree endpoint:', FORMSPREE_ENDPOINT);
