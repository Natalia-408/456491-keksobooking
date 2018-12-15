'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var fragmentPin = document.createDocumentFragment();

  window.util = {
    map: map,
    pinMain: pinMain,
    fragmentPin: fragmentPin
  };
})();
