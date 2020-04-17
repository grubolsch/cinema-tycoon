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