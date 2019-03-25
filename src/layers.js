
function Layers () {
    this.currentLayer = null;
    this.serviceLayer = null;
    this.serviceTopLayer = null;
    this.canvasContainer = null;
    this.layersContainer = null;
    this.layerCounter = 1;
    this.addLayerButton = null;
    this.app = null;
}

Layers.prototype.init = function (app) {
    this.app = app;
    this.serviceLayer = {};
    this.serviceLayer.canvas = document.getElementById('serviceCanvas');
    this.canvasContainer = document.getElementById('content');
    this.layersContainer = document.getElementById('layers');
    this.serviceTopLayer = document.getElementById('serviceTopLayer');
    this.width = this.canvasContainer.clientWidth;
    this.height = this.canvasContainer.clientHeight;
    this.serviceLayer.canvas.width = this.width;
    this.serviceLayer.canvas.height = this.height;
    this.serviceTopLayer.style.cssText = `width: ${this.width}px; height: ${this.height}px;`;
    this.serviceLayer.context = this.serviceLayer.canvas.getContext('2d');
    this.serviceTopLayer.addEventListener('mousedown', (event) => {
        if (this.currentLayer === null || typeof this.app.state.tool === 'undefined') {
            return;
        }
        const rect = this.serviceTopLayer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const options = {thickness: 10, r: 200, g: 50, b: 50};
        new Drawer(this.serviceTopLayer, this.currentLayer.context, this.serviceLayer.context, app.state.tool, {x, y}, options, () => {});
    });
    this.add();
    this.addLayerButton = document.getElementById('addLayer');
    this.addLayerButton.addEventListener('click', () => {
        this.add();
    });
    this.app.text.setText('addLayerButton', this.addLayerButton);
};

Layers.prototype.add = function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas_' + this.layerCounter;
    canvas.classList.add('content__canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const context = canvas.getContext('2d');
    const layer = {canvas, context};
    const layerHandler = document.createElement('div');
    const layerNameEl = document.createElement('span');
    layerNameEl.innerText =  languages[this.app.state.language].layer + ' ' + this.layerCounter;
    const layerIndex = this.layerCounter;
    this.app.text.setText('layer', text => {
        layerNameEl.innerText = text + ' ' + layerIndex;
    });
    layerHandler.appendChild(layerNameEl);
    layerHandler.classList.add('layers__layer');
    const activateLayer = () => {
        this.currentLayer = layer;
        insertAfter(this.serviceLayer.canvas, layer.canvas);
        Array.prototype.forEach.call(this.layersContainer.getElementsByClassName('layers__layer'), function (el) {
            el.classList.remove('layers__layer_active');
        });
        layerHandler.classList.add('layers__layer_active');
    };
    layerHandler.addEventListener('click', activateLayer);
    const layerDelButton = document.createElement('span');
    layerDelButton.innerText = 'delete';
    layerDelButton.addEventListener('click', (event) => {
        layerHandler.remove();
        canvas.remove();
        this.currentLayer = null;
        event.stopPropagation();
    });
    layerHandler.appendChild(layerDelButton);
    if (this.serviceTopLayer.previousSibling === this.serviceLayer.canvas) {
        this.canvasContainer.insertBefore(canvas, this.serviceLayer.canvas);
    } else {
        this.canvasContainer.insertBefore(canvas, this.serviceTopLayer);
    }
    const layerElements = this.layersContainer.getElementsByClassName('layers__layer');
    if (layerElements === null) {
        this.layersContainer.insertBefore(layerHandler, this.addLayerButton);
    } else {
        this.layersContainer.insertBefore(layerHandler, layerElements[0]);
    }
    activateLayer();
    this.layerCounter++;
};

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}