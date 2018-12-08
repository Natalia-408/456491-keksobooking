'use strict';

var priceOfType = [0, 1000, 5000, 10000];
var nameType = ['bungalo', 'flat', 'house', 'palace'];
var timeInList = ['12:00', '13:00', '14:00'];
var timeOutList = ['12:00', '13:00', '14:00'];

// проверяем значение цены за ночь
var checkType = function () {
  var type = document.getElementById('type');
  var typeItem = type.options[type.selectedIndex].value;
  var num = nameType.indexOf(typeItem);
  document.getElementById('price').placeholder = priceOfType[num];
  document.getElementById('price').min = priceOfType[num];
};

document.getElementById('type').addEventListener('change', checkType);

// проверяем значение времени въезда-выезда
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
