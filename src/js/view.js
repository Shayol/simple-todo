function View(template,main) {
    this.template = template;

    this.$main = main;
    this.ENTER_KEY = 13;
    this.$todoList;
    this.$newTodo;
    this.$itemCounter;
    this.$removeCompleted;
}

View.prototype._itemId = function (el) {
    let parent = el.parentElement;
    var id;

    while (parent.tagName !== "LI") {
        parent = parent.parentElement;
    }

    id = parent.dataset.todoid;

    return id;

}

View.prototype.renderMain = function () {
    this.$main.innerHTML = this.template.startTemplate;
    this.$todoList = this.$main.querySelector(".todo");
    this.$newTodo = this.$main.querySelector(".todo__input");
    this.$itemCounter = this.$main.querySelector(".todo__counter");
    this.$removeCompleted = this.$main.querySelector(".todo__completed");
}

View.prototype.renderFilter = function(filter) {
    this.$main.querySelector(".filters .selected").classList.remove("selected");
    this.$main.querySelector(`.filters [href='#${filter}']`).classList.add("selected");
}

View.prototype.renderCounter = function(number) {
    this.$itemCounter.innerHTML = this.template.itemCounter(number);
}

View.prototype.renderEntries = function (items) {
    this.$todoList.innerHTML = this.template.show(items);
}

View.prototype.renderEditItem = function (item) {
    let li = this.$todoList.querySelector("[data-todoid='" + item.id + "']");
    let editInput = li.querySelector(".todo__edit-input");
    let editButton = li.querySelector(".edit");

    editInput.style.display = "block";
    editInput.value = item.text;
    editInput.focus();
    editInput.classList.add("todo__edit-input--active");

    editButton.style.display = "none";
}

View.prototype.renderEditDone = function (item) {
    let li = this.$todoList.querySelector("[data-todoid='" + item.id + "']");
    let editInput = li.querySelector(".todo__edit-input");
    let editButton = li.querySelector(".edit");
    let liText = li.querySelector(".todo__text");

    editInput.style.display = "none";
    editInput.classList.remove("todo__edit-input--active");
    liText.innerHTML = item.text;

    editButton.style.display = "block";
}

View.prototype.renderCheck = function (item) {
    let li = this.$todoList.querySelector("[data-todoid='" + item.id + "']");
    item.checked ? li.classList.add("todo__item--checked") : li.classList.remove("todo__item--checked");
}


View.prototype.bind = function (event, callback) {
    // var self = this;
    if (event == 'deleteTodo') {
        this.$todoList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete')) {
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
            if (e.target.classList.contains('edit')) {
                callback(this._itemId(e.target));
            }
        })
    } else if (event == "editDone") {
        this.$todoList.addEventListener('keyup', (e) => {
            if (e.target.classList.contains("todo__edit-input")) {
                if (e.which == this.ENTER_KEY) {
                    callback(this._itemId(e.target), e.target.value);
                }
            }

        });
    } else if (event == "editCancel") {
        this.$todoList.addEventListener('focusout', (e) => {
            if (e.target.classList.contains("todo__edit-input--active")) {
                callback(this._itemId(e.target));
            }

        });
    } else if (event == "itemCheck") {
        this.$todoList.addEventListener('change', (e) => {
            if (e.target.classList.contains('todo__fullfilled')) {
                callback(this._itemId(e.target), e.target.checked);
            }
        })
    } else if (event == "changeFilter") {
        window.addEventListener('hashchange', (e) => {
            let hash = ''; 
            if(location.hash.indexOf('#') != -1) {
                hash = location.hash.split('#')[1];
            } 
            callback(hash);
        })
    }
    else if (event == 'removeCompleted') {
        this.$todoList.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit')) {
                callback(this._itemId(e.target));
            }
        })
    }

}

export {
    View
};