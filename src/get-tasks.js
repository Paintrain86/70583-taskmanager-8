import utils from './util.js';

const titles = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const tags = new Set([`homework`, `theory`, `practice`, `intensive`, `keks`, `kakTebeTakoeIlonMask`, `vasya`, `babulya`, `10yearschallenge`]);
const colors = new Set([`black`, `yellow`, `blue`, `green`, `pink`]);
const days = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const ranges = {
  dueDate: {
    min: 0,
    max: 7 * 24 * 60 * 60 * 1000
  },
  tags: {
    min: 0,
    max: 3
  }
};

const getDaysMap = () => {
  let map = new Map();

  days.forEach((day) => {
    map.set(day, utils.getRandomBoolean());
  });

  return map;
};

const getDueDate = () => {
  const dateOffset = utils.getRandomInteger(ranges.dueDate.min, ranges.dueDate.max);

  return utils.getRandomBoolean() ? new Date(Date.now() + (utils.getRandomBoolean() ? dateOffset : -dateOffset)) : null;
};

const getSingleTaskObject = () => {
  return {
    title: utils.getRandomFromArray(titles),
    dueDate: getDueDate(),
    tags: new Set(utils.getUniqueArray(utils.getRandomInteger(ranges.tags.min, ranges.tags.max), [...tags])),
    picture: utils.getRandomBoolean() ? null : `http://picsum.photos/100/100?r=${Math.random()}`,
    color: utils.getRandomFromArray([...colors]),
    repeatingDays: getDaysMap(),
    isFavorite: utils.getRandomBoolean(),
    isDone: utils.getRandomBoolean()
  };
};

const getTasks = (count) => {
  let result = [];

  for (let i = 0; i < count; i++) {
    result.push(getSingleTaskObject());
  }

  return result;
};

export default getTasks;
