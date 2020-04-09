import {FinanceManager} from "../Manager/FinanceManager";
import {TimeManager} from "../Manager/TimeManager";
import {ConfigManager} from "../Manager/ConfigManager";
import {MarketingManager} from "../Manager/MarketingManager";
import {LoanTaken} from "./LoanTaken";
import {BoothManager} from "../Manager/BoothManager";
import {Customer} from "./Customer";
import {ResearchManager} from "../Manager/ResearchManager";
import {Movie} from "./Movie";
import {MovieManager} from "../Manager/MovieManager";
import {CustomerGenerator} from "../Generator/CustomerGenerator";

class Room {} // temp code

class Cinema {
    private _name : string ;
    private _fans : number;
    private _ticketPrice: number;

    private _rooms : Array<Room> = [];
    private _movies : Map<number, Movie> = new Map<number, Movie>();
    private _customers : Array<Customer> = [];
    private _loans: Map<number, LoanTaken> = new Map<number, LoanTaken>();

    private _timeManager: TimeManager;
    private _financeManager: FinanceManager;
    private _boothManager: BoothManager;
    private _researchManager: ResearchManager;
    private _marketingManager: MarketingManager;
    private _config : ConfigManager;
    private _movieManager: MovieManager;


    public constructor(name: string, TimeManager: TimeManager, config: ConfigManager, financeManager: FinanceManager, marketingmanager: MarketingManager, movieManager: MovieManager) {
        this._name = name;
        this._fans = config.fans;
        this._ticketPrice = config.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = financeManager;
        this._marketingManager = marketingmanager;
        this._movieManager = movieManager;

        this._boothManager = new BoothManager(this);
        this._researchManager = new ResearchManager(this, config);
        this._config = config;
        //@todo: remove tmp code when we have an actual room implementation
        this.rooms.push(new Room());
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
}

export {Cinema};