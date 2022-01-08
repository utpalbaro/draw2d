export class CreateGeometryContext {
    constructor(canvas, ctx, updateCallback, finishCallback) {
        this.drawing = false;
        this.canvas = canvas
        this.ctx = ctx;
        this.update = updateCallback;
        this.finish = finishCallback;
        this.insideContext = false;
    }

    enter() {
        if (!this.insideContext) {
            this.canvas.style.cursor = 'crosshair';
            this.insideContext = true;
            window.addEventListener('mousedown', this._onMouseDown);
        }
    }

    exit() {
        this.canvas.style.cursor = 'default';
        this.insideContext = false;
        window.removeEventListener('mousedown', this._onMouseDown);
        window.removeEventListener('mousemove', this._onMouseMove);

        if (this.update)
            this.update();
    }

    /**
     * 
     * @param {Event} e 
     * @private
     */
    _onMouseDown = e => {
        e.preventDefault();

        this.drawing = !this.drawing;
            
        if (this.drawing) {
            this.initX = e.clientX;
            this.initY = e.clientY;

            this._startDrawing();
        } else {
            this._stopDrawing();
        }
    }

    /**
     * 
     * @param {Event} e 
     * @private
     */
    _onMouseMove = e => {
        e.preventDefault();

        // this.update() clears the screen so that things can be 
        // drawn afresh
        if (this.update)
            this.update();
        
        this.draw(e.clientX, e.clientY);
    }

    /**
     * @private
     */
    _startDrawing() {      
        window.addEventListener('mousemove', this._onMouseMove);
    }

    /**
     * @private
     */
    _stopDrawing() {
        if (this.finish) {
            this.finish(this.getObject());
        }

        window.removeEventListener('mousemove', this._onMouseMove);
    }

    /**
     * return a drawable object from this function
     * @override
     */
    getObject() {
    }

    /**
     * Write the draw logic here. This is for temporary draw i.e. 
     * as the user moves his mouse, new rectangles get drawn continuously.
     * These rectangles don't get added to the scene.
     * @param {number} x 
     * @param {number} y 
     * @override
     */
    draw(x, y) {
    }
}