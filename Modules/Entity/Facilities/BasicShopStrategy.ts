import {Cinema} from "../Cinema";
import {Customer} from "../Customer";
import {randomNumber} from "../../Utils";
import {CustomerThought} from "../CustomerThought";
import {Facility} from "./Facility";
import {Product} from "../Product";
import {FacilityStrategy} from "./FacilityStrategy";

class BasicShopStrategy implements FacilityStrategy {
    shop(facility : Facility, cinema: Cinema, customer: Customer): void {
        let products = facility.type.products;//a copy so we can remove products customers already bought
        let randomProductKey = randomNumber(0, products.length - 1);
        let startCapacity = cinema.config.maxProductsInOneShopVisit;

        do {
            let randomProduct = products[randomProductKey];

            if(randomProduct === undefined) {
                debugger;
            }

            if (randomProduct.sellingPrice >= randomProduct.defaultPrice * customer.pricingToleranceShop) {
                customer.addThought(new CustomerThought((randomProduct.name + ' is way too expensive'), false));

                delete products[randomProductKey];
            } else {
                if (randomProduct.sellingPrice >= randomProduct.defaultPrice * customer.pricingToleranceShop * cinema.config.itemCheapBonusThreshold) {
                    customer.addThought(new CustomerThought((randomProduct.name + ' is really cheap'), true));
                }

                cinema.financeManager.earn(randomProduct.profit, 'Sale ' + randomProduct.category);
                customer.addInventoryItem(randomProduct.name, randomProduct);

                //only buy 1 product from each category
                products = products.filter((product: Product) => {
                    return product.category != randomProduct.category;
                });

                if(products.length === 0) {
                    return;
                }
            }

            randomProductKey = randomNumber(0, products.length - 1);
        } while (--startCapacity >= randomNumber(0, cinema.config.maxProductsInOneShopVisit));
    }
}

export {BasicShopStrategy}