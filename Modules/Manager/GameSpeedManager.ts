import {Render} from "../Render/Render";

class GameSpeedManager {

    private _resumeSpeed : number = 1;
    private _render: Render;

    constructor(render: Render) {
        this._render = render;
    }

    pause(){
        this._resumeSpeed = this._render.speed;
        this._render.speed = 0;
    }

    resume(){
        this._render.speed = this._resumeSpeed;
    }
}

export {GameSpeedManager}