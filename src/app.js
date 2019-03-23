
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
    this.text.renderFields(this.state.language);
    this.layers = new Layers;
    this.layers.init();
};

App.prototype.setLanguage = function (lang) {
    this.language = lang;
    this.text.renderFields(lang);
};
