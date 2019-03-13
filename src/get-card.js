import utils from './util.js';

class Card {
  constructor(object) {
    this._title = object.title;
    this._dueDate = object.dueDate;
    this._tags = object.tags;
    this._picture = object.picture;
    this._color = object.color;
    this._repeatingDays = object.repeatingDays;
    this._isFavorite = object.isFavorite;
    this._isDone = object.isDone;

    this._element = null;
    this._state = {
      isEdit: false
    };

    this._onEdit = null;
  }

  _isRepeated() {
    return [...this._repeatingDays.values()].some((isRepeat) => isRepeat === true);
  }

  get element() {
    return this._element;
  }

  set onEdit(cb) {
    this._onEdit = cb;
  }

  _onEditBtnClick(e) {
    e.preventDefault();

    if (typeof this._onEdit === `function`) {
      this._onEdit();
      this._state.isEdit = !this._state.isEdit;
    }
  }

  get hashtagsHtml() {
    return [...this._tags].map((tag) => {
      return `
        <span class="card__hashtag-inner">
          <button type="button" class="card__hashtag-name">
            #${tag}
          </button>
        </span>
      `;
    }).join(``);
  }

  get repeatingDaysHtml() {
    let daysHtml = ``;

    for (let [key, value] of this._repeatingDays) {
      daysHtml += `
        <input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${key.toLowerCase()}-2"
          name="repeat"
          value="${key.toLowerCase()}"
          ${(value) ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${key.toLowerCase()}-2"
          >${key.toLowerCase()}</label
        >
      `.trim();
    }

    return daysHtml;
  }

  get deadlineHtml() {
    const getTime = () => {
      const hours = this._dueDate.getHours();

      return `${(hours <= 12) ? hours : hours - 12}:${this._dueDate.getMinutes()} ${(hours < 12) ? `AM` : `PM`}`;
    };
    const getDay = () => {
      const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

      return `${this._dueDate.getDate()} ${monthNames[this._dueDate.getMonth()]}`;
    };

    return `
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder="${getDay()}"
          name="date"
          value="${getDay()}"
        />
      </label>
      <label class="card__input-deadline-wrap">
        <input
          class="card__time"
          type="text"
          placeholder="${getTime()}"
          name="time"
          value="${getTime()}"
        />
      </label>
    `.trim();
  }

  get template() {
    return `
    <article class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">edit</button>
          <button type="button" class="card__btn card__btn--archive">archive</button>
          <button type="button" class="card__btn card__btn--favorites  ${this._isFavorite ? `` : `card__btn--disabled`}">favorites</button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <fieldset class="card__date-deadline" ${utils.getRandomBoolean() ? `disabled` : ``}>
                ${this.deadlineHtml}
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${this.hashtagsHtml}
              </div>
            </div>
          </div>

          <label class="card__img-wrap ${utils.getRandomBoolean() ? `card__img-wrap--empty` : ``}">
            <input type="file" class="card__img-input visually-hidden" name="img" />
            <img src="${this._picture}" alt="task picture" class="card__img" />
          </label>

        </div>

      </div>
    </form>
  </article>
    `.trim();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditBtnClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditBtnClick);
  }

  render() {
    this._element = utils.createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}

export default Card;
