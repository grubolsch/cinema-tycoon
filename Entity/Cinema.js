var _this = this;
var Cinema = /** @class */ (function () {
    function Cinema(name, StartConfig, TimeManager) {
        this.rooms = [];
        this.movies = [];
        this.customers = [];
        this.name = name;
        this.credit = StartConfig.credit;
        this.fans = StartConfig.fans;
        this.ticketprice = StartConfig.ticketprice;
        this.timeManager = TimeManager;
    }
    return Cinema;
}());
var Finance = /** @class */ (function () {
    function Finance() {
    }
    return Finance;
}());
(function (Cinema) {
    canAfford(value);
    { //boolean
        return (Cinema.credit >= value);
    }
    pay(value, description);
    { //boolean
        if (_this.canAfford(value)) {
            Cinema.credit -= value;
            Cinema.log.add('-', description, value);
            return true;
        }
        return false;
    }
    earn(value, description);
    { //boolean
        Cinema.credit += value;
        Cinema.log.add('+', description, value);
    }
});
