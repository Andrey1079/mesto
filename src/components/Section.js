export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(newElement) {
    this._container.prepend(newElement);
  }
  renderItemsFromArray(arr) {
    arr.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }
}
