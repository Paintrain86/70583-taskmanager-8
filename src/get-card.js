import utils from './util.js';

const colors = new Set([`black`, `yellow`, `blue`, `green`, `pink`]);

const getHashtags = (tagsArray) => {
  return tagsArray.map((tag) => {
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
    `;
  }).join(``);
};

const getRepeatingDays = (daysMap) => {
  let daysHtml = ``;

  for (let [key, value] of daysMap) {
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
    `;
  }

  return daysHtml;
};

const getRepeatingStatus = (daysMap) => {
  for (let value of daysMap.values()) {
    if (!value) {
      return false;
    }
  }
  return true;
};

const getDeadlineHtml = (date) => {
  const getTime = () => {
    const hours = date.getHours();

    return `${(hours <= 12) ? hours : hours - 12}:${date.getMinutes()} ${(hours < 12) ? `AM` : `PM`}`;
  };
  const getDay = () => {
    const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
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
  `;
};

const getColorsHtml = () => {
  let result = ``;

  for (let color of colors) {
    result += `
      <input
        type="radio"
        id="color-${color}-2"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
      />
      <label
        for="color-${color}-2"
        class="card__color card__color--${color}"
        >${color}</label
      >
    `;
  }

  return result;
};

const getCardItem = (card) => {
  const cardElem = document.createElement(`article`);

  cardElem.classList.add(`card`, `card--${card.color}`, `card--repeat`);

  utils.insertElements(cardElem, `
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
            class="card__btn card__btn--favorites ${card.isFavorite ? `` : `card__btn--disabled`}"
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
            ${card.title}
            </textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">no</span>
              </button>

              <fieldset class="card__date-deadline" ${utils.getRandomBoolean() ? `disabled` : ``}>
                ${getDeadlineHtml(card.dueDate)}
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${getRepeatingStatus(card.repeatingDays) ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days" ${utils.getRandomBoolean() ? `disabled` : ``}>
                <div class="card__repeat-days-inner">
                  ${getRepeatingDays(card.repeatingDays)}
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${getHashtags([...card.tags])}
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

          <label class="card__img-wrap ${utils.getRandomBoolean() ? `card__img-wrap--empty` : ``}">
            <input
              type="file"
              class="card__img-input visually-hidden"
              name="img"
            />
            <img
              src="${card.picture}"
              alt="task picture"
              class="card__img"
            />
          </label>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${getColorsHtml()}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  `);

  return cardElem;
};

export default getCardItem;
