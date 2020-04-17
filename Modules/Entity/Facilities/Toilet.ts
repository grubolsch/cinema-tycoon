import {Facility} from "./Facility"
import {FacilityType} from "./FacilityType"
import {FacilityException} from "../../Exception/FacilityException";
import {ConfigManager} from "../../Manager/ConfigManager";

class Toilet extends Facility{

    constructor(config: ConfigManager, id: number) {
        super(config, id, FacilityType.TOILET,
            config.toiletDefaultSellingPrice, config.toiletCostPrice, config.toiletHappinessBonus);
    }

    calcHourlyExpense(): number {
        return this.calcLaborCostsPerHour()
    }

    get monthlyFixedCost(): number {
        return this.config.toiletfixedCostPerMonth;
    }
}

export {Toilet}