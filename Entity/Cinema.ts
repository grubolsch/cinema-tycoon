class Cinema {
    private name : string ;
    private credit : number;
    private fans : number;
    private ticketprice : number;

    private rooms : Array<Room> = [];
    private movies : Array<Movie> = [];
    private customers : Array<Customer> = [];

    private timeManager : TimeManager;

    public constructor(name: string, StartConfig : ConfigManager, TimeManager : TimeManager) {
        this.name = name;
        this.credit = StartConfig.credit;
        this.fans = StartConfig.fans;
        this.ticketprice = StartConfig.ticketprice;
        this.timeManager = TimeManager;
    }
}

class Finance(Cinema : Cinema) {
    public canAfford(value) { //boolean
        return (Cinema.credit >= value)
    }
    public pay(value, description) { //boolean
        if(this.canAfford(value)) {
            Cinema.credit -= value;

            Cinema.log.add('-', description, value);

            return true;
        }
        return false;
    }
    public earn(value, description) { //boolean
        Cinema.credit += value;
        Cinema.log.add('+', description, value);
    }
}
