import {Cinema} from "./Cinema";
import {Loan} from "./Loan";
import {LoanException} from "../Exception/LoanException";

class LoanTaken {
    private _loan : Loan;
    private _durationLeft : number;

    constructor(loan: Loan) {
        this._loan = loan;
        this._durationLeft = loan.durationInMonths;
    }

    public pay(cinema : Cinema) : void {
        if(this.isPaidOff()) {
            LoanException.loanPaidOff();
        }

        cinema.financeManager.pay(this._loan.calcMonthlyPayment(), 'Paying loan');

        this._durationLeft--;
    }

    get loan(): Loan {
        return this._loan;
    }

    get durationLeft(): number {
        return this._durationLeft;
    }

    isPaidOff() : boolean {
        return this._durationLeft === 0;
    }
}

export {LoanTaken}