import { CreateGeometryContext } from "../createGeometryContext.js";

export class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    /**
     * This is use for final draw. This is called when user is finally 
     * finished drawing his rectangle and the object is ready to be 
     * added to the scene.
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        Rectangle.drawRect(ctx, this.x, this.y, this.w, this.h);
    }

    static drawRect(ctx, x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.linewidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}

export class CreateRectContext extends CreateGeometryContext {
    constructor(canvas, ctx, updateCallback, finishCallback) {
        super(canvas, ctx, updateCallback, finishCallback);
        this.initX = 0;
        this.initY = 0;
        this.w = 0;
        this.h = 0;
    }

    getObject() {
        return new Rectangle(this.initX, this.initY, this.w, this.h)
    }

    draw(x, y) {
        this.w = x - this.initX;
        this.h = y - this.initY;

        Rectangle.drawRect(this.ctx, this.initX, this.initY, this.w, this.h);
    }
}