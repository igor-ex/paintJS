
function App () {
    this.text = null;
    this.layers = null;
    this.state = null;
    this.drawFunction = null;
}

App.prototype.init = function () {
    this.state = new State();
    this.text = new Text();

    const settingsLabel = document.getElementById('setting');
    this.text.setText('settings', settingsLabel.firstChild);
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
    this.sizeEl = document.getElementById('size');
    this.colorEl = document.getElementById('color');
    this.blurEl = document.getElementById('blur');
   
    this.text.renderFields(this.state.language);
};

App.prototype.clearDrawer=function(){
    console.log("end drawing");
    console.log(this);
    this.layers.serviceLayer.canvas.removeEventListener('mousedown', this.drawFunction);
    this.drawer=null;
};

App.prototype.setLanguage = function (lang) {
    this.state.language = lang;
    this.text.renderFields(lang);
};