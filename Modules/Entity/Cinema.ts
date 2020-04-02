// some temporary classes just for type hinting
import {FinanceManager} from "../Manager/FinanceManager";
import {TimeManager} from "../Manager/TimeManager";
import {ConfigManager} from "../Manager/ConfigManager";
import {Loan} from "./Loan";
import {LoanException} from "../Exception/LoanException";
import {LoanTaken} from "./LoanTaken";
import {BootManager} from "../Manager/BootManager";
import {Customer} from "./Customer";

class Room {}
class Movie {}
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
    private _bootManager: BootManager;

    private _loans: Map<number, LoanTaken> = new Map<number, LoanTaken>();

    public constructor(name: string, TimeManager : TimeManager, StartConfig : ConfigManager, financeManager : FinanceManager) {
        this._name = name;
        this._fans = StartConfig.fans;
        this._ticketPrice = StartConfig.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = financeManager;

        this._bootManager = new BootManager(this);
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

    get bootManager(): BootManager {
        return this._bootManager;
    }

    public update() {
        this.bootManager.update();

        this.timeManager.updateTime();

    }

    get loans(): Map<number, LoanTaken> {
        return this._loans;
    }
}

export { Cinema };