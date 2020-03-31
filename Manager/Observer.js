var Observer = /** @class */ (function () {
    function Observer() {
        this.subscribers = []; // : Array<CallableFunction>;
    }
    Observer.prototype.trigger = function (event, params) {
        if (!this.subscribers[event]) {
            return console.error('no events found listing to ' + event);
        }
        this.subscribers[event].forEach(function (element) {
            console.log(element);
            element(params);
        });
    };
    Observer.prototype.subscribe = function (event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    };
    return Observer;
}());
