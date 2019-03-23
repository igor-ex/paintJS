
function App () {
    this.text = null;
    this.layers = null;
}

App.prototype.init = function () {
    const state = new State;
    this.text = new Text;
    const settingsEl = document.getElementById('settings');
    const settingsLabel = document.getElementById('settingsLabel');
    this.text.setText('settings', settingsLabel);
    this.text.renderFields(state.language);
    this.layers = new Layers;
    this.layers.init();
};

App.prototype.setLanguage = function (lang) {
    this.language = lang;
    this.text.renderFields(lang);
};