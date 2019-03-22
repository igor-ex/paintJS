
function App () {
    this.text = null;
}

App.prototype.init = function () {
    const state = new State;
    this.text = new Text;
    const settingsEl = document.getElementById('settings');
    const settingsLabel = document.getElementById('settingsLabel');
    this.text.setText('settings', settingsLabel);
    this.text.renderFields(state.language);
};

App.prototype.setLanguage = function (lang) {
    this.language = lang;
    this.text.renderFields(lang);
};