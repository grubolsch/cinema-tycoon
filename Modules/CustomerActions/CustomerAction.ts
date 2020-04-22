import {Cinema} from "../Entity/Cinema";
import {Customer} from "../Entity/Customer";

interface CustomerAction {
    update(cinema: Cinema, customer: Customer): void;
    isFinished(cinema: Cinema, customer: Customer): boolean;
    nextAction(cinema: Cinema, customer: Customer): CustomerAction;
    getDescription(cinema: Cinema, customer: Customer) : string
}

export {CustomerAction}