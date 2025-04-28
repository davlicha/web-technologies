document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = carouselContainer.querySelector('.carousel');
    const slides = Array.from(carouselContainer.querySelectorAll('.slide'));
    const prevBtn = carouselContainer.querySelector('.prev');
    const nextBtn = carouselContainer.querySelector('.next');
    const pagination = carouselContainer.querySelector('.pagination');

    const options = {
        autoplay: true,
        autoplayInterval: 5000,
        animationDuration: 500,
        showArrows: true,
        showPagination: true,
        loop: true
    };

    let currentIndex = 0;
    let autoplayInterval = null;
    let isPaused = false;

    function initCarousel() {
        if (options.showPagination) {
            createPagination();
        } else {
            pagination.style.display = 'none';
        }

        if (!options.showArrows) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        document.addEventListener('keydown', handleKeyDown);

        if (options.autoplay) {
            setupAutoplay();
        }

        updateCarousel();
    }

    function createPagination() {
        slides.forEach(function(_, index) {
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
            pagination.appendChild(dot);
        });
    }

    function updateCarousel() {
        carousel.style.transition = `transform ${options.animationDuration}ms ease-in-out`;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        if (options.showPagination) {
            const dots = pagination.querySelectorAll('.pagination-dot');
            dots.forEach(function(dot, index) {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    }

    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else if (options.loop) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else if (options.loop) {
            currentIndex = slides.length - 1;
        }
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function handleKeyDown(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    }

    function setupAutoplay() {
        startAutoplay();

        carouselContainer.addEventListener('mouseenter', function() {
            pauseAutoplay();
        });

        carouselContainer.addEventListener('mouseleave', function() {
            resumeAutoplay();
        });
    }

    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(function() {
            if (!isPaused) nextSlide();
        }, options.autoplayInterval);
    }

    function pauseAutoplay() {
        isPaused = true;
    }

    function resumeAutoplay() {
        isPaused = false;
    }

    initCarousel();
});