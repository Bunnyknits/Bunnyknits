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


// pop-up

const popupLinks = document.querySelectorAll('.popup-link');   /* действие будет происходить при любом клике на элемент с классом popup-link */
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");   /* действие будет происходить при любом клике на элемент с классом lock-padding */

let unlock = true;

const timeout = 800;   /* это значение должно соответствовать времени в transition в css */

if (popupLinks.length > 0) {   /* проверка есть ли элементы с классом popup-link на странице */
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {   /* при клике на элемент с классом popup-link */
			const popupName = popupLink.getAttribute('href').replace('#', '');   /* из href удаляется # */
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);   /* функция открытия попапа */
			e.preventDefault();   /* блокирует перезагрузку страницы при клике на ссылку */
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');   /* действие будет происходить при любом клике на элемент с классом close-popup */
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {   /* при клике на элемент с классом close-popup */
			popupClose(el.closest('.popup'));   /* закрывается ближайший его родитель с классом popup */
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {   /* проверка есть ли объект curentPopup и открыт ли он (let unlock = true;) */
		const popupActive = document.querySelector('.popup.open');   /* если в попапе есть ссылка на другой попап, то при нажатии ссылки эта функция закрывает первый попап */
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();   /* блокируется скролл в body */
		}
		curentPopup.classList.add('open');   /* попапу придается класс open и он открывается */
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {   /* при клике на любую точку экрана, у которой в родителях нет класса popup__content */
				popupClose(e.target.closest('.popup'));   /* закрывается ближайший элемент с классом popup (это значит, что при клике на все, что за пределами popup__content, попап закроется) */
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {   /* функция проверки стоит ли разблокировать скролл (например, при простом закрытии попапа стоит, а при закрытии попапа при том что из него открывается второй попап - не стоит) */
	if (unlock) {
		popupActive.classList.remove('open');   /* открытый попап закрывается */
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth - 20 + 'px';   /* когда выскакивает попап, то исчезает полоса прокрутки на всей странице и весь ее контент сдвигается вправо на ширину этого скролла, при этом изображение дергается, чтобы этого не было добавляем эту функцию */
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;   /* ширина скролла добавляется к элементам с классом lock-padding ( в данном случает это нужно, т.к. header зафиксирован и к нему не применяется добавка ширины скролла ко всему body ниже) */
		}
	}
	body.style.paddingRight = lockPaddingValue;   /* body добавляется ширина скролла и изображение не дергается при открытии попапа */
	body.classList.add('lock');   /* body добавляется класс lock (в css) */

	unlock = false;   /* на время timeout блокируется возможность повторно нажать на кнопку открытия попапа */
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {   /* если есть элементы к которым добавлялась ширина скролла при открытии попапа */
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';   /* то эта ширина убирается при его закрытии через время timeout */
			}
		}
		body.style.paddingRight = '0px';   /* также эта ширина убирается у body */
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {   /* дает возможность закрывать попап нажатием кнопки esc (ее код 27) */
	if (event.code === 'Escape') {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

/* полифилы - функции для улучшения работы closest и matches на старых браузерах */

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();