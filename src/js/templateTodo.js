function TodoTemplate() {
    this.startTemplate = `<div class='container'>
                            <input class='main-todo__input' placeholder='add item list'></input>
                            <ul class='main-todo'>
                            </ul>
                        </div>`

    this.defaultTemplate = `<li class='main-todo__item' data-todoid='{{id}}'>
                            <div class='main-todo__header'>    
                                <div class='main-todo__content'>
                                    <div class='main-todo__text'> {{text}}  </div> 
                                    <input class='main-todo__edit-input'></input>
                                </div> 
                                <div class='main-edit'>&#9998;</div>
                                <div class='main-delete'>&#10005;</div>
                            </div>
                            <div class='main-todo__items-container'></div>
                            </li>`;
}

TodoTemplate.prototype.show = function (data) {
    let str = '';

    for (let id in data) {
        let template = this.defaultTemplate;

        template = template.replace('{{id}}', id);
        template = template.replace('{{text}}', data[id].text);

        str = str + template;
    }
    return str;
}

export {
    TodoTemplate
};