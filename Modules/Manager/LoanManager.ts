import {Loan, MafiaLoan} from "../Entity/Loan";
import {Observer} from "./Observer";
import {Cinema} from "../Entity/Cinema";

class LoanManager {
    private _loans : Map<number, Loan> = new Map<number, Loan>();

    construct() {
        this._loans.set(1, new Loan(1, 'Small loan', 0, 30000, 6, 5));
        this._loans.set(2, new Loan(2, 'Medium loan', 0, 60000, 12, 10));
        this._loans.set(3, new Loan(3,  'Big loan', 0, 100000, 24, 15));
        this._loans.set(4, new MafiaLoan(4, 30000, 12, 20));
    }

    get loans(): Map<number, Loan> {
        return this._loans;
    }

    public update(cinema : Cinema) {

    }
}
