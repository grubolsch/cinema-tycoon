"use strict";
import {Customer, CustomerLocation} from "../Entity/Customer";
import {CustomerAction} from "./CustomerAction";
import {Cinema} from "../Entity/Cinema";

class MoveAction implements CustomerAction {
    private readonly WALKINGSPEED = 20;

    private goal : CustomerLocation;
    private _nextAction : CustomerAction;

    constructor(goal: CustomerLocation, nextAction: CustomerAction) {
        this.goal = goal;
        this._nextAction = nextAction;
    }

    update(cinema: Cinema, customer: Customer) {
        let x = customer.appearance.location.x;
        let y = customer.appearance.location.y;

        if (this.goal.x > x) {
            x = Math.min(x + this.WALKINGSPEED, this.goal.x);
        }
        else if (this.goal.x < x) {
            x = Math.max(x - this.WALKINGSPEED, this.goal.x);
        }

        if (this.goal.y > y) {
            y = Math.min(y + this.WALKINGSPEED, this.goal.y);
        }
        else if (this.goal.y < y) {
            y = Math.min(y - this.WALKINGSPEED, this.goal.y);
        }

        customer.appearance.render({'x': x, 'y': y});
    }

    isFinished(cinema: Cinema, customer: Customer) : boolean {
        return (customer.appearance.location.x == this.goal.x && customer.appearance.location.y == this.goal.y);
    }

    nextAction(cinema: Cinema, customer: Customer): CustomerAction {
        return this._nextAction;
    }
}

export {MoveAction}