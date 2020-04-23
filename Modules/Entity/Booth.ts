import {Cinema} from "./Cinema";
import {Customer} from "./Customer";
import {CustomerThought} from "./CustomerThought";
import {CustomerInQueue} from "./CustomerInQueue";
import {MoviePickerCustomer} from "../Manager/MoviePickerCustomer";
import {Movie} from "./Movie";
import {LoanException} from "../Exception/LoanException";
import {TicketSaleException} from "../Exception/TicketSaleException";
import {BoothException} from "../Exception/BoothException";

class Booth {
    private _customers: Array<CustomerInQueue> = [];
    private _cinema: Cinema;
    private _ticketsSold: number = 0;
    private _customersAway: number = 0;

    private _speed: number;
    private _level: number = 0;

    constructor(cinema: Cinema) {
        this._cinema = cinema;
        this._speed = this._cinema.config.boothBaseSpeed;
    }

    upgrade(level: number): void {
        let differentSpeeds = [
            this._cinema.config.boothBaseSpeed,
            this._cinema.config.boothTrainedSpeed,
            this._cinema.config.boothPcSpeed,
            this._cinema.config.boothSelfService,
        ];

        if (differentSpeeds[level] === undefined) {
            throw BoothException.invalidUpgrade(level);
        }

        this._speed = differentSpeeds[level];
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
        for (let i = 0; i < this._speed; i++) {
            if (this.customers.length === 0) {
                //this means the queue is completely empty, we can go home
                return;
            }

            let customerInQueue = this.customers.shift();

            if (customerInQueue !== undefined) {
                this.buyTicket(customerInQueue.customer);
            }
        }

        this._customers.forEach((customerInQueue, key) => {
            customerInQueue.timeInQueueTracker.addTick();

            let customer = customerInQueue.customer;
            let timeInQueue = customerInQueue.timeInQueueTracker.time;

            if (timeInQueue === customer.queueingTolerance || timeInQueue === customer.queueingTolerance * this._cinema.config.queueSecondBreakpoint) {
                customer.addThought(new CustomerThought(CustomerThought.THOUGHT_WAITING_TOO_LONG, false))
            } else if (timeInQueue === customer.queueingTolerance * this._cinema.config.queueFinalBreakpoint) {
                customer.addThought(new CustomerThought(CustomerThought.THOUGHT_WAITING_TOO_LONG_GOING_HOME, false));

                customer.plans.set(customer.PLAN_LEAVE, true);

                this._customersAway++;
                delete this._customers[key];
            }
        });
    }

    private buyTicket(customer: Customer) {
        let originalTargetMovie: Movie = customer.targetShow.movie;

        try {
            if (customer.targetShow.isFull()) {
                //his initial movie is sold out, pick an alternative
                customer.targetShow = (new MoviePickerCustomer(this._cinema, customer)).pickShow();
            }

            let price = customer.purchaseTicket(originalTargetMovie, this._cinema);//could be 0 because of free ticket
            this._cinema.financeManager.earn(price, 'Ticketsale');
            this._ticketsSold++;
        } catch (error) {
            if (error instanceof TicketSaleException) {
                customer.plans.set(customer.PLAN_LEAVE, true);
            } else {
                //this should never happen
                alert('Unknown error BoothManager: ' + error.message);
            }
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