// some temporary classes just for type hinting
var Room = /** @class */ (function () {
    function Room() {
    }
    return Room;
}());
var Movie = /** @class */ (function () {
    function Movie() {
    }
    return Movie;
}());
var Customer = /** @class */ (function () {
    function Customer() {
    }
    return Customer;
}());
//end temp code
var Cinema = /** @class */ (function () {
    function Cinema(name, StartConfig, TimeManager) {
        this._rooms = [];
        this._movies = [];
        this._customers = [];
        this._name = name;
        this._fans = StartConfig.fans;
        this._ticketprice = StartConfig.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = new FinanceManager(StartConfig);
    }
    Object.defineProperty(Cinema.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cinema.prototype, "fans", {
        get: function () {
            return this._fans;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cinema.prototype, "ticketprice", {
        get: function () {
            return this._ticketprice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cinema.prototype, "rooms", {
        get: function () {
            return this._rooms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cinema.prototype, "movies", {
        get: function () {
            return this._movies;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cinema.prototype, "customers", {
        get: function () {
            return this._customers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cinema.prototype, "timeManager", {
        get: function () {
            return this._timeManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cinema.prototype, "financeManager", {
        get: function () {
            return this._financeManager;
        },
        enumerable: true,
        configurable: true
    });
    Cinema.prototype.addMovie = function (movie) {
        this._movies.append(movie);
    };
    return Cinema;
}());
