import {Customer} from "../Entity/Customer";
import {MoveAction} from "../CustomerActions/MoveAction";
import {Cinema} from "../Entity/Cinema";
import {randomNumber} from "../Utils";
import {BuyTicketAction} from "../CustomerActions/BuyTicketAction";
import {CustomerAction} from "../CustomerActions/CustomerAction";
import {GameAreaCoordinates} from "../Assets/GameAreaCoordinates";
import {LoanException} from "../Exception/LoanException";
import {AiException} from "../Exception/AiException";

class CustomerAi {
    private customer : Customer;
    private currentAction : CustomerAction;
    private cinema: Cinema;

    constructor(cinema: Cinema, customer: Customer) {
        this.cinema = cinema;
        this.customer = customer;

        let spawnLocation = {'x': randomNumber(GameAreaCoordinates.buyingTicketStartX, GameAreaCoordinates.buyingTicketEndX), 'y': randomNumber(GameAreaCoordinates.buyingTicketStart, GameAreaCoordinates.buyingTicketEnd)};
        this.customer.appearance.render(spawnLocation);//make the customer visible on the screen

        // @todo currently the moving action will direct resolve because there is nothing to move too.
        this.currentAction = new MoveAction(spawnLocation, new BuyTicketAction());
    }

    ///gets called each tick
    update() {
        this.currentAction.update(this.cinema, this.customer);

        if(this.currentAction.isFinished(this.cinema, this.customer)) {
            try {
                this.currentAction = this.currentAction.nextAction(this.cinema, this.customer);
                console.log('NEXT ACTION: ', this.currentAction);
            }
            catch(error) {
                //in the case if an AIException there is nothing to do, the last action was reached
                if(!(error instanceof AiException)) {
                    alert('AI ERROR: '+ error.message);
                }
            }
        }
    }
}

export {CustomerAi}