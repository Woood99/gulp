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

/***/ "./node_modules/focus-visible/dist/focus-visible.js":
/*!**********************************************************!*\
  !*** ./node_modules/focus-visible/dist/focus-visible.js ***!
  \**********************************************************/
/***/ (function() {

eval("(function (global, factory) {\n   true ? factory() :\n  0;\n}(this, (function () { 'use strict';\n\n  /**\n   * Applies the :focus-visible polyfill at the given scope.\n   * A scope in this case is either the top-level Document or a Shadow Root.\n   *\n   * @param {(Document|ShadowRoot)} scope\n   * @see https://github.com/WICG/focus-visible\n   */\n  function applyFocusVisiblePolyfill(scope) {\n    var hadKeyboardEvent = true;\n    var hadFocusVisibleRecently = false;\n    var hadFocusVisibleRecentlyTimeout = null;\n\n    var inputTypesAllowlist = {\n      text: true,\n      search: true,\n      url: true,\n      tel: true,\n      email: true,\n      password: true,\n      number: true,\n      date: true,\n      month: true,\n      week: true,\n      time: true,\n      datetime: true,\n      'datetime-local': true\n    };\n\n    /**\n     * Helper function for legacy browsers and iframes which sometimes focus\n     * elements like document, body, and non-interactive SVG.\n     * @param {Element} el\n     */\n    function isValidFocusTarget(el) {\n      if (\n        el &&\n        el !== document &&\n        el.nodeName !== 'HTML' &&\n        el.nodeName !== 'BODY' &&\n        'classList' in el &&\n        'contains' in el.classList\n      ) {\n        return true;\n      }\n      return false;\n    }\n\n    /**\n     * Computes whether the given element should automatically trigger the\n     * `focus-visible` class being added, i.e. whether it should always match\n     * `:focus-visible` when focused.\n     * @param {Element} el\n     * @return {boolean}\n     */\n    function focusTriggersKeyboardModality(el) {\n      var type = el.type;\n      var tagName = el.tagName;\n\n      if (tagName === 'INPUT' && inputTypesAllowlist[type] && !el.readOnly) {\n        return true;\n      }\n\n      if (tagName === 'TEXTAREA' && !el.readOnly) {\n        return true;\n      }\n\n      if (el.isContentEditable) {\n        return true;\n      }\n\n      return false;\n    }\n\n    /**\n     * Add the `focus-visible` class to the given element if it was not added by\n     * the author.\n     * @param {Element} el\n     */\n    function addFocusVisibleClass(el) {\n      if (el.classList.contains('focus-visible')) {\n        return;\n      }\n      el.classList.add('focus-visible');\n      el.setAttribute('data-focus-visible-added', '');\n    }\n\n    /**\n     * Remove the `focus-visible` class from the given element if it was not\n     * originally added by the author.\n     * @param {Element} el\n     */\n    function removeFocusVisibleClass(el) {\n      if (!el.hasAttribute('data-focus-visible-added')) {\n        return;\n      }\n      el.classList.remove('focus-visible');\n      el.removeAttribute('data-focus-visible-added');\n    }\n\n    /**\n     * If the most recent user interaction was via the keyboard;\n     * and the key press did not include a meta, alt/option, or control key;\n     * then the modality is keyboard. Otherwise, the modality is not keyboard.\n     * Apply `focus-visible` to any current active element and keep track\n     * of our keyboard modality state with `hadKeyboardEvent`.\n     * @param {KeyboardEvent} e\n     */\n    function onKeyDown(e) {\n      if (e.metaKey || e.altKey || e.ctrlKey) {\n        return;\n      }\n\n      if (isValidFocusTarget(scope.activeElement)) {\n        addFocusVisibleClass(scope.activeElement);\n      }\n\n      hadKeyboardEvent = true;\n    }\n\n    /**\n     * If at any point a user clicks with a pointing device, ensure that we change\n     * the modality away from keyboard.\n     * This avoids the situation where a user presses a key on an already focused\n     * element, and then clicks on a different element, focusing it with a\n     * pointing device, while we still think we're in keyboard modality.\n     * @param {Event} e\n     */\n    function onPointerDown(e) {\n      hadKeyboardEvent = false;\n    }\n\n    /**\n     * On `focus`, add the `focus-visible` class to the target if:\n     * - the target received focus as a result of keyboard navigation, or\n     * - the event target is an element that will likely require interaction\n     *   via the keyboard (e.g. a text box)\n     * @param {Event} e\n     */\n    function onFocus(e) {\n      // Prevent IE from focusing the document or HTML element.\n      if (!isValidFocusTarget(e.target)) {\n        return;\n      }\n\n      if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {\n        addFocusVisibleClass(e.target);\n      }\n    }\n\n    /**\n     * On `blur`, remove the `focus-visible` class from the target.\n     * @param {Event} e\n     */\n    function onBlur(e) {\n      if (!isValidFocusTarget(e.target)) {\n        return;\n      }\n\n      if (\n        e.target.classList.contains('focus-visible') ||\n        e.target.hasAttribute('data-focus-visible-added')\n      ) {\n        // To detect a tab/window switch, we look for a blur event followed\n        // rapidly by a visibility change.\n        // If we don't see a visibility change within 100ms, it's probably a\n        // regular focus change.\n        hadFocusVisibleRecently = true;\n        window.clearTimeout(hadFocusVisibleRecentlyTimeout);\n        hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {\n          hadFocusVisibleRecently = false;\n        }, 100);\n        removeFocusVisibleClass(e.target);\n      }\n    }\n\n    /**\n     * If the user changes tabs, keep track of whether or not the previously\n     * focused element had .focus-visible.\n     * @param {Event} e\n     */\n    function onVisibilityChange(e) {\n      if (document.visibilityState === 'hidden') {\n        // If the tab becomes active again, the browser will handle calling focus\n        // on the element (Safari actually calls it twice).\n        // If this tab change caused a blur on an element with focus-visible,\n        // re-apply the class when the user switches back to the tab.\n        if (hadFocusVisibleRecently) {\n          hadKeyboardEvent = true;\n        }\n        addInitialPointerMoveListeners();\n      }\n    }\n\n    /**\n     * Add a group of listeners to detect usage of any pointing devices.\n     * These listeners will be added when the polyfill first loads, and anytime\n     * the window is blurred, so that they are active when the window regains\n     * focus.\n     */\n    function addInitialPointerMoveListeners() {\n      document.addEventListener('mousemove', onInitialPointerMove);\n      document.addEventListener('mousedown', onInitialPointerMove);\n      document.addEventListener('mouseup', onInitialPointerMove);\n      document.addEventListener('pointermove', onInitialPointerMove);\n      document.addEventListener('pointerdown', onInitialPointerMove);\n      document.addEventListener('pointerup', onInitialPointerMove);\n      document.addEventListener('touchmove', onInitialPointerMove);\n      document.addEventListener('touchstart', onInitialPointerMove);\n      document.addEventListener('touchend', onInitialPointerMove);\n    }\n\n    function removeInitialPointerMoveListeners() {\n      document.removeEventListener('mousemove', onInitialPointerMove);\n      document.removeEventListener('mousedown', onInitialPointerMove);\n      document.removeEventListener('mouseup', onInitialPointerMove);\n      document.removeEventListener('pointermove', onInitialPointerMove);\n      document.removeEventListener('pointerdown', onInitialPointerMove);\n      document.removeEventListener('pointerup', onInitialPointerMove);\n      document.removeEventListener('touchmove', onInitialPointerMove);\n      document.removeEventListener('touchstart', onInitialPointerMove);\n      document.removeEventListener('touchend', onInitialPointerMove);\n    }\n\n    /**\n     * When the polfyill first loads, assume the user is in keyboard modality.\n     * If any event is received from a pointing device (e.g. mouse, pointer,\n     * touch), turn off keyboard modality.\n     * This accounts for situations where focus enters the page from the URL bar.\n     * @param {Event} e\n     */\n    function onInitialPointerMove(e) {\n      // Work around a Safari quirk that fires a mousemove on <html> whenever the\n      // window blurs, even if you're tabbing out of the page. ¯\\_(ツ)_/¯\n      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {\n        return;\n      }\n\n      hadKeyboardEvent = false;\n      removeInitialPointerMoveListeners();\n    }\n\n    // For some kinds of state, we are interested in changes at the global scope\n    // only. For example, global pointer input, global key presses and global\n    // visibility change should affect the state at every scope:\n    document.addEventListener('keydown', onKeyDown, true);\n    document.addEventListener('mousedown', onPointerDown, true);\n    document.addEventListener('pointerdown', onPointerDown, true);\n    document.addEventListener('touchstart', onPointerDown, true);\n    document.addEventListener('visibilitychange', onVisibilityChange, true);\n\n    addInitialPointerMoveListeners();\n\n    // For focus and blur, we specifically care about state changes in the local\n    // scope. This is because focus / blur events that originate from within a\n    // shadow root are not re-dispatched from the host element if it was already\n    // the active element in its own scope:\n    scope.addEventListener('focus', onFocus, true);\n    scope.addEventListener('blur', onBlur, true);\n\n    // We detect that a node is a ShadowRoot by ensuring that it is a\n    // DocumentFragment and also has a host property. This check covers native\n    // implementation and polyfill implementation transparently. If we only cared\n    // about the native implementation, we could just check if the scope was\n    // an instance of a ShadowRoot.\n    if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {\n      // Since a ShadowRoot is a special kind of DocumentFragment, it does not\n      // have a root element to add a class to. So, we add this attribute to the\n      // host element instead:\n      scope.host.setAttribute('data-js-focus-visible', '');\n    } else if (scope.nodeType === Node.DOCUMENT_NODE) {\n      document.documentElement.classList.add('js-focus-visible');\n      document.documentElement.setAttribute('data-js-focus-visible', '');\n    }\n  }\n\n  // It is important to wrap all references to global window and document in\n  // these checks to support server-side rendering use cases\n  // @see https://github.com/WICG/focus-visible/issues/199\n  if (typeof window !== 'undefined' && typeof document !== 'undefined') {\n    // Make the polyfill helper globally available. This can be used as a signal\n    // to interested libraries that wish to coordinate with the polyfill for e.g.,\n    // applying the polyfill to a shadow root:\n    window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;\n\n    // Notify interested libraries of the polyfill's presence, in case the\n    // polyfill was loaded lazily:\n    var event;\n\n    try {\n      event = new CustomEvent('focus-visible-polyfill-ready');\n    } catch (error) {\n      // IE11 does not support using CustomEvent as a constructor directly:\n      event = document.createEvent('CustomEvent');\n      event.initCustomEvent('focus-visible-polyfill-ready', false, false, {});\n    }\n\n    window.dispatchEvent(event);\n  }\n\n  if (typeof document !== 'undefined') {\n    // Apply the polyfill to the global document, so that no JavaScript\n    // coordination is required to use the polyfill in the top-level document:\n    applyFocusVisiblePolyfill(document);\n  }\n\n})));\n\n\n//# sourceURL=webpack://gulp-builder/./node_modules/focus-visible/dist/focus-visible.js?");

/***/ }),

