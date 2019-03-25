const drawKind = {
    brush:0,
    rectangle : 1,
    circle : 2,
    hexagon : 3
};

function Drawer(canvas, currentLayerCtx, serviceLayerCtx, figureKind, mouseStart,  options, app){
    this.canvas = canvas;
    this.currentLayerCtx = currentLayerCtx;
    this.serviceLayerCtx = serviceLayerCtx;
    this.figureKind = figureKind;
    this.mouseStart = mouseStart;
    this.app = app;
    this.options = options;
    this.drawingCtx = (figureKind == drawKind.brush) ? this.currentLayerCtx : this.serviceLayerCtx;
    this.mouseMove=this.drawMove.bind(this);
    this.mouseUp=this.close.bind(this);
    this.canvas.addEventListener("mousemove",this.mouseMove);
    this.canvas.addEventListener("mouseup", this.mouseUp);
    this.checkFigure();
}

Drawer.prototype.checkFigure = function(){

    switch (this.figureKind){
        case drawKind.brush:
            this.drawFigure= this.drawBrush;
            break;
        case drawKind.rectangle:
            this.drawFigure= this.drawRect;
            break;
        case drawKind.circle:
            this.drawFigure= this.drawCircle;
            break;
        case drawKind.hexagon:
            this.drawFigure= this.drawHexagon;
            break;

    }
};

Drawer.prototype.clearScr = function(ctx){
    ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
};

Drawer.prototype.drawMove = function(e) {
    if (this.drawingCtx === this.serviceLayerCtx) {
        this.clearScr(this.serviceLayerCtx);
    }
    this.drawFigure(e,this.canvas, this.drawingCtx);

};

Drawer.prototype.drawBrush = function(e, canvas, ctx){

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const circleRadius = this.options.thickness;
    const radiusGradient = circleRadius * this.options.blurRange;
    const gradientOptions = ctx.createRadialGradient(x,y,radiusGradient,x,y,circleRadius);
    gradientOptions.addColorStop(0, `rgba(${this.options.r},${this.options.g},${this.options.b},1)`);
    gradientOptions.addColorStop(1, `rgba(${this.options.r},${this.options.g},${this.options.b},0)`);
    ctx.fillStyle = gradientOptions;
    ctx.fillRect(x-circleRadius,y-circleRadius,circleRadius*2,circleRadius*2);

};

Drawer.prototype.drawRect = function(e, canvas, ctx){

    const rect = canvas.getBoundingClientRect();
    const tmpX = e.clientX - rect.left;
    const tmpY = e.clientY - rect.top;
    const x = Math.min(tmpX, this.mouseStart.x);
    const y = Math.min(tmpY, this.mouseStart.y);
    const width = Math.abs(tmpX - this.mouseStart.x);
    const height = Math.abs(tmpY - this.mouseStart.y);
    ctx.strokeStyle = `rgba(${this.options.r},${this.options.g},${this.options.b})`;
    ctx.lineWidth = this.options.thickness;
    ctx.strokeRect(x, y, width, height);
};

Drawer.prototype.drawCircle =  function(e, canvas, ctx){

    const rect = canvas.getBoundingClientRect();
    const tmpX = e.clientX - rect.left;
    const tmpY = e.clientY - rect.top;
    const x = (tmpX + this.mouseStart.x) / 2;
    const y = (tmpY + this.mouseStart.y) / 2;

    let radius = Math.max(
        Math.abs(tmpX - this.mouseStart.x),
        Math.abs(tmpY - this.mouseStart.y)
    ) / 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = `rgba(${this.options.r},${this.options.g},${this.options.b})`;
    ctx.lineWidth = this.options.thickness;
    ctx.stroke();
    ctx.closePath();

};

Drawer.prototype.drawHexagon = function(e, canvas, ctx){

    const rect = canvas.getBoundingClientRect();
    const tmpX = e.clientX - rect.left;
    const tmpY = e.clientY - rect.top;
    const size = Math.max(Math.abs(tmpX - this.mouseStart.x), Math.abs(tmpY - this.mouseStart.y));
    const centerX = tmpX;
    const centerY = tmpY;

    ctx.beginPath();
    ctx.moveTo (centerX +  size * Math.cos(0), centerY +  size *  Math.sin(0));

    for (let i = 1; i <= 6;i += 1) {
        ctx.lineTo (centerX + size * Math.cos(i * 2 * Math.PI / 6), centerY + size * Math.sin(i * 2 * Math.PI / 6));
    }
    ctx.lineTo (centerX + size * Math.cos(2 * Math.PI / 6), centerY + size * Math.sin(2 * Math.PI / 6));
    ctx.strokeStyle = `rgba(${this.options.r},${this.options.g},${this.options.b})`;
    ctx.lineWidth = this.options.thickness;
    ctx.stroke();
};

Drawer.prototype.close=function(e){
    this.drawFigure(e,this.canvas, this.currentLayerCtx);
    this.canvas.removeEventListener("mousemove",this.mouseMove);
    this.canvas.removeEventListener("mouseup", this.mouseUp);
    this.clearScr(this.serviceLayerCtx);
    this.callbackDispose();
};