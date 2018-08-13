function Controller(model,view) {
    this.model = model;
    this.view = view;
    this.currentFilter = '';
    this.view.renderMain();
    this.view.bind("changeFilter", this.changeFilter.bind(this));
    // this.view.bind("removeCompleted", this.removeCompletedItems.bind(this));
    this.view.bind("newTodo", this.addItem.bind(this));
    this.view.bind("deleteTodo", this.deleteItem.bind(this));
    this.view.bind("editTodo", this.editItem.bind(this));
    this.view.bind("editDone", this.editDone.bind(this));
    this.view.bind("editCancel", this.editCancel.bind(this));
    this.view.bind("itemCheck", this.itemCheck.bind(this));
}

Controller.prototype.setView = function(hash) {    
    this.changeFilter(hash);
}

Controller.prototype.showAll = function() {
    this.model.read()
    .then(data => this.view.renderEntries(data));
}

Controller.prototype.showCompleted = function() {
    this.model.read({checked: true})
    .then(data => this.view.renderEntries(data));
}

Controller.prototype.showActive = function() {
    this.model.read({checked: false})
    .then(data => this.view.renderEntries(data));
}

Controller.prototype.changeFilter = function(filter) {
    this.currentFilter = filter;
    //true arg forces filter to filter even if its default 'all' = '' hash
    this._filter(true);
    this.view.renderFilter(filter);
}

Controller.prototype._filter = function(force) {
    this._updateCounter();
    if(this.currentFilter != '' || force) {
        switch(this.currentFilter) {
            case '': 
               this.showAll();
               break;
            case 'completed':
               this.showCompleted(); 
               break;
            case 'active':
               this.showActive();
        }
    }
}

Controller.prototype._updateCounter = function() {
    this.model.getCount().then(data => this.view.renderCounter(data.active));
}

Controller.prototype.addItem = function(text) {
    text = text.trim();
    if(text == '') {
        return;
    }
    this.model.create(text).then(id => this._filter(true));
}

Controller.prototype.deleteItem = function(id) {
    this.model.delete(id).then(id => this._filter(true));
}

Controller.prototype.editItem = function(id) {
    this.model.read(id).then(item => this.view.renderEditItem({id: id,text: item[id].text}));
}

Controller.prototype.editDone = function(id,text) {
    text = text.trim();
    if(text == '') {
        return this.editCancel(id);
    }
    this.model.edit({text: text},id).then(item => this.view.renderEditDone({id: id,text: item[id].text}));
}

Controller.prototype.editCancel = function(id) {
    this.model.read(id).then(item => this.view.renderEditDone({id: id,text: item[id].text}));
}

Controller.prototype.itemCheck = function(id,checked) {
    this.model.edit({checked: checked},id)
    .then(item => this.view.renderCheck({id: id, checked: item[id].checked}))
    .then(() => this._filter());
}

Controller.prototype.removeCompletedItems = function () {
    this.model.deleteInBatches({ checked: true })
    .then((arr) => this._filter(true));
};

export {Controller};