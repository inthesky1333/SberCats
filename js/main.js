import Api from './classes/api.js';
import { Form } from './classes/form.js';
import { PhotoPopup } from './classes/photoPopup.js';
import { CardFactory, Card } from './classes/card.js';
import { Loader } from './classes/loader.js';
import { ConfirmPopup } from './classes/confirmPopup.js';

const api = new Api('AGalich');

const container = document.querySelector('.container');
const btnAdd = document.querySelector('.button-add');

btnAdd.addEventListener('click', () => {
  const popup = new Form('add', null, api, Card, ConfirmPopup);
  popup.init();
});

let catsList = localStorage.getItem('cats');
if (catsList) {
  catsList = JSON.parse(catsList);
}

if (!catsList) {
  Loader.show();
  api.getCats()
    .then((res) => res.json())
    .then((data) => {
      if (data.message === 'ok') {
        localStorage.setItem('cats', JSON.stringify(data.data));
        CardFactory.create(data.data, container, api, Form, PhotoPopup, ConfirmPopup);
      } else {
        alert(data.message);
      }
    }).finally(() => {
      Loader.hide();
    });
} else {
  CardFactory.create(catsList, container, api, Form, PhotoPopup, ConfirmPopup);
}
