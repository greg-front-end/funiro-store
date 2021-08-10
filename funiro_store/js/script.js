'use strict'

document.addEventListener('DOMContentLoaded', () => {
  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  
  testWebP(function (support) {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android()
        || isMobile.BlackBerry()
        || isMobile.iOS()
        || isMobile.Opera()
        || isMobile.Windows()
      );
    }
  };
  function _addClasses(ele, cls) {
    ele.forEach(item => {
      item.classList.add(cls);
    });
  }
  function _rmClasses(ele, cls) {
    ele.forEach(item => {
      item.classList.remove(cls);
    });
  }

  const burger = document.querySelector('.icon-menu'),
        menuBody = document.querySelector('.menu__body'),
        body = document.querySelector('body'),
        menuItems = document.querySelectorAll('a.menu__sub-link'),
        accordion = document.querySelectorAll('.spoller'),
        menuSubList = document.querySelector('.menu__sub-list');

  document.addEventListener('click', documentActions);

  accordion.forEach(element => {
    element.addEventListener('click', () => {
      if (element.classList.contains('_active')) {
        element.classList.remove('_active');
        element.nextElementSibling.classList.remove('_active');
      } else {
        element.nextElementSibling.classList.add('_active');
        element.classList.add('_active');
      }
    });

  });

  // Action event for every elemnet on page
  function documentActions(e) {
    const targetElement = e.target;
    const hoverElements = document.querySelectorAll('.menu__item._hover');
    if (window.innerWidth > 768 && isMobile.any()) {
      if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_hover');
      }
      if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
        _rmClasses(hoverElements, '_hover');
      }
    }
    if (targetElement.classList.contains('search-form__icon')) {
      document.querySelector('.search-form').classList.toggle('_active');
    } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
      document.querySelector('.search-form').classList.remove('_active');
    }
    if (targetElement.classList.contains('icon-menu__span')) {
      burger.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    }
    if (menuBody.classList.contains('_active')) {
      menuItems.forEach(item => {
        item.addEventListener('click', () => {
          menuBody.classList.remove('_active');
          burger.classList.remove('_active');
        });
      });
    }
  }
});



