// Плавная прокрутка к секциям
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


const workpeopleSwiper = new Swiper('.workpeople-swiper', {
    slidesPerView: 3,   // Количество видимых слайдов
    spaceBetween: 30,  // Расстояние между слайдами
    loop: true,          // Бесконечный слайдер
    navigation: {       // Кнопки навигации
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        // Адаптивность
        320: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        992: { slidesPerView: 3, spaceBetween: 30 }
    }
});

const projectSwiper = new Swiper('.projectSwiper', {
    slidesPerView: 3,     // Количество видимых слайдов
    spaceBetween: 30,    // Расстояние между слайдами
    loop: true,           // Бесконечный слайдер
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {        // Адаптивность
        320: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        992: { slidesPerView: 3, spaceBetween: 30 }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('hero-video');
    if (video) {
        video.playbackRate = 1.5; // Устанавливаем скорость воспроизведения в 2 раза
    }
});





// Куки которые проверяют на то заходил ли пользователь на сайт(1 раз показывается)
//document.addEventListener('DOMContentLoaded', function() {
   // const warningElement = document.querySelector('.warning');
   // const applyButton = document.querySelector('.warning__apply');

    // Проверяем, закрывал ли пользователь уведомление ранее
   // if (localStorage.getItem('cookieWarningClosed')) {
       // warningElement.style.display = 'none'; // Скрываем, если закрывал
       // return; // Выходим из функции
  //  }

    // Функция для показа уведомления
    //function showCookieWarning() {
    //    warningElement.classList.add('warning--active');
   // }

    // Запускаем показ уведомления через 5 секунд
  //  setTimeout(showCookieWarning, 5000); // 5000 миллисекунд = 5 секунд

    // Обработчик нажатия на кнопку "Принять"
   // applyButton.addEventListener('click', function() {
        // Скрываем уведомление
      //  warningElement.classList.remove('warning--active');
        //warningElement.style.display = 'none';

        // Запоминаем, что пользователь закрыл уведомление
       // localStorage.setItem('cookieWarningClosed', 'true');
   // });
//});


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



