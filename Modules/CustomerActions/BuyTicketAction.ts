import {Customer} from "../Entity/Customer";
import {Cinema} from "../Entity/Cinema";
import {LeaveCinemaAction} from "./LeaveCinemaAction";
import {CustomerAction} from "./CustomerAction";
import {WatchMovieAction} from "./WatchMovieAction";
import {MoveAction} from "./MoveAction";
import {randomNumber} from "../Utils";
import {GameAreaCoordinates} from "../Assets/GameAreaCoordinates";
import {ShopAction} from "./ShopAction";
import {ShopNeed} from "./Helper/ShopNeed";
import {CustomerThought} from "../Entity/CustomerThought";

class BuyTicketAction implements CustomerAction {
    private foundBooth : boolean = false;

    isFinished(cinema: Cinema, customer: Customer): boolean {
        //either customer either wants to leave or wants to see the movie
        return customer.plans.get(customer.PLAN_LEAVE) === true || customer.plans.get(customer.PLAN_WATCH_MOVIE) === true;
    }

    nextAction(cinema: Cinema, customer: Customer): CustomerAction {
        if(customer.plans.get(customer.PLAN_WATCH_MOVIE) === true) {
            let seeMovieAction = new MoveAction({'x': customer.appearance.location!.x, 'y': randomNumber(GameAreaCoordinates.watchingMovieStart, GameAreaCoordinates.watchingMovieEnd)}, new WatchMovieAction());

            let shopNeed = new ShopNeed(cinema, customer);

            if(shopNeed.wantsToShop) {
                if(shopNeed.facility === undefined) {
                    customer.addThought(new CustomerThought(shopNeed.badThought, false));
                    return seeMovieAction;
                }

                console.error('CUSTOMER GOES TO SHOP', customer);

                return new MoveAction({'x': customer.appearance.location!.x, 'y': randomNumber(GameAreaCoordinates.shoppingStart, GameAreaCoordinates.shoppingEnd)}, new ShopAction(shopNeed.facility, seeMovieAction));
            }

            return seeMovieAction;
        }

        return new MoveAction({'x': customer.appearance.location!.x, 'y': randomNumber(GameAreaCoordinates.leavingCinemaStart, GameAreaCoordinates.leavingCinemaEnd)}, new LeaveCinemaAction());
    }

    update(cinema: Cinema, customer: Customer): void {
        if(this.foundBooth) {
            return;
        }
        this.foundBooth = true;

        cinema.boothManager.addCustomer(customer);
    }

    getDescription(cinema: Cinema, customer: Customer): string {
        if(customer.hasFreeTicket) {
            return "Using his free ticket for movie " + customer.targetShow.movie.title;

        }
        return "Buying a ticket for movie " + customer.targetShow.movie.title;
    }
}

export {BuyTicketAction}