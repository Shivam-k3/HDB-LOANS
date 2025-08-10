// Handle Formspree form submission
const loanForm = document.getElementById('loanForm');
const formResponse = document.getElementById('formResponse');

if (loanForm) {
  loanForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(this);
    
    // Submit to Formspree
    fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        // Success
        formResponse.innerHTML = `
          <div class="form-response success">
            <h3>✅ Application Submitted Successfully!</h3>
            <p>Thank you for your loan application. We have received your details and will contact you within 24 hours.</p>
            <div class="action-buttons">
              <a href="https://wa.me/918178039563?text=${encodeURIComponent('Hi, I just submitted a loan application on your website. Please check and get back to me.')}" class="whatsapp-btn" target="_blank">💬 WhatsApp Us for Quick Response</a>
            </div>
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>✅ Your application has been submitted to our team</li>
              <li>📧 You'll receive a confirmation email shortly</li>
              <li>📞 We'll call you within 24 hours to discuss your loan</li>
              <li>💬 Feel free to WhatsApp us for immediate assistance</li>
            </ul>
          </div>
        `;
        this.reset();
      } else {
        // Error
        formResponse.innerHTML = `
          <div class="form-response error">
            <h3>❌ Submission Error</h3>
            <p>There was an error submitting your application. Please try again or contact us directly.</p>
            <div class="action-buttons">
              <a href="tel:+918178039563" class="email-btn">📞 Call Us</a>
              <a href="https://wa.me/918178039563" class="whatsapp-btn" target="_blank">💬 WhatsApp Us</a>
            </div>
          </div>
        `;
      }
    })
    .catch(error => {
      // Network or other error
      formResponse.innerHTML = `
        <div class="form-response error">
          <h3>❌ Connection Error</h3>
          <p>There was a connection error. Please try again or contact us directly.</p>
          <div class="action-buttons">
            <a href="tel:+918178039563" class="email-btn">📞 Call Us</a>
            <a href="https://wa.me/918178039563" class="whatsapp-btn" target="_blank">💬 WhatsApp Us</a>
          </div>
        </div>
      `;
    })
    .finally(() => {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Scroll to response message
      formResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll for navbar links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
  // Add click-to-call functionality
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // On mobile, this will open phone app
      // On desktop, show a message
      if (!/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        e.preventDefault();
        alert('Please call us at +91 81780 39563');
      }
    });
  });
  
  // Add click-to-email functionality
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // This will open default email client
      // No need to prevent default
    });
  });
});
