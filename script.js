// Handle loan application form submission
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
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    // Create email body
    const emailSubject = 'New Loan Application - ' + formObject.loanType;
    const emailBody = `
New Loan Application Received

Name: ${formObject.name}
Email: ${formObject.email}
Phone: ${formObject.phone}
Loan Type: ${formObject.loanType}
Loan Amount: ₹${formObject.amount}
Loan Purpose: ${formObject.purpose || 'Not specified'}
Additional Details: ${formObject.message || 'None'}

Submitted on: ${new Date().toLocaleString('en-IN')}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:manishyadav817803@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Show success message
    formResponse.innerHTML = `
      <div class="form-response success">
        <h3>✅ Application Submitted Successfully!</h3>
        <p>Thank you for your loan application. We have prepared an email for you to send to our team.</p>
        <div class="action-buttons">
          <a href="${mailtoLink}" class="email-btn">📧 Send Email to Team</a>
          <a href="https://wa.me/918178039563?text=${encodeURIComponent('Hi, I just submitted a loan application on your website. Please check and get back to me.')}" class="whatsapp-btn" target="_blank">💬 WhatsApp Us</a>
        </div>
        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>Click "Send Email to Team" to send your application details</li>
          <li>Or WhatsApp us directly for immediate assistance</li>
          <li>We'll review your application and contact you within 24 hours</li>
        </ul>
      </div>
    `;
    
    // Reset form
    this.reset();
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Scroll to response message
    formResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
