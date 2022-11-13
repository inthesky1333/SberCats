export class Form {
  constructor(type, data, api, card, confirmPopup) {
    this.Card = card;
    this.ConfirmPopup = confirmPopup;
    this.api = api;
    this.type = type;
    this.data = data || {};
    this.template = document.querySelector('#form').content.querySelector('.popup-wrapper');
  }

  getElements() {
    this.element = this.template.cloneNode(true);
    this.closeBtn = this.element.querySelector('#closeForm');
  }

  _render() {
    this.getElements();
    this.element.querySelector('.title').innerText = this.type === 'add' ? 'Добавить кота' : 'Редактировать кота';
    this.element.querySelector('button').innerText = this.type === 'add' ? 'Добавить' : 'Сохранить';
    this.form = this.element.querySelector('form');
    this.form.catName.value = this.data.name || '';
    this.form.favourite.checked = this.data.favourite || false;
    this.form.age.value = this.data.age || '';
    this.form.rate.value = this.data.rate || '';
    this.form.description.value = this.data.description || '';
    this.form.number.value = this.data.id || '';
    if (this.type !== 'add') {
      this.form.number.disabled = true;
    }
    this.form.img_link.value = this.data.img_link || '';
    document.querySelector('body').append(this.element);
  }

  deleteView() {
    this.element.remove();
    this.element = null;
  }

  closePopup() {
    this.closeBtn.addEventListener('click', () => {
      this.deleteView();
    });
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.deleteView();
      }
    });
  }

  addCat() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newData = {
        id: this.form.number.value,
        name: this.form.catName.value,
        favourite: this.form.favourite.checked,
        age: this.form.age.value,
        rate: this.form.rate.value,
        img_link: this.form.img_link.value,
      };
      this.api.addCat(newData)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'ok') {
            this.deleteView();
            const card = new this.Card(newData, document.querySelector('.container'), this.api);
            card.init();
          }
        });
    });
  }

  updateHandler() {
    const newData = {
      id: this.form.number.value,
      name: this.form.catName.value,
      age: this.form.age.value,
      favourite: this.form.favourite.checked,
      rate: this.form.rate.value,
      img_link: this.form.img_link.value,
    };
    this.api.updCat(this.data.id, newData)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'ok') {
          this.Card.updateCard(newData);
          this.deleteView();
        }
      });
  }

  updateCat() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const confirmPopup = new this.ConfirmPopup(this.updateHandler.bind(this), 'update');
      confirmPopup.init();
    });
  }

  _setListeners() {
    this.closePopup();
    if (this.type === 'add') {
      this.addCat();
    } else {
      this.updateCat();
    }
  }

  init() {
    this._render();
    this._setListeners();
  }
}
