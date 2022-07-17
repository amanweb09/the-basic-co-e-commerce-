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

eval("\r\n\r\ndocument.getElementById('atc').addEventListener('click', () => addToCart())\r\n\r\nconst addToCart = async (itemId) => {\r\n    try {\r\n        const { data } = await axios.post('http://localhost:3100/cart', {\r\n            itemId: '629b35b4599bf9d4642c1312', color: 'red', size: 'S'\r\n        })\r\n\r\n        console.log(data);\r\n\r\n    } catch (err) {\r\n        console.log(err);\r\n    }\r\n}\n\n//# sourceURL=webpack://eesh-web/./public/js/index.js?");

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