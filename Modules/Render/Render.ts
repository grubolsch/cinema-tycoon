import {currency} from "../Utils";
import {Cinema} from "../Entity/Cinema";

class Render implements RenderInterface {
    private _speed : number = 1;
    private _cinema: Cinema;

    private _renders : Array<RenderInterface> = [];

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }

    public render() {
        (<HTMLElement>document.querySelector('#ui-name')).innerText = this._cinema.name;
        document.querySelector('#ui-date')!.innerHTML = this._cinema.timeManager.getDate();
        document.querySelector('#ui-currentcredit')!.innerHTML = currency(this._cinema.financeManager.credit);
        document.querySelector('#ui-fans')!.innerHTML = this._cinema.fans + ' <i class="fa fa-user-friends"></i>';

        this._renders.forEach(function(render : RenderInterface) {
            render.render();
        })
    }

    constructor(cinema : Cinema) {
        this._cinema = cinema;
    }

    public addRender(render : RenderInterface) {
        this._renders.push(render);
    }

    renderByHalfHour() {
        this._renders.forEach(function(render : RenderInterface) {
            //you cannot check interfaces on runtime :( but we can check if a method exists
            if ("renderByHalfHour" in render) {
                return (<RenderByHalfHourInterface>render).renderByHalfHour();
            }
        })
    }
}

export { Render };