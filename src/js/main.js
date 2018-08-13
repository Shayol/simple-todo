import "../scss/main.scss";
import {TodoStore} from "./storeTodo.js";
import {TodoModel} from "./modelTodo.js";
import {TodoTemplate} from "./templateTodo.js";
import {TodoView} from "./viewTodo.js";
import {TodoController} from "./controllerTodo.js";

//TODO - use remove()

window.addEventListener('load', function () {
    function Main(name) {
        this.storage = new TodoStore(name);
        this.model = new TodoModel(this.storage);
        this.template = new TodoTemplate();
        this.view = new TodoView(this.template);
        this.controller = new TodoController(this.model, this.view);
    }

    var main = new Main("todo");

    function setView() {
        main.controller.setView();
    }

    setView();
})