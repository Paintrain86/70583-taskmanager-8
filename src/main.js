'use strict';
(function initPage() {
  const renderFilters = () => {
    const FILTERS_COUNT = {
      min: 0,
      max: 75
    };
    const getRandomIntegerFromCount = () => Math.floor(FILTERS_COUNT.min + Math.random() * (FILTERS_COUNT.max - FILTERS_COUNT.min));

    const getFilterItem = (item) => `
      <input
        type="radio"
        id="filter__${item.name}"
        class="filter__input visually-hidden"
        name="filter"
        ${item.isChecked ? `checked` : ``}
        ${item.isDisabled ? `disabled` : ``}
      />
      <label for="filter__${item.name}" class="filter__label">
        ${item.name} <span class="filter__all-count">${item.count}</span>
      </label>
    `;

    const filters = [{
      name: `all`,
      isChecked: true,
      isDisabled: false,
      count: getRandomIntegerFromCount()
    },
    {
      name: `overdue`,
      isChecked: false,
      isDisabled: true,
      count: getRandomIntegerFromCount()
    },
    {
      name: `today`,
      isChecked: false,
      isDisabled: true,
      count: getRandomIntegerFromCount()
    },
    {
      name: `favorites`,
      isChecked: false,
      isDisabled: false,
      count: getRandomIntegerFromCount()
    },
    {
      name: `repeating`,
      isChecked: false,
      isDisabled: false,
      count: getRandomIntegerFromCount()
    },
    {
      name: `tags`,
      isChecked: false,
      isDisabled: false,
      count: getRandomIntegerFromCount()
    },
    {
      name: `archive`,
      isChecked: false,
      isDisabled: false,
      count: getRandomIntegerFromCount()
    }];

    const getFilterItemsHtml = (items) => items.map((item) => getFilterItem(item)).join(``);

    const filtersBlock = document.querySelector(`.main__filter`);

    filtersBlock.insertAdjacentHTML(`afterBegin`, getFilterItemsHtml(filters));
  };

  renderFilters();
})();
