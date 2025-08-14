// État global de l'application
let currentStep = 1;
let selectedBrand = '';
let selectedModel = '';
let customization = {
  size: 38,
  shoeColor: '#000000',
  lacesColor: '#ffffff',
  pattern: 'none',
  basePrice: 99,
  lacesPrice: 0,
  patternPrice: 0
};

// Panier
let cart = [];

// Données des modèles par marque
const modelsData = {
  nike: [
    {
      name: 'Air Jordan',
      image: './assets/modele/nike/air-jordan.jpg',
      description: 'Légendaire et iconique'
    },
    {
      name: 'Air Force One',
      image: './assets/modele/nike/air-force-one.jpg',
      description: 'Classique intemporel'
    }
  ],
  adidas: [
    {
      name: 'Stan Smith',
      image: './assets/modele/adidas/stan-smith.jpg',
      description: 'Élégance minimaliste'
    },
    {
      name: 'Campus 00',
      image: './assets/modele/adidas/campus-00.jpg',
      description: 'Style rétro moderne'
    }
  ],
  converse: [
    {
      name: 'Chuck Taylor',
      image: './assets/modele/converse/chuck-taylor.jpg',
      description: 'L\'original authentique'
    },
    {
      name: 'Plateforms',
      image: './assets/modele/converse/plateforms.jpg',
      description: 'Hauteur et style'
    }
  ],
  vans: [
    {
      name: 'Slip On',
      image: './assets/modele/vans/slip-on.jpg',
      description: 'Simplicité et confort'
    },
    {
      name: 'Old School',
      image: './assets/modele/vans/old-school.jpg',
      description: 'Skate authentique'
    }
  ]
};

// Noms des couleurs
const colorNames = {
  '#000000': 'Noir',
  '#ffffff': 'Blanc',
  '#ff0000': 'Rouge',
  '#00ff00': 'Vert',
  '#0000ff': 'Bleu',
  '#ffff00': 'Jaune',
  '#ff00ff': 'Magenta',
  '#00ffff': 'Cyan',
  '#ffa500': 'Orange',
  '#800080': 'Violet',
  '#ffc0cb': 'Rose',
  '#a52a2a': 'Marron',
  '#808080': 'Gris',
  '#000080': 'Bleu marine',
  '#008000': 'Vert foncé'
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  updateProgressBar();
  updateTotalPrice();
});

// Gestion des événements
function initializeEventListeners() {
  // Sélection des marques
  document.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', function() {
      const brand = this.dataset.brand;
      selectBrand(brand);
    });
  });

  // Navigation mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Customisation - pointure
  const sizeSelect = document.getElementById('shoe-size');
  if (sizeSelect) {
    sizeSelect.addEventListener('change', function() {
      customization.size = parseInt(this.value);
      updateBasePrice();
      updateSummary();
      updateTotalPrice();
    });
  }

  // Customisation - couleurs chaussure
  document.querySelectorAll('#shoe-colors .color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
      // Retirer la classe active des autres
      document.querySelectorAll('#shoe-colors .color-swatch').forEach(s => s.classList.remove('active'));
      // Ajouter la classe active à celui-ci
      this.classList.add('active');
      
      customization.shoeColor = this.dataset.color;
      document.getElementById('shoe-color-name').textContent = this.dataset.name;
      updateSummary();
    });
  });

  // Customisation - couleurs lacets
  document.querySelectorAll('#laces-colors .color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
      // Retirer la classe active des autres
      document.querySelectorAll('#laces-colors .color-swatch').forEach(s => s.classList.remove('active'));
      // Ajouter la classe active à celui-ci
      this.classList.add('active');
      
      customization.lacesColor = this.value;
      customization.lacesPrice = parseInt(this.dataset.price);
      
      const priceSuffix = customization.lacesPrice > 0 ? ` (+${customization.lacesPrice}€)` : ' (inclus)';
      document.getElementById('laces-color-name').textContent = this.dataset.name + priceSuffix;
      
      updateSummary();
      updateTotalPrice();
    });
  });

  // Customisation - motifs
  document.querySelectorAll('#patterns .pattern-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
      // Retirer la classe active des autres
      document.querySelectorAll('#patterns .pattern-swatch').forEach(s => s.classList.remove('active'));
      // Ajouter la classe active à celui-ci
      this.classList.add('active');
      
      customization.pattern = this.dataset.pattern;
      customization.patternPrice = parseInt(this.dataset.price);
      updateSummary();
      updateTotalPrice();
    });
  });
}