/***/ "./src/js/functions/fix-fullheight.js":
/*!********************************************!*\
  !*** ./src/js/functions/fix-fullheight.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _throttle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./throttle */ \"./src/js/functions/throttle.js\");\n\r\nconst fixFullheight = () => {\r\n  let vh = window.innerHeight;\r\n  document.documentElement.style.setProperty('--vh', `${vh}px`);\r\n};\r\n\r\nlet fixHeight = (0,_throttle__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(fixFullheight);\r\n\r\nfixHeight();\r\n\r\nwindow.addEventListener('resize', fixHeight);\n\n//# sourceURL=webpack://gulp-builder/./src/js/functions/fix-fullheight.js?");

/***/ }),

/***/ "./src/js/functions/modal.js":
/*!***********************************!*\
  !*** ./src/js/functions/modal.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Modal)\n/* harmony export */ });\nclass Modal {\r\n    constructor(options) {\r\n        this.options = options;\r\n        this.modalContainer = document.querySelector('.modal-container');\r\n        this.modalsOpen = {}\r\n        this.isOpen = false;\r\n        this.previousActiveElement = null;\r\n        this.currentModal = null;\r\n        this._focusElements = [\r\n            'a[href]',\r\n            'input',\r\n            'select',\r\n            'textarea',\r\n            'button',\r\n            'iframe',\r\n            '[contenteditable]',\r\n            '[tabindex]:not([tabindex^=\"-\"])'\r\n        ];\r\n        this._fixBlocks = document.querySelectorAll('.fix-block');\r\n        this.init();\r\n    }\r\n\r\n    init() {\r\n        if (!this.modalContainer) return;\r\n        document.addEventListener('click', (e) => {\r\n            const target = e.target;\r\n            const openBtn = target.closest(`[data-modal-path]`);\r\n            if (openBtn) {\r\n                this.open(openBtn, openBtn.dataset.modalPath);\r\n            }\r\n\r\n            if ((target.classList.contains('modal') && target.classList.contains('is-open')) || target.closest('.js-modal-close')) {\r\n                const modal = target.closest('[data-modal-target]');\r\n                if (modal) this.close(modal.dataset.modalTarget);\r\n            }\r\n        });\r\n        window.addEventListener('keydown', function (e) {\r\n            if (e.keyCode == 27 && this.isOpen) {\r\n              this.close(this.currentModal.name);\r\n            }\r\n            if (e.which == 9 && this.isOpen) {\r\n               this.focusCatch(e);\r\n              return;\r\n            }\r\n          }.bind(this));\r\n    }\r\n\r\n    open(btn, name) {\r\n        const modal = document.querySelector(`[data-modal-target=${name}]`);\r\n        if (modal) {\r\n            const config = {\r\n                name,\r\n                btn,\r\n                speed: 300,\r\n                animation: 'fade',\r\n                modal,\r\n                container: function () {\r\n                    if (this.modal) return this.modal.querySelector('.modal__container')\r\n                },\r\n               ...this.options[name]\r\n            };\r\n            this.modalsOpen[name] = config;\r\n    \r\n            this.openModal(this.modalsOpen[name]);\r\n        }\r\n    }\r\n\r\n    close(name) {\r\n        this.closeModal(this.modalsOpen[name]);\r\n    }\r\n\r\n\r\n    openModal(modal) {\r\n        this.updateCurrentModal();\r\n        if (!this.previousActiveElement) {\r\n            this.previousActiveElement = document.activeElement;\r\n        }\r\n\r\n        const modalContainer = modal.container();\r\n\r\n\r\n        this.modalContainer.classList.add('open');\r\n\r\n        modal.modal.scrollTo(0, 0);\r\n\r\n        modal.modal.style.setProperty('--transition-time', `${modal.speed / 1000}s`);\r\n        modal.modal.classList.add('is-open');\r\n\r\n        this.disableScroll();\r\n\r\n        modalContainer.classList.add('modal-open')\r\n        modalContainer.classList.add(modal.animation);\r\n\r\n\r\n        setTimeout(() => {\r\n            this.openDefault(modal);\r\n            modalContainer.classList.add('animate-open');\r\n            this.isOpen = true;\r\n            this.focusTrap();\r\n        }, modal.speed);\r\n    }\r\n\r\n    closeModal(modal) {\r\n        if (modal) {\r\n            const modalContainer = modal.container();\r\n            modalContainer.classList.remove('animate-open');\r\n            modalContainer.classList.remove(modal.animation);\r\n            modal.modal.classList.remove('is-open');\r\n            modalContainer.classList.remove('modal-open');\r\n            \r\n            const modalsOpenLength = Object.keys(this.modalsOpen).length;\r\n\r\n\r\n            if (modalsOpenLength <= 1) {\r\n                this.modalContainer.classList.remove('open');\r\n                this.enableScroll();\r\n                this.isOpen = false;\r\n            }\r\n\r\n\r\n            this.closeDefault(modal);\r\n            delete this.modalsOpen[modal.name];\r\n\r\n            this.updateCurrentModal();\r\n            \r\n            this.focusTrap();\r\n        }\r\n    }\r\n\r\n\r\n    openDefault(modal) {\r\n        if (modal.options && modal.options.isOpen) {\r\n            modal.options.isOpen(this, modal);\r\n        }\r\n    }\r\n    closeDefault(modal) {\r\n        if (modal.options && modal.options.isClose) {\r\n            modal.options.isClose(this, modal);\r\n        }\r\n    }\r\n\r\n\r\n    disableScroll() {\r\n        let pagePosition = window.scrollY;\r\n        this.lockPadding();\r\n        document.body.classList.add('dis-scroll');\r\n        document.body.dataset.position = pagePosition;\r\n        document.body.style.top = -pagePosition + 'px';\r\n    }\r\n\r\n    enableScroll() {\r\n        let pagePosition = parseInt(document.body.dataset.position, 10);\r\n        this.unlockPadding();\r\n        document.body.style.top = 'auto';\r\n        document.body.classList.remove('dis-scroll');\r\n        window.scrollTo({\r\n            top: pagePosition,\r\n            left: 0\r\n        });\r\n        document.body.removeAttribute('data-position');\r\n    }\r\n\r\n    lockPadding() {\r\n        let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';\r\n        this._fixBlocks.forEach((el) => {\r\n            el.style.paddingRight = paddingOffset;\r\n        });\r\n        document.body.style.paddingRight = paddingOffset;\r\n    }\r\n\r\n    unlockPadding() {\r\n        this._fixBlocks.forEach((el) => {\r\n            el.style.paddingRight = '0px';\r\n        });\r\n        document.body.style.paddingRight = '0px';\r\n    }\r\n\r\n\r\n    focusCatch(e) {\r\n        const nodes = this.currentModal.modal.querySelectorAll(this._focusElements);\r\n        const nodesArray = Array.prototype.slice.call(nodes);\r\n        const focusedItemIndex = nodesArray.indexOf(document.activeElement)\r\n        if (e.shiftKey && focusedItemIndex === 0) {\r\n            nodesArray[nodesArray.length - 1].focus();\r\n            e.preventDefault();\r\n        }\r\n        if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {\r\n            nodesArray[0].focus();\r\n            e.preventDefault();\r\n        }\r\n    }\r\n\r\n    focusTrap() {\r\n        if (this.isOpen) {\r\n            const nodes = this.currentModal.modal.querySelectorAll(this._focusElements);\r\n            if (nodes.length) nodes[0].focus();\r\n        } else {\r\n            if (!this.currentModal) {\r\n                this.previousActiveElement.focus();\r\n                this.previousActiveElement = null;\r\n            }\r\n        }\r\n    }\r\n\r\n    updateCurrentModal() {\r\n        if (Object.keys(this.modalsOpen).length >= 1) {\r\n            this.currentModal = this.modalsOpen[Object.keys(this.modalsOpen).last()];\r\n        } else {\r\n            this.currentModal = null;\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://gulp-builder/./src/js/functions/modal.js?");

/***/ }),

