export class PhotoPopup {
  constructor(src) {
    this.src = src;
    this.template = document.querySelector('#photo').content.querySelector('.popup-wrapper');
  }

  getElements() {
    this.element = this.template.cloneNode(true);
    this.closeBtn = this.element.querySelector('#closePhoto');
  }

  render() {
    this.getElements();
    this.element.querySelector('img').src = this.src;
    document.querySelector('body').append(this.element);
  }

  closePopup() {
    this.closeBtn.addEventListener('click', () => {
      this.element.remove();
    });
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.element.remove();
      }
    });
  }

  init() {
    this.render();
    this.closePopup();
  }
}
