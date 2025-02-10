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

// Музыка
const music = document.getElementById('background-music');
const musicButton = document.getElementById('music-button');

musicButton.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicButton.textContent = '🎵 Выключить музыку';
        startAudioVisualization();  // Запуск визуализации при включении музыки
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

// Визуализация звука (анимация "шаровой молнии")
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
        const scale = 1 + (volume / 128);  // Масштабирование сферы

        // Меняем цвет сферы в зависимости от громкости
        const hue = 280 - (volume / 2);  // Цвет от фиолетового (280deg) к розовому (330deg)

        sphere.style.transform = `scale(${scale})`;
        sphere.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 70%), transparent)`;

        requestAnimationFrame(animate);
    }

    animate();
}
