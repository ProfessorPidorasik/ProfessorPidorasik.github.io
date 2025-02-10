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

// Уменьшил интервал появления сердечек
setInterval(createHeart, 150);

// Музыка
const music = document.getElementById('background-music');
const musicButton = document.getElementById('music-button');

musicButton.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicButton.textContent = '🎵 Выключить музыку';
    } else {
        music.pause();
        musicButton.textContent = '🎵 Включить музыку';
    }
});

// Сердцебиение
const heart = document.querySelector('.heart');
function syncHeartbeat() {
    heart.style.animation = 'none';
    heart.offsetHeight; // Триггер перерисовки
    heart.style.animation = 'heartbeat 1s infinite';
}
setInterval(syncHeartbeat, 1000);
