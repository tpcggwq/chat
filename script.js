document.addEventListener('DOMContentLoaded', () => {
    const eyeIcons = document.querySelectorAll('.eye-icon');
    const container = document.querySelector('.container');
    const inviteButton = document.getElementById('invite-button');
    const inviteInfo = document.getElementById('invite-info');

    let particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) {
        particleContainer = document.createElement('div');
        particleContainer.classList.add('particle-container');
        document.body.appendChild(particleContainer);
    }

    let rainContainer = document.querySelector('.rain-container');
    if (!rainContainer) {
        rainContainer = document.createElement('div');
        rainContainer.classList.add('rain-container');
        document.body.appendChild(rainContainer);
    }

    let mouseX = 0;
    let rainInterval;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
    });

    function createRainDrop() {
        const rainDrop = document.createElement('div');
        rainDrop.classList.add('rain-drop');
        rainContainer.appendChild(rainDrop);

        const size = Math.random() * 2 + 1;
        const startX = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 3 + 2;

        rainDrop.style.width = `${size}px`;
        rainDrop.style.height = `${size * 10}px`;
        rainDrop.style.left = `${startX}px`;
        rainDrop.style.animationDuration = `${animationDuration}s`;

        rainDrop.addEventListener('animationend', () => {
            rainDrop.remove();
        });
    }

    for (let i = 0; i < 50; i++) {
        createRainDrop();
    }
    rainInterval = setInterval(createRainDrop, 100);

    function animateRain() {
        const rainDrops = document.querySelectorAll('.rain-drop');
        rainDrops.forEach(drop => {
            const dropLeft = parseFloat(drop.style.left);
            const viewportWidth = window.innerWidth;
            const center = viewportWidth / 2;
            const mouseInfluence = (mouseX - center) * 0.01;
            
            const currentTransform = drop.style.transform || 'translateX(0px)';
            drop.style.transform = `translateX(${mouseInfluence}px) ${currentTransform.replace(/translateX\(.*\)/, '')}`;
        });
        requestAnimationFrame(animateRain);
    }

    animateRain();

    function createLightningBolt() {
        const lightningBolt = document.createElement('div');
        lightningBolt.classList.add('lightning-bolt');
        document.body.appendChild(lightningBolt);

        const numSegments = Math.floor(Math.random() * 5) + 3;
        let currentX = 0;
        let currentY = 0;
        let maxWidth = 0;
        let maxHeight = 0;

        for (let i = 0; i < numSegments; i++) {
            const segment = document.createElement('div');
            segment.classList.add('lightning-bolt-segment');
            lightningBolt.appendChild(segment);

            const segmentWidth = Math.random() * 8 + 3;
            const segmentHeight = Math.random() * 150 + 50;
            const rotation = Math.random() * 90 - 45;

            segment.style.width = `${segmentWidth}px`;
            segment.style.height = `${segmentHeight}px`;
            segment.style.transform = `rotate(${rotation}deg)`;
            
            segment.style.left = `${currentX}px`;
            segment.style.top = `${currentY}px`;

            currentX += (Math.random() - 0.5) * 50;
            currentY += segmentHeight * 0.7;

            maxWidth = Math.max(maxWidth, currentX + segmentWidth);
            maxHeight = Math.max(maxHeight, currentY + segmentHeight);
        }

        const padding = 100;
        const minX = padding;
        const maxX = window.innerWidth - maxWidth - padding;
        const posX = Math.random() * (maxX - minX) + minX;
        const posY = Math.random() * (window.innerHeight / 2 - maxHeight);

        lightningBolt.style.left = `${posX}px`;
        lightningBolt.style.top = `${posY}px`;

        lightningBolt.addEventListener('animationend', () => {
            lightningBolt.remove();
        });
    }

    function scheduleNextLightning() {
        const delay = Math.random() * 1000 + 1000;
        setTimeout(() => {
            createLightningBolt();
            scheduleNextLightning();
        }, delay);
    }

    scheduleNextLightning();

    function applyGlowEffect(element) {
        if (element) {
            element.classList.add('glow-effect');
            setTimeout(() => {
                element.classList.remove('glow-effect');
            }, 800);
        }
    }

    eyeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const passwordInput = icon.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                icon.textContent = '👁️';
            }
        });
    });

    if (inviteButton) {
        inviteButton.addEventListener('click', () => {
            applyGlowEffect(inviteButton);
            if (inviteInfo.style.display === 'none') {
                inviteInfo.style.display = 'block';
            } else {
                inviteInfo.style.display = 'none';
            }
        });
    }

    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            const emailInput = loginForm.querySelector('input[type="email"]');
            const passwordInput = loginForm.querySelector('input[type="password"]');

            if (emailInput.value.trim() === '') {
                event.preventDefault();
                return;
            }
            
            if (passwordInput.value.trim() === '') {
                event.preventDefault();
                return; // Silently return if password is empty
            }

            // Only prevent default if we're not submitting
            if (passwordInput.value.trim() === '') {
                event.preventDefault();
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            const nameInput = registerForm.querySelector('input[type="text"]');
            const emailInput = registerForm.querySelector('input[type="email"]');
            const passwordInput = registerForm.querySelector('input[type="password"]');
            const inviteInput = registerForm.querySelector('input[placeholder="Invite"]');

            if (nameInput.value.trim() === '') {
                event.preventDefault();
                return;
            }
            
            if (emailInput.value.trim() === '') {
                event.preventDefault();
                return;
            }
            
            if (passwordInput.value.trim() === '') {
                event.preventDefault();
                return; // Silently return if password is empty
            }
            
            if (inviteInput.value.trim() === '') {
                event.preventDefault();
                return;
            }

            // Apply glow effect and log if all fields are filled and valid
            applyGlowEffect(container);
            console.log('Register form: Fields are filled, applying glow.');
            // Here you would typically handle the registration process
        });
    }
}); 