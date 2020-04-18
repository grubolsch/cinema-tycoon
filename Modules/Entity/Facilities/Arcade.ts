import {Facility} from "./Facility"
import {FacilityType} from "./FacilityType"
import {FacilityException} from "../../Exception/FacilityException";
import {ConfigManager} from "../../Manager/ConfigManager";

class Arcade extends Facility{

    constructor(config: ConfigManager, id: number) {
        super(config, id, FacilityType.ARCADE,
            config.arcadeCapacityPerCashier,
            config.arcadeDefaultSellingPrice,
            config.arcadeCostPrice,
            config.arcadeMonthlyRent,
            config.arcadeHourlyWageCashier,
            config.arcadeHappinessBonus);
    }

}

export {Arcade}