import utils from './util.js';
import getTasks from './get-tasks.js';
import getFilter from './get-filter.js';
import getCard from './get-card.js';

(function initPage() {
  const cardsCount = {
    min: 0,
    max: 10,
    default: 7
  };

  const renderFilters = () => {
    const filtersBlock = document.querySelector(`.main__filter`);
    const filterCountSelector = `.filter__all-count`;

    const filterCardsResult = {
      min: cardsCount.min,
      max: cardsCount.max
    };

    const filters = [{
      name: `all`,
      count: utils.getRandomInteger(filterCardsResult.min, filterCardsResult.max)
    },
    {
      name: `overdue`,
      count: utils.getRandomInteger(filterCardsResult.min, filterCardsResult.max)
    },
    {
      name: `today`,
      count: utils.getRandomInteger(filterCardsResult.min, filterCardsResult.max),
      isChecked: true
    },
    {
      name: `favorites`,
      count: utils.getRandomInteger(filterCardsResult.min, filterCardsResult.max)
    },
    {
      name: `repeating`,
      count: utils.getRandomInteger(filterCardsResult.min, filterCardsResult.max)
    },
    {
      name: `tags`,
      count: utils.getRandomInteger(filterCardsResult.min, filterCardsResult.max)
    },
    {
      name: `archive`,
      count: utils.getRandomInteger(filterCardsResult.min, filterCardsResult.max)
    }];

    const getFilterItemsHtml = (items) => items.map((item) => {
      return getFilter(item.name, item.count, item.isChecked);
    }).join(``);

    const onFilterChange = (e) => {
      e.preventDefault();

      const input = e.target;
      const label = filtersBlock.querySelector(`[for="${input.id}"]`);
      const count = parseInt(label.querySelector(filterCountSelector).textContent, 10);

      renderCards(Number.isNaN(count) ? cardsCount.default : count);
    };

    filtersBlock.insertAdjacentHTML(`afterBegin`, getFilterItemsHtml(filters));
    filtersBlock.addEventListener(`change`, onFilterChange);
  };

  const renderCards = (count) => {
    const cardsBlock = document.querySelector(`.board__tasks`);
    const cards = cardsBlock.querySelectorAll(`.card`);
    const cardsEmptyBlock = document.querySelector(`.board__no-tasks`);
    const isCards = count > 0;
    const newCards = getTasks(count);

    const removeAllCards = () => {
      if (cards) {
        cards.forEach((card) => {
          cardsBlock.removeChild(card);
        });
      }
    };

    const getAllCards = () => {
      let fragment = document.createDocumentFragment();

      for (let card of newCards) {
        fragment.appendChild(getCard(card));
      }

      return fragment;
    };

    removeAllCards();

    cardsBlock.classList[isCards ? `remove` : `add`](`visually-hidden`);
    cardsEmptyBlock.classList[isCards ? `add` : `remove`](`visually-hidden`);

    if (isCards) {
      cardsBlock.appendChild(getAllCards());
    }
  };

  renderFilters();
  renderCards(cardsCount.default);
})();
