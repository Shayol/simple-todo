function Model(store) {
    this.store = store;

}

Model.prototype.read = function (query) {
    if (query) {
        let queryType = typeof query;

        if (queryType == "string") {
            return new Promise((resolve) => resolve(this.store.findById(query)));
        } else {
            return new Promise((resolve) => resolve(this.store.find(query)));
        }
    }
    return new Promise((resolve) => resolve(this.store.findAll()));


}

Model.prototype.create = function (text) {

    let newItem = {
        text: text,
        checked: false
    }
    return new Promise((resolve) => resolve(this.store.save(newItem)));
}

Model.prototype.delete = function (id) {
    return new Promise((resolve) => resolve(this.store.delete(id)));
}

Model.prototype.deleteInBatches = function(query) {
    if(query) {
        let queryType = typeof query;

        if(queryType == "object") {
            let arr = [];
            return this.read(query).then(items => {
                for (var i in items) {
                    arr.push(this.delete(i));
                }

                return Promise.all(arr);
            })
        }
    }
}
 
Model.prototype.edit = function (data, id) {
    return new Promise((resolve) => resolve(this.store.save(data, id)));
}

Model.prototype.getCount = function () {
    let todos = {
        active: 0,
        completed: 0,
        total: 0
    };

    return this.store.findAll()
    .then(data => {
        for (let key in data) {
            if(data[key].checked) {
                todos.completed++;
            }
            else {
                todos.active++;
            }
            todos.total++;
        }
        return Promise.resolve(todos);
    });
};

export {
    Model
};