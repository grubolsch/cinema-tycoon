import {Cinema} from "./Cinema";
import {Customer} from "./Customer";
import {CustomerThought} from "./CustomerThought";
import {CustomerInQueue} from "./CustomerInQueue";
import {MoviePickerCustomer} from "../Manager/MoviePickerCustomer";
import {Movie} from "./Movie";

class Booth {
    private _hasPc: boolean = false;

    private _customers: Array<CustomerInQueue> = [];

    private _cinema : Cinema;
    private _speed : number;

    private _ticketSaleProgress : number = 0;
    private _ticketsSold: number = 0;
    private _customersAway: number = 0;

    constructor(cinema: Cinema) {
        this._cinema = cinema;
        this._speed = this._cinema.config.boothBaseSpeed;
    }

    set hasPc(value: boolean) {
        this._hasPc = value;

        if(this._hasPc) {
            this._speed = Math.round(this._cinema.config.boothBaseSpeed * this._cinema.config.pcSpeedBonus);
        } else {
            this._speed = this._cinema.config.boothBaseSpeed;
        }
    }

    getHourCost(): number {
        return this._cinema.config.cashierWages;
    }

    getBuildCost(): number {
        return this._cinema.config.boothBuildprice;
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

            if(timeInQueue === customer.queueingTolerance || timeInQueue === customer.queueingTolerance * self._cinema.config.queueSecondBreakpoint) {
                customer.addThought(new CustomerThought(CustomerThought.THOUGHT_WAITING_TOO_LONG, false))
            }
            else if(timeInQueue === customer.queueingTolerance * self._cinema.config.queueFinalBreakpoint) {
                customer.addThought(new CustomerThought(CustomerThought.THOUGHT_WAITING_TOO_LONG_GOING_HOME, false));

                customer.plans.set(customer.PLAN_LEAVE, true);

                self._customersAway++;
                delete self._customers[key];
            }
        });
    }

    private buyTicket(customer : Customer) {
        let originalTargetMovie : Movie = customer.targetShow.movie;

        try {
            if (customer.targetShow.isFull()) {
                //his initial movie is sold out, pick an alternative
                customer.targetShow = (new MoviePickerCustomer(this._cinema, customer)).pickShow();
            }

            let price = customer.purchaseTicket(originalTargetMovie, this._cinema);//could be 0 because of free ticket
            this._cinema.financeManager.earn(price, 'Ticketsale');
            this._ticketsSold++;
        }
        catch(error) {
            customer.plans.set(customer.PLAN_LEAVE, true);

            console.log(error.message);
            alert(error.message);
        }
    }

    get ticketsSold(): number {
        return this._ticketsSold;
    }

    get customersAway(): number {
        return this._customersAway;
    }
}

export {Booth}