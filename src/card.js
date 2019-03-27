import moment from 'moment';
import CardComponent from './card-component.js';

class Card extends CardComponent {
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

    this._state = {
      isEdit: false
    };

    this._onEdit = null;
    this._onEditBtnClick = this._onEditBtnClick.bind(this);
  }

  _isRepeated() {
    return [...this._repeatingDays.values()].some((isRepeat) => isRepeat === true);
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

  get deadlineHtml() {
    return `${this._dueDate ? moment(this._dueDate).format(`D MMMM, hh:mm A`) : ``}`;
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
              <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
                ${this.deadlineHtml}
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${this.hashtagsHtml}
              </div>
            </div>
          </div>

          <label class="card__img-wrap ${this._picture ? `` : `card__img-wrap--empty`}">
            <input type="file" class="card__img-input visually-hidden" name="img" />
            <img src="${this._picture ? this._picture : ``}" alt="task picture" class="card__img" />
          </label>

        </div>

      </div>
    </form>
  </article>
    `.trim();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditBtnClick);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditBtnClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;

    this._state.isRepeated = this._isRepeated();
  }
}

export default Card;
