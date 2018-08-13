function TodoStore(name) {
    this._dbname = name;

    if (!localStorage[name]) {
        let data = {};

        localStorage[name] = JSON.stringify(data);
    }
}

TodoStore.prototype.findById = function (id) {
    let data = JSON.parse(localStorage[this._dbname]);
    let result = {};

    if (id && data[id]) {
        result[id] = data[id];
        return Promise.resolve(result);
    }

    return Promise.resolve(false);
}

TodoStore.prototype.find = function (query) {
    let data = JSON.parse(localStorage[this._dbname]);
    let result = {};

    loop1:
        for (var n in data) {
            for (var key in query) {
                if (query[key] !== data[n][key]) {
                    continue loop1;
                }
            }

            result[n] = data[n];
        }
    return Promise.resolve(result);
}

TodoStore.prototype.findAll = function () {
    return Promise.resolve(JSON.parse(localStorage[this._dbname]));
}

TodoStore.prototype.save = function (updateData, id) {
    let data = JSON.parse(localStorage[this._dbname]);
    let result = {};

    if (id && data[id]) {
        for (var key in updateData) {
            data[id][key] = updateData[key];
        }
    } else {
        var id = new Date().getTime();
        let items_db = new Date().getTime() + "db";
        updateData.items_db = items_db;
        data[id] = updateData;
    }
    localStorage[this._dbname] = JSON.stringify(data);
    result[id] = JSON.parse(localStorage[this._dbname])[id];
    return Promise.resolve(result);
}

TodoStore.prototype.delete = function (id) {
    let data = JSON.parse(localStorage[this._dbname]);
    if (id && data[id]) {
        delete data[id];
        localStorage[this._dbname] = JSON.stringify(data);
    }

    return Promise.resolve(id);
}

export {
    TodoStore
};