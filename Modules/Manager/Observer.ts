class Observer {
    readonly RESEARCH_FINISHED: string = 'research_finished';
    readonly HALFHOUR: string = 'halfhour';
    readonly HOUR: string = 'hour';
    readonly DAY: string = 'day';
    readonly WEEK: string = 'week';
    readonly MONTH: string = 'month';
    readonly YEAR: string = 'year';

    private subscribers : Map<string, CallableFunction[]> = new Map<string, CallableFunction[]>();

    public trigger(event: string, params: any) {
        if(!this.subscribers.get(event)) {
            return console.error('no events found listing to ' + event);
        }

        this.subscribers.get(event)!.forEach(function(element : any) {
            element(params);
        });
    }

    public subscribe(event : string, callback : CallableFunction) {
        if(!this.subscribers.get(event)) {
            this.subscribers.set(event, []);
        }

        this.subscribers.get(event)!.push(callback);
    }
}

export { Observer };