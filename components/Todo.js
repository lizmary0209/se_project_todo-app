class Todo {
  constructor(todoData, selector, handleCheck, handleDelete) {
    this._todoData = todoData;
    this._templateElement = document.querySelector(selector);

    this._dueDate = todoData.date ? new Date(todoData.date) : null;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _formatDueDate() {
    if (this._dueDate && !isNaN(this._dueDate)) {
      return this._dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return null;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._todoData.completed = this._todoCheckboxEl.checked;
      this._handleCheck(this._todoCheckboxEl.checked);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDelete(this._todoData.completed);
    });
  }

  _setupCheckboxAndLabel() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoCheckboxEl.checked = !!this._todoData.completed;

    const uniqueId = `todo-${this._todoData.id}`;
    this._todoCheckboxEl.id = uniqueId;

    this._todoCheckboxEl.name = "completed";
    this._todoLabel.setAttribute("for", uniqueId);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoElement.querySelector(".todo__name").textContent =
      this._todoData.name;

    const todoDateEl = this._todoElement.querySelector(".todo__date");
    const formattedDate = this._formatDueDate();
    if (formattedDate) {
      todoDateEl.textContent = `Due: ${formattedDate}`;
    } else {
      todoDateEl.style.display = "none";
    }

    this._setupCheckboxAndLabel();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
