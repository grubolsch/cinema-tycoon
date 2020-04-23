import * as faker from 'faker';

import {Customer} from "../Entity/Customer";
import {ConfigManager} from "../Manager/ConfigManager";
import {Show} from "../Entity/Show";

class CustomerGenerator {
    private readonly GENDER = [Customer.GENDER_MALE, Customer.GENDER_FEMALE];
    private readonly MIN_AGE : number = 18;
    private readonly MAX_AGE : number= 80;

    private readonly configManager: ConfigManager;

    public createCustomer(show : Show, isFan : boolean = false): Customer {
        let gender = faker.random.arrayElement(this.GENDER);
        let name = faker.name.firstName(this.GENDER.indexOf(gender)) + " " + faker.name.lastName(this.GENDER.indexOf(gender));
        let age = faker.random.number({min: this.MIN_AGE, max: this.MAX_AGE});
        let commercialTolerance = this.configManager.commercialTolerance;
        let likeBreak = faker.random.boolean();
        let queueingTolerance = faker.random.number({min: this.configManager.minQueueingTolerance, max: this.configManager.maxQueueingTolerance});
        let pricingToleranceShop = faker.random.number({min: this.configManager.minPriceToleranceShop, max: this.configManager.maxPriceToleranceShop}) / 10;
        let pricingToleranceTicket = faker.random.number({min: this.configManager.minPriceToleranceTicket, max: this.configManager.maxPriceToleranceTicket}) / 10;

        return new Customer(name, age, gender, commercialTolerance, queueingTolerance, pricingToleranceShop, pricingToleranceTicket, isFan, show);
    }

    constructor(configManager: ConfigManager) {
        this.configManager = configManager;
    }
}

export {CustomerGenerator};