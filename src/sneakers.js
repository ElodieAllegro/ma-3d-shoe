// État global de l'application
let currentStep = 1;
let selectedBrand = 'converse';
let selectedModel = 'chuck-taylor';
let customization = {
  size: 38,
  color: 'white',
  pattern: 'none',
  laces: 'black',
  accessories: 'none',
  basePrice: 100
};

// Panier
let cart = [];

// Données des modèles par marque
const modelsData = {
  nike: [
    {
      id: 'air-jordan',
      name: 'Air Jordan',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Légendaire et iconique'
    },
    {
      id: 'air-force-one',
      name: 'Air Force One',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Classique intemporel'
    }
  ],
  adidas: [
    {
      id: 'stan-smith',
      name: 'Stan Smith',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Élégance minimaliste'
    },
    {
      id: 'campus-00',
      name: 'Campus 00',
      image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Style rétro moderne'
    }
  ],
  converse: [
    {
      id: 'chuck-taylor',
      name: 'Chuck Taylor',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'L\'original authentique'
    },
    {
      id: 'platforms',
      name: 'Platforms',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Hauteur et style'
    }
  ],
  vans: [
    {
      id: 'slip-on',
      name: 'Slip On',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Simplicité et confort'
    },
    {
      id: 'old-school',
      name: 'Old School',
      image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Skate authentique'
    }
  ]
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  updateProductInfo();
  updatePrice();
  
  // Aller directement à l'étape 3 pour le développement
  goToStep(3);
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

  // Sélection de la taille
  const sizeSelect = document.getElementById('shoe-size');
  if (sizeSelect) {
    sizeSelect.addEventListener('change', function() {
      customization.size = parseInt(this.value);
      updatePrice();
    });
  }

  // Sélection de la couleur
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      customization.color = this.dataset.color;
    });
  });

  // Sélection du motif
  document.querySelectorAll('.pattern-circle').forEach(circle => {
    circle.addEventListener('click', function() {
      document.querySelectorAll('.pattern-circle').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      customization.pattern = this.dataset.pattern;
      updatePrice();
    });
  });

  // Sélection des lacets
  document.querySelectorAll('.lace-circle').forEach(circle => {
    circle.addEventListener('click', function() {
      document.querySelectorAll('.lace-circle').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      customization.laces = this.dataset.lace;
      updatePrice();
    });
  });

  // Sélection des accessoires
  const accessoriesSelect = document.querySelector('.accessories-select');
  if (accessoriesSelect) {
    accessoriesSelect.addEventListener('change', function() {
      customization.accessories = this.value;
      updatePrice();
    });
  }

  // Thumbnails
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
      document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      const mainImage = document.getElementById('main-shoe-image');
      const newSrc = this.querySelector('img').src.replace('w=150', 'w=600');
      mainImage.src = newSrc;
    });
  });

}

// Sélection de marque
function selectBrand(brand) {
  selectedBrand = brand;
  generateModels(brand);
  goToStep(2);
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
      selectModel(model.id, model.name, model.image);
    });
    
    modelsGrid.appendChild(modelCard);
  });
}

// Sélection de modèle
function selectModel(modelId, modelName, modelImage) {
  selectedModel = modelId;
  
  // Mettre à jour l'image principale
  const mainImage = document.getElementById('main-shoe-image');
  if (mainImage) {
    mainImage.src = modelImage;
  }
  
  // Mettre à jour les informations du produit
  updateProductInfo();
  
  // Mettre à jour les informations du produit
  updateProductInfo();
  
  goToStep(3);
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
  }
  
  currentStep = stepNumber;
}

// Mise à jour des informations du produit
function updateProductInfo() {
  const brandElement = document.getElementById('product-brand');
  const modelElement = document.getElementById('product-model');
  const breadcrumbBrand = document.getElementById('current-brand');
  const breadcrumbModel = document.getElementById('current-model');
  
  if (brandElement) {
    brandElement.textContent = selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1);
  }
  
  if (modelElement) {
    const modelData = modelsData[selectedBrand]?.find(m => m.id === selectedModel);
    modelElement.textContent = modelData ? modelData.name.toUpperCase() : 'CHUCK TAYLOR ALL STAR';
  }
  
  if (breadcrumbBrand) {
    breadcrumbBrand.textContent = selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1);
  }
  
  if (breadcrumbModel) {
    const modelData = modelsData[selectedBrand]?.find(m => m.id === selectedModel);
    breadcrumbModel.textContent = modelData ? modelData.name : 'Chuck Taylor';
  }
}

