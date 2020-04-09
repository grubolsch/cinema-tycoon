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
    private _popularity: number; // = quality of the room
    private _config: ConfigManager;

    constructor(config: ConfigManager, name: string, type: RoomType, screen: Screen, projector: Projector, sound: Sound, heating: Heating) {
        this._config = config;
        this._name = name;
        this._type = type;
        this._components = new Map<String, RoomComponent>();
        this._components.set(config.screen, screen);
        this._components.set(config.projector, projector);
        this._components.set(config.sound, sound);
        this._components.set(config.heating, heating);
        this._maintenanceCost = this._type.maintenanceCost + this.getComponentsCost();
        this._popularity = this.getRoomQuality();
    }

    getComponentsCost(): number {
        let total = 0;
        this._components.forEach(function (item) {
            total += item.dailyCost
        });
        return total;
    }

    getRoomQuality(): number {
        let screen = this._components.get(this._config.screen);
        let projector = this._components.get(this._config.projector);
        let sound = this._components.get(this._config.sound);
        let heating = this._components.get(this._config.heating);

        let quality = 0;
        if(screen && projector && sound && heating){ // always. these are must-have-components
            quality = screen.popularity * this._config.roomQualityProportionScreen
                    + projector.popularity * this._config.roomQualityProportionProjector
                    + sound.popularity * this._config.roomQualityProportionSound
                    + heating.popularity * this._config.roomQualityProportionHeating
                    + this._type.capacity * this._config.roomQualityProportionSeats;

        }
        return quality;
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
        return this._type.maintenanceCost + this.getComponentsCost()
    }

    set maintenanceCost(value: number) {
        this._maintenanceCost = value;
    }


}

export {Room};