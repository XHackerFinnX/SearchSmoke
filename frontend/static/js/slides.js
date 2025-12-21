let currentSlideIndex = 0;
let carouselInterval;
let isDragging = false;

// Initialize the app
function init() {
    setupCarousel();
}

// Setup carousel functionality
function setupCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const carouselWrapper = document.querySelector(".carousel-wrapper");

    let startX = 0;
    let endX = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active", "next", "prev");
            if (i === index) {
                slide.classList.add("active");
            } else if (i === (index + 1) % slides.length) {
                slide.classList.add("next");
            } else if (i === (index - 1 + slides.length) % slides.length) {
                slide.classList.add("prev");
            }
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
        currentSlideIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex =
            currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
        showSlide(prevIndex);
    }

    // Auto-rotate carousel every 4 seconds
    carouselInterval = setInterval(nextSlide, 4000);

    function resetInterval() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 4000);
    }

    // Manual navigation via dots
    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            clearInterval(carouselInterval);
            showSlide(Number.parseInt(dot.dataset.index));
            carouselInterval = setInterval(nextSlide, 4000);
        });
    });

    // Prevent slide click during dragging
    let clickTimer;
    slides.forEach((slide) => {
        slide.addEventListener("click", (e) => {
            if (!isDragging) {
                console.log("[v0] Slide clicked:", slide.dataset.slide);
                // You can add navigation or modal logic here
                alert(
                    `Слайд ${Number.parseInt(slide.dataset.slide) + 1} кликнут!`
                );
            }
        });
    });

    // Swipe functionality
    carouselWrapper.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = false;
    });

    carouselWrapper.addEventListener("touchmove", (e) => {
        isDragging = true;
    });

    carouselWrapper.addEventListener("touchend", (e) => {
        if (!isDragging) return;

        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    carouselWrapper.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        isDragging = false;
        carouselWrapper.style.cursor = "grabbing";
    });

    carouselWrapper.addEventListener("mousemove", (e) => {
        if (startX !== 0) {
            isDragging = true;
        }
    });

    carouselWrapper.addEventListener("mouseup", (e) => {
        if (!isDragging) {
            startX = 0;
            carouselWrapper.style.cursor = "grab";
            return;
        }

        endX = e.clientX;
        handleSwipe();
        carouselWrapper.style.cursor = "grab";
        startX = 0;
    });

    carouselWrapper.addEventListener("mouseleave", () => {
        startX = 0;
        carouselWrapper.style.cursor = "grab";
    });

    function handleSwipe() {
        const diffX = startX - endX;
        const threshold = 50;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            resetInterval();
        }

        startX = 0;
        endX = 0;
        isDragging = false;
    }
}

// Start the app when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
