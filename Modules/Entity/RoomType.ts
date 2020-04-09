import {ConfigManager} from "../Manager/ConfigManager";

class RoomType {
    private _name: string;
    private _maintenanceCost: number;
    private _rows: number;
    private _seatPerRow: number;
    private readonly _capacity: number;
    private _price: number;
    private _priceUpgrade: number;

    private constructor(cm: ConfigManager, name: string, maintenanceCost: number, rows: number) {
        this._name = name;
        this._maintenanceCost = maintenanceCost;
        this._rows = rows;
        this._seatPerRow = cm.seatsPerRow;
        this._capacity = rows * this._seatPerRow;
        this._price = cm.roomPrice;
        this._priceUpgrade = cm.roomUpgradeCost;
    }

    static smallRoom(cm: ConfigManager) {
        return new RoomType(cm, cm.small, cm.smallRoomMaintanaceCost, cm.smallRoomRows)
    }

    static mediumRoom(cm: ConfigManager) {
        return new RoomType(cm, cm.meidium, cm.mediumRoomMaintanaceCost, cm.mediumRoomRows)
    }

    static largeRoom(cm: ConfigManager) {
        return new RoomType(cm, cm.large, cm.largeRoomMaintanaceCost, cm.largeRoomRoomRows)
    }


    get name(): string {
        return this._name;
    }

    get maintenanceCost(): number {
        return this._maintenanceCost;
    }

    get rows(): number {
        return this._rows;
    }

    get seatPerRow(): number {
        return this._seatPerRow;
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