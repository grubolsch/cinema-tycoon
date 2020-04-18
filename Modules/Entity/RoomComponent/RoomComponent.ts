import {ConfigManager} from "../../Manager/ConfigManager";

abstract class RoomComponent {
    private _dailyCost: number;
    private _quality: number;

    constructor(dailyCost: number, quality: number) {
        this._dailyCost = dailyCost;
        this._quality = quality;
    }

    get dailyCost(): number {
        return this._dailyCost;
    }

    get quality(): number {
        return this._quality;
    }
}

export {RoomComponent};