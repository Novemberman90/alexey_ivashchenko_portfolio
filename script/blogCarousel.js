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

// кнопка в лево
const moveLeft = ()=> { 
    if (prevDiretion !== 'left' && prevDiretion !== '') {
        let prevTemplate = '';
        prev.forEach(function(value){
            const card =`<div id=${elemCard[value].id} class="items__card">
            <div class="item__img">
              <img src="${elemCard[value].img}" alt="">
            </div>
            <div class="items__content">
              <div class="card_item__title"> <h5 class="h5-text">${elemCard[value].name}</h5>
              <p class="type-work">${elemCard[value].typeOfWorck}</p>
              <p class="description-text">${elemCard[value].description}</p>
              </div>
               <a href="${elemCard[value].link}" target="_blank" class="btn btn-primary  item-link"> Go to Project </a> 
              </div>
          </div>`;
           prevTemplate += card; 
        });
        ITEM_LEFT.querySelector('.item__wrapper').innerHTML = prevTemplate;
        leftNums = prev;
    } else {
        ITEM_LEFT.querySelector('.item__wrapper').innerHTML = 
        createCardTemplate('left');
    }

    CAROUSEL.classList.add('transition-left');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight); // отписываем с события
    // это делаеться для того, чтобы нельзя было вызывать событие пока идёт анимация
};

// кнопка в право
const moveRight = ()=> { 
    ITEM_RIGHT.querySelector('.item__wrapper').innerHTML = 
    createCardTemplate('right');

    if(prevDiretion !== 'right' && prevDiretion !== '') {
        let prevTemplate = '';
        prev.forEach(function(value){
            const card = `<div id=${elemCard[value].id} class="items__card">
            <div class="item__img">
              <img src="${elemCard[value].img}" alt="">
            </div>
            <div class="items__content">
              <div class="card_item__title"> <h5 class="h5-text"> ${elemCard[value].name} </h5>
              <p class="type-work">${elemCard[value].typeOfWorck}</p>
              <p class="description-text">${elemCard[value].description}</p>
              </div>
              <a href="${elemCard[value].link}" target="_blank" class="btn-primary btn item-link"> Go to Project </a>
              </div>
          </div>`;
           prevTemplate += card; 
        });

        ITEM_RIGHT.querySelector('.item__wrapper').innerHTML = prevTemplate;
        rightNums = prev;
    } else {
        ITEM_RIGHT.querySelector('.item__wrapper').innerHTML =
        createCardTemplate('right');
    }

    CAROUSEL.classList.add('transition-right');
    BTN_LEFT.removeEventListener('click', moveLeft); // отписываем с события
    BTN_RIGHT.removeEventListener('click', moveRight);
    // это делаеться для того, чтобы нельзя было вызывать событие пока идёт анимация
};

BTN_LEFT.addEventListener('click', moveLeft ); // подписываем на событие
BTN_RIGHT.addEventListener('click', moveRight ); // подписываем на событие


const createCardTemplateActive = () => {
    let cards = '';

    const nums = new Set();
    while (nums.size !== 1) {
        nums.add(Math.floor(Math.random() * 4));
    }

    activNums = nums;
    nums.forEach(function (value) {
        const card = `<div id=${elemCard[value].id} class="items__card">
        <div class="item__img">
          <img src="${elemCard[value].img}" alt="">
        </div>
        <div class="items__content">
          <div class="card_item__title"> <h5 class="h5-text"> ${elemCard[value].name} </h5>
          <p class="type-work">${elemCard[value].typeOfWorck}</p>
          <p class="description-text">${elemCard[value].description}</p>
          </div>
          <a href="${elemCard[value].link}" target="_blank" class="btn-primary btn item-link"> Go to Project </a>
        
          </div>
      </div>`;
        cards += card;
      });
      return cards;
};

const createCardTemplate = (direction) => {
    let cards = '';

    const nums = new Set();
    while (nums.size !== 1) {
        let random = Math.floor(Math.random() * 4);
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
        const card = `<div id=${elemCard[value].id} class="items__card">
        <div class="item__img"><img src="${elemCard[value].img}" alt=""></img></div>
        <div class="items__content">
          <div class="card_item__title"> <h5 class="h5-text"> ${elemCard[value].name} </h5>
          <p class="type-work">${elemCard[value].typeOfWorck}</p>
          <p class="description-text">${elemCard[value].description}</p>
          </div>
          <a href="${elemCard[value].link}" target="_blank" class="btn-primary btn item-link"> Go to Project </a>
        
          </div>
        </div>`;
        cards += card;
      });
    
      return cards;
};
ITEM_ACTIVE.querySelector('.item__wrapper').innerHTML =
  createCardTemplateActive();


  CAROUSEL.addEventListener('animationend', (animationEvent)=> {
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

  
    BTN_LEFT.addEventListener('click', moveLeft ); // после окончания анимации подписываем на событие заново
    BTN_RIGHT.addEventListener('click', moveRight );// после окончания анимации подписываем на событие заново

});

/*if (animation.animationName === "move-left") {
    CAROUSEL.classList.remove('transition-left');
} else {
    CAROUSEL.classList.remove('transition-right');
}*/
 