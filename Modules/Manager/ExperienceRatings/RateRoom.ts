import {Cinema} from "../../Entity/Cinema";
import {Customer} from "../../Entity/Customer";

class RateRoom {
    /*
    * If a room item is above 70% of quality he gives a compliment
    If a room item is above 90% quality he gives a raving compliment

    * If a room item is below 20% of quality he does a rant
    If a room item is below 40% of quality he complains
    * */
    rate(cinema : Cinema, customer : Customer) {
        let happiness = customer.calculateHappiness(cinema.config);

    }
}

export {RateRoom}