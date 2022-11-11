export class Card {
  constructor(data, parent, api, Form, PhotoPopup, ConfirmPopup) {
    this.Form = Form;
    this.ConfirmPopup = ConfirmPopup;
    this.PhotoPopup = PhotoPopup;
    this.api = api;
    this.data = data;
    this.parent = parent;
    this.template = document.querySelector('#card');
  }

  getElements() {
    this.card = this.template.content.cloneNode(true).querySelector('.card');
    this.photo = this.card.querySelector('.photo');
    this.info = this.card.querySelector('.info');
    this.name = this.card.querySelector('.name');
    this.age = this.card.querySelector('.age');
    this.rate = this.card.querySelector('.rate');
    this.deletedBtn = this.card.querySelector('.button-delete');
    this.editBtn = this.card.querySelector('.button-edit');
  }

  _render() {
    this.getElements();
    this.info.append(this.name, this.age, this.rate);
    this.card.append(this.photo, this.info, this.deletedBtn, this.editBtn);
    this.parent.append(this.card);
  }

  _setData() {
    this.card.dataset.id = this.data.id;
    this.name.innerText = this.data.name || 'Безымянный кот';
    if (this.data.age) {
      this.age.innerText = `Возраст: ${this.data.age}`;
    } else {
      this.age.innerText = 'Возвраст не известен';
    }
    this.photo.style.backgroundImage = `url(${this.data.img_link || 'https://nakleikashop.ru/images/detailed/22/CAT-094.png'})`;
    this.rate.innerHTML = '';
    for (let i = 0; i < (`${this.data.rate}`); i++) {
      this.rate.innerHTML += '<span>★</span>';
    }
  }

  deleteHandler() {
    this.api.delCat(this.data.id)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'ok') {
          this.card.remove();
          this.card = null;
        }
      });
  }

  _deleteCard() {
    this.deletedBtn.addEventListener('click', () => {
      const popup = new this.ConfirmPopup(this.deleteHandler.bind(this), 'delete');
      popup.init();
    });
  }

  openPhotoPopup() {
    this.photo.addEventListener('click', () => {
      const popup = new this.PhotoPopup(this.data.img_link);
      popup.init();
    });
  }

  editCard() {
    this.editBtn.addEventListener('click', () => {
      const popup = new this.Form('edit', this.data, this.api, this, this.ConfirmPopup);
      popup.init();
    });
  }

  updateCard(data) {
    this.data = data;
    this._setData();
  }

  _setListeners() {
    this.openPhotoPopup();
    this._deleteCard();
    this.editCard();
  }

  init() {
    this._render();
    this._setData();
    this._setListeners();
  }
}

export class CardFactory {
  static create(list, parent, api, Form, PhotoPopup, ConfirmPopup) {
    list.forEach((item) => {
      const card = new Card(item, parent, api, Form, PhotoPopup, ConfirmPopup);
      card.init();
    });
  }
}
