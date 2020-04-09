import {FinanceManager} from "../Manager/FinanceManager";
import {TimeManager} from "../Manager/TimeManager";
import {ConfigManager} from "../Manager/ConfigManager";
import {MarketingManager} from "../Manager/MarketingManager";
import {LoanTaken} from "./LoanTaken";
import {BootManager} from "../Manager/BootManager";
import {Customer} from "./Customer";
import {ResearchManager} from "../Manager/ResearchManager";
import {RoomManager} from "../Manager/RoomManager";
import {Movie} from "./Movie";
import {Room} from "./Room";


class Cinema {
    private _name : string ;
    private _fans : number;
    private _ticketPrice: number;

    private _rooms : Array<Room> = [];
    private _movies : Array<Movie> = [];
    private _customers : Array<Customer> = [];
    private _loans: Map<number, LoanTaken> = new Map<number, LoanTaken>();

    private _timeManager: TimeManager;
    private _financeManager: FinanceManager;
    private _bootManager: BootManager;
    private _roomManager: RoomManager;
    private _researchManager: ResearchManager;
    private _marketingManager: MarketingManager;

    public constructor(name: string, TimeManager : TimeManager, config : ConfigManager, financeManager : FinanceManager, marketingmanager: MarketingManager) {
        this._name = name;
        this._fans = config.fans;
        this._ticketPrice = config.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = financeManager;
        this._marketingManager = marketingmanager;

        this._bootManager = new BootManager(this);
        this._roomManager = new RoomManager(this, config);
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

    get roomManager(): RoomManager {
        return this._roomManager;
    }
}

export {Cinema};