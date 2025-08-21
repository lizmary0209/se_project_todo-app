import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector("form");

    // Submit form
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = Object.fromEntries(new FormData(this._form));
      this._handleFormSubmit(formData);
      this.close();
      this._form.reset();
    });
  }
}

export default PopupWithForm;
