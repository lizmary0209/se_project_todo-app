class Todo {
  constructor(todoData, selector) {
    this._todoData = todoData;
    this._templateElement = document.querySelector(selector);
    this._dueDate = new Date(this._todoData.date);
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
      this._todoData.completed = !this._todoData.completed;
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoCheckboxEl.checked = this._todoData.completed;
    this._todoCheckboxEl.id = `todo-${this._todoData.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._todoData.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDateEl = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._todoData.name;

    const formattedDate = this._formatDueDate();
    if (formattedDate) {
      todoDateEl.textContent = `Due: ${formattedDate}`;
    } else {
      todoDateEl.style.display = "none";
    }

    this.generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
