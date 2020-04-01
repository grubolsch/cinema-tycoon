import {Loan, MafiaLoan} from "../Entity/Loan";
import {Cinema} from "../Entity/Cinema";
import {LoanException} from "../Exception/LoanException";
import {LoanTaken} from "../Entity/LoanTaken";

class LoanManager {
    private _loans : Map<number, Loan> = new Map<number, Loan>();

    constructor() {
        this._loans.set(1, new Loan(1, 'Small loan', 0, 30000, 6, 5));
        this._loans.set(2, new Loan(2, 'Medium loan', 3000, 60000, 12, 10));
        this._loans.set(3, new Loan(3,  'Big loan', 10000, 100000, 24, 15));
        this._loans.set(4, new MafiaLoan(4, 30000, 12, 20));
    }

    get loans(): Map<number, Loan> {
        return this._loans;
    }

    public canTakeLoan(cinema : Cinema, loan : Loan) : boolean {
        if(cinema.loans.has(loan.id)) {
            return false;
        }

        return loan.canApply(cinema);
    }

    public takeLoan(cinema : Cinema, loan : Loan) {
        if(cinema.loans.has(loan.id)) {
            throw LoanException.alreadyTookLoan();
        }

        if(!loan.canApply(cinema)) {
            throw LoanException.doesNotQualify();
        }

        cinema.loans.set(loan.id, new LoanTaken(loan));
        cinema.financeManager.earn(loan.amount, 'Taken loan');
    }

    public update(cinema : Cinema) {
        cinema.loans.forEach(function(loanTaken: LoanTaken) {
            loanTaken.pay(cinema);

            if(loanTaken.isPaidOff()) {
                cinema.loans.delete(loanTaken.loan.id);
            }
        });
    }
}

export {LoanManager}