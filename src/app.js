
function App () {
    this.text = null;
    this.layers = null;
    this.state = null;
}

App.prototype.init = function () {
    this.state = new State();
    this.text = new Text();

    const settingsEl = document.getElementById('settings');
    const settingsLabel = document.getElementById('settingsLabel');
    this.text.setText('settings', settingsLabel);
    this.layers = new Layers;
    this.layers.init(this);
    this.circle = document.getElementById('circle');
    this.rect = document.getElementById('rect');
    this.hexagon = document.getElementById('hexa');
    this.brush = document.getElementById('brush');
    this.circle.addEventListener('click', () => {
        this.state.tool = 2;
    });
    this.rect.addEventListener('click', () => {
        this.state.tool = 1;
    });
    this.hexagon.addEventListener('click', () => {
        this.state.tool = 3;
    });
    this.brush.addEventListener('click', () => {
        this.state.tool = 0;
    });

    this.text.renderFields(this.state.language);
};

App.prototype.setLanguage = function (lang) {
    this.state.language = lang;
    this.text.renderFields(lang);
};