function TodoModel(store) {
    this.store = store;

}

TodoModel.prototype.read = function () {
    return new Promise((resolve) => resolve(this.store.findAll()));
}

TodoModel.prototype.create = function (text) {

    let newItem = {
        text: text
    }
    return new Promise((resolve) => resolve(this.store.save(newItem)));
}

TodoModel.prototype.delete = function (id) {
    return new Promise((resolve) => resolve(this.store.delete(id)));
}


TodoModel.prototype.edit = function (data, id) {
    return new Promise((resolve) => resolve(this.store.save(data, id)));
}

export {
    TodoModel
};