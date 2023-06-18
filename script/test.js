//slider pets

const BTN_LEFT = document.querySelector('#btn-left');
const BTN_RIGHT = document.querySelector('#btn-right');
const CAROUSEL = document.querySelector('#carousel');
const ITEM_LEFT = document.querySelector('#item-left');
const ITEM_RIGHT = document.querySelector('#item-right');
const ITEM_ACTIVE = document.querySelector('#item-active');

let activNums;
let leftNums;
let rightNums;
let prev;
let prevDiretion = '';

const moveLeft = () => {
  if (prevDiretion !== 'left' && prevDiretion !== '') {
    let prevTemplate = '';
    prev.forEach(function (value) {
      const card = `<div id=${pets[value].id} class="pets__card">
        <div class="pets__img">
          <img src="${pets[value].img}" alt="">
        </div>
        <div class="pets__content">
          <div class="pets__title">${pets[value].name}</div>
          <div class="pets__btn btn">Learn more</div>
        </div>
      </div>`;
      prevTemplate += card;
    });
    ITEM_LEFT.querySelector('.pets__wrapper').innerHTML = prevTemplate;
    leftNums = prev;
  } else {
    ITEM_LEFT.querySelector('.pets__wrapper').innerHTML =
      createCardTemplate('left');
  }

  CAROUSEL.classList.add('transition-left');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
};

const moveRight = () => {
  ITEM_RIGHT.querySelector('.pets__wrapper').innerHTML =
    createCardTemplate('right');

  if (prevDiretion !== 'right' && prevDiretion !== '') {
    let prevTemplate = '';

    prev.forEach(function (value) {
      const card = `<div id=${pets[value].id} class="pets__card">
          <div class="pets__img">
            <img src="${pets[value].img}" alt="">
          </div>
          <div class="pets__content">
            <div class="pets__title">${pets[value].name}</div>
            <div class="pets__btn btn">Learn more</div>
          </div>
        </div>`;
      prevTemplate += card;
    });
    ITEM_RIGHT.querySelector('.pets__wrapper').innerHTML = prevTemplate;
    rightNums = prev;
  } else {
    ITEM_RIGHT.querySelector('.pets__wrapper').innerHTML =
      createCardTemplate('right');
  }
  CAROUSEL.classList.add('transition-right');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
};

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);

const createCardTemplateActive = () => {
  let cards = '';

  const nums = new Set();
  while (nums.size !== 3) {
    nums.add(Math.floor(Math.random() * 7));
  }

  activNums = nums;
  nums.forEach(function (value) {
    const card = `<div id=${pets[value].id} class="pets__card">
    <div class="pets__img">
      <img src="${pets[value].img}" alt="">
    </div>
    <div class="pets__content">
      <div class="pets__title">${pets[value].name}</div>
      <div class="pets__btn btn">Learn more</div>
    </div>
  </div>`;
    cards += card;
  });
  return cards;
};

const createCardTemplate = (direction) => {
  let cards = '';

  const nums = new Set();

  while (nums.size !== 3) {
    let random = Math.floor(Math.random() * 7);
    if (activNums.has(random) == false) {
      nums.add(random);
    }
  }

  if (direction == 'left') {
    leftNums = nums;
  }

  if (direction == 'right') {
    rightNums = nums;
  }

  nums.forEach(function (value) {
    const card = `<div id=${pets[value].id} class="pets__card">
    <div class="pets__img">
      <img src="${pets[value].img}" alt="">
    </div>
    <div class="pets__content">
      <div class="pets__title">${pets[value].name}</div>
      <div class="pets__btn btn">Learn more</div>
    </div>
  </div>`;
    cards += card;
  });

  return cards;
};

ITEM_ACTIVE.querySelector('.pets__wrapper').innerHTML =
  createCardTemplateActive();

CAROUSEL.addEventListener('animationend', (animationEvent) => {
  let changedItem;
  if (animationEvent.animationName === 'move-left') {
    CAROUSEL.classList.remove('transition-left');
    prevDiretion = 'left';
    changedItem = ITEM_LEFT;
    prev = activNums;
    activNums = leftNums;
    document.querySelector('#item-active').innerHTML = ITEM_LEFT.innerHTML;
  } else {
    CAROUSEL.classList.remove('transition-right');
    changedItem = ITEM_RIGHT;
    prev = activNums;
    prevDiretion = 'right';

    activNums = rightNums;
    document.querySelector('#item-active').innerHTML = ITEM_RIGHT.innerHTML;
  }

  BTN_LEFT.addEventListener('click', moveLeft);
  BTN_RIGHT.addEventListener('click', moveRight);
});
