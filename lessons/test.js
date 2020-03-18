'use strict'
let age = document.getElementById('age');

function showUser(surname, name) {
    console.log("Пользователь " + surname + " " + name + ", его возраст " + this.value);
    console.log(this);
}

showUser.call(age, 'Василий', "Пупкин");
// Альтернатива - вывзов через apply
showUser.apply(age, ['Василий', "Пупкин"]);

// Создать класс options,  свойства: height, width, bg, fontSize, textAlign

class Options {

    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;    
    }

    createBlock(content) {
        let block = document.createElement('div');
        document.body.appendChild(block);
        block.textContent = content;
        block.style.cssText = `height: ${this.height}; width: ${this.width};background-color: ${this.bg}; text-align: ${this.textAlign}; font-size: ${this.fontSize}`;
    }
}

const option = new Options('500px', '60%', 'lightblue', '20px','center');
option.createBlock('Ололо пышь пышь пышь');

