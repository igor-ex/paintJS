
//занимается отображением текстовых полей и отображением их на выбранном языке
function Text() {
    this.simpleFields = [];
    this.callbacks = [];
}

Text.prototype.setText = function () {//устанавливает текст для элемента (связывает определенный элемент и
    //"идентификатор" текста
    //принимает разное количество аргументов:
    //1) строка-идентификатор текста, элемент в котором нужно ее отобразить
    //2) строка-идентификатор текста, колбэк который получит текстовую строку и сделает с ней что угодно
    if (typeof arguments[1] === 'object') {
        this.simpleFields.push({label: arguments[0], element: arguments[1]});
    } else if (typeof arguments[1] === 'function') {
        this.callbacks.push({label: arguments[0], callback: arguments[1]});
    } else {
        throw new TypeError('wrong argument type');
    }
};

//установит или перерисует все тексты на выбранном языке
Text.prototype.renderFields = function (language) {
    const lang = languages[language];

    this.simpleFields.forEach(function (data) {
        if (typeof lang[data.label] !== 'undefined') {
            data.element.innerText = lang[data.label];
        } else if (typeof languages['en'][data.label] !== 'undefined') {
            data.element.innerText = languages['en'][data.label];
        } else {
            throw new Error('text data not found for label ' + data.label);
        }
    });

    this.callbacks.forEach(function (data) {
        if (typeof lang[data.label] !== 'undefined') {
            data.callback(lang[data.label]);
        } else if (typeof languages['en'][data.label] !== 'undefined') {
            data.callback(languages['en'][data.label]);
        } else {
            throw new Error('text data not found for label ' + data.label);
        }
    });
};