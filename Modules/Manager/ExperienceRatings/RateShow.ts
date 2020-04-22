import {Movie} from "../../Entity/Movie";
import {Customer} from "../../Entity/Customer";
import {CustomerThought} from "../../Entity/CustomerThought";
import {ConfigManager} from "../ConfigManager";
import {randomNumber} from "../../Utils";
import {Show} from "../../Entity/Show";
import {Cinema} from "../../Entity/Cinema";

class RateShow {
    private config : ConfigManager;

    constructor(config: ConfigManager) {
        this.config = config;
    }

    rate(show : Show, customer : Customer) {
        if(show.showConfiguration.hasCommercial && randomNumber(0, 100) <= this.config.commercialTolerance) {
            customer.addThought(new CustomerThought(('I hate those commercials before a movie.'), false));
        }
    }

    payoutCommercial(cinema: Cinema, customer : Customer) : void {
        if(customer.targetShow.showConfiguration.hasCommercial) {
            cinema.financeManager.earn(cinema.config.commercialFeePerCustomer, 'Commercials');
        }
    }
}

export {RateShow}