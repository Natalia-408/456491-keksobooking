'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

(function () {
// блокируем поля формы

  var fieldsetList = document.querySelectorAll('.ad-form__element');
  var fieldsetImg = document.querySelector('.ad-form-header');

  var pinList = document.querySelector('.map__pins');
  var formMain = document.querySelector('.ad-form');

  var startCoords = {
    x: Math.round(window.util.pinMain.offsetLeft + window.util.pinMain.offsetWidth / 2),
    y: Math.round(window.util.pinMain.offsetTop + window.util.pinMain.offsetHeight / 2)
  };

  var fieldAddress = document.getElementById('address');
  fieldAddress.value = 'x: ' + startCoords.x + ', y:' + startCoords.y;

  fieldsetImg.setAttribute('disabled', 'disabled');
  Array.prototype.forEach.call(fieldsetList, function (element) {
    element.setAttribute('disabled', 'disabled');
  });

  // перевод в активное состояние

  var mapAnnouncement = document.querySelector('.map');
  var pinMainClickHandler = function () {
    fieldsetImg.removeAttribute('disabled');
    formMain.classList.remove('ad-form--disabled');
    pinList.appendChild(window.util.fragmentPin);
    mapAnnouncement.classList.remove('map--faded');

    Array.prototype.forEach.call(fieldsetList, function (element) {
      element.removeAttribute('disabled');
    });

    // перемещение Pin-Main

    window.util.pinMain.addEventListener('mousedown', function (Downevt) {
      Downevt.preventDefault();

      startCoords = {
        x: Downevt.clientX,
        y: Downevt.clientY
      };
      var widthMap = mapAnnouncement.clientWidth - PIN_WIDTH;
      var heightMapMin = 130;
      var heightMapMax = 630;

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var pinMainTop = window.util.pinMain.offsetTop - shift.y;
        var pinMainLeft = window.util.pinMain.offsetLeft - shift.x;

        if (pinMainLeft < 0) {
          pinMainLeft = 0;
        } else if (pinMainLeft > widthMap) {
          pinMainLeft = widthMap;
        }

        if (pinMainTop < heightMapMin) {
          pinMainTop = heightMapMin;
        } else if (pinMainTop > heightMapMax) {
          pinMainTop = heightMapMax;
        }

        window.util.pinMain.style.top = pinMainTop + 'px';
        window.util.pinMain.style.left = pinMainLeft + 'px';

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);


        startCoords = {
          x: Math.round(window.util.pinMain.offsetLeft + window.util.pinMain.offsetWidth / 2),
          y: window.util.pinMain.offsetTop
        };

        fieldAddress.value = 'x: ' + startCoords.x + ', y:' + (startCoords.y + PIN_HEIGHT);

        if (dragged) {
          var onClickPreventDefault = function (evt) {
            evt.preventDefault();
            window.util.pinMain.removeEventListener('click', onClickPreventDefault);
          };
          window.util.pinMain.addEventListener('click', onClickPreventDefault);
        }

      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.util.pinMain.addEventListener('mouseup', pinMainClickHandler);
})();
