import {ConfigManager} from "../../Manager/ConfigManager";
import {Customer} from "../Customer";
import {FacilityType} from "../../ShopTypes/FacilityType";
import {Product} from "../Product";
import {FacilityException} from "../../Exception/FacilityException";

class CustomerMap extends Map<number, Customer> {}

class Facility {
    private _id: number;
    private _type: FacilityType;
    private _numberOfCashier: number;
    private _customers : CustomerMap = new CustomerMap;
    private _profit : number = 0;

    constructor(id: number, type: FacilityType) {
        this._id = id;
        this._type = type;
        this._numberOfCashier = type.config.defaultCashiers;
    }

    get id(): number {
        return this._id;
    }

    get type(): FacilityType {
        return this._type;
    }

    get numberOfCashier(): number {
        return this._numberOfCashier;
    }

    set numberOfCashier(value: number) {
        if(value < 0 || value > this.type.config.maximumCashiers) {
            throw FacilityException.invalidNumberOfCashiers();
        }

        this._numberOfCashier = value;
    }

    get numberOfCustomer(): number {
        return this._customers.size;
    }

    get capacity(): number {
        return this._numberOfCashier * this._type.capacityPerCashier;
    }

    get totalHourlyWages(): number {
        return this._numberOfCashier * this._type.hourlyWagePerCashier
    }

    isFull() : boolean {
        return this.numberOfCustomer >= this.capacity;
    }

    get customers(): CustomerMap {
        return this._customers;
    }

    addCustomer(customer: Customer) {
        this._customers.set(customer.id, customer);
    }

    removeCustomer(customer: Customer) {
        this._customers.delete(customer.id);
    }

    bookSale(product : Product) {
        this._profit += product.profit;
    }

    bookWages() : void {
        this._profit -= this.totalHourlyWages;
    }

    get profit(): number {
        return this._profit;
    }

    resetProfit() : void {
        this._profit = 0;
    }
}

export {Facility};

