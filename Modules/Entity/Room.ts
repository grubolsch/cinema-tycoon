import {RoomType} from "./RoomType";
import {ConfigManager} from "../Manager/ConfigManager";
import {RoomComponent} from "./RoomComponent/RoomComponent";
import {Screen} from "./RoomComponent/Screen";
import {Sound} from "./RoomComponent/Sound";
import {Projector} from "./RoomComponent/Projector";
import {Heating} from "./RoomComponent/Heating";
import {RoomException} from "../Exception/RoomException";
import {RoomManager} from "../Manager/RoomManager";

class Room {
    private _id : number;
    private _name: string;
    private _type: RoomType;
    private _components: Map<String, RoomComponent>;
    private _config: ConfigManager;

    constructor(config: ConfigManager, name: string, type: RoomType, screen: Screen, projector: Projector, sound: Sound, heating: Heating) {
        this._id = RoomManager._roomIdCounter;
        this._config = config;
        this._name = name;
        this._type = type;
        this._components = new Map<String, RoomComponent>();
        this._components.set(config.screen, screen);
        this._components.set(config.projector, projector);
        this._components.set(config.sound, sound);
        this._components.set(config.heating, heating);
    }

    calculateMaintenanceCost(): number {
        return this._type.maintenanceCost + this.calculateTotalComponentsCost()
    }

    calculateTotalComponentsCost(): number {
        let total = 0;
        this._components.forEach(function (item) {
            total += item.dailyCost
        });
        return total;
    }

    calculateRoomQuality(): number {
        let screen = this._components.get(this._config.screen);
        let projector = this._components.get(this._config.projector);
        let sound = this._components.get(this._config.sound);
        let heating = this._components.get(this._config.heating);

        let quality = 0;
        if(screen && projector && sound && heating){ // always. these are must-have-components
            quality = screen.quality * this._config.roomQualityProportionScreen
                    + projector.quality * this._config.roomQualityProportionProjector
                    + sound.quality * this._config.roomQualityProportionSound
                    + heating.quality * this._config.roomQualityProportionHeating
                    + this._type.capacity * this._config.roomQualityProportionSeats;

        } else {
            throw RoomException.noBasicComponents();
        }

        return quality;
    }

    get id(): number {
        return this._id;
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

}

export {Room};

