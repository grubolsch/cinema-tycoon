import {FinanceManager} from "../Manager/FinanceManager";
import {TimeManager} from "../Manager/TimeManager";
import {ConfigManager} from "../Manager/ConfigManager";
import {MarketingManager} from "../Manager/MarketingManager";
import {LoanTaken} from "./LoanTaken";
import {BootManager} from "../Manager/BootManager";
import {Customer} from "./Customer";
import {MovieManager} from "../Manager/MovieManager";

class Room {}
class Movie {}
//end temp code

class Cinema {

    // properties
    readonly _name : string ;
    readonly _fans : number;
    readonly _ticketPrice: number;

    // collections
    private _rooms: Array<Room> = [];
    private _movies: Array<Movie> = [];
    private _customers: Array<Customer> = [];
    private _loans: Map<number, LoanTaken> = new Map<number, LoanTaken>();

    // managers
    readonly _timeManager: TimeManager;
    readonly _financeManager: FinanceManager;
    readonly _bootManager: BootManager;
    readonly _marketingManager: MarketingManager;
    private readonly _movieManager: MovieManager;

    public constructor(name: string, TimeManager: TimeManager, StartConfig: ConfigManager, financeManager: FinanceManager, marketingmanager: MarketingManager, movieManager: MovieManager) {
        this._name = name;
        this._fans = StartConfig.fans;
        this._ticketPrice = StartConfig.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = financeManager;
        this._marketingManager = marketingmanager;
        this._movieManager = movieManager;

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

    get loans(): Map<number, LoanTaken> {
        return this._loans;
    }

    get marketingManager(): MarketingManager {
        return this._marketingManager;
    }

    get movieManager(): MovieManager {
        return this._movieManager;
    }

    public update() {
        this.bootManager.update();

        this.timeManager.updateTime();
    }
}

export {Cinema};