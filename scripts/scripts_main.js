// Создаем кнопку прокрутки вверх
function createScrollTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-top-button';
    document.body.appendChild(button);

    // Добавляем стили для кнопки
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .scroll-top-button:hover {
            background-color: #2980b9;
            transform: translateY(-5px);
        }
        
        .scroll-top-button.visible {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Показываем/скрываем кнопку прокрутки вверх
function toggleScrollTopButton() {
    const button = document.querySelector('.scroll-top-button');
    if (window.scrollY > 300) {
        button.classList.add('visible');
    } else {
        button.classList.remove('visible');
    }
}

// Плавная прокрутка вверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Анимация появления элементов при прокрутке
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.feature');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        // Добавляем класс animate только если элемент еще не был анимирован
        if (!element.classList.contains('animate')) {
            element.classList.add('animate');
        }
        
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('visible');
        }
    });
}

// Добавляем стили для анимации появления элементов
function addScrollAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .feature {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
    `;
    document.head.appendChild(style);
}

// Анимация для навигационных ссылок
function addNavigationAnimations() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', (e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseout', (e) => {
            e.target.style.transform = 'translateY(0)';
        });
    });
}

// Добавляем индикатор загрузки страницы
function addLoadingIndicator() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    document.body.appendChild(loader);

    const style = document.createElement('style');
    style.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(to right, #3498db, #2ecc71);
            z-index: 9999;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
        }
        
        .page-loader.loading {
            transform: scaleX(1);
        }
    `;
    document.head.appendChild(style);
}

// Показываем индикатор загрузки
function showLoadingIndicator() {
    const loader = document.querySelector('.page-loader');
    loader.classList.add('loading');
}

// Скрываем индикатор загрузки
function hideLoadingIndicator() {
    const loader = document.querySelector('.page-loader');
    loader.classList.remove('loading');
}

// Добавляем эффект параллакса для заголовка
function addParallaxEffect() {
    const mainTitle = document.querySelector('main h2');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        mainTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
        mainTitle.style.opacity = 1 - (scrolled * 0.003);
    });
}

// Инициализация всех функций
document.addEventListener('DOMContentLoaded', () => {
    // Удаляем начальные стили, которые могут вызывать проблемы
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.style.opacity = '1';
        feature.style.transform = 'none';
    });

    // Остальной код инициализации остается без изменений
    createScrollTopButton();
    addNavigationAnimations();
    addLoadingIndicator();
    addParallaxEffect();

    // Запускаем анимации только после полной загрузки страницы
    window.addEventListener('load', () => {
        // Небольшая задержка для уверенности, что все стили применились
        setTimeout(() => {
            handleScrollAnimations();
        }, 100);
    });

    // Обработчики событий
    window.addEventListener('scroll', () => {
        toggleScrollTopButton();
        handleScrollAnimations();
    });
});

// Обработка переходов по навигационным ссылкам
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') !== '#') {
            showLoadingIndicator();
            setTimeout(hideLoadingIndicator, 500);
        }
    });
});