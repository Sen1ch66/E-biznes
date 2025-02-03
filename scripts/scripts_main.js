function createScrollTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-top-button';
    document.body.appendChild(button);

    button.addEventListener('click', scrollToTop);

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

function toggleScrollTopButton() {
    const button = document.querySelector('.scroll-top-button');
    if (window.scrollY > 300) {
        button.classList.add('visible');
    } else {
        button.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.feature');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        if (!element.classList.contains('animate')) {
            element.classList.add('animate');
        }
        
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight * 0.8) {
            element.classList.add('visible');
        }
    });
}

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

function showLoadingIndicator() {
    const loader = document.querySelector('.page-loader');
    loader.classList.add('loading');
}

function hideLoadingIndicator() {
    const loader = document.querySelector('.page-loader');
    loader.classList.remove('loading');
}

function addParallaxEffect() {
    const mainTitle = document.querySelector('main h2');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        mainTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
        mainTitle.style.opacity = 1 - (scrolled * 0.003);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.style.opacity = '1';
        feature.style.transform = 'none';
    });

    createScrollTopButton();
    addNavigationAnimations();
    addLoadingIndicator();
    addParallaxEffect();

    window.addEventListener('load', () => {
        setTimeout(() => {
            handleScrollAnimations();
        }, 100);
    });

    window.addEventListener('scroll', () => {
        toggleScrollTopButton();
        handleScrollAnimations();
    });
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') !== '#') {
            showLoadingIndicator();
            setTimeout(hideLoadingIndicator, 500);
        }
    });
});
