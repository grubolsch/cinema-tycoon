import {Facility} from "./Facility";
import {FacilityStrategy} from "./FacilityStrategy";
import {Customer} from "../Customer";
import {Cinema} from "../Cinema";
import {randomNumber} from "../../Utils";
import {CustomerThought} from "../CustomerThought";
import {Product} from "../Product";

class ServiceFacilityStrategy implements FacilityStrategy {
    shop(facility: Facility, cinema: Cinema, customer: Customer): void {
        let service = facility.type.products[0];

        if (service === undefined) {
            debugger;
        }

        if (service.sellingPrice >= cinema.config.serviceMaxPrice * customer.pricingToleranceShop) {
            customer.addThought(new CustomerThought(`I am not paying so much for the ${service.name}`, false));
            return;
        }

        if (service.sellingPrice == 0) {
            customer.addThought(new CustomerThought(`I am so happy the ${service.name} is free`, true));
        }

        cinema.financeManager.earn(service.profit, 'Sale ' + service.category);
    }
}

export {ServiceFacilityStrategy}