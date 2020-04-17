import {ConfigManager} from "../../Manager/ConfigManager";
import {FacilityException} from "../../Exception/FacilityException";
import {FacilityType} from "./FacilityType";


abstract class Facility {

    private _config: ConfigManager;
    private _id: number;
    private _type: FacilityType;
    private _numberOfCashier: number;
    private _numberOfCustomer: number;
    private _sellingPrice: number;
    private _costPrice: number;
    private _happinessBonus: number;

    constructor(config: ConfigManager, id: number, type: FacilityType, sellingPrice: number, costPrice: number, happinessBonus: number) {
        this._config = config;
        this._id = id;
        this._type = type;
        this._numberOfCashier = config.defaultCashiers; // 1
        this._numberOfCustomer = 0; // 1
        this._sellingPrice = sellingPrice;
        this._costPrice = costPrice;
        this._happinessBonus = happinessBonus;
    }

    // Common : shared for all facilities
    public changeNumberOfCashier(): void {
        //Todo on Manage facility Modal
    };

    public calcCapacity(): number {
        return this._numberOfCashier * this._config.capacityPerCashier;
    };

    public calcLaborCostsPerHour(): number {
        return this._numberOfCashier * this._config.hourlyWageCashier
    };

    // Individual : toilet, arcade ->  same with calcLaborCostsPerHour() , shops -> add hourly fixed expense as well
    abstract calcHourlyExpense(): number;

    get config(): ConfigManager {
        return this._config;
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
        this._numberOfCashier = value;
    }

    get numberOfCustomer(): number {
        return this._numberOfCustomer;
    }

    get sellingPrice(): number {
        return this._sellingPrice;
    }

    set sellingPrice(value: number) {
        this._sellingPrice = value;
    }

    get costPrice(): number {
        return this._costPrice;
    }

    set costPrice(value: number) {
        this._costPrice = value;
    }

    get happinessBonus(): number {
        return this._happinessBonus;
    }
}


export {Facility};

