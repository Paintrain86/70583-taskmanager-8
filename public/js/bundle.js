/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/get-filter.js":
/*!***************************!*\
  !*** ./src/get-filter.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getFilterItem = (name, count, isChecked = false) => `
  <input
    type="radio"
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
    ${count > 0 ? `` : `disabled`}
  />
  <label for="filter__${name}" class="filter__label">
    ${name} <span class="filter__all-count">${count}</span>
  </label>
`;

/* harmony default export */ __webpack_exports__["default"] = (getFilterItem);

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _get_filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-filter.js */ "./src/get-filter.js");


(function initPage() {
  const cardsCount = {
    min: 0,
    max: 10,
    default: 7
  };

  const getRandomIntegerFromCount = (min = 0, max = 5) => Math.floor(min + Math.random() * (max - min));

  const renderFilters = () => {
    const filtersBlock = document.querySelector(`.main__filter`);
    const filterCountSelector = `.filter__all-count`;
    const filterCardsResult = {
      min: cardsCount.min,
      max: cardsCount.max
    };
    const filters = [{
      name: `all`,
      count: getRandomIntegerFromCount(filterCardsResult.min, filterCardsResult.max)
    }, {
      name: `overdue`,
      count: getRandomIntegerFromCount(filterCardsResult.min, filterCardsResult.max)
    }, {
      name: `today`,
      count: getRandomIntegerFromCount(filterCardsResult.min, filterCardsResult.max),
      isChecked: true
    }, {
      name: `favorites`,
      count: getRandomIntegerFromCount(filterCardsResult.min, filterCardsResult.max)
    }, {
      name: `repeating`,
      count: getRandomIntegerFromCount(filterCardsResult.min, filterCardsResult.max)
    }, {
      name: `tags`,
      count: getRandomIntegerFromCount(filterCardsResult.min, filterCardsResult.max)
    }, {
      name: `archive`,
      count: getRandomIntegerFromCount(filterCardsResult.min, filterCardsResult.max)
    }];

    const getFilterItemsHtml = items => items.map(item => Object(_get_filter_js__WEBPACK_IMPORTED_MODULE_0__["default"])(item.name, item.count, item.isChecked)).join(``);

    const onFilterChange = e => {
      e.preventDefault();
      const input = e.target;
      const label = filtersBlock.querySelector(`[for="${input.id}"]`);
      const count = parseInt(label.querySelector(filterCountSelector).textContent, 10);
      renderCards(Number.isNaN(count) ? cardsCount.default : count);
    };

    filtersBlock.insertAdjacentHTML(`afterBegin`, getFilterItemsHtml(filters));
    filtersBlock.addEventListener(`change`, onFilterChange);
  };

  const renderCards = count => {
    const cardsBlock = document.querySelector(`.board__tasks`);
    const cards = cardsBlock.querySelectorAll(`.card`);
    const cardsEmptyBlock = document.querySelector(`.board__no-tasks`);

    const removeAllCards = () => {
      if (cards) {
        [].forEach.call(cards, card => {
          cardsBlock.removeChild(card);
        });
      }
    };

    const getCardItem = () => `
    <article class="card card--pink card--repeat">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >
It is example of repeating task. It marks by wave.</textarea
              >
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>

                <fieldset class="card__date-deadline" disabled>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="11:15 PM"
                      name="time"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">no</span>
                </button>

                <fieldset class="card__repeat-days" disabled>
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-2"
                      name="repeat"
                      value="mo"
                    />
                    <label class="card__repeat-day" for="repeat-mo-2"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-2"
                      name="repeat"
                      value="tu"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-tu-2"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-2"
                      name="repeat"
                      value="we"
                    />
                    <label class="card__repeat-day" for="repeat-we-2"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-2"
                      name="repeat"
                      value="th"
                    />
                    <label class="card__repeat-day" for="repeat-th-2"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-2"
                      name="repeat"
                      value="fr"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-fr-2"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-2"
                    />
                    <label class="card__repeat-day" for="repeat-sa-2"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-2"
                      name="repeat"
                      value="su"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-su-2"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  <span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <button type="button" class="card__hashtag-name">
                      #repeat
                    </button>
                    <button type="button" class="card__hashtag-delete">
                      delete
                    </button>
                  </span>

                  <span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <button type="button" class="card__hashtag-name">
                      #cinema
                    </button>
                    <button type="button" class="card__hashtag-delete">
                      delete
                    </button>
                  </span>

                  <span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <button type="button" class="card__hashtag-name">
                      #entertaiment
                    </button>
                    <button type="button" class="card__hashtag-delete">
                      delete
                    </button>
                  </span>
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <label class="card__img-wrap card__img-wrap--empty">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="img/add-photo.svg"
                alt="task picture"
                class="card__img"
              />
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-2"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                />
                <label
                  for="color-black-2"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-2"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                />
                <label
                  for="color-yellow-2"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-2"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                />
                <label
                  for="color-blue-2"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-2"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                />
                <label
                  for="color-green-2"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-2"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                  checked
                />
                <label
                  for="color-pink-2"
                  class="card__color card__color--pink"
                  >pink</label
                >
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>
    `;

    const getAllCards = () => {
      let result = ``;

      for (let i = 1; i <= count; i++) {
        result += getCardItem();
      }

      return result;
    };

    removeAllCards();
    cardsBlock.classList[count > 0 ? `remove` : `add`](`visually-hidden`);
    cardsEmptyBlock.classList[count > 0 ? `add` : `remove`](`visually-hidden`);

    if (count > 0) {
      cardsBlock.insertAdjacentHTML(`afterBegin`, getAllCards());
    }
  };

  renderFilters();
})();

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map