
function Layers () {
    this.currentLayer = null;
    this.serviceLayer = null;
    this.canvasContainer = null;
    this.layersContainer = null;
    this.layerCounter = 1;
}

Layers.prototype.init = function () {
    this.serviceLayer = {};
    this.serviceLayer.canvas = document.getElementById('serviceCanvas');
    this.canvasContainer = document.getElementById('content');
    this.layersContainer = document.getElementById('layers');
    this.width = this.canvasContainer.clientWidth;
    this.height = this.canvasContainer.clientHeight;
    this.serviceLayer.context = this.serviceLayer.canvas.getContext('2d');
    this.add();
    document.getElementById('addLayer').addEventListener('click', () => {
        this.add();
    });
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
    layerHandler.innerText = 'layer ' + this.layerCounter;
    layerHandler.classList.add('layers__layer');
    layerHandler.addEventListener('click', () => {
        this.currentLayer = layer;
        insertAfter(this.serviceLayer.canvas, layer.canvas);
        Array.prototype.forEach.call(this.layersContainer.getElementsByClassName('layers__layer'), function (el) {
            el.classList.remove('layers__layer_active');
        });
        layerHandler.classList.add('layers__layer_active');
    });
    if (this.canvasContainer.lastChild = this.serviceLayer.canvas) {
        this.canvasContainer.insertBefore(canvas, this.serviceLayer.canvas);
    } else {
        this.canvasContainer.appendChild(canvas);
    }
    if (this.layersContainer.firstChild === null) {
        this.layersContainer.appendChild(layerHandler);
    } else {
        this.layersContainer.insertBefore(layerHandler, this.layersContainer.firstChild);
    }
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