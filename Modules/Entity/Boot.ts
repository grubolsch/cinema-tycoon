import {Cinema} from "./Cinema";
import {Customer} from "./Customer";
import {CustomerThought} from "./CustomerThought";
import {CustomerInQueue} from "./CustomerInQueue";

class Boot {

    private readonly THOUGHT_WAITING_TOO_LONG = "I am waiting too long in this queue";
    private readonly THOUGHT_WAITING_TOO_LONG_GOING_HOME = "I have waited far too long in this queue! I am going home!";

    private readonly BASE_SPEED : number = 10;
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
    private _ticketsSold: number = 0;
    private _customersAway: number = 0;

    constructor(cinema: Cinema) {
        this._cinema = cinema;
        this._speed = this.BASE_SPEED;
    }

    set hasPc(value: boolean) {
        this._hasPc = value;

        if(this._hasPc) {
            this._speed = Math.round(this.BASE_SPEED * this.PC_SPEED_BONUS);
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
        if(this.customers.length === 0) {
            //this means the queue is completely empty, we can go home
            return;
        }

        if(++this._ticketSaleProgress === this._speed) {
            let customerInQueue = this.customers.shift();

            if(customerInQueue !== undefined) {
                this.buyTicket(customerInQueue.customer);
            }

            this._ticketSaleProgress = 0;
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
                customer.addThought(new CustomerThought(self.THOUGHT_WAITING_TOO_LONG_GOING_HOME, false));

                self._customersAway++;
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
        this._ticketsSold++;
    }


    get ticketsSold(): number {
        return this._ticketsSold;
    }

    get customersAway(): number {
        return this._customersAway;
    }
}

export {Boot}