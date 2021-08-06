const modalLinks = document.querySelectorAll('.modal-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

//Запрещает двойное нажатие
let unlock = true;

//Таймаут для свойств transiton. Он дожен совпадать с самими трансишинами. Благодяря чему блокируется скролл и адекавтно работает
const timeout = 500;

//проверка на наличие данного класса
if (modalLinks.length > 0) {
  //Перебор всех классов с таким именем на страние
  for (let i = 0; i < modalLinks.length; i++) {
    //Обьявление переммнной для каждого класса
    const modalLink = modalLinks[i];

    //Вешаем событие на данный класс
    modalLink.addEventListener('click', function(e) {
      //Удаляем хеш из ссылки
      const modalName = modalLink.getAttribute('href').replace('#', '');
      //Получаем элемент id которого равен modalName
      const curentModal = document.getElementById(modalName);
      //Запускаем функцию для открытия окна
      modalOpen(curentModal);
      //Запрещаем перезагружать страницу
      e.preventDefault;
    });
  }
}

const modalCloseIcon = document.querySelectorAll('.close-modal');
//проверка на наличие данного класса
if (modalCloseIcon.length > 0) {

    //Перебор всех классов с таким именем на страние
  for (let i = 0; i < modalCloseIcon.length; i++) {
    //Обьявление переммнной для каждого класса  
    const el = modalCloseIcon[i];

    //Вешаем событие на данный класс
    el.addEventListener('click', function(e) {

      //Запускаем функцию для закрытия ближайшего радителя ссылки по которому нажали 
      modalClose(el.closest('.modal'));
      //Запрещаем перезагружать страницу
      e.preventDefault;
    });
  }
}

//Функия открытия окна
function modalOpen(curentModal) {

  //Проверка налияия данного обьекта и открыта ли перемення unlock
  if (curentModal && unlock) {
    //Данный способ позваляет вкладывать одно модально окно в другое
    //получаем переменну открытого окна
    const modalActive = document.querySelector('.modal.open');

    //И если такое окно открыто, закрываем его
    if (modalActive) {
      modalClose(modalActive, false)
    }
    //Если такго нет, мы дальше блокируем скролл страниы
    else {
      bodyLock();
    }

    //Далее добавляем класс open lkz открытия окна
    curentModal.classList.add('open');

    //Вещаем событие для закрытия окна при нажатии за пределами самого окна
    curentModal.addEventListener('click', function(e) {
      if(!e.target.closest('.modal__content')) {
        modalClose(e.target.closest('.modal'));
      };
    });
  }
}


function modalClose(modalActive, doUnlock = true) {
  //Проверяем на наличие открытого окно елси таковой есть не открываем снова скролл
  if (unlock) {
    modalActive.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    }
  }
  
}

function bodyLock() {

  //Получаем разницу между шириной вьюпорта самого окна и шириной обьекта который находитя внутри него
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';


  //Проеверяем есть такие обьекты в разметке
  if (lockPadding.length > 0) {
    
    //Пробигаемся по елемента и блакируем смещение у тех элементов которые зафиксированны например шапка сайта (нужно обьязательно в html добавить класс lock-paddng)
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }

  }


  //Присвамеи ширину обьекта
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');


  //На время блокируем повторное нажатие на окно
  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  //скрол поевлятся когда заканчивается анимация
  setTimeout(function() {

    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);
  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function(e) {
  if (e.which === 27) {
    const modalActive = document.querySelector('.modal.open');
    modalClose(modalActive);
  }
})


//(function() {
//  //Проверяем поддержку
//  if (!Element.prototype.closest) {
//    //Реалезуем
//    Element.prototype.closest = function(css) {
//      var node = this;
//      while(node) {
//        if (node.matches(css)) {
//          return node
//        }else {
//          node = node.parentElement;
//        }
//        return null;
//      };
//    }
//  }
//})();

//(function() {
//  //Проверяем поддержку
//  if (!Element.prototype.matches) {
//    //Реалезуем
//    Element.prototype.matches = Element.prototype.matchesSelector ||
//    Element.prototype.webkitMatchesSelector ||
//    Element.prototype.mozMatchesSelector ||
//    Element.prototype.msMatchesSelector;
    
//  }
//})();


