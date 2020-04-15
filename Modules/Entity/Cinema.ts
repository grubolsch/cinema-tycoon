import {FinanceManager} from "../Manager/FinanceManager";
import {TimeManager} from "../Manager/TimeManager";
import {ConfigManager} from "../Manager/ConfigManager";
import {MarketingManager} from "../Manager/MarketingManager";
import {LoanTaken} from "./LoanTaken";
import {BoothManager} from "../Manager/BoothManager";
import {Customer} from "./Customer";
import {RoomManager} from "../Manager/RoomManager";
import {Movie} from "./Movie";
import {Room} from "./Room";
import {Scheduler} from "./Scheduler";
import {ResearchManager} from "../Manager/ResearchManager";
import {MovieManager} from "../Manager/MovieManager";
import {CustomerGenerator} from "../Generator/CustomerGenerator";


class Cinema {
    private _name : string ;
    private _fans : number;
    private _ticketPrice: number;

    private _rooms : Map<number, Room> = new Map<number, Room>();
    private _movies : Map<number, Movie> = new Map<number, Movie>();
    private _customers : Array<Customer> = [];
    private _loans: Map<number, LoanTaken> = new Map<number, LoanTaken>();

    private readonly _timeManager: TimeManager;
    private readonly _financeManager: FinanceManager;
    private readonly _boothManager: BoothManager;
    private readonly _researchManager: ResearchManager;
    private readonly _marketingManager: MarketingManager;
    private readonly _config : ConfigManager;
    private readonly _movieManager: MovieManager;
    private readonly _scheduler: Scheduler;
    private readonly _roomManager: RoomManager;

    public constructor(name: string, TimeManager: TimeManager, config: ConfigManager, financeManager: FinanceManager, marketingmanager: MarketingManager, movieManager: MovieManager) {
        this._name = name;
        this._fans = config.fans;
        this._ticketPrice = config.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = financeManager;
        this._marketingManager = marketingmanager;
        this._movieManager = movieManager;

        this._roomManager = new RoomManager(this, config);
        this._scheduler = new Scheduler(this);
        this._boothManager = new BoothManager(this);
        this._researchManager = new ResearchManager(this, config);
        this._config = config;

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

    get movies(): Map<number, Movie> {
        return this._movies;
    }

    addMovie(movie: Movie) {
        this._movies.set(movie.id, movie);
    }

    findMovie(id: number) : Movie|undefined {
        return this._movies.get(id);
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

    get boothManager(): BoothManager {
        return this._boothManager;
    }

    get scheduler(): Scheduler {
        return this._scheduler;
    }

    get researchManager(): ResearchManager {
        return this._researchManager;
    }

    public update() {
        //@todo remove tmp code that creates users
        let customerGenerator = new CustomerGenerator(this._config);
        let customer = customerGenerator.createCustomer();
        this.boothManager.addCustomer(customer);
        //end tmp code

        this.boothManager.update();

        this.timeManager.updateTime();
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

    get roomManager(): RoomManager {
        return this._roomManager;
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

    set ticketPrice(value: number) {
        this._ticketPrice = value;
    }
}

export {Cinema};