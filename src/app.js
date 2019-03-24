
function App () {
    this.text = null;
    this.layers = null;
    this.state = null;
    this.drawFunction = null;
}

App.prototype.init = function () {
    this.state = new State();
    this.text = new Text();

    const settingsEl = document.getElementById('settings');
    const settingsLabel = document.getElementById('settingsLabel');
    this.text.setText('settings', settingsLabel);
    this.layers = new Layers;
    this.layers.init(this);
    this.drawer=null;
    this.hexagonBtn = document.getElementById("addHexagon");

    const self = this;

    this.hexagonBtn.addEventListener("click", (e)=> {
        self.drawKind = drawKind.hexagon;

        self.drawFunction = function(e){
            console.log('asdfasdfasdfasd');
            self.drawer = new Drawer(
                self.layers.serviceLayer.canvas,
                self.layers.currentLayer.context,
                self.layers.serviceLayer.context,
                drawKind.hexagon,
                {
                    x: e.pageX - self.layers.serviceLayer.canvas.offsetLeft,
                    y: e.pageY - self.layers.serviceLayer.canvas.offsetTop
                },
                {r: 250, g: 150, b: 100, blurCustom: 0.8, thickness: 15}
            );
        };
        self.layers.serviceLayer.canvas.addEventListener('mousedown', self.drawFunction);//todo проверить почему не срабатывает клик по сервисному слою
    });

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
