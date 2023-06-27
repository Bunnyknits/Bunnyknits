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
