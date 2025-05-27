let currentStep = 0;
let audioPlaying = false;
let currentAudio = 'birthday';
let slideshowInterval;

function createLights() {
    const lightsContainer = document.getElementById('lights');
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#6c5ce7', '#00b894'];
    
    for (let i = 0; i < 20; i++) {
        const light = document.createElement('div');
        light.className = 'light';
        light.style.left = Math.random() * 100 + '%';
        light.style.top = Math.random() * 100 + '%';
        light.style.background = colors[Math.floor(Math.random() * colors.length)];
        light.style.animationDelay = Math.random() * 2 + 's';
        lightsContainer.appendChild(light);
    }
}

function createBalloons() {
    const balloonsContainer = document.getElementById('balloons');
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#6c5ce7'];
    
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 90 + '%';
        balloon.style.top = Math.random() * 60 + '%';
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDelay = Math.random() * 3 + 's';
        balloonsContainer.appendChild(balloon);
    }
}

function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#6c5ce7'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

function switchAudio(audioId) {
    const audios = ['birthdayAudio', 'photoAudio', 'cakeAudio'];
    audios.forEach(id => {
        const audio = document.getElementById(id);
        if (id === audioId && audioPlaying) {
            audio.play().catch(e => console.log('Audio play prevented:', e));
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    currentAudio = audioId.split('Audio')[0];
}

function toggleAudio() {
    const audio = document.getElementById(`${currentAudio}Audio`);
    if (audioPlaying) {
        audio.pause();
        audioPlaying = false;
    } else {
        audio.play().catch(e => console.log('Audio play prevented:', e));
        audioPlaying = true;
    }
}

function startSlideshow() {
    const photos = document.querySelectorAll('.photo-frame');
    let currentPhoto = 0;

    photos.forEach(photo => photo.classList.add('hidden'));
    photos[currentPhoto].classList.remove('hidden');
    photos[currentPhoto].classList.add('fullscreen');

    slideshowInterval = setInterval(() => {
        photos[currentPhoto].classList.add('hidden');
        photos[currentPhoto].classList.remove('fullscreen');
        currentPhoto = (currentPhoto + 1) % photos.length;
        photos[currentPhoto].classList.remove('hidden');
        photos[currentPhoto].classList.add('fullscreen');
    }, 5000);
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    const photos = document.querySelectorAll('.photo-frame');
    photos.forEach(photo => {
        photo.classList.remove('hidden', 'fullscreen');
    });
}

function enterFullscreen() {
    const gallery = document.getElementById('photoGallery');
    document.body.classList.add('fullscreen');
    gallery.classList.add('fullscreen');
    document.getElementById('exitFullscreenBtn').classList.add('visible');
    switchAudio('photoAudio');
    startSlideshow();
}

// Version simplifiée - mode plein écran personnalisé seulement
// Fonction exitFullscreen corrigée
function exitFullscreen() {
    console.log('Sortie du mode plein écran');
    
    const gallery = document.getElementById('photoGallery');
    
    // Arrêter le slideshow
    stopSlideshow();
    
    // Supprimer les classes CSS personnalisées
    document.body.classList.remove('fullscreen');
    gallery.classList.remove('fullscreen');
    document.getElementById('exitFullscreenBtn').classList.remove('visible');
    
    // Changer l'audio et afficher les éléments suivants
    switchAudio('birthdayAudio');
    document.getElementById('photoGallery').classList.add('active');
    showNextButton('cakeBtn');
}

// Gestionnaire global pour capturer l'erreur fullscreen
window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && 
        (event.reason.message.includes('Not in fullscreen mode') || 
         event.reason.message.includes('fullscreen'))) {
        console.log('Erreur fullscreen interceptée et ignorée');
        event.preventDefault();
    }
});

function turnOnLights() {
    document.body.classList.add('lit');
    document.getElementById('lights').classList.add('active');
    hideCurrentButton(event.target);
    showNextButton('decorateBtn');
    createConfetti();
    playAudio();
}

function addDecorations() {
    document.getElementById('decorations').classList.add('active');
    hideCurrentButton(event.target);
    showNextButton('balloonsBtn');
    createConfetti();
}

function addBalloons() {
    document.getElementById('balloons').classList.add('active');
    hideCurrentButton(event.target);
    showNextButton('giftsBtn');
    createConfetti();
}

function showGifts() {
    document.getElementById('gifts').classList.add('active');
    hideCurrentButton(event.target);
    showNextButton('photosBtn');
    createConfetti();
}

function showPhotos() {
    document.getElementById('photoGallery').classList.add('active');
    hideCurrentButton(event.target);
    enterFullscreen();
}

function showCake() {
    document.getElementById('photoGallery').classList.remove('active');
    document.getElementById('cakeContainer').classList.add('active');
    hideCurrentButton(event.target);
    showNextButton('blowBtn');
    createConfetti();
    switchAudio('cakeAudio');
}

function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('blown');
        }, index * 200);
    });
    hideCurrentButton(event.target);
    showNextButton('messageBtn');
    createConfetti();
    setTimeout(() => {
        alert('🎉 Félicitations ! Tous tes vœux vont se réaliser ! 🎉');
    }, 1000);
}

function safeExitFullscreen() {
    try {
        exitFullscreen();
    } catch (error) {
        console.log('Erreur capturée:', error);
    }
    
    // S'assurer que l'action principale se fait même en cas d'erreur
    setTimeout(() => {
        switchAudio('birthdayAudio');
        document.getElementById('photoGallery').classList.add('active');
        showNextButton('cakeBtn');
    }, 100);
}

function showMessage() {
    document.getElementById('cakeContainer').classList.remove('active');
    document.getElementById('gifts').classList.remove('active');
    document.getElementById('balloons').classList.remove('active');
    document.getElementById('decorations').classList.remove('active');
    document.getElementById('lights').classList.remove('active');
    document.body.classList.remove('lit');
    document.getElementById('message').classList.add('active');
    hideCurrentButton(event.target);
    createConfetti();
    setTimeout(() => createConfetti(), 1000);
    setTimeout(() => createConfetti(), 2000);
}

function hideCurrentButton(button) {
    button.classList.add('hidden');
}

function showNextButton(buttonId) {
    document.getElementById(buttonId).classList.add('visible');
}

function playAudio() {
    switchAudio('birthdayAudio');
    audioPlaying = true;
}

document.addEventListener('DOMContentLoaded', function() {
    createLights();
    createBalloons();
    setTimeout(() => {
        document.querySelector('h1').style.opacity = '1';
    }, 500);
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('gift')) {
        createConfetti();
        e.target.style.transform = 'scale(1.3) rotate(360deg)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 500);
    }
});