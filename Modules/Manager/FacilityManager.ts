import {Facility} from "../Entity/Facilities/Facility";
import {Cinema} from "../Entity/Cinema";
import {ConfigManager} from "./ConfigManager";
import {FacilityException} from "../Exception/FacilityException";
import {FacilityType} from "../ShopTypes/FacilityType";
import {randomNumber} from "../Utils";

class FacilityMap extends Map<FacilityType, Map<number, Facility>> {
};

/*
* FacilityManager manages actual build shops and services in your Cinema
* */
class FacilityManager {
    private _cinema: Cinema;
    private _config: ConfigManager;

    private _facilities: FacilityMap = new FacilityMap();

    private counter: number = 0;
    private allFacilities: null | Array<Facility> = null;

    constructor(cinema: Cinema, config: ConfigManager) {
        this._cinema = cinema;
        this._config = config;
    }

    get cinema(): Cinema {
        return this._cinema;
    }

    get config(): ConfigManager {
        return this._config;
    }

    get facilities(): Map<FacilityType, Map<number, Facility>> {
        return this._facilities;
    }

    addFacility(type: FacilityType): void {
        if (!this.cinema.financeManager.canAfford(type.buildCost)) {
            throw FacilityException.notEnoughMoney();
        }

        let newFacility = new Facility(++this.counter, type);
        this.cinema.financeManager.pay(type.buildCost, 'Construction');

        if (!this.facilities.has(type)) {
            this.facilities.set(type, new Map<number, Facility>())
        }

        this.facilities.get(type)!.set(newFacility.id, newFacility);
        this.allFacilities = null;//destroy cached array
    }

    getFacilitiesByType(type: FacilityType): Map<number, Facility> | undefined {
        if (this._facilities.get(type) == undefined) {
            //this should defined with empty map, so if it is undefined,
            throw FacilityException.undefinedFacilityTypeError();
        }
        return this._facilities.get(type);
    }

    getAllFacilities(): Array<Facility> {
        if (this.allFacilities === null) {
            this.allFacilities = [];
            this._facilities.forEach(facilityMap => {
                facilityMap.forEach(facility => {
                    this.allFacilities!.push(facility);
                });
            });
        }

        return this.allFacilities;
    }

    private calculateMonthlyCost(): number {
        let total: number = 0;
        this.getAllFacilities().forEach(function (facility) {
            total += facility.type.monthlyCost;
        });
        return total;
    }

    private calculateHourCost(bookWages : boolean = false): number {
        let total: number = 0;
        this.getAllFacilities().forEach(function (facility) {
            if(bookWages) {
                facility.bookWages();
            }

            total += facility.totalHourlyWages;
        });
        return total;
    }

    updateByMonth() {
        this.cinema.financeManager.pay(this.calculateMonthlyCost(), 'Shop maintenance costs');
    }

    updateByHour() {
        this.cinema.financeManager.pay(this.calculateHourCost(true), 'Wages cashiers');
    }

    updateByDay() {
        this.getAllFacilities().forEach((facility) => {
            facility.resetProfit();
        });
    }

    getRandomFacility(includeServiceFacilities: boolean = true, includeFullShops : boolean = true, type : FacilityType|null = null) : Facility|undefined {
        let shops = this.getAllFacilities().filter((facility) => {
            return (
                (includeServiceFacilities || !facility.type.isService)
                && (includeFullShops || !facility.isFull())
                && (type === null || type.name === facility.type.name)
            );
        });

        let chosenShop = shops[randomNumber(0, shops.length-1)];

        return shops[randomNumber(0, shops.length-1)];
    }
}

export {FacilityManager}