import {currency} from "../Utils";
import {Cinema} from "../Entity/Cinema";

class Render {
    private _speed : number = 1;

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }

    public render(cinema : Cinema) {
        // @ts-ignore
        document.querySelector('#ui-name').innerHTML = cinema.name;
        // @ts-ignore
        document.querySelector('#ui-date').innerHTML = cinema.timeManager.getDate();
        // @ts-ignore
        document.querySelector('#ui-currentcredit').innerHTML = currency(cinema.financeManager.credit);
        // @ts-ignore
        document.querySelector('#ui-fans').innerHTML = cinema.fans + " fans";
    }
}

export { Render };