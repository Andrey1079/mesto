export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(newElement) {
    this._container.prepend(newElement);
  }
  renderItemsFromArray() {
    this._items.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }
}
