import {Customer} from "./Customer";
import {TimeInQueueTracker} from "./TimeInQueueTracker";

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

export {CustomerInQueue}