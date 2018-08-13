function TodoView(template) {
    this.template = template;

    this.$main = document.body;
    this.ENTER_KEY = 13;
    this.$todoList;
    this.$newTodo;
}

TodoView.prototype._itemId = function (el) {
    let parent = el.parentElement;
    var id;

    while (parent.tagName !== "LI") {
        parent = parent.parentElement;
    }

    id = parent.dataset.todoid;

    return id;

}

TodoView.prototype.renderMain = function () {
    this.$main.innerHTML = this.template.startTemplate;
    this.$todoList = document.querySelector(".main-todo");
    this.$newTodo = document.querySelector(".main__input");
}


TodoView.prototype.renderEntries = function (items) {
    this.$todoList.innerHTML = this.template.show(items);
}

TodoView.prototype.getWrapper = function(id) {
    let wrapper = this.$main.querySelector("[data-todoid='" + id + "'] .items-container");
    return wrapper;
}

TodoView.prototype.renderEditItem = function (item) {
    let li = this.$todoList.querySelector("[data-todoid='" + item.id + "']");
    let editInput = li.querySelector(".todo__edit-input");
    let editButton = li.querySelector(".edit");

    editInput.style.display = "block";
    editInput.value = item.text;
    editInput.focus();
    editInput.classList.add("todo__edit-input--active");

    editButton.style.display = "none";
}

TodoView.prototype.renderEditDone = function (item) {
    let li = this.$todoList.querySelector("[data-todoid='" + item.id + "']");
    let editInput = li.querySelector(".main-todo__edit-input");
    let editButton = li.querySelector(".main-edit");
    let liText = li.querySelector(".main-todo__text");

    editInput.style.display = "none";
    editInput.classList.remove("main-todo__edit-input--active");
    liText.innerHTML = item.text;

    editButton.style.display = "block";
}


TodoView.prototype.bind = function (event, callback) {
    // var self = this;
    if (event == 'deleteTodo') {
        this.$todoList.addEventListener('click', (e) => {
            if (e.target.classList.contains('main-delete')) {
                callback(this._itemId(e.target));
            }
        })
    } else if (event == 'newTodo') {
        this.$newTodo.addEventListener('keyup', (e) => {
            if (e.which == this.ENTER_KEY)
                callback(this.$newTodo.value);
        })
    } else if (event == 'editTodo') {
        this.$todoList.addEventListener('click', (e) => {
            if (e.target.classList.contains('main-edit')) {
                callback(this._itemId(e.target));
            }
        })
    } else if (event == "editDone") {
        this.$todoList.addEventListener('keyup', (e) => {
            if (e.target.classList.contains("main-todo__edit-input")) {
                if (e.which == this.ENTER_KEY) {
                    callback(this._itemId(e.target), e.target.value);
                }
            }

        });
    } else if (event == "editCancel") {
        this.$todoList.addEventListener('focusout', (e) => {
            if (e.target.classList.contains("main-todo__edit-input--active")) {
                callback(this._itemId(e.target));
            }

        });
    }
}

export {
    TodoView
};