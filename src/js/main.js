'use strict';

var menuToggle = document.querySelector('.sidebar__toggle');
var sidebar = document.querySelector('.sidebar');
var header = document.querySelector('.page-header');
var main = document.querySelector('.page-main');
var menu = document.querySelector('.menu');

(function() {
	if (document.documentElement.clientWidth < 1280) {
		sidebar.classList.remove('active');
	}
}());

menuToggle.addEventListener('click', function(evt) {
	evt.preventDefault();
	sidebar.classList.toggle('active');

	if (document.documentElement.clientWidth >= 1280) {
		header.classList.toggle('full');
		main.classList.toggle('full');
	}
});

menu.addEventListener('click', function(evt) {

	if (evt.target.classList.contains('menu__link--submenu')) {
		evt.preventDefault();

		evt.target.nextElementSibling.classList.toggle('active');
		evt.target.children[0].classList.toggle('active');
	}
	
});

// window.addEventListener('scroll', function() {
// 	var pageY = window.pageYOffset || document.documentElement.scrollTop;
// 	var sideY = sidebar.offsetHeight;
	
// 	if (pageY > sideY-20) {
// 		sidebar.setAttribute('style', "position:fixed;bottom:0;top:unset;");
// 	} else {
// 		sidebar.removeAttribute('style');
// 	}
	
// });

