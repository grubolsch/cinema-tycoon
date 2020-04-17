import {Facility} from "../Entity/Facilities/Facility";
import {FacilityType} from "../Entity/Facilities/FacilityType";
import {Toilet} from "../Entity/Facilities/Toilet";
import {Arcade} from "../Entity/Facilities/Arcade";
import {Cinema} from "../Entity/Cinema";
import {ConfigManager} from "./ConfigManager";
import {FacilityException} from "../Exception/FacilityException";

class FacilityManager {
    private _cinema: Cinema;
    private _config: ConfigManager;
    private _facilities: Map<FacilityType, Map<number, Facility>>;

    static _toiletIdCounter = 0;
    static _arcadeIdCounter = 0;

    constructor(cinema: Cinema, config: ConfigManager) {
        this._cinema = cinema;
        this._config = config;
        this._facilities = new Map<FacilityType, Map<number, Facility>>();
        this._facilities.set(FacilityType.TOILET, new Map<number, Toilet>());
        this._facilities.set(FacilityType.ARCADE, new Map<number, Arcade>());

    }

    addFacility(type: FacilityType): void{

        let newFacility : undefined|Toilet|Arcade|Facility;
        switch (type) {
            case FacilityType.TOILET: {
                console.log("toilet block");
                newFacility = new Toilet(this.config, FacilityManager._toiletIdCounter);
                FacilityManager._toiletIdCounter++;
                break;
            }
            case FacilityType.ARCADE: {
                console.log("Arcade block");
                newFacility = new Arcade(this.config, FacilityManager._arcadeIdCounter);
                FacilityManager._arcadeIdCounter++;
                break;
            }
            default: {
                throw FacilityException.undefinedFacilityTypeError()
                break;
            }

        }

        if(newFacility == undefined){
            throw FacilityException.undefinedFacilityTypeError()
        }

        if(!this.facilities.has(type)){
            this.facilities.set(type, new Map<number, Facility>())
        }

        // @ts-ignore // already checked and created if there is no object, just right before this
        this.facilities.get(type).set(newFacility.id, newFacility);
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

    getFacilitiesByType(type: FacilityType): Map<number, Facility> | undefined{
        if(this._facilities.get(type) == undefined){
            //this should defined with empty map, so if it is undefined,
            throw FacilityException.undefinedFacilityTypeError();
        }
        return this._facilities.get(type);
    }
}

export {FacilityManager}