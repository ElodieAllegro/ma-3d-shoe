// État global de l'application
let currentStep = 1;
let selectedBrand = '';
let selectedModel = '';
let customization = {
  mainColor: '#000000',
  lacesColor: '#ffffff',
  pattern: 'none'
};

// Données des modèles par marque
const modelsData = {
  nike: [
    {
      name: 'Air Jordan',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Légendaire et iconique'
    },
    {
      name: 'Air Force One',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Classique intemporel'
    }
  ],
  adidas: [
    {
      name: 'Stan Smith',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Élégance minimaliste'
    },
    {
      name: 'Campus 00',
      image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Style rétro moderne'
    }
  ],
  converse: [
    {
      name: 'Chuck Taylor',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'L\'original authentique'
    },
    {
      name: 'Plateforms',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Hauteur et style'
    }
  ],
  vans: [
    {
      name: 'Slip On',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Simplicité et confort'
    },
    {
      name: 'Old School',
      image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=400',
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

  // Customisation - couleurs
  const mainColorInput = document.getElementById('main-color');
  const lacesColorInput = document.getElementById('laces-color');
  const patternSelect = document.getElementById('pattern');

  if (mainColorInput) {
    mainColorInput.addEventListener('input', function() {
      customization.mainColor = this.value;
      updateColorPreview();
      updateSummary();
    });
  }

  if (lacesColorInput) {
    lacesColorInput.addEventListener('input', function() {
      customization.lacesColor = this.value;
      updateColorPreview();
      updateSummary();
    });
  }

  if (patternSelect) {
    patternSelect.addEventListener('change', function() {
      customization.pattern = this.value;
      updateSummary();
    });
  }
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

// Mise à jour de l'aperçu des couleurs
function updateColorPreview() {
  const mainColorPreview = document.getElementById('main-color-preview');
  const lacesColorPreview = document.getElementById('laces-color-preview');
  
  if (mainColorPreview) {
    mainColorPreview.style.backgroundColor = customization.mainColor;
  }
  
  if (lacesColorPreview) {
    lacesColorPreview.style.backgroundColor = customization.lacesColor;
  }
  
  // Mise à jour des labels de couleur
  const mainColorLabel = document.querySelector('#main-color + .color-label');
  const lacesColorLabel = document.querySelector('#laces-color + .color-label');
  
  if (mainColorLabel) {
    mainColorLabel.textContent = getColorName(customization.mainColor);
  }
  
  if (lacesColorLabel) {
    lacesColorLabel.textContent = getColorName(customization.lacesColor);
  }
}

// Obtenir le nom d'une couleur
function getColorName(hexColor) {
  return colorNames[hexColor.toLowerCase()] || hexColor.toUpperCase();
}

// Mise à jour du récapitulatif
function updateSummary() {
  const summaryBrand = document.getElementById('summary-brand');
  const summaryModel = document.getElementById('summary-model');
  const summaryMainColor = document.getElementById('summary-main-color');
  const summaryLacesColor = document.getElementById('summary-laces-color');
  const summaryPattern = document.getElementById('summary-pattern');
  
  if (summaryBrand) summaryBrand.textContent = selectedBrand || '-';
  if (summaryModel) summaryModel.textContent = selectedModel || '-';
  if (summaryMainColor) summaryMainColor.textContent = getColorName(customization.mainColor);
  if (summaryLacesColor) summaryLacesColor.textContent = getColorName(customization.lacesColor);
  if (summaryPattern) {
    const patternNames = {
      'none': 'Aucun',
      'gucci': 'Gucci',
      'dragonball': 'Dragon Ball',
      'galaxy': 'Galaxy',
      'camo': 'Camouflage'
    };
    summaryPattern.textContent = patternNames[customization.pattern] || 'Aucun';
  }
}

// Validation de la customisation
function validateCustomization() {
  const finalCustomization = {
    brand: selectedBrand,
    model: selectedModel,
    mainColor: customization.mainColor,
    mainColorName: getColorName(customization.mainColor),
    lacesColor: customization.lacesColor,
    lacesColorName: getColorName(customization.lacesColor),
    pattern: customization.pattern,
    timestamp: new Date().toISOString()
  };
  
  console.log('🎨 Customisation validée:', finalCustomization);
  
  // Animation de succès
  const validateBtn = document.querySelector('.validate-btn');
  const originalText = validateBtn.textContent;
  
  validateBtn.textContent = '✅ Création validée !';
  validateBtn.style.background = 'linear-gradient(135deg, #00cc03, #009902)';
  
  setTimeout(() => {
    validateBtn.textContent = originalText;
    validateBtn.style.background = 'linear-gradient(135deg, #00ff04, #00cc03)';
  }, 2000);
  
  // Afficher une notification
  showNotification('Votre création a été validée avec succès !');
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