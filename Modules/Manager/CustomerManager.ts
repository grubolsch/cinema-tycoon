import {Customer} from "../Entity/Customer";
import {Movie} from "../Entity/Movie";
import {TimePoint} from "../Entity/TimePoint";

class CustomerManager {
    private _customers: Map<number, Customer> = new Map<number, Customer>();

    public static customerCounter : number = 0;

    add(customer: Customer, movie: Movie, start: TimePoint) {
        this._customers.set(customer.id, customer);
    }

    get customers(): Map<number, Customer> {
        return this._customers;
    }
}

export {CustomerManager}