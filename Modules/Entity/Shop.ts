import {ShopType} from "../ShopTypes/ShopType";
import {Product} from "./Product";
import {number_format} from "../Utils";
import {Customer} from "./Customer";
import {ConfigManager} from "../Manager/ConfigManager";

class CustomerMap extends Map<number, Customer> {}

class Shop {
    private _cashier: number = 1;
    private config: ConfigManager;
    private readonly _type: ShopType;
    private _customers : CustomerMap = new CustomerMap;

    constructor(config : ConfigManager, type: ShopType) {
        this.config = config;
        this._type = type;
    }

    get cashier(): number {
        return this._cashier;
    }

    set cashier(value: number) {
        this._cashier = value;
    }

    get type(): ShopType {
        return this._type;
    }
    
    getDrinkProducts() : Array<Product> {
        return this.type.products.filter(function(product) {
            return product.isDrink();
        });
    }
    
    getFoodProducts() : Array<Product> {
        return this.type.products.filter(function(product) {
            return !product.isDrink();
        });
    }

    isFull() : boolean {
        return this._customers.size >= this.capacity;
    }

    get capacity() : number {
        return this._cashier * this.config.defaultCapacityPerCashier;
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
}
export {Shop}