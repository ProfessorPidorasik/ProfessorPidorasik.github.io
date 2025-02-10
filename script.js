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