/***/ "./src/js/functions/throttle.js":
/*!**************************************!*\
  !*** ./src/js/functions/throttle.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst throttle = (func, delay = 250) => {\r\n    let isThrottled = false;\r\n    let savedArgs = null;\r\n    let savedThis = null;\r\n\r\n    return function wrap(...args) {\r\n        if (isThrottled) {\r\n            savedArgs = args,\r\n                savedThis = this;\r\n            return;\r\n        }\r\n\r\n        func.apply(this, args);\r\n        isThrottled = true;\r\n\r\n        setTimeout(() => {\r\n            isThrottled = false;\r\n\r\n            if (savedThis) {\r\n                wrap.apply(savedThis, savedArgs);\r\n                savedThis = null;\r\n                savedArgs = null;\r\n            }\r\n\r\n        }, delay);\r\n    }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (throttle);\r\n\n\n//# sourceURL=webpack://gulp-builder/./src/js/functions/throttle.js?");

/***/ }),

/***/ "./src/js/global.js":
/*!**************************!*\
  !*** ./src/js/global.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! focus-visible */ \"./node_modules/focus-visible/dist/focus-visible.js\");\n/* harmony import */ var focus_visible__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(focus_visible__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _functions_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/modal */ \"./src/js/functions/modal.js\");\n/* harmony import */ var _functions_fix_fullheight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/fix-fullheight */ \"./src/js/functions/fix-fullheight.js\");\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    Array.prototype.last = function () {\r\n        return this[this.length - 1];\r\n    }\r\n    const modalSettings = {};\r\n\r\n    const modal = new _functions_modal__WEBPACK_IMPORTED_MODULE_1__[\"default\"](modalSettings);\r\n});\n\n//# sourceURL=webpack://gulp-builder/./src/js/global.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/global.js");
/******/ 	
/******/ })()
;