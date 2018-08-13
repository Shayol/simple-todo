import "../scss/main.scss";
import {Store} from "./store.js";
import {Model} from "./model.js";
import {Template} from "./template.js";
import {View} from "./view.js";
import {Controller} from "./controller.js";

window.addEventListener('load', function () {
    function Todo(name) {
        this.storage = new Store(name);
        this.model = new Model(this.storage);
        this.template = new Template();
        this.view = new View(this.template);
        this.controller = new Controller(this.model, this.view);
    }

    var todo = new Todo("todo");

    function setView() {
        let hash = ''; 
            if(location.hash.indexOf('#') != -1) {
                hash = location.hash.split('#')[1];
            } 
        todo.controller.setView(hash);
    }

    setView();
})