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
  }

  _isRepeated() {
    return [...this._repeatingDays.values()].some((isRepeat) => isRepeat === true);
  }

  get hashtagsHtml() {
    return [...this._tags].map((tag) => {
      return `
        <span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="${tag}"
            class="card__hashtag-hidden-input"
          />
          <button type="button" class="card__hashtag-name">
            #${tag}
          </button>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>
      `.trim();
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

  get colorsHtml() {
    const colors = new Set([`black`, `yellow`, `blue`, `green`, `pink`]);

    return [...colors].map((color) => `
      <input type="radio" id="color-${color}-2" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" />
      <label for="color-${color}-2" class="card__color card__color--${color}">${color}</label>
    `.trim()).join(``);
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
    <article class="card card--blue ${this._isRepeated() ? `card--repeat` : ``}">
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
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">no</span>
              </button>

              <fieldset class="card__date-deadline" ${utils.getRandomBoolean() ? `disabled` : ``}>
                ${this.deadlineHtml}
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat: <span class="card__repeat-status">no</span>
              </button>

              <fieldset class="card__repeat-days" disabled>
                ${this.repeatingDaysHtml}
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${this.hashtagsHtml}
              </div>

              <label>
                <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
              </label>
            </div>
          </div>

          <label class="card__img-wrap ${utils.getRandomBoolean() ? `card__img-wrap--empty` : ``}">
            <input type="file" class="card__img-input visually-hidden" name="img" />
            <img src="${this._picture}" alt="task picture" class="card__img" />
          </label>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${this.colorsHtml}
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
    `.trim();
  }

  _onEditBtnClick(e) {
    e.preventDefault();
    this._state.isEdit = !this._state.isEdit;

    this.update();
  }

  listen() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditBtnClick.bind(this));
  }

  unlisten() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditBtnClick);
  }

  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }

    this._element = utils.createElement(this.template);
    container.appendChild(this._element);

    this.listen();
  }

  unrender() {
    this.unlisten();
    this._element = null;
  }

  update() {
    this._element.classList[(this._state.isEdit) ? `add` : `remove`](`card--edit`);
  }
}

export default Card;
