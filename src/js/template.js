function Template() {
    this.startTemplate = `<input class='todo__input' placeholder='add item'></input>
                            <ul class='todo'>
                            </ul>
                            <footer class='todo__footer'>
                            <div class='todo__counter'></div>
                            <ul class="filters">
                                <li class='filters__item'>
                                    <a href="#" class="filters__link selected">All</a>
                                </li>
                                <li class='filters__item'>
                                    <a href="#active" class='filters__link'>Active</a>
                                </li>
                                <li class='filters__item'>
                                    <a href="#completed" class='filters__link'>Completed</a>
                                </li>
                            </ul>
                            </footer>`

    this.defaultTemplate = `<li class='todo__item {{checked-item}}' data-todoid='{{id}}'>
        <input type='checkbox' class='todo__fullfilled' {{checked}}> 
        <div class='todo__content'>
            <span class='todo__text'> {{text}}  </span> 
            <input class='todo__edit-input'></input>
        </div> 
        <button class='edit'>Edit</button><button class='delete'>Delete</button></li>`;
}

Template.prototype.show = function (data) {
    let str = '';

    for (let id in data) {
        let template = this.defaultTemplate;
        let checked = '';
        let checkedItem = '';

        if (data[id].checked) {
            checked = 'checked';
            checkedItem = 'todo__item--checked'
        }

        template = template.replace('{{id}}', id);
        template = template.replace('{{text}}', data[id].text);
        template = template.replace('{{checked}}', checked);
        template = template.replace('{{checked-item}}', checkedItem);

        str = str + template;
    }
    return str;
}

Template.prototype.itemCounter = function(number) {
    let plural = number > 1 ? 's' : '';
    return `<strong class='todo__count-number'>${number}</strong> item${plural} left`;
}

export {
    Template
};