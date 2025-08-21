class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      if (element) this.addItem(element);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  removeItem(element) {
    element.remove();
  }
}

export default Section;
