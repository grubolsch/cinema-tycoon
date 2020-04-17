import * as faker from 'faker';

import {Customer} from "../Entity/Customer";
import {ConfigManager} from "../Manager/ConfigManager";
import {Show} from "../Entity/Show";

const GENDER = ['Female', 'male'];
const MIN_AGE = 18;
const MAX_AGE = 80;

class CustomerGenerator {
    private readonly configManager: ConfigManager;

    public createCustomer(show : Show, isFan : boolean = false): Customer {

        let gender = faker.random.arrayElement(GENDER);
        let name = faker.name.firstName(GENDER.indexOf(gender)) + " " + faker.name.lastName(GENDER.indexOf(gender));
        let age = faker.random.number({min: MIN_AGE, max: MAX_AGE});
        let likeCommercial = faker.random.boolean();
        let commercialTolerance = this.configManager.commercialTolerance;
        let likeBreak = faker.random.boolean();
        let breakTolerance = this.configManager.breakTolerance;
        let queueingTolerance = faker.random.number({min: 100, max: 1000});
        let pricingToleranceShop = faker.random.number({min: 12, max: 25}) / 10;
        let pricingToleranceTicket = faker.random.number({min: 12, max: 25}) / 10;

        console.log('created '+ name);
        return new Customer(name, age, gender, likeCommercial, commercialTolerance, likeBreak, breakTolerance, queueingTolerance, pricingToleranceShop, pricingToleranceTicket, isFan, show);
    }

    constructor(configManager: ConfigManager) {
        this.configManager = configManager;
    }
}

export {CustomerGenerator};