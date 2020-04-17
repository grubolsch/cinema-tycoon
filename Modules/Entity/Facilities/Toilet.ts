import {Facility} from "./Facility"
import {FacilityType} from "./FacilityType"
import {FacilityException} from "../../Exception/FacilityException";
import {ConfigManager} from "../../Manager/ConfigManager";

class Toilet extends Facility{

    constructor(config: ConfigManager, id: number) {
        super(config, id, FacilityType.TOILET,
            config.toiletCapacityPerCashier,
            config.toiletDefaultSellingPrice,
            config.toiletCostPrice,
            config.toiletMonthlyRent,
            config.toiletHourlyWageCashier,
            config.toiletHappinessBonus);
    }

}

export {Toilet}