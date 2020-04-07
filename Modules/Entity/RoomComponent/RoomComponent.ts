import {ConfigManager} from "../../Manager/ConfigManager";

abstract class RoomComponent {
    private _dailyCost: number;
    private _popularity: number;

    constructor(cm: ConfigManager, dailyCost: number, popularity: number) {
        this._dailyCost = dailyCost;
        this._popularity = popularity;
    }

    get dailyCost(): number {
        return this._dailyCost;
    }

    get popularity(): number {
        return this._popularity;
    }
}

export {RoomComponent};