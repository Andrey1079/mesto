export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  additem(newElement) {
    this._container.prepend(newElement);
  }
  renderItemsFromArray() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
