import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import Todo from "../components/Todo.js";

document.addEventListener("DOMContentLoaded", () => {
  const addTodoButton = document.querySelector(".button_action_add");
  const addTodoForm = document.forms["add-todo-form"];
  const addTodoPopupSelector = "#add-todo-popup";

  const todoCounter = new TodoCounter(initialTodos, ".counter__text");

  const generateTodo = (data) => {
    const todo = new Todo(
      data,
      "#todo-template",
      (checked) => todoCounter.updateCompleted(checked),
      (wasCompleted) => {
        todoCounter.updateTotal(false);
        if (wasCompleted) todoCounter.updateCompleted(false);
      }
    );
    return todo.getView();
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
      todoCounter.updateTotal(true);
      newTodoValidator.resetValidation();
    },
  });

  addTodoPopup.setEventListeners();

  addTodoButton.addEventListener("click", () => {
    addTodoPopup.open();
  });
});
