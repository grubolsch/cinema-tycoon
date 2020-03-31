// some temporary classes just for type hinting
class Room {}
class Movie {}
class Customer {}
//end temp code

class Cinema {
    private _name : string ;
    private _fans : number;
    private _ticketprice: number;

    private _rooms : Array<Room> = [];
    private _movies : Array<Movie> = [];
    private _customers : Array<Customer> = [];

    private _timeManager : TimeManager;
    private _financeManager: FinanceManager;

    public constructor(name: string, StartConfig : ConfigManager, TimeManager : TimeManager) {
        this._name = name;
        this._fans = StartConfig.fans;
        this._ticketprice = StartConfig.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = new FinanceManager(StartConfig);
    }

    get name(): string {
        return this._name;
    }

    get fans(): number {
        return this._fans;
    }

    get ticketprice(): number {
        return this._ticketprice;
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

    public addMovie(movie : Movie) {
        this._movies.append(movie);
    }
}