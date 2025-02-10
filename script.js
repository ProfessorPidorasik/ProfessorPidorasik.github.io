const heartsContainer = document.querySelector('.hearts-background');

// Массив цветов для сердечек
const colors = ['#ff4d4d', '#ff7f50', '#ff69b4', '#ff1493', '#ff4500', '#ff6347'];

// Функция для создания одного сердечка
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-background');

    // Случайный цвет из массива
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.backgroundColor = randomColor;

    // Случайная позиция по горизонтали
    heart.style.left = Math.random() * 100 + 'vw';

    // Случайная скорость падения
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';

    heartsContainer.appendChild(heart);

    // Удаляем сердечко после завершения анимации
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Создаем сердечки каждые 300 мс
setInterval(createHeart, 300);
// Проверяем, запущено ли приложение в Telegram
if (window.Telegram && window.Telegram.WebApp) {
    const webApp = Telegram.WebApp;

    // Показываем кнопку "Закрыть"
    webApp.MainButton.setText("Закрыть").show().onClick(() => {
        webApp.close();
    });

    // Получаем данные пользователя
    const user = webApp.initDataUnsafe.user;
    if (user) {
        console.log("Пользователь:", user);
        const messageElement = document.querySelector('.message');
        if (messageElement) {
            messageElement.textContent = `Привет, ${user.first_name}! 💖`;
        }
    }
}
// Музыка
const music = document.getElementById('background-music');
music.play().catch(() => {});

// Кнопка музыки
const toggleMusicButton = document.createElement('button');
toggleMusicButton.textContent = '🎵 Включить музыку';
toggleMusicButton.style.position = 'fixed';
toggleMusicButton.style.bottom = '20px';
toggleMusicButton.style.right = '20px';
toggleMusicButton.style.zIndex = '1000';
document.body.appendChild(toggleMusicButton);

toggleMusicButton.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggleMusicButton.textContent = '🎵 Выключить музыку';
    } else {
        music.pause();
        toggleMusicButton.textContent = '🎵 Включить музыку';
    }
});

// Сердечный ритм
const heart = document.querySelector('.heart');
function syncHeartbeat() {
    heart.style.animation = 'none';
    heart.offsetHeight; // Триггер перерисовки
    heart.style.animation = 'heartbeat 1s infinite';
}
setInterval(syncHeartbeat, 1000);

// Падающие сердечки (ОСНОВНОЕ ИЗМЕНЕНИЕ!)
const heartsContainer = document.querySelector('.hearts-background');
const colors = ['#ff4d4d', '#ff7f50', '#ff69b4', '#ff1493', '#ff4500', '#ff6347'];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-background');
    heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 5000);
}

// Увеличил частоту: было 300 мс, стало 100 мс ⭐
setInterval(createHeart, 100); 
