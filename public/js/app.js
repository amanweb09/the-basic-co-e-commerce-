/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ (() => {

eval("//hamburger\r\nconst bars = document.querySelectorAll('div.bars')\r\nconst menu = document.querySelector('div.menu')\r\n\r\ndocument\r\n    .querySelector('div.close')\r\n    .addEventListener('click', closeMenu)\r\n\r\nfunction closeMenu() {\r\n    bars.forEach((bar) => {\r\n        bar.classList.remove('open')\r\n    })\r\n    menu.classList.remove('open')\r\n}\r\n\r\ndocument\r\n    .querySelector('div.ham')\r\n    .addEventListener('click', openMenu)\r\n\r\nfunction openMenu() {\r\n\r\n    bars.forEach((bar) => {\r\n        bar\r\n            .classList\r\n            .add('open')\r\n    })\r\n    menu\r\n        .classList\r\n        .add('open')\r\n}\r\n\r\n//utils\r\nfunction redirect(dest) {\r\n    window\r\n        .location\r\n        .href('/')\r\n}\r\n\r\n//product slideshow\r\nconst slides = document\r\n    .querySelectorAll('.slide-img')\r\nconst main_image = document\r\n    .querySelector('.main_image')\r\n\r\nslides.forEach((slide) => {\r\n\r\n    slide.addEventListener('click', () => {\r\n\r\n        let secSrc = slide.getAttribute('src')\r\n        main_image\r\n            .setAttribute('src', secSrc)\r\n    })\r\n})\r\n\r\n//add to cart\r\nconst addToCartBtn = document\r\n    .querySelector('#add_to_cart_btn')\r\naddToCartBtn\r\n    .addEventListener('click', addToCart)\r\n\r\nasync function addToCart(e) {\r\n    e.preventDefault()\r\n\r\n    const productId = addToCartBtn\r\n        .dataset\r\n        .product\r\n    const productPrice = addToCartBtn\r\n        .dataset\r\n        .price\r\n    const colors = document\r\n        .getElementsByName('color')\r\n    let color\r\n\r\n\r\n    for (let i = 0; i < colors.length; i++) {\r\n        if (colors[i].checked) {\r\n            color = colors[i].value\r\n        }\r\n    }\r\n\r\n    //cart = {items: {_id: {color, size, qty}}, _id: {color, size, qty}}, totalQty, totalPrice}\r\n\r\n    const cart = window\r\n        .localStorage\r\n        .getItem('cart')\r\n    let _cart = cart\r\n\r\n    if (!cart || cart == null) {\r\n        _cart = {\r\n            items: {},\r\n            totalQty: 0\r\n        }\r\n    }\r\n    else {\r\n        _cart = JSON\r\n            .parse(cart)\r\n    }\r\n\r\n    if (document.querySelector('#size').value === '' || color === '' || color === undefined) {\r\n        alert('please select a valid a color and size')\r\n        return\r\n    }\r\n\r\n    if (!_cart.items[productId]) {\r\n        _cart.items[productId] = {\r\n            size: document\r\n                .querySelector('#size')\r\n                .value,\r\n            color: color,\r\n            qty: 1\r\n        }\r\n        _cart.totalQty += 1\r\n    }\r\n    else {\r\n        _cart\r\n            .items[productId]\r\n            .qty += 1\r\n        _cart\r\n            .totalQty += 1\r\n    }\r\n\r\n    window\r\n        .localStorage\r\n        .setItem('cart', JSON.stringify(_cart))\r\n\r\n    const cartCounter = document.querySelector('.cart_counter')\r\n\r\n    if (cart) {\r\n        let totalItems = JSON.parse(cart).totalQty\r\n        cartCounter.innerText = totalItems + 1\r\n    }\r\n    else {\r\n        cartCounter.innerText = 1\r\n    }\r\n\r\n\r\n    const successBadge = document\r\n        .querySelector('.success_badge')\r\n    successBadge\r\n        .classList\r\n        .add('show')\r\n\r\n    setTimeout(() => {\r\n        successBadge\r\n            .classList\r\n            .remove('show')\r\n    }, 2500)\r\n}\r\n\r\nconst descBadge = document.querySelector('.desc-badge')\r\ndescBadge.addEventListener('click', () => {\r\n    const desc = document.querySelector('.desc')\r\n    const descChev = document.querySelector('.desc_chev')\r\n    desc.classList.toggle('open')\r\n    descChev.classList.toggle('open')\r\n})\r\n\r\nconst careBadge = document.querySelector('.care-badge')\r\ncareBadge.addEventListener('click', () => {\r\n    const care = document.querySelector('.care')\r\n    const careChev = document.querySelector('.care_chev')\r\n    care.classList.toggle('open')\r\n    careChev.classList.toggle('open')\r\n})\n\n//# sourceURL=webpack://eesh-web/./public/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/index.js"]();
/******/ 	
/******/ })()
;