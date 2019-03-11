const getFilterItem = (name, count, isChecked = false) => `
  <input type="radio" id="filter__${name}" class="filter__input visually-hidden" name="filter" ${isChecked ? `checked` : ``} ${(count > 0) ? `` : `disabled`} />
  <label for="filter__${name}" class="filter__label"> ${name} <span class="filter__all-count">${count}</span></label>
`;

export default getFilterItem;
