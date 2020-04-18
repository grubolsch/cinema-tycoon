import {Customer} from "../Entity/Customer";
import {Cinema} from "../Entity/Cinema";

class CustomerManager {
    private _customers: Map<number, Customer> = new Map<number, Customer>();

    public static customerCounter : number = 0;

    add(customer: Customer) {
        this._customers.set(customer.id, customer);
    }

    get customers(): Map<number, Customer> {
        return this._customers;
    }

    remove(customer: Customer) {
        this._customers.delete(customer.id)
    }

    update(cinema: Cinema) {
        this._customers.forEach(function(customer) {
            customer.update(cinema);
        })
    }
}

export {CustomerManager}