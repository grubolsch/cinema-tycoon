import {RoomType} from "./RoomType";
import {ConfigManager} from "../Manager/ConfigManager";
import {RoomComponent} from "./RoomComponent/RoomComponent";
import {Screen} from "./RoomComponent/Screen";
import {Sound} from "./RoomComponent/Sound";
import {Projector} from "./RoomComponent/Projector";
import {Heating} from "./RoomComponent/Heating";

class Room {
    private _name: string;
    private _type: RoomType;
    private _components: Map<String, RoomComponent>;
    private _maintenanceCost: number;
    private _popularity: number;

    constructor(name: string, type: RoomType, screen: Screen, projector: Projector, sound: Sound, heating: Heating) {
        this._name = name;
        this._type = type;
        this._components = new Map<String, RoomComponent>();
        this._components.set(typeof screen, screen);
        this._components.set(typeof projector, screen);
        this._components.set(typeof sound, screen);
        this._components.set(typeof heating, screen);
        this._maintenanceCost = this.type.maintenanceCost + this.getComponentsCost();
        this._popularity = this.getPopularity();
    }

    getComponentsCost(): number {
        let total = 0;
        this._components.forEach(function (item) {
            total += item.dailyCost
        });
        return total;
    }

    getPopularity(): number {
        let total = 0;
        this._components.forEach(function (item) {
            total += item.popularity
        });
        return total;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): RoomType {
        return this._type;
    }

    set type(value: RoomType) {
        this._type = value;
    }

    get components(): Map<String, RoomComponent> {
        return this._components;
    }

    get popularity(): number {
        return this._popularity;
    }

    get maintenanceCost(): number {
        return this._maintenanceCost;
    }

    set maintenanceCost(value: number) {
        this._maintenanceCost = value;
    }



}

export {Room};