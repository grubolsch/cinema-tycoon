import {CustomerAction} from "./CustomerAction";
import {Customer} from "../Entity/Customer";
import {Cinema} from "../Entity/Cinema";
import {randomNumber} from "../Utils";
import {Shop} from "../Entity/Shop";
import {MoveAction} from "./MoveAction";
import {GameAreaCoordinates} from "../Assets/GameAreaCoordinates";
import {LeaveCinemaAction} from "./LeaveCinemaAction";
import {WatchMovieAction} from "./WatchMovieAction";
import {CustomerThought} from "../Entity/CustomerThought";

class ShopAction implements CustomerAction {
    private _shop: Shop;
    private _ticksShopping: number = 0;

    constructor(shop: Shop) {
        this._shop = shop;
    }

    getDescription(cinema: Cinema, customer: Customer): string {
        return "Shopping";
    }

    isFinished(cinema: Cinema, customer: Customer): boolean {
        return this._ticksShopping > cinema.config.ticksNeedToShop;
    }

    nextAction(cinema: Cinema, customer: Customer): CustomerAction {
        if (customer.plans.get(customer.PLAN_LEAVE) === true) {
            return new MoveAction({
                'x': customer.appearance.location!.x,
                'y': randomNumber(GameAreaCoordinates.leavingCinemaStart, GameAreaCoordinates.leavingCinemaEnd)
            }, new LeaveCinemaAction());
        }

        return new MoveAction({
            'x': customer.appearance.location!.x,
            'y': randomNumber(GameAreaCoordinates.watchingMovieStart, GameAreaCoordinates.watchingMovieEnd)
        }, new WatchMovieAction());
    }

    update(cinema: Cinema, customer: Customer): void {
        this._ticksShopping++;

        if(this._shop.isFull()) {
            customer.addThought(new CustomerThought(('I wanted to buy something but the shop was too busy!'), false));
            return;
        }

        this._shop.addCustomer(customer);

        if(this.isFinished(cinema, customer)) {
            this.shop(cinema, customer);
            this._shop.removeCustomer(customer);
        }
    }

    shop(cinema: Cinema, customer: Customer): void {
        let products = this._shop.type.products;
        let randomProductKey = randomNumber(0, products.length - 1);
        let startCapacity = 100;

        do {
            let randomProduct = products[randomProductKey];

            if (randomProduct.costPrice >= randomProduct.defaultPrice * customer.pricingToleranceShop) {
                customer.addThought(new CustomerThought((randomProduct.name + ' is way too expensive'), false));

                delete products[randomProductKey];
            } else {
                if (randomProduct.costPrice >= randomProduct.defaultPrice * customer.pricingToleranceShop * .5) {
                    customer.addThought(new CustomerThought((randomProduct.name + ' is really cheap'), true));
                }

                cinema.financeManager.earn(randomProduct.profit, 'Sale ' + randomProduct.category);
                customer.addInventoryItem(randomProduct.name, randomProduct);

                //only buy 1 product from each category
                products = products.filter((product) => {
                    return product.category != randomProduct.category;
                });

                if(products.length === 0) {
                    return;
                }
            }

            randomProductKey = randomNumber(0, products.length - 1);
            startCapacity -= 20;
        } while (startCapacity >= randomNumber(0, 100));
    }
}


export {ShopAction}