// Sélection de marque
function selectBrand(brand) {
  selectedBrand = brand;
  
  // Animation de fade out
  const currentSection = document.getElementById('step-1');
  currentSection.style.opacity = '0';
  currentSection.style.transform = 'translateY(-20px)';
  
  setTimeout(() => {
    generateModels(brand);
    goToStep(2);
  }, 300);
}

// Génération des modèles
function generateModels(brand) {
  const modelsGrid = document.querySelector('.models-grid');
  const models = modelsData[brand];
  
  modelsGrid.innerHTML = '';
  
  models.forEach((model, index) => {
    const modelCard = document.createElement('div');
    modelCard.className = 'model-card';
    modelCard.style.animationDelay = `${index * 0.1}s`;
    
    modelCard.innerHTML = `
      <div class="card-image">
        <img src="${model.image}" alt="${model.name}">
      </div>
      <div class="card-content">
        <h3>${model.name}</h3>
        <p>${model.description}</p>
      </div>
    `;
    
    modelCard.addEventListener('click', () => {
      selectModel(model.name, model.image);
    });
    
    modelsGrid.appendChild(modelCard);
  });
}

// Sélection de modèle
function selectModel(modelName, modelImage) {
  selectedModel = modelName;
  
  // Mettre à jour l'image de prévisualisation
  const shoeImage = document.getElementById('shoe-image');
  if (shoeImage) {
    shoeImage.src = modelImage;
    shoeImage.alt = `${selectedBrand} ${selectedModel}`;
  }
  
  // Animation de transition
  const currentSection = document.getElementById('step-2');
  currentSection.style.opacity = '0';
  currentSection.style.transform = 'translateY(-20px)';
  
  setTimeout(() => {
    goToStep(3);
    updateSummary();
    updateColorPreview();
  }, 300);
}

