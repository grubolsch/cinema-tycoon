import {Cinema} from "../Entity/Cinema";

class CustomerThought {
    private readonly _thought: string;
    private readonly _postive: boolean;

    constructor(thought: string, postive: boolean) {
        this._thought = thought;
        this._postive = postive;
    }

    get thought(): string {
        return this._thought;
    }

    get postive(): boolean {
        return this._postive;
    }
}

class TimeInQueueTracker {
    private _time: number = 0;

    get time(): number {
        return this._time;
    }

    public addTick(): void {
        this._time++;
    }
}

class Customer {
    private _thoughts: Array<CustomerThought> = [];

    private _queueingTolerance: number = 100;

    private _moneySpent : number = 0;

    addThought(thought: CustomerThought) {
        this._thoughts.push(thought);
    }

    get thoughts(): Array<CustomerThought> {
        return this._thoughts;
    }

    get queueingTolerance(): number {
        return this._queueingTolerance;
    }

    //while the customer has unlimited money, we do track how much money he has spent in the cinema
    pay(ticketPrice: number) {
        this._moneySpent += ticketPrice;
    }

    get moneySpent(): number {
        return this._moneySpent;
    }
}

interface HasHourCost {
    getHourCost(): number;
}

interface Buildable {
    getBuildCost(): number;
}

class CustomerInQueue {
    private readonly _customer : Customer;
    private readonly _timeInQueueTracker : TimeInQueueTracker;

    constructor(customer: Customer) {
        this._customer = customer;
        this._timeInQueueTracker = new TimeInQueueTracker;
    }

    get customer(): Customer {
        return this._customer;
    }

    get timeInQueueTracker(): TimeInQueueTracker {
        return this._timeInQueueTracker;
    }
}

class Boot implements HasHourCost, Buildable {

    private readonly THOUGHT_WAITING_TOO_LONG = "I am waiting too long in this queue";
    private readonly THOUGHT_WAITING_TOO_LONG_GOING_HOME = "I have waited far too long in this queue! I am going home!";

    private readonly BASE_SPEED : number = 50;
    private readonly PC_SPEED_BONUS: number = .8;
    private readonly SECOND_BREAKPOINT: number = 1.5;
    private readonly FINAL_BREAKPOINT: number = 2;
    private readonly CASHIER_WAGES: number = 50;
    private readonly BUILDPRICE_BOOTH: number = 3000;

    private _hasPc: boolean = false;

    private _customers: Array<CustomerInQueue> = [];

    private _cinema : Cinema;
    private _speed : number;

    private _ticketSaleProgress : number = 0;

    constructor(cinema: Cinema) {
        this._cinema = cinema;
        this._speed = this.BASE_SPEED;
    }

    set hasPc(value: boolean) {
        this._hasPc = value;

        if(this._hasPc) {
            this._speed = this.BASE_SPEED * this.PC_SPEED_BONUS;
        } else {
            this._speed = this.BASE_SPEED;
        }
    }

    getHourCost(): number {
        return this.CASHIER_WAGES;
    }

    getBuildCost(): number {
        return this.BUILDPRICE_BOOTH;
    }

    get customers(): Array<CustomerInQueue> {
        return this._customers;
    }

    addCustomer(customer: Customer) {
        this._customers.push(new CustomerInQueue(customer));
    }

    update() {
        this._ticketSaleProgress++;

        if(this._ticketSaleProgress === this._speed) {
            var customerInQueue : CustomerInQueue | undefined = this._customers.shift();

            if(customerInQueue === undefined) {
                //this means the queue is completely empty, we can go home
                return;
            }

            this.buyTicket(customerInQueue.customer);
        }

        var self = this;
        this._customers.forEach(function (customerInQueue, key) {
            customerInQueue.timeInQueueTracker.addTick();

            let customer = customerInQueue.customer;
            let timeInQueue = customerInQueue.timeInQueueTracker.time;

            if(timeInQueue === customer.queueingTolerance || timeInQueue === customer.queueingTolerance * self.SECOND_BREAKPOINT) {
                customer.addThought(new CustomerThought(self.THOUGHT_WAITING_TOO_LONG, false))
            }
            else if(timeInQueue === customer.queueingTolerance * self.FINAL_BREAKPOINT) {
                customer.addThought(new CustomerThought(self.THOUGHT_WAITING_TOO_LONG_GOING_HOME, false))

                delete self._customers[key];
            }
        });
    }

    private buyTicket(customer : Customer) {
        // This function is going to become a lot more complex later on
        // - Does the user have a free ticket?
        // - Is the movie he wants to see still available?
        // Is he oke with the price?

        customer.pay(this._cinema.ticketPrice);
        this._cinema.financeManager.earn(this._cinema.ticketPrice, 'Ticketsale');
    }
}

class QueueManager {
    private readonly MAX_BOOTS = 6;

    private _boots: Array<Boot> = [];
    private _cinema : Cinema;

    constructor(cinema : Cinema) {
        this._cinema = cinema;
        this._boots.push(new Boot(cinema));//you start with 1 free booth
    }

    addCustomer(customer: Customer) {
        var i = 0;

        //sort until I have the shortest queue
        this._boots.sort(function (a, b): number {
            return a.customers.length > b.customers.length ? 1 : 0;
        });

        this._boots[0].addCustomer(customer);
    }

    update() {
        this._boots.forEach(function (boot) {
            boot.update();
        });
    }

    buildBoot() {
        if(this._boots.length >= this.MAX_BOOTS) {
            alert('You can only build '+ this.MAX_BOOTS + ' boots in your cinema');
            return;
        }

        let boot = new Boot(this._cinema);
        if(!this._cinema.financeManager.canAfford(boot.getBuildCost())) {
            alert('You cannot afford a new booth');
            return;
        }

        this._cinema.financeManager.pay(boot.getBuildCost(), 'Build boot');
    }
}

export {QueueManager}