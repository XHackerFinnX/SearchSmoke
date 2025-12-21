// Автоматическое перенаправление после загрузки
window.addEventListener("DOMContentLoaded", () => {
    // Минимальное время показа экрана загрузки (в миллисекундах)
    const minLoadingTime = 3000; // 3 секунды

    // Симуляция загрузки ресурсов
    setTimeout(() => {
        // Плавное исчезновение экрана загрузки
        document.body.style.transition = "opacity 0.5s ease-out";
        document.body.style.opacity = "0";

        // Перенаправление на главную страницу каталога
        setTimeout(() => {
            window.location.href = "catalog.html";
        }, 500);
    }, minLoadingTime);
});

// Дополнительная анимация для текста загрузки
const loadingText = document.querySelector(".loading-text");
if (loadingText) {
    const texts = ["Загрузка", "Загрузка.", "Загрузка..", "Загрузка..."];
    let index = 0;

    setInterval(() => {
        index = (index + 1) % texts.length;
        loadingText.textContent = texts[index];
    }, 400);
}