// Mise à jour du prix
function updatePrice() {
  let totalPrice = customization.basePrice;
  
  // Prix selon la taille
  if (customization.size > 38) {
    totalPrice = 120;
  } else {
    totalPrice = 100;
  }
  
  // Supplément motif
  if (customization.pattern === 'dots' || customization.pattern === 'floral') {
    totalPrice += 50; // Pattern standard
  } else if (customization.pattern === 'geometric' || customization.pattern === 'carbon') {
    totalPrice += 100; // Pattern personnage
  }
  
  // Supplément motif
  if (customization.pattern === 'dots' || customization.pattern === 'floral') {
    totalPrice += 50; // Pattern standard
  } else if (customization.pattern === 'geometric' || customization.pattern === 'carbon') {
    totalPrice += 100; // Pattern personnage
  }
  
  // Supplément lacets (si pas blanc)
  if (customization.laces !== 'white') {
    totalPrice += 10;
  }
  
  // Supplément accessoires
  if (customization.accessories !== 'none') {
    totalPrice += 25;
  }
  // Mettre à jour l'affichage
  const priceElement = document.getElementById('product-price');
  const headerTotal = document.getElementById('header-total');
  
  if (priceElement) {
    priceElement.textContent = `${totalPrice} €`;
  }
  
  if (headerTotal) {
    headerTotal.textContent = `${totalPrice}.00$`;
  }
  
  customization.basePrice = totalPrice;
}

// Mise à jour des informations du produit
function updateProductInfo() {
  const brandElement = document.getElementById('product-brand');
  const modelElement = document.getElementById('product-model');
  const breadcrumbBrand = document.getElementById('current-brand');
  const breadcrumbModel = document.getElementById('current-model');
  
  if (brandElement) {
    brandElement.textContent = selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1);
  }
  
  if (modelElement) {
    const modelData = modelsData[selectedBrand]?.find(m => m.id === selectedModel);
    modelElement.textContent = modelData ? modelData.name.toUpperCase() : 'CHUCK TAYLOR ALL STAR';
  }
  
  if (breadcrumbBrand) {
    breadcrumbBrand.textContent = selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1);
  }
  
  if (breadcrumbModel) {
    const modelData = modelsData[selectedBrand]?.find(m => m.id === selectedModel);
    breadcrumbModel.textContent = modelData ? modelData.name : 'Chuck Taylor';
  }
}

// Ajouter au panier
function addToCart() {
  const item = {
    id: Date.now(),
    brand: selectedBrand,
    model: selectedModel,
    size: customization.size,
    color: customization.color,
    pattern: customization.pattern,
    laces: customization.laces,
    accessories: customization.accessories,
    price: customization.basePrice,
    timestamp: new Date().toISOString()
  };
  
  cart.push(item);
  
  console.log('🛒 Ajouté au panier:', item);
  console.log('📦 Panier complet:', cart);
  
  // Mettre à jour le compteur du panier
  updateCartCount();
  
  // Animation de succès
  const btn = document.querySelector('.add-to-cart-btn');
  const originalText = btn.textContent;
  
  btn.textContent = '✅ Ajouté au panier !';
  btn.style.background = '#28a745';
  
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '#000';
  }, 2000);
  
  // Afficher une notification
  showNotification('Votre création a été ajoutée au panier !');
}

// Mettre à jour le compteur du panier
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Ouvrir le panier
function openCart() {
  const cartModal = document.getElementById('cart-modal');
  const cartItems = document.getElementById('cart-items');
  
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
          <p>Couleur: ${item.color}</p>
          <p>Motif: ${item.pattern}</p>
          <p>Lacets: ${item.laces}</p>
        </div>
        <div class="cart-item-price">${item.price} €</div>
        <button class="remove-item" onclick="removeFromCart(${item.id})">Supprimer</button>
      `;
      cartItems.appendChild(cartItem);
    });
  }
  
  // Mettre à jour le total
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cart-total-price').textContent = `${cartTotal} €`;
  
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
  updateCartCount();
  openCart(); // Rafraîchir l'affichage
  showNotification('Article supprimé du panier');
}

// Commande
function checkout() {
  if (cart.length === 0) {
    showNotification('Votre panier est vide !');
    return;
  }
  
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  console.log('🛍️ Commande passée:', {
    items: cart,
    total: cartTotal,
    timestamp: new Date().toISOString()
  });
  
  showNotification(`Commande validée ! Total: ${cartTotal} €`);
  
  // Vider le panier
  cart = [];
  updateCartCount();
  closeCart();
}

// Afficher une notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: bold;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  }, 3000);
}

// Styles pour les animations
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