import {Customer} from "../Entity/Customer";
import {Cinema} from "../Entity/Cinema";
import {CustomerAction} from "./CustomerAction";
import {AiException} from "../Exception/AiException";
import {ConvertCustomerToFan} from "../Manager/ExperienceRatings/ConvertCustomerToFan";

class LeaveCinemaAction implements CustomerAction {
    //the customers stay a while say players have a chance see their thoughts
    private leavingInTicks : number = 5000;

    isFinished(cinema: Cinema, customer: Customer): boolean {
        return this.leavingInTicks === 0;
    }

    nextAction(cinema: Cinema, customer: Customer): never {
        cinema.customerManager.remove(customer);

        throw AiException.noNextAction();
    }

    update(cinema: Cinema, customer: Customer): void {
        if(this.leavingInTicks <= 0) {
            return;
        }

        if(document.querySelector('#customer-' + customer.id) !== null) {
            //already remove visibly
            document.querySelector('#customer-' + customer.id)!.remove();

            //see if the customer converts to a fan
            let rater = new ConvertCustomerToFan();
            rater.checkConversionToFan(cinema, customer);
        }

        this.leavingInTicks--;
    }

    getDescription(cinema: Cinema, customer: Customer): string {
        return "Left the cinema";
    }

}

export  {LeaveCinemaAction}