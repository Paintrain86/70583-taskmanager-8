import utils from './util.js';
import getTasks from './get-tasks.js';
import getFilter from './get-filter.js';
import Card from './get-card.js';
import CardEdit from './get-card-edit.js';

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

  filtersBlock.innerHTML = ``;
  utils.insertElements(filtersBlock, getFilterItemsHtml(filters));
  filtersBlock.addEventListener(`change`, onFilterChange);
};

const renderCards = (count) => {
  const cardsBlock = document.querySelector(`.board__tasks`);
  const cardsEmptyBlock = document.querySelector(`.board__no-tasks`);
  const isCards = count > 0;
  const newCards = getTasks(count);

  const createAllCards = () => {
    for (let cardObject of newCards) {
      renderCard(cardObject);
    }
  };

  cardsBlock.innerHTML = ``;
  createAllCards();

  cardsBlock.classList[isCards ? `remove` : `add`](`visually-hidden`);
  cardsEmptyBlock.classList[isCards ? `add` : `remove`](`visually-hidden`);

  function renderCard(object) {
    const card = new Card(object);
    const cardEdit = new CardEdit(object);

    cardsBlock.appendChild(card.render());

    card.onEdit = () => {
      cardEdit.render();
      cardsBlock.replaceChild(cardEdit.element, card.element);
      card.unrender();
    };

    cardEdit._onCancelEdit = () => {
      card.render();
      cardsBlock.replaceChild(card.element, cardEdit.element);
      cardEdit.unrender();
    };

    cardEdit.onSubmit = () => {
      card.render();
      cardsBlock.replaceChild(card.element, cardEdit.element);
      cardEdit.unrender();
    };
  }
};

renderFilters();
renderCards(cardsCount.default);
