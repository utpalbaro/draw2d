"use strict"
import { Loader } from "./loader.js";

const OFFSETX = 20;
const OFFSETY = 20;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const scene = new Array();

document.body.appendChild(canvas);

/**
 * Called when a user is finally done finished completing a shape 
 * */ 
const onFinish = (drawableObj) => {
    scene.push(drawableObj);
}

/**
 * Called when you need to redraw graphics
 */
const updateGraphics = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scene.forEach((drawableObj) => {
        drawableObj.draw(ctx);
    });
}

const loader = new Loader(canvas, ctx, updateGraphics, onFinish);
loader.loadPlugins();

window.onload = window.onresize = () => {
    canvas.width = window.innerWidth - OFFSETX;
    canvas.height = window.innerHeight - OFFSETY;
    updateGraphics();
}

