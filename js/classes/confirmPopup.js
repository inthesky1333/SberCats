export class ConfirmPopup {
  constructor(confirmCallback, type) {
    this.template = document.querySelector('#confirm').content.querySelector('.popup-wrapper');
    this.confirmCallback = confirmCallback;
    this.type = type;
  }

  getElements() {
    this.element = this.template.cloneNode(true);
    this.closeBtn = this.element.querySelector('#closeConfirm');
    this.okBtn = this.element.querySelector('#ok');
    this.cancelBtn = this.element.querySelector('#cancel');
    this.title = this.element.querySelector('.title');
  }

  _render() {
    this.getElements();
    this.title.textContent = this.type === 'delete' ? 'Вы действительно хотите удалить кота?' : 'Вы изменить кота?';
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

  _setLsteners() {
    this.closePopup();
    this.okBtn.addEventListener('click', () => {
      this.confirmCallback();
      this.deleteView();
    });
    this.cancelBtn.addEventListener('click', () => {
      this.deleteView();
    });
  }

  init() {
    this._render();
    this._setLsteners();
  }
}
