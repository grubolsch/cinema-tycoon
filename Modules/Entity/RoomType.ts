import {ConfigManager} from "../Manager/ConfigManager";

class RoomType {
    private _name: string;
    private _maintenanceCost: number;
    private readonly _capacity: number;
    private _price: number;
    private _priceUpgrade: number;

    private constructor(cm: ConfigManager, name: string, maintenanceCost: number, rows: number) {
        this._name = name;
        this._maintenanceCost = maintenanceCost;
        this._capacity = rows * cm.seatsPerRow;
        this._price = cm.newRoomPrice;
        this._priceUpgrade = cm.roomUpgradeCost;
    }

    static smallRoom(cm: ConfigManager) {
        return new RoomType(cm, cm.small, cm.smallRoomMaintenanceCost, cm.smallRoomRows)
    }

    static mediumRoom(cm: ConfigManager) {
        return new RoomType(cm, cm.medium, cm.mediumRoomMaintenanceCost, cm.mediumRoomRows)
    }

    static largeRoom(cm: ConfigManager) {
        return new RoomType(cm, cm.large, cm.largeRoomMaintenanceCost, cm.largeRoomRoomRows)
    }

    get name(): string {
        return this._name;
    }

    get maintenanceCost(): number {
        return this._maintenanceCost;
    }

    get capacity(): number {
        return this._capacity;
    }

    get price(): number {
        return this._price;
    }

    get priceUpgrade(): number {
        return this._priceUpgrade;
    }
}


export {RoomType};