'use strict';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var itemTitle = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var itemType = ['palace', 'flat', 'house', 'bungalo'];
var itemCheck = ['12:00', '13:00', '14:00'];

var itemFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var itemPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var itemNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
var announcementCount = 8;

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomItem(arrayProperty) {
  return arrayProperty[Math.floor(Math.random() * arrayProperty.length)];
}

//перемешать элементы массива
function shuffle(arrayProperty) {
  for(
       var numRnd, numCur, i = arrayProperty.length; i; 
       numRnd = Math.floor(Math.random() * i), 
       numCur = arrayProperty[--i], 
       arrayProperty[i] = arrayProperty[numRnd], 
       arrayProperty[numRnd] = numCur
   );
  return arrayProperty;
}

//получить сроку значений удобств
function getRandomFeatures(arrayProperty) {
  var featuresCount = Math.floor(Math.random() * arrayProperty.length) + 1;
  var features = '';
  
  arrayProperty = shuffle(arrayProperty);
  for (var i = 0; i < featuresCount; i++) {
    features += arrayProperty[i] + ' ';
  }
  return features;
}

//создание DOM-элементов, соответствующих меткам на карте
function DeterminateAnnouncement(
  itemTitleFormal,
  itemTypeFormal,
  itemCheckFormal,
  itemFeaturesFormal,
  itemPhotosFormal
) 
{
  var titleNumberRandom = Math.floor(Math.random() * itemTitleFormal.length);
  var x = getRandomItem(itemTitleFormal);
  itemTitleFormal.splice(x, 1);
  this.author = {};
  this.author.avatar = 'img/avatars/user0' + itemNumbers[i] + '.png';
  this.location = {};
  this.location.x = getRandomInteger(1, 980);
  this.location.y = getRandomInteger(130, 630);
  this.offer = {};
  this.offer.title = x;
  this.offer.prices = getRandomInteger(1000, 1000000);
  this.offer.type = getRandomItem(itemTypeFormal);
  this.offer.rooms = getRandomInteger(1, 5);
  this.offer.guests = getRandomInteger(1, 10);
  this.offer.checkin = getRandomItem(itemCheckFormal);
  this.offer.checkout = getRandomItem(itemCheckFormal);
  this.offer.features = getRandomFeatures(itemFeaturesFormal);
  this.offer.description = '';
  this.offer.photos = getRandomItem(itemPhotosFormal);
  this.offer.address = this.location.x + ', ' + this.location.y;

}

var announcements = [];

for (var i = 0; i < announcementCount; i++) {
  announcements[i] = new DeterminateAnnouncement(
    itemTitle,
    itemType,
    itemCheck,
    itemFeatures,
    itemPhotos
  );
};

var mapAnnouncement = document.querySelector('.map');
mapAnnouncement.classList.remove('map--faded');

//размешение pin на карте
var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;

var renderPin = function (announc) {
  var pinElement = pinTemplate.cloneNode(true).querySelector('.map__pin');
  pinElement.setAttribute('style', 'left: ' + (announc.location.x + PIN_WIDTH / 2) + 'px; top: ' + (announc.location.y + PIN_HEIGHT) + 'px;');
  pinElement.children[0].setAttribute('src', announc.author.avatar);
  pinElement.children[0].setAttribute('alt', announc.offer.title);
  return pinElement;
};

var fragmentPin = document.createDocumentFragment();
for (var i = 0; i < announcements.length; i++) {
  fragmentPin.appendChild(renderPin(announcements[i]));
}

pinList.appendChild(fragmentPin);

//DOM-элемент объявления
var adList = document.querySelector('.map');
var adTemplate = document.querySelector('#card').content.querySelector('.map__card');
var typeHouseRu = [
  'Квартира',
  'Бунгало',
  'Дом',
  'Дворец'
];

var renderAd = function (ad) {
  var adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = ad.offer.prices + ' ₽/ночь';
  adElement.querySelector('.popup__type').textContent = typeHouseRu[itemType.indexOf(ad.offer.type)];
  adElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adElement.querySelector('.popup__features').textContent = ad.offer.features;
  adElement.querySelector('.popup__description').textContent = ad.offer.description;
  adElement.querySelector('.popup__photos').querySelector('.popup__photo').setAttribute('src', '' + ad.offer.photos[0]);
  var popupPhotosList = adElement.querySelector('.popup__photos');
  var popupPhotoTemplate = popupPhotosList.querySelector('.popup__photo'); 
  popupPhotoTemplate.setAttribute('src', '' + itemPhotos[0]); // заполняем первый элемент, чтобы потом было что копировать
  for (var k = 1; k < itemPhotos.length; k++) {
    var photoElement = popupPhotoTemplate.cloneNode(true);
    photoElement.setAttribute('src', '' + itemPhotos[k]);
    popupPhotosList.appendChild(photoElement);
  }
  adElement.querySelector('.popup__avatar').setAttribute('src', '' + ad.author.avatar);
  return adElement;
};

var fragmentAd = document.createDocumentFragment();
fragmentAd.appendChild(renderAd(announcements[0]));

adList.insertBefore(fragmentAd, adList.children[1]);

