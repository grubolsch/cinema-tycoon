import {ConfigManager} from "../../Manager/ConfigManager";
import {FacilityException} from "../../Exception/FacilityException";
import {FacilityType} from "./FacilityType";


abstract class Facility {

    private _config: ConfigManager;
    private _id: number;
    private _type: FacilityType;
    private _capacityPerCashier: number;
    private _numberOfCashier: number;
    private _numberOfCustomer: number;
    private _sellingPrice: number;
    private _costPrice: number;
    private _monthlyRent: number;
    private _hourlyWagePerCashier: number;
    private _happinessBonus: number;

    constructor(config: ConfigManager, id: number, type: FacilityType, capacityPerCashier: number,
                sellingPrice: number, costPrice: number, monthlyRent: number, hourlyWagePerCashier: number, happinessBonus: number) {
        this._config = config;
        this._id = id;
        this._type = type;
        this._capacityPerCashier = capacityPerCashier;
        this._numberOfCashier = config.defaultCashiers; // 1
        this._numberOfCustomer = 0; // 1
        this._sellingPrice = sellingPrice;
        this._costPrice = costPrice;
        this._monthlyRent = monthlyRent;
        this._hourlyWagePerCashier = hourlyWagePerCashier;
        this._happinessBonus = happinessBonus;
    }

    // Common : shared for all facilities
    public changeNumberOfCashier(): void {
        //Todo on Manage facility Modal
    };


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

    get capacity(): number {
        return this._numberOfCashier * this._capacityPerCashier;
    }

    get monthlyRent(): number {
        return this._monthlyRent;
    }

    get totalHourlyWages(): number {
        return this._numberOfCashier * this._hourlyWagePerCashier
    }
}


export {Facility};

