import {Customer} from "../Entity/Customer";
import {Cinema} from "../Entity/Cinema";
import {randomNumber} from "../Utils";
import {CustomerThought} from "../Entity/CustomerThought";
import {Movie} from "../Entity/Movie";

class CustomerHappinessCalculator {
    checkConversionToFan(cinema: Cinema, customer: Customer) {
        customer.addThought(new CustomerThought('After this great experience I became of fan of this Cinema', true));
        customer.addThought(new CustomerThought('This place has gone downhill. I am no longer a fan.', true));
        customer.addThought(new CustomerThought('This place is so great I even convinced a friend to check this cinema out!', true));

        let happiness = customer.calculateHappiness(cinema.config);

        do {
            if(this.rollHappinessChance(happiness)) {
                cinema.addFan();
                continue;
            }

            if(customer.isFan && randomNumber(1, 10) > 5) {
                //50% chance of losing a fan
                cinema.loseFan();
            }

        } while(happiness > 100);


    }

    private rollHappinessChance(happiness : number) : boolean {
        return happiness >= randomNumber(0, 100);
    }
}