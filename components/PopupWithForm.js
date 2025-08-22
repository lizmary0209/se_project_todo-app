import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector("form");
  }

  _getInputValues() {
    return Object.fromEntries(new FormData(this._form));
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._handleFormSubmit(formData);
      this.close();
      this._form.reset();
    });
  }
}

export default PopupWithForm;
