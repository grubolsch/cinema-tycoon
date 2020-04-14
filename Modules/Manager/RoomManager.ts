import {Cinema} from "../Entity/Cinema";
import {Room} from "../Entity/Room";
import {RoomType} from "../Entity/RoomType";
import {Screen} from "../Entity/RoomComponent/Screen";
import {Projector} from "../Entity/RoomComponent/Projector";
import {Sound} from "../Entity/RoomComponent/Sound";
import {Heating} from "../Entity/RoomComponent/Heating";
import {ConfigManager} from "./ConfigManager";
import {RoomException} from "../Exception/RoomException";

class RoomManager {
    private _maximumRooms: number;
    private _rooms: Map<number, Room>;
    private _cinema : Cinema;
    private _config : ConfigManager;
    static _roomIdCounter = 0;

    constructor(cinema : Cinema, config: ConfigManager) {
        this._cinema = cinema;
        this._config = config;
        this._maximumRooms = config.maximumRoomsDefault;
        this._rooms = cinema.rooms;
        this._rooms.set(RoomManager._roomIdCounter,
            new Room(this._config, "default room", RoomType.smallRoom(this._config),
            new Screen(this._config), new Projector(this._config), new Sound(this._config), new Heating(this._config)));
    }

    addRoom() {
        if(this._rooms.size == this._maximumRooms){
            alert("You already have maximum number of room");
            throw RoomException.alreadyMaxNumberRoom();
        }

        if(!this._cinema.financeManager.canAfford(this.calculateNewRoomPrice())){
            alert("You don't have enough money to buy a new room");
            throw RoomException.notEnoughMoney()
        }

        let roomName;
        while(!roomName || this.checkDuplicateRoomName(roomName)){
            roomName = prompt("Enter new room's name");
        }

        this.cinema.financeManager.pay(this.calculateNewRoomPrice(), "new room");

        //To use as both a key in the map and room's id
        RoomManager._roomIdCounter++;

        this._rooms.set(RoomManager._roomIdCounter,
            new Room(this._config, roomName, RoomType.smallRoom(this._config),
            new Screen(this._config), new Projector(this._config),
            new Sound(this._config), new Heating(this._config)));
    }

    upgradeRoom(room: Room) {
        console.log(room);
        if(room.type.name == this._config.large){
            alert("This room is a large room, not upgradable");
            throw RoomException.notUpgradable();
        }

        let UPGRADE_COST = this._config.roomUpgradeCost;

        if(!this._cinema.financeManager.canAfford(UPGRADE_COST)){
            alert("You don't have enough money to upgrade this room.");
            throw RoomException.notEnoughMoney()
        }

        if(room.type.name == this._config.small){
            room.type = RoomType.mediumRoom(this._config);
        } else { // currunt room is medium
            room.type = RoomType.largeRoom(this._config)
        }
        this._cinema.financeManager.pay(UPGRADE_COST, "room upgrade");
        alert(room.name + " is upgraded")
    }

    get rooms(): Map<number, Room> {
        return this._rooms;
    }

    get cinema(): Cinema {
        return this._cinema;
    }

    calculateNewRoomPrice(): number {
        if(this._rooms.size == 0){
            return 0
        } else {
            return this._config.newRoomPrice + (this._config.newRoomPriceCoefficient * this._rooms.size)
        }
    }

    checkDuplicateRoomName(name: string): boolean {
        let isDuplicated: boolean = false;
        this._rooms.forEach(function(room){
            if(room.name == name){
                isDuplicated = true;
            }
        });
        return isDuplicated;
    }
}

export {RoomManager}