// Navigation entre étapes
function goToStep(stepNumber) {
  // Masquer toutes les sections
  document.querySelectorAll('.step-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Afficher la section cible
  const targetSection = document.getElementById(`step-${stepNumber}`);
  if (targetSection) {
    targetSection.classList.add('active');
    targetSection.style.opacity = '1';
    targetSection.style.transform = 'translateY(0)';
  }
  
  currentStep = stepNumber;
  updateProgressBar();
}

// Mise à jour de la barre de progression
function updateProgressBar() {
  document.querySelectorAll('.progress-step').forEach((step, index) => {
    const stepNumber = index + 1;
    if (stepNumber <= currentStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
}

// Mise à jour du prix de base selon la pointure
function updateBasePrice() {
  customization.basePrice = customization.size <= 38 ? 99 : 120;
}

// Mise à jour du prix total
function updateTotalPrice() {
  const totalPrice = customization.basePrice + customization.lacesPrice + customization.patternPrice;
  document.getElementById('total-price').textContent = `${totalPrice} €`;
  document.getElementById('summary-total-price').innerHTML = `<strong>${totalPrice} €</strong>`;
}

// Mise à jour du récapitulatif
function updateSummary() {
  const summarySize = document.getElementById('summary-size');
  const summaryBrand = document.getElementById('summary-brand');
  const summaryModel = document.getElementById('summary-model');
  const summaryShoeColor = document.getElementById('summary-shoe-color');
  const summaryLacesColor = document.getElementById('summary-laces-color');
  const summaryPattern = document.getElementById('summary-pattern');
  
  if (summarySize) summarySize.textContent = customization.size;
  if (summaryBrand) summaryBrand.textContent = selectedBrand || '-';
  if (summaryModel) summaryModel.textContent = selectedModel || '-';
  
  // Couleur chaussure
  const shoeColorName = document.querySelector('#shoe-colors .color-swatch.active')?.dataset.name || 'Noir';
  if (summaryShoeColor) summaryShoeColor.textContent = shoeColorName;
  
  // Couleur lacets
  const lacesColorName = document.querySelector('#laces-colors .color-swatch.active')?.dataset.name || 'Blanc';
  const lacesPrice = customization.lacesPrice;
  const lacesPriceSuffix = lacesPrice > 0 ? ` (+${lacesPrice}€)` : ' (inclus)';
  if (summaryLacesColor) summaryLacesColor.textContent = lacesColorName + lacesPriceSuffix;
  
  // Motif
  if (summaryPattern) {
    const patternNames = {
      'none': 'Aucun',
      'standard': 'Standard (+50€)',
      'character': 'Personnage (+100€)'
    };
    summaryPattern.textContent = patternNames[customization.pattern] || 'Aucun';
  }
}

// Mise à jour de l'aperçu des couleurs
function updateColorPreview() {
  const mainColorPreview = document.getElementById('main-color-preview');
  const lacesColorPreview = document.getElementById('laces-color-preview');
  
  if (mainColorPreview) {
    mainColorPreview.style.backgroundColor = customization.shoeColor;
  }
  
  if (lacesColorPreview) {
    lacesColorPreview.style.backgroundColor = customization.lacesColor;
  }
}

// Ajouter au panier
function addToCart() {
  const totalPrice = customization.basePrice + customization.lacesPrice + customization.patternPrice;
  
  const finalCustomization = {
    id: Date.now(), // ID unique basé sur le timestamp
    brand: selectedBrand,
    model: selectedModel,
    size: customization.size,
    shoeColor: customization.shoeColor,
    shoeColorName: document.querySelector('#shoe-colors .color-swatch.active')?.dataset.name || 'Noir',
    lacesColor: customization.lacesColor,
    lacesColorName: document.querySelector('#laces-colors .color-swatch.active')?.dataset.name || 'Blanc',
    pattern: customization.pattern,
    patternName: document.querySelector('#patterns .pattern-swatch.active')?.dataset.name || 'Aucun',
    basePrice: customization.basePrice,
    lacesPrice: customization.lacesPrice,
    patternPrice: customization.patternPrice,
    totalPrice: totalPrice,
    timestamp: new Date().toISOString()
  };
  
  // Ajouter au panier
  cart.push(finalCustomization);
  
  console.log('🛒 Ajouté au panier:', finalCustomization);
  console.log('📦 Panier complet:', cart);
  
  // Animation de succès
  const validateBtn = document.querySelector('.validate-btn');
  const originalText = validateBtn.textContent;
  
  validateBtn.textContent = '✅ Ajouté au panier !';
  validateBtn.style.background = 'linear-gradient(135deg, #00cc03, #009902)';
  
  setTimeout(() => {
    validateBtn.textContent = originalText;
    validateBtn.style.background = 'linear-gradient(135deg, #00ff04, #00cc03)';
    
    // Ouvrir le panier après l'animation
    openCart();
  }, 2000);
  
  // Afficher une notification
  showNotification('Votre création a été ajoutée au panier !');
}

// Ouvrir le panier
function openCart() {
  const cartModal = document.getElementById('cart-modal');
  const cartItems = document.getElementById('cart-items');
  
  // Vider le contenu actuel
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Votre panier est vide</div>';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.brand} ${item.model}</h4>
          <p>Pointure: ${item.size}</p>
          <p>Couleur: ${item.shoeColorName}</p>
          <p>Lacets: ${item.lacetsColorName}</p>
          <p>Motif: ${item.patternName}</p>
        </div>
        <div class="cart-item-price">${item.totalPrice} €</div>
        <button class="remove-item" onclick="removeFromCart(${item.id})">Supprimer</button>
      `;
      cartItems.appendChild(cartItem);
    });
  }
  
  // Mettre à jour le total
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  document.getElementById('cart-total-price').textContent = `${cartTotal} €`;
  
  // Afficher le modal
  cartModal.classList.add('active');
}

// Fermer le panier
function closeCart() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.remove('active');
}

// Supprimer un article du panier
function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  openCart(); // Rafraîchir l'affichage du panier
  showNotification('Article supprimé du panier');
}

// Commande
function checkout() {
  if (cart.length === 0) {
    showNotification('Votre panier est vide !');
    return;
  }
  
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  console.log('🛍️ Commande passée:', {
    items: cart,
    total: cartTotal,
    timestamp: new Date().toISOString()
  });
  
  showNotification(`Commande validée ! Total: ${cartTotal} €`);
  
  // Vider le panier après commande
  cart = [];
  closeCart();
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
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
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