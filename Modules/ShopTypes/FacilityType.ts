import {Product} from "../Entity/Product";
import {ConfigManager} from "../Manager/ConfigManager";

class FacilityType {
    private readonly _name: string;
    private readonly _buildCost: number;
    private readonly _capacityPerCashier: number;
    private readonly _monthlyCost: number;
    private readonly _hourlyWagePerCashier: number;
    private readonly _products: Product[];
    private readonly _config: ConfigManager;

    constructor(config : ConfigManager, name: string, buildCost: number, capacityPerCashier : number, monthlyRent : number, hourlyWagePerCashier : number, products: Product[]) {
        this._config = config;
        this._name = name;
        this._buildCost = buildCost;
        this._capacityPerCashier = capacityPerCashier;
        this._monthlyCost = monthlyRent;
        this._hourlyWagePerCashier = hourlyWagePerCashier;

        this._products = products;
    }

    get name(): string {
        return this._name;
    }

    get buildCost(): number {
        return this._buildCost;
    }

    get capacityPerCashier(): number {
        return this._capacityPerCashier;
    }

    get monthlyCost(): number {
        return this._monthlyCost;
    }

    get hourlyWagePerCashier(): number {
        return this._hourlyWagePerCashier;
    }

    get products(): Product[] {
        return this._products;
    }

    get config(): ConfigManager {
        return this._config;
    }
}

export {FacilityType}