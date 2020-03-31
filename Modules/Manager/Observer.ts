class Observer {
    private subscribers : Map<string, CallableFunction[]> = new Map<string, CallableFunction[]>();


    public trigger(event : string, params : Array<any>) {
        if(!this.subscribers.get(event)) {
            return console.error('no events found listing to ' + event);
        }

        this.subscribers.get(event).forEach(function(element : any) {
            element(params);
        });
    }

    public subscribe(event : string, callback : CallableFunction) {
        if(!this.subscribers.get(event)) {
            this.subscribers.set(event, []);
        }

        this.subscribers.get(event).push(callback);
    }
}

export { Observer };