// Handle Formspree form submission
const loanForm = document.querySelector('.loan-application-form');
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
        formResponse.innerHTML = '<div class="form-response success">✅ Thank you! Your loan application has been submitted successfully. We will contact you soon.</div>';
        this.reset();
      } else {
        // Error
        formResponse.innerHTML = '<div class="form-response error">❌ There was an error submitting your application. Please try again or contact us directly.</div>';
      }
    })
    .catch(error => {
      // Network or other error
      formResponse.innerHTML = '<div class="form-response error">❌ There was an error submitting your application. Please try again or contact us directly.</div>';
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

// Show success message after Formspree submission (legacy code)
const form = document.getElementById('loanForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', function (e) {
    // Let Formspree handle the actual submission, but show success after redirect
    setTimeout(() => {
      formSuccess.style.display = 'block';
      form.reset();
    }, 1000);
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
