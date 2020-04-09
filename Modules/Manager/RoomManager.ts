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
    private _rooms: Array<Room> = [];
    private _cinema : Cinema;
    private _configManager : ConfigManager;

    constructor(cinema : Cinema, config: ConfigManager) {
        this._cinema = cinema;
        this._configManager = config;
        this._maximumRooms = config.maximumRoomsDefault;
        this._rooms = cinema.rooms;
        this.addRoom()  //start with 1 free small room
    }

    addRoom() {
        if(this._rooms.length == this._maximumRooms){
            throw RoomException.alreadyMaxNumberRoom()
        }

        if(!this._cinema.financeManager.canAfford(this.calculateNewRoomPrice())){
            throw RoomException.notEnoughMoney()
        }

        let roomName;
        while(!roomName || this.checkDuplicateRoomName(roomName)){
            roomName = prompt("Enter new room's name");
        }

        this._rooms.push(new Room(roomName,
            RoomType.smallRoom(this._configManager),
            new Screen(this._configManager), new Projector(this._configManager),
            new Sound(this._configManager), new Heating(this._configManager)));

        this.cinema.financeManager.pay(this.calculateNewRoomPrice(), "new room")
    }

    upgradeRoom(room: Room) {
        if(room.type == RoomType.largeRoom(this._configManager)){
            throw RoomException.notUpgradable();
        }

        let UPGRADE_COST = this._configManager.roomUpgradeCost;

        if(!this._cinema.financeManager.canAfford(UPGRADE_COST)){
            throw RoomException.notEnoughMoney()
        }

        if(room.type.name == RoomType.smallRoom(this._configManager).name){
            room.type = RoomType.mediumRoom(this._configManager);
        } else { // currunt room is medium
            room.type = RoomType.largeRoom(this._configManager)
        }
        this._cinema.financeManager.pay(UPGRADE_COST, "room upgrade");
        alert(room.name + " is upgraded")
    }

    get rooms(): Array<Room> {
        return this._rooms;
    }

    get cinema(): Cinema {
        return this._cinema;
    }

    calculateNewRoomPrice(): number {
        if(this._rooms.length == 0){
            return 0
        } else {
            return this._configManager.roomPrice + (0.25 * this._rooms.length)
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