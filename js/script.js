"use strict"


/* Слайдер */

$(document).ready(function () {

	$('.slider').slick({

		arrows: true,   /* стрелки, если false, то стрелок нет */

		dots: true,   /* точки (буллиты), если false, то точек нет */

		slidesToShow: 1,   /* количество слайдов на экране */

		infinite: false,   /* если true, то слайдер бесконечный, если false, то слайдер останавливается с последним слайдом */

		initialSlide: 0,   /* с какого слайда начинается показ */

		speed: 1000,   /* скорость листания в мс */

		swipe: true,   /* возможность перетаскивать слайды свайпом на смартфоне */

	});
});


/* Прокрутка */

const menuLinks = document.querySelectorAll('[data-goto]');  /* ищем все объукты у которых есть атребут data-goto */
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);  /* проверяем есть ли такие объекты и при событии клика отправляемся в функцию onMenuLinkClick */
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;  /* указываем ссылку, на которую кликаем при прокрутке */
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {  /* проверка заполнен ли дата-атрибут и существет ли ссылка, на которую он ссылается */
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.nav').offsetHeight;  /* рассчет прокрутки: расстояние от верха плюс пиксели прокрутки минус высота header */

			if (iconMenu.classList.contains('_active')) {  /* закрывает меню при клике на прокрутку к объекту */
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();  /* не дает странице перезагрузится */
		}
	}
}


/* Бургер */

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


/* Подчеркивание titles */

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);   /* событие скролла на всей величине окна */
	function animOnScroll(params) {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;   /* высота анимируемого объекта */
			const animItemOffset = offset(animItem).top;   /* положение объекта относительно верхнего края страницы */
			const animStart = 4;   /* коэффициент момента старта анимации */

			let animItemPoint = window.innerHeight - animItemHeight / animStart;   /* рассчет момента старта анимации = высота окна браузера - высоту объекта / коэффициент */

			if (animItemHeight > window.innerHeight) {   /* если высота объекта больше высоты окна браузера, то рассчет таким образом */
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {   /* переменная с данными о прокрученных скроллом пикселях, если она больше чем позиция объекта минус точка старта, но меньше чем позиция объекта пллюс его высота, то */
				animItem.classList.add('_active');   /* добавляется класс */
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {   /* это нужно чтобы повторно не срабатывала анимация при обратном скролле, если этого не надо */
					animItem.classList.remove('_active');   /* если нет, и у объекта нету класса _anim-no-hide, то класс отбирается */
				}
			}
		}
	}
	function offset(el) {   /* функция определения положения объекта относительно верхнего и левого края страницы */
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
}