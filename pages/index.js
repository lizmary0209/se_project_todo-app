import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";

document.addEventListener("DOMContentLoaded", () => {
  const addTodoButton = document.querySelector(".button_action_add");
  const addTodoForm = document.forms["add-todo-form"];
  const addTodoPopupSelector = "#add-todo-popup";

  class TodoGenerator {
    constructor(data) {
      this._data = data;
      this._template = document.querySelector("#todo-template").content;
    }

    getTodoElement() {
      const todoElement = this._template.querySelector(".todo").cloneNode(true);
      todoElement.querySelector(".todo__name").textContent =
        this._data.name || "";
      todoElement.querySelector(".todo__date").textContent = this._data.date
        ? new Date(this._data.date).toLocaleDateString()
        : "";

      const checkbox = todoElement.querySelector(".todo__completed");
      const label = todoElement.querySelector(".todo__label");
      const uniqueId = `todo-${this._data.id}`;
      checkbox.id = uniqueId;
      checkbox.name = "completed";
      label.setAttribute("for", uniqueId);
      checkbox.checked = !!this._data.completed;

      checkbox.addEventListener("change", () => {
        this._data.completed = checkbox.checked;
      });

      const deleteBtn = todoElement.querySelector(".todo__delete-btn");
      deleteBtn.addEventListener("click", () => {
        todoElement.remove();
      });

      return todoElement;
    }
  }

  const generateTodo = (data) => {
    const todo = new TodoGenerator(data);
    return todo.getTodoElement();
  };

  const section = new Section({
    items: initialTodos,
    renderer: (item) => {
      section.addItem(generateTodo(item));
    },
    containerSelector: ".todos__list",
  });

  section.renderItems();

  const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
  newTodoValidator.enableValidation();

  const addTodoPopup = new PopupWithForm({
    popupSelector: addTodoPopupSelector,
    handleFormSubmit: (formData) => {
      const values = {
        name: formData.name,
        date: formData.date ? new Date(formData.date) : null,
        id: uuidv4(),
      };
      section.addItem(generateTodo(values));
      newTodoValidator.resetValidation();
    },
  });

  addTodoButton.addEventListener("click", () => {
    addTodoPopup.open();
  });
});
