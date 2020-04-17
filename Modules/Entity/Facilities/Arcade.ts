import {Facility} from "./Facility"
import {FacilityType} from "./FacilityType"
import {FacilityException} from "../../Exception/FacilityException";
import {ConfigManager} from "../../Manager/ConfigManager";

class Arcade extends Facility{

    constructor(config: ConfigManager, id: number) {
        super(config, id, FacilityType.ARCADE,
            config.arcadeDefaultSellingPrice, config.arcadeCostPrice, config.arcadeHappinessBonus);
    }

    calcHourlyExpense(): number {
        return this.calcLaborCostsPerHour();
    }

    get monthlyFixedCost(): number {
        return this.config.arcadefixedCostPerMonth;
    }
}

export {Arcade}