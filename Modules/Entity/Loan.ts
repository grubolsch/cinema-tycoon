import {Cinema} from "./Cinema";

class Loan {
    private _id : number;
    private _name : string;
    private _requiredFans : number;
    private _amount : number;
    private _durationInMonths : number;
    private _interest : number;

    constructor(id : number, name: string, requiredFans: number, amount: number, duration: number, interest: number) {
        this._id = id;
        this._name = name;
        this._requiredFans = requiredFans;
        this._amount = amount;
        this._durationInMonths = duration;
        this._interest = interest;
    }

    public canApply(cinama : Cinema) : boolean {
        if(this._requiredFans <= cinama.fans) {
            return true;
        }
        return false;
    }

    public recieve(cinema : Cinema) {
        cinema.financeManager.earn(this._amount, 'Recieved loan');
    }

    get name(): string {
        return this._name;
    }

    get requiredFans(): number {
        return this._requiredFans;
    }

    get amount(): number {
        return this._amount;
    }

    get durationInMonths(): number {
        return this._durationInMonths;
    }

    get interest(): number {
        return this._interest;
    }

    public calcMonthlyPayment() : number {
        let baseAmount = this.amount / this.durationInMonths;
        return baseAmount + (baseAmount * this.interest / 100);
    }
}

class LoanTaken {
    private loan : Loan;
    private durationLeft : number;

    constructor(loan: Loan) {
        this.loan = loan;
        this.durationLeft = loan.durationInMonths;
    }

    public pay(cinema : Cinema) {
        if(this.durationLeft === 0) {
            throw new LoanException('Loan is paid off');
        }

        cinema.financeManager.pay(this.loan.calcMonthlyPayment(), 'Paying loan');

        this.durationLeft--;


    }
}

class MafiaLoan extends Loan {
    constructor(amount: number, duration: number, interest: number) {
        super('Mafia loan', 0, amount, duration, interest);
    }

    public canApply(cinema : Cinema) : boolean {
        if(0 >= cinema.financeManager.credit) {
            return true;
        }
        return false;
    }
}

export {Loan, MafiaLoan, LoanTaken }