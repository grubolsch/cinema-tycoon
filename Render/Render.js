var Render = /** @class */ (function () {
    function Render() {
        this._speed = 1;
    }
    Object.defineProperty(Render.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (value) {
            this._speed = value;
        },
        enumerable: true,
        configurable: true
    });
    Render.prototype.render = function (cinema) {
        document.querySelector('#ui-name').innerHTML = cinema.name;
        document.querySelector('#ui-date').innerHTML = cinema.timeManager.getDate();
        document.querySelector('#ui-currentcredit').innerHTML = currency(cinema.financeManager.credit);
        document.querySelector('#ui-fans').innerHTML = cinema.fans + " fans";
    };
    return Render;
}());
