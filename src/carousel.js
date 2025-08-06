const steps = [
  {
    img: 'assets/1.mp4',
    text: 'Je sélectionne la marque de la chaussure',
    number: 1
  },
  {
    img: 'assets/2.mp4',
    text: 'Je choisis la personnalisation',
    number: 2
  },
  {
    img: 'assets/3.mp4',
    text: 'Votre paire part dans nos ateliers de customisation',
    number: 3
  },
  {
    img: 'assets/4.mp4',
    text: 'Votre paire est expédiée',
    number: 4
  }
];

let currentStep = 0;

const stepSection = document.getElementById('steps-carousel');
const stepText = document.querySelector('.step-text');
const stepNumber = document.querySelector('.step-number');

document.getElementById('next-step').addEventListener('click', () => {
  currentStep = (currentStep + 1) % steps.length;
  updateStep();
});

document.getElementById('prev-step').addEventListener('click', () => {
  currentStep = (currentStep - 1 + steps.length) % steps.length;
  updateStep();
});

function updateStep() {
  stepSection.style.backgroundImage = `url('${steps[currentStep].img}')`;
  stepText.textContent = steps[currentStep].text;
  stepNumber.textContent = steps[currentStep].number;
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('#steps-carousel .carousel-bg-video');
  const prevBtn = document.getElementById('prev-step');
  const nextBtn = document.getElementById('next-step');
  let current = 0;

  function showVideo(index) {
    videos.forEach((video, i) => {
      video.style.display = i === index ? 'block' : 'none';
      if (i === index) {
        video.currentTime = 0;
        video.play();
      } else {
        video.pause();
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + videos.length) % videos.length;
    showVideo(current);
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % videos.length;
    showVideo(current);
  });

  // Affiche la première vidéo au chargement
  showVideo(current);
});