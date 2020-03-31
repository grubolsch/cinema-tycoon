class Observer {
    private subscribers = [];// : Array<CallableFunction>;

    public trigger(event : string, params : Array<any>) {
        if(!this.subscribers[event]) {
            return console.error('no events found listing to ' + event);
        }

        this.subscribers[event].forEach(function(element) {
            console.log(element);
            element(params);
        });
    }

    public subscribe(event : string, callback : CallableFunction) {
        if(!this.subscribers[event]) {
            this.subscribers[event]= [];
        }
        this.subscribers[event].push(callback);
    }
}