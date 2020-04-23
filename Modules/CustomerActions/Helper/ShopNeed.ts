import {Facility} from "../../Entity/Facilities/Facility";
import {Cinema} from "../../Entity/Cinema";
import {Customer} from "../../Entity/Customer";

class ShopNeed {
    private readonly _facility: Facility | undefined = undefined;
    private readonly _badThought: string = '';
    private readonly _wantsToShop : boolean = true;

    constructor(cinema: Cinema, customer: Customer) {
        if(customer.needsToUseToilet(cinema.config)) {
            this._facility = cinema.facilityManager.getRandomFacility(true, false, cinema.shopTypeManager.getToilet());
            this._badThought = 'I really needed to pee but there was no toilet available!';
        }
        else if(customer.wantToShop(cinema.config)) {
            this._facility = cinema.facilityManager.getRandomFacility(false, false);
            this._badThought = 'I wanted to buy something but there are no shops available!';
        }
        else if(customer.wantsToPlayInArcade(cinema.config)) {
            this._facility = cinema.facilityManager.getRandomFacility(true, false, cinema.shopTypeManager.getArcade());

            this._badThought = 'I wanted to play some games but no arcades where available!';
        } else {
            this._wantsToShop = false;
        }
    }

    get wantsToShop(): boolean {
        return this._wantsToShop;
    }

    get facility(): Facility | undefined {
        return this._facility;
    }

    get badThought(): string {
        return this._badThought;
    }
}

export {ShopNeed}