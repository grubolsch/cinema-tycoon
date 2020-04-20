import {Customer} from "../../Entity/Customer";
import {Cinema} from "../../Entity/Cinema";
import {randomNumber} from "../../Utils";
import {CustomerThought} from "../../Entity/CustomerThought";
import {Movie} from "../../Entity/Movie";

class ConvertCustomerToFan {
    checkConversionToFan(cinema: Cinema, customer: Customer) {
        let happiness = this.calculateFanConversionChance(customer, cinema);

        //This variable marks the next iteration that his friend is not a fan and can still be converted.
        // only important for the first iteration
        let originalCustomer : boolean = true;
        do {
            if(this.rollHappinessPercentage(happiness)) {
                if(originalCustomer && !customer.isFan) {
                    customer.addThought(new CustomerThought(CustomerThought.FAN_NEW, true));
                    cinema.addFan();
                } else if(!originalCustomer) {
                    customer.addThought(new CustomerThought(CustomerThought.FAN_NEW_FRIEND, true));
                    cinema.addFan();
                }
            }
            else if(originalCustomer && customer.isFan && randomNumber(0, 100) > cinema.config.chanceLosingFan) {
                customer.addThought(new CustomerThought(CustomerThought.FAN_LOST, true));

                //if we are rolling for the original fan, there is a
                cinema.loseFan();
            }
            //else - did neither become or lose a fan

            originalCustomer = false;
            happiness -= 100;
        } while(happiness > 0);
    }

    private calculateFanConversionChance(customer: Customer, cinema: Cinema) {
        let happiness = customer.calculateHappiness(cinema.config);

        if (customer.targetShow.movie.type.isBlockbuster) {
            happiness -= cinema.config.penaltyBlockbusterFanConversion;
        } else if (customer.targetShow.movie.type.isArthouse) {
            happiness += cinema.config.bonusArthouseFanConversion;
        }
        return happiness;
    }

    private rollHappinessPercentage(happiness : number) : boolean {
        return happiness >= randomNumber(0, 100);
    }
}

export {ConvertCustomerToFan}