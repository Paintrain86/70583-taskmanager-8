import moment from 'moment';
import flatpickr from 'flatpickr';
import CardComponent from './card-component.js';

class CardEdit extends CardComponent {
  constructor(object) {
    super();
    this._title = object.title;
    this._dueDate = object.dueDate;
    this._tags = object.tags;
    this._picture = object.picture;
    this._color = object.color;
    this._repeatingDays = object.repeatingDays;
    this._isFavorite = object.isFavorite;
    this._isDone = object.isDone;

    this._state.isDate = object.dueDate !== null;
    this._state.isRepeated = false;

    this._onSubmit = null;
    this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);

    this._onCancelEdit = null;
    this._onCancelEditBtnClick = this._onCancelEditBtnClick.bind(this);

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _isRepeated() {
    return [...this._repeatingDays.values()].some((isRepeat) => isRepeat === true);
  }

  set onSubmit(cb) {
    this._onSubmit = cb;
  }

  set onCancelEdit(cb) {
    this._onCancelEdit = cb;
  }

  _onSubmitBtnClick(e) {
    e.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const changedData = this._mapData(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(changedData);
    }

    this.update(changedData);
  }

  _onCancelEditBtnClick(e) {
    e.preventDefault();

    if (typeof this._onCancelEdit === `function`) {
      this._onCancelEdit();
    }
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _mapData(formData) {
    const mapObj = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: ``,
      repeatingDays: new Map([
        [`mo`, false],
        [`tu`, false],
        [`we`, false],
        [`th`, false],
        [`fr`, false],
        [`sa`, false],
        [`su`, false]
      ])
    };

    const cardEditMapper = CardEdit.dataMapper(mapObj);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (cardEditMapper[property]) {
        cardEditMapper[property](value);
      }
    }

    return mapObj;
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
          id="repeat-${key}-2"
          name="repeat"
          value="${key}"
          ${(value) ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${key}-2"
          >${key}</label
        >
      `.trim();
    }

    return daysHtml;
  }

  get colorsHtml() {
    const colors = new Set([`black`, `yellow`, `blue`, `green`, `pink`]);

    return [...colors].map((color) => `
      <input type="radio" id="color-${color}-2" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" ${(color === this._color) ? `checked` : ``} />
      <label for="color-${color}-2" class="card__color card__color--${color}">${color}</label>
    `).join(``);
  }

  get deadlineHtml() {
    const getDay = () => {
      return `${moment(this._dueDate ? this._dueDate : new Date()).format(`D MMMM`)}`;
    };
    const getTime = () => {
      return `${moment(this._dueDate ? this._dueDate : new Date()).format(`hh:mm A`)}`;
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
    <article class="card card--${this._color} card--edit ${this._isRepeated() ? `card--repeat` : ``}">
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
                date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__date-deadline" ${this._state.isDate ? `` : `disabled`}>
                ${this.deadlineHtml}
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat: <span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days" ${this._state.isRepeated ? `` : `disabled`}>
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

          <label class="card__img-wrap ${this._picture ? `` : `card__img-wrap--empty`}">
            <input type="file" class="card__img-input visually-hidden" name="img" />
            <img src="${this._picture ? this._picture : ``}" alt="task picture" class="card__img" />
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

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onCancelEditBtnClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      flatpickr(this._element.querySelector(`.card__date`), {altInput: true, altFormat: `j F`, dateFormat: `Y-m-d`, defaultDate: this._dueDate});
      flatpickr(this._element.querySelector(`.card__time`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `H:i`, defaultDate: this._dueDate});
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onCancelEditBtnClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;

    this._state.isRepeated = this._isRepeated();
  }

  static dataMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (day) => {
        target.repeatingDays.set(day, true);
      },
      date: (value) => {
        target.dueDate = value;
      },
      time: (value) => {
        target.dueDate = moment(target.dueDate + ` ` + value).toDate();
      }
    };
  }
}

export default CardEdit;
