var FinanceManager = /** @class */ (function () {
    function FinanceManager(startConfig) {
        this._credit = startConfig.credit;
    }
    FinanceManager.prototype.canAfford = function (value) {
        return (this._credit >= value);
    };
    FinanceManager.prototype.pay = function (value, description) {
        if (!this.canAfford(value)) {
            return false;
        }
        console.log('Paid money', value, description); //just for debugging
        this._credit -= value;
        return true;
    };
    FinanceManager.prototype.earn = function (value, description) {
        this._credit += value;
        console.log('Earned money', value, description); //just for debugging
    };
    Object.defineProperty(FinanceManager.prototype, "credit", {
        get: function () {
            return this._credit;
        },
        enumerable: true,
        configurable: true
    });
    return FinanceManager;
}());
