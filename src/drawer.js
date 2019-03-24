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
    this.drawingCtx = (figureKind == drawKind.circle) ? this.currentLayerCtx : this.serviceLayerCtx;
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
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Drawer.prototype.drawMove = function(e) {
    if (this.drawingCtx === this.serviceLayerCtx) {
        this.clearScr(this.serviceLayerCtx);
    }
    this.drawFigure(e,this.canvas, this.drawingCtx);

};

Drawer.prototype.drawRect = function(e, canvas, ctx){

    let x = Math.min(e.pageX - canvas.offsetLeft, this.mouseStart.x);
    let y = Math.min(e.pageY - canvas.offsetTop, this.mouseStart.y);
    let width = Math.abs(e.pageX - canvas.offsetLeft - this.mouseStart.x);
    let height = Math.abs(e.pageY - canvas.offsetTop - this.mouseStart.y);
    ctx.strokeRect(x, y, width, height);
};

Drawer.prototype.drawBrush = function(e, canvas, ctx){

    let x = (e.pageX - canvas.offsetLeft);
    let y = (e.pageY - canvas.offsetTop);

    var radgrad = ctx.createRadialGradient(60,60,0,60,60,60);
    radgrad.addColorStop(0, 'rgba(255,0,0,1)');
    radgrad.addColorStop(0.8, 'rgba(228,0,0,.9)');
    radgrad.addColorStop(1, 'rgba(228,0,0,0)');

    ctx.beginPath();
    let size = this.options.thickness;
    let color = `rgb(${this.options.r},${this.options.g},${this.options.b})`;
    ctx.arc(x, y, size, 0, Math.PI * 2, false);
    ctx.fillStyle = radgrad;
    ctx.fill();
    ctx.closePath();

};

Drawer.prototype.drawCircle =  function(e, canvas, ctx){
    let x = (e.pageX - canvas.offsetLeft +this.mouseStart.x) / 2;
    let y = (e.pageY - canvas.offsetTop + this.mouseStart.y) / 2;

    let radius = Math.max(
        Math.abs(e.pageX - canvas.offsetLeft - this.mouseStart.x),
        Math.abs(e.pageY - canvas.offsetTop - this.mouseStart.y)
    ) / 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
};

Drawer.prototype.drawHexagon = function(e, canvas, ctx){
    let size = Math.max(Math.abs(e.pageX - canvas.offsetLeft - this.mouseStart.x), Math.abs(e.pageY - canvas.offsetTop - this.mouseStart.y));
    let centerX = e.pageX - canvas.offsetLeft;
    let centerY = e.pageY - canvas.offsetTop;

    ctx.beginPath();
    ctx.moveTo (centerX +  size * Math.cos(0), centerY +  size *  Math.sin(0));

    for (let i = 1; i <= 6;i += 1) {
        ctx.lineTo (centerX + size * Math.cos(i * 2 * Math.PI / 6), centerY + size * Math.sin(i * 2 * Math.PI / 6));
    }

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;

    ctx.stroke();
};

Drawer.prototype.close=function(e){
    this.drawFigure(e,this.canvas, this.currentLayerCtx);
    this.canvas.removeEventListener("mousemove",this.mouseMove);
    this.canvas.removeEventListener("mouseup", this.mouseUp);
    this.app.clearDrawer.call(this.app);
};