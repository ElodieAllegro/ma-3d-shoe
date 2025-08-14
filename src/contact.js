// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('open');
      navToggle.setAttribute(
        'aria-expanded',
        navMenu.classList.contains('active')
      );
    });
  }

  // Gestion du formulaire de contact
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});

// Gestion de la soumission du formulaire
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const contactData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    timestamp: new Date().toISOString()
  };
  
  console.log('📧 Message de contact reçu:', contactData);
  
  // Animation du bouton
  const submitBtn = e.target.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<span>✅ Message envoyé !</span>';
  submitBtn.style.background = 'linear-gradient(135deg, #00cc03, #009902)';
  
  // Afficher une notification
  showNotification('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
  
  // Reset du formulaire après 3 secondes
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = 'linear-gradient(135deg, #00ff04, #00cc03)';
    e.target.reset();
  }, 3000);
}

// Toggle FAQ
function toggleFaq(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains('active');
  
  // Fermer tous les autres FAQ
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Ouvrir celui-ci s'il n'était pas actif
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

// Afficher une notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #00ff04, #00cc03);
    color: #000;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-weight: bold;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
    box-shadow: 0 10px 25px rgba(0, 255, 4, 0.3);
    max-width: 400px;
    word-wrap: break-word;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Styles pour les animations de notification
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);