import {CreateRectContext} from './plugins/createRectContext/createRectContext.js';

/**
 * Class for loading plugins
 */
export class Loader {
    constructor(canvas, ctx, updateCallback, finishCallback, folder = 'plugins') {
        this.folder = folder;
        this.plugins = new Array();
        this.eventMap = new Map();
        this.canvas = canvas;
        this.ctx = ctx;
        this.update = updateCallback;
        this.finish = finishCallback;
        this.context = undefined;
    }

    add(pluginObj) {
        this.plugins.push(pluginObj);
    }

    loadPlugins() {
        // @TODO Scan over the plugins folder and load the plugins dynamically
        // for file in files {
        let pluginObj = {
            'name' : 'CreateRectContext', 
            'enter': 'R', 
            'help': 'Create Rectangle' ,
            'context': new CreateRectContext(this.canvas, this.ctx, this.update, this.finish)}

        this.add(pluginObj);
        this.eventMap.set(pluginObj.enter, pluginObj.context);
        //}
        this.processPlugins();
    }

    /**
     * Responsible for setting up things like shortcuts, icons etc.
     */
    processPlugins() {
        window.addEventListener('keyup', e => {
            if (e.key == 'Escape') {
                if (this.context) {
                    this.context.exit();
                }
            }
            else {
                this.context = this.eventMap.get(e.key.toUpperCase());
                if (this.context) {
                    this.context.enter()
                }
            }
        });
    }
}

