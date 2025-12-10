// Плавная прокрутка к секциям (уже есть)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('header').offsetHeight, // Учитываем высоту шапки
                behavior: 'smooth'
            });
        }
    });
});

const scrollDistance = 0.3;
const sections = document.querySelectorAll('section');

// Плавная прокрутка колесом мыши
window.addEventListener('wheel', (evt) => {
    evt.preventDefault(); // Предотвращаем стандартную прокрутку

    const прокрутка = Math.sign(evt.deltaY); // направление прокрутки (1 или -1)
    const высотаОкна = window.innerHeight;

    let целеваяПозиция;
    if (прокрутка > 0) {
        целеваяПозиция = window.pageYOffset + высотаОкна * scrollDistance;
    } else {
        целеваяПозиция = window.pageYOffset - высотаОкна * scrollDistance;
    }

    целеваяПозиция = Math.max(0, Math.min(document.documentElement.scrollHeight - высотаОкна, целеваяПозиция));

    window.scrollTo({
        top: целеваяПозиция,
        behavior: 'smooth'
    });
}, { passive: false });


// Показываем первую секцию при загрузке страницы
if (sections.length > 0) {  // добавил проверку, что sections не пустой
    sections[0].classList.add('активная');
}

// Параллакс эффект для Hero Section (пример)
document.addEventListener('scroll', function() {
    const hero = document.getElementById('hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = (scrollPosition * 0.3) + 'px'; // Настройка скорости
    }
});

// Анимация появления элементов при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-in');

    function animateOnScroll() {
        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const elementVisible = 150; // Расстояние до верхней границы окна, когда элемент считается видимым

            if (elementTop < windowHeight - elementVisible) { // Изменил условие видимости
                element.classList.add('animated'); // Активируем анимацию
            } else {
                element.classList.remove('animated'); // Скрываем элемент, если он вне видимости
            }
        });
    }

    // Вызываем функцию при загрузке и при прокрутке
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Автоматический запуск animate__fadeInUp для элементов .fade-in при появлении в viewport
(function() {
    const items = document.querySelectorAll('.fade-in');
    if (!items.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // запуск чуть раньше, чем элемент полностью виден
        threshold: 0
    };

    const onIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            // читаем настройки из data-атрибутов (если есть)
            const delay = el.getAttribute('data-anim-delay');      // например "0.3s" или "300ms"
            const duration = el.getAttribute('data-anim-duration'); // например "1s" или "800ms"

            if (delay) el.style.animationDelay = delay;
            if (duration) el.style.animationDuration = duration;

            // добавляем классы для запуска анимации
            el.classList.add('animate__animated', 'animate__fadeInUp');

            // если не нужно повторять — перестаём наблюдать
            observer.unobserve(el);
        });
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(onIntersect, observerOptions);
        items.forEach(i => observer.observe(i));
    } else {
        // fallback — запускаем все сразу
        items.forEach(el => {
            const delay = el.getAttribute('data-anim-delay');
            const duration = el.getAttribute('data-anim-duration');
            if (delay) el.style.animationDelay = delay;
            if (duration) el.style.animationDuration = duration;
            el.classList.add('animate__animated', 'animate__fadeInUp');
        });
    }
})();

SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime    : 800,
    // Размер шага в пикселях
    stepSize         : 75,

    // Дополнительные настройки:

    // Ускорение
    accelerationDelta : 30,
    // Максимальное ускорение
    accelerationMax   : 2,

    // Поддержка клавиатуры
    keyboardSupport   : true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll       : 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,

    // Поддержка тачпада
    touchpadSupport   : true,
})


// Получаем все элементы
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const totalSlides = slides.length;




// Функция для обновления видимого слайда
function showSlide(index) {
    // праваэм индекс за границы
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    currentIndex = index;

    // Перемещаем слайдер
    document.querySelector('.slider').style.transform = `translateX(-${index * 100}%)`;

    // Обновляем активность точек
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}




// Обработчики стрелок
prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
});

// Обработчики точек
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});





// Автоматическая прокрутка каждые 5 секунд
let autoSlide = setInterval(() => {
    showSlide(currentIndex + 1);
}, 5000);

// Остановка автоматической при наведении на слайдер
const sliderWrapper = document.querySelector('.slider-wrapper');

sliderWrapper.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

sliderWrapper.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000);
});




//Гарантия воспроизведения на мобильных
window.addEventListener('load', function() {
    const video = document.querySelector('.background-video');

    // Для iOS
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // Ждем немного и пытаемся воспроизвести
    setTimeout(() => {
        video.play().then(() => {
            console.log("Видео воспроизводится");
        }).catch(error => {
            console.log("Ошибка воспроизведения:", error);
// Пробуем еще раз после взаимодействия пользователя
            document.addEventListener('click', function playVideoOnce() {
                video.play();
                document.removeEventListener('click', playVideoOnce);
            });
        });
    }, 500);
});





