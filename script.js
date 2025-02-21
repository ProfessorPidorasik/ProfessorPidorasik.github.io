const heartsContainer = document.querySelector('.hearts-background');
const colors = ['#ff4d4d', '#ff7f50', '#ff69b4', '#ff1493', '#ff4500', '#ff6347'];

// Функция создания сердечек
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-background');
    heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 5000);
}

// Падающие сердечки каждые 150 мс
setInterval(createHeart, 150);

// Музыка и визуализация
const music = document.getElementById('background-music');
const musicButton = document.getElementById('music-button');
let audioInitialized = false;

musicButton.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicButton.textContent = '🎵 Выключить музыку';
        if (!audioInitialized) {
            startAudioVisualization();
            audioInitialized = true;
        }
    } else {
        music.pause();
        musicButton.textContent = '🎵 Включить музыку';
    }
});

// Сердцебиение
const heart = document.querySelector('.heart');
function syncHeartbeat() {
    heart.style.animation = 'none';
    heart.offsetHeight;
    heart.style.animation = 'heartbeat 1s infinite';
}
setInterval(syncHeartbeat, 1000);

// Визуализация звука (более мягкая и тёмная сфера)
function startAudioVisualization() {
    const sphere = document.querySelector('.pulse-sphere');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(music);
    const analyser = audioCtx.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function animate() {
        analyser.getByteFrequencyData(dataArray);

        // Рассчитываем среднюю громкость
        const volume = dataArray.reduce((a, b) => a + b) / bufferLength;
        const scale = 1 + (volume / 200);  // Более мягкое масштабирование

        // Цвет будет оставаться тёмно-фиолетовым с лёгким изменением оттенков
        const hue = 260 - (volume / 10);  // Мягкий переход от тёмно-фиолетового к чуть светлее

        sphere.style.transform = `translate(-50%, -50%) scale(${scale})`;
        sphere.style.background = `radial-gradient(circle, hsl(${hue}, 80%, 30%), transparent)`;

        requestAnimationFrame(animate);
    }

    animate();
}

const messageText = "хряк пидорас еденичкой падает хвх не умеет играть рак нищий";
const textElement = document.getElementById("animated-text");
const cursorElement = document.querySelector(".cursor");

let index = 0;

function typeText() {
    if (index < messageText.length) {
        textElement.innerHTML += messageText[index];
        index++;
        setTimeout(typeText, 50);
    } else {
        cursorElement.style.display = "none"; // Убираем палочку после окончания анимации
    }
}

setTimeout(() => {
    cursorElement.style.animation = "blink 0.5s infinite";
    typeText();
}, 1000); // Задержка перед началом анимации
