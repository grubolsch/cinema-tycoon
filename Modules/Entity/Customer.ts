import {CustomerThought} from "./CustomerThought";
import {randomNumber} from "../Utils";

class Customer {
    private _thoughts: Array<CustomerThought> = [];

    private _queueingTolerance: number = 100;

    private _moneySpent : number = 0;

    constructor() {
        this._queueingTolerance = randomNumber(50, 100);//tmp code, Bona has the correct values
    }

    addThought(thought: CustomerThought) {
        this._thoughts.push(thought);
    }

    get thoughts(): Array<CustomerThought> {
        return this._thoughts;
    }

    get queueingTolerance(): number {
        return this._queueingTolerance;
    }

    //while the customer has unlimited money, we do track how much money he has spent in the cinema
    pay(ticketPrice: number) {
        this._moneySpent += ticketPrice;
    }

    get moneySpent(): number {
        return this._moneySpent;
    }
}

export {Customer}