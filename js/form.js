'use strict';

var priceOfType = [0, 1000, 5000, 10000];
var nameType = ['bungalo', 'flat', 'house', 'palace'];
var timeInList = ['12:00', '13:00', '14:00'];
var timeOutList = ['12:00', '13:00', '14:00'];
var countPlace = {
  '1': {
    value: 1,
    items: [2]
  },
  '2': {
    value: 2,
    items: [1, 2]
  },
  '3': {
    value: 3,
    items: [0, 1, 2]
  },
  '100': {
    value: 0,
    items: [3]
  }
};

// проверяем значение цены за ночь
var checkType = function () {
  var type = document.getElementById('type');
  var typeItem = type.options[type.selectedIndex].value;
  var num = nameType.indexOf(typeItem);
  document.getElementById('price').placeholder = priceOfType[num];
  document.getElementById('price').min = priceOfType[num];
};

document.getElementById('type').addEventListener('change', checkType);


// проверяем значение времени заезда-выезда
var timein = document.getElementById('timein');
var timeout = document.getElementById('timeout');

var replaceFields = function (unchange, change, unchangeValues, changeValues, replace) {
  var unchangeValueIndex = unchangeValues.indexOf(unchange.value);
  var replaceValue = changeValues[unchangeValueIndex];
  replace(change, replaceValue);
};

function changeTimeInput(evt) {
  var firstField = evt.target === timeout ? timeout : timein;
  var secondField = evt.target === timeout ? timein : timeout;
  function replaceValues(element, value) {
    element.value = value;
  }
  replaceFields(firstField, secondField, timeOutList, timeInList, replaceValues);
}

timein.addEventListener('change', changeTimeInput);
timeout.addEventListener('change', changeTimeInput);

// проверяем значения количества гостей
var countOption = 4;
var capacity = document.getElementById('capacity');
var rooms = document.getElementById('room_number');

function changeGuestInput() {
  setAllOptions(countOption);
  countPlace[rooms.value].items.forEach(function (item) {
    capacity.querySelectorAll('option')[item].classList.remove('hidden');
  });
  capacity.value = countPlace[rooms.value].value;
}

function setAllOptions(count) {
  for (var i = 0; i < count; i++) {
    capacity.querySelectorAll('option')[i].setAttribute('class', 'hidden');
    if (capacity.querySelectorAll('option')[i].selected === true) {
      capacity.querySelectorAll('option')[i].removeAttribute('selected');
    }
  }
}
rooms.addEventListener('change', changeGuestInput);
