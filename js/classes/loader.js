export class Loader {
  static template = document.querySelector('#loader');

  static loader = this.template.content.querySelector('.popup-wrapper').cloneNode(true);

  static show() {
    document.querySelector('body').append(this.loader);
  }

  static hide() {
    this.loader.remove();
  }
}
