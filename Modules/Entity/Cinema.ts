import {FinanceManager} from "../Manager/FinanceManager";
import {TimeManager} from "../Manager/TimeManager";
import {ConfigManager} from "../Manager/ConfigManager";
import {MarketingManager} from "../Manager/MarketingManager";
import {LoanTaken} from "./LoanTaken";
import {BootManager} from "../Manager/BootManager";
import {Customer} from "./Customer";
import {Room} from "./Room";
import {Movie} from "./Movie";
import {Scheduler} from "./Scheduler";
import {ResearchManager} from "../Manager/ResearchManager";

class Cinema {
    private _name : string ;
    private _fans : number;
    private _ticketPrice: number;

    private _rooms : Map<number, Room> = new Map<number, Room>();
    private _movies : Map<number, Movie> = new Map<number, Movie>();
    private _customers : Array<Customer> = [];
    private _loans: Map<number, LoanTaken> = new Map<number, LoanTaken>();

    private _timeManager: TimeManager;
    private _financeManager: FinanceManager;
    private _bootManager: BootManager;
    private _researchManager: ResearchManager;
    private _marketingManager: MarketingManager;
    private _scheduler: Scheduler;

    public constructor(name: string, TimeManager : TimeManager, config : ConfigManager, financeManager : FinanceManager, marketingmanager: MarketingManager) {
        this._name = name;
        this._fans = config.fans;
        this._ticketPrice = config.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = financeManager;
        this._marketingManager = marketingmanager;

        this._bootManager = new BootManager(this);
        this._scheduler = new Scheduler(this);
        this._researchManager = new ResearchManager(this, config);
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

    get scheduler(): Scheduler {
        return this._scheduler;
    }

    get researchManager(): ResearchManager {
        return this._researchManager;
    }

    public update() {
        this.bootManager.update();

        this.timeManager.updateTime();
    }

    get loans(): Map<number, LoanTaken> {
        return this._loans;
    }

    get marketingManager(): MarketingManager {
        return this._marketingManager;
    }

    get rooms(): Map<number, Room> {
        return this._rooms;
    }

    addRoom(room: Room) {
        this._rooms.set(room.id, room);
    }

    findRoom(id: number) : Room|undefined {
        return this._rooms.get(id);
    }

    get movies(): Map<number, Movie> {
        return this._movies;
    }

    addMovie(movie: Movie) {
        this._movies.set(movie.id, movie);
    }

    findMovie(id: number) : Movie|undefined {
        return this._movies.get(id);
    }
}

export {Cinema};