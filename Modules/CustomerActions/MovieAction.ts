import {Customer, Location} from "../Entity/Customer";
import {CustomerAction} from "./CustomerAction";

class MoveAction implements CustomerAction {
    private readonly customer : Customer;
    private readonly goal : Location;

    constructor(customer: Customer, goal : Location) {
        this.customer = customer;
        this.goal = goal;
    }

    update(): void {
        console.log('move')
        if(this.goal.x > this.customer.location.x) {
            this.customer.location.x++;
        }
        else if(this.goal.x < this.customer.location.x) {
            this.customer.location.x--;
        }

        if(this.goal.y > this.customer.location.y) {
            this.customer.location.y++;
        }
        else if(this.goal.y < this.customer.location.y) {
            this.customer.location.y--;
        }
    }

    isFinished(): boolean {
        return (this.customer.location.x == this.goal.x && this.customer.location.y == this.goal.y);
    }
}


export {MoveAction}