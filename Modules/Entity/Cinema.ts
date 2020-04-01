// some temporary classes just for type hinting
import {FinanceManager} from "../Manager/FinanceManager";
import {TimeManager} from "../Manager/TimeManager";
import {ConfigManager} from "../Manager/ConfigManager";

class Room {}
class Movie {}
class Customer {}
//end temp code

class Cinema {
    private _name : string ;
    private _fans : number;
    private _ticketPrice: number;

    private _rooms : Array<Room> = [];
    private _movies : Array<Movie> = [];
    private _customers : Array<Customer> = [];

    private _timeManager : TimeManager;
    private _financeManager: FinanceManager;

    public constructor(name: string, TimeManager : TimeManager, StartConfig : ConfigManager, financeManager : FinanceManager) {
        this._name = name;
        this._fans = StartConfig.fans;
        this._ticketPrice = StartConfig.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = financeManager;
    }

    get name(): string {
        return this._name;
    }

    get fans(): number {
        return this._fans;
    }

    get ticketPrice(): number {
        return this._ticketPrice;
    }

    get rooms(): Array<Room> {
        return this._rooms;
    }

    get movies(): Array<Movie> {
        return this._movies;
    }

    get customers(): Array<Customer> {
        return this._customers;
    }

    get timeManager(): TimeManager {
        return this._timeManager;
    }

    get financeManager(): FinanceManager {
        return this._financeManager;
    }

    public update() {
        //temporary code to show the ticket price going up once per tick
        this.financeManager.earn(1, 'ticket sale');

        this.timeManager.updateTime();
    }
}

export { Cinema };