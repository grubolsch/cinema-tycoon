import {CustomerAction} from "./CustomerAction";
import {Customer} from "../Entity/Customer";
import {Cinema} from "../Entity/Cinema";
import {randomNumber} from "../Utils";
import {CustomerThought} from "../Entity/CustomerThought";
import {Facility} from "../Entity/Facilities/Facility";

class ShopAction implements CustomerAction {
    private readonly _facility: Facility;
    private readonly _nextAction: CustomerAction;
    private _ticksShopping: number = 0;

    constructor(facility : Facility, nextAction : CustomerAction) {
        this._facility = facility;
        this._nextAction = nextAction;
    }

    getDescription(cinema: Cinema, customer: Customer): string {
        if(this._facility.type.isService) {
            return "Using the " + this._facility.type.name;
        }
        return "Shopping in the " + this._facility.type.name;
    }

    isFinished(cinema: Cinema, customer: Customer): boolean {
        //one more that in the config, because otherwise it would directly resolve
        return this._ticksShopping > cinema.config.ticksNeedToShop;
    }

    nextAction(cinema: Cinema, customer: Customer): CustomerAction {
        return this._nextAction;
    }

    update(cinema: Cinema, customer: Customer): void {
        if(this._ticksShopping === cinema.config.ticksNeedToShop) {
            this.facility.shop(cinema, customer);
            //this._facility.removeCustomer(customer);
        } else {
            this._facility.addCustomer(customer);
        }

        this._ticksShopping++;
    }

    get facility(): Facility {
        return this._facility;
    }
}


export {ShopAction}