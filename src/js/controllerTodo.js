import {Store} from "./store.js";
import {Model} from "./model.js";
import {Template} from "./template.js";
import {View} from "./view.js";
import {Controller} from "./controller.js";

function TodoController(model, view) {
    this.model = model;
    this.view = view;
    this.view.renderMain();
    this.view.bind("newTodo", this.addItem.bind(this));
    this.view.bind("deleteTodo", this.deleteItem.bind(this));
    this.view.bind("editTodo", this.editItem.bind(this));
    this.view.bind("editDone", this.editDone.bind(this));
    this.view.bind("editCancel", this.editCancel.bind(this));
}

TodoController.prototype.setView = function () {
    this.showAll();
}

TodoController.prototype.showAll = function () {
    return this.model.read()
        .then(data => (this.view.renderEntries(data),data))
        .then(data => {
            for (let i in data) {
                let item = {};
                item[i] = data[i];

                this.addChildren(item);
            }
        } )

        //fix promise so addChildren woudn't wait for promise
}

TodoController.prototype.addItem = function (text) {
    text = text.trim();
    if (text == '') {
        return;
    }
    this.model.create(text).then(item => {
        this.showAll()
        // .then(() =>  this.addChildren(item));
    });
}

TodoController.prototype.deleteItem = function (id) {
    this.model.delete(id).then(id => this.showAll());
}

TodoController.prototype.editItem = function (id) {
    this.model.read(id).then(item => this.view.renderEditItem({
        id: id,
        text: item[id].text
    }));
}

TodoController.prototype.editDone = function (id, text) {
    text = text.trim();
    if (text == '') {
        return this.editCancel(id);
    }
    this.model.edit({
        text: text
    }, id).then(item => this.view.renderEditDone({
        id: id,
        text: item[id].text
    }));
}

TodoController.prototype.editCancel = function (id) {
    this.model.read(id).then(item => this.view.renderEditDone({
        id: id,
        text: item[id].text
    }));
}
TodoController.prototype.addChildren = function (item) {
    let id = Object.keys(item)[0];
    let wrapper = this.view.getWrapper(id);
    function Todo(name) {
        this.storage = new Store(name);
        this.model = new Model(this.storage);
        this.template = new Template();
        this.view = new View(this.template,wrapper);
        this.controller = new Controller(this.model, this.view);
    }

    var todo = new Todo(item[id].items_db);

    function setView() {
        let hash = '';
        if (location.hash.indexOf('#') != -1) {
            hash = location.hash.split('#')[1];
        }
        todo.controller.setView(hash);
    }

    setView();
}

export {
    TodoController
};