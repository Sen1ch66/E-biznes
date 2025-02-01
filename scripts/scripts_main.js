document.addEventListener("DOMContentLoaded", () => {
    // Добавление анимации появления при прокрутке
    const features = document.querySelectorAll(".feature");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.3 });

    features.forEach(feature => {
        observer.observe(feature);
    });

    // Эффект затемнения фона при скролле
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = "rgba(51, 51, 51, 0.9)";
        } else {
            header.style.backgroundColor = "#333";
        }
    });

    // Кнопка прокрутки вверх
    const scrollBtn = document.createElement("button");
    scrollBtn.textContent = "↑";
    scrollBtn.classList.add("scroll-to-top");
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add("visible");
        } else {
            scrollBtn.classList.remove("visible");
        }
    });
});
