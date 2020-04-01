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

    public canApply(cinema : Cinema) : boolean {
        if(this._requiredFans <= cinema.fans) {
            return true;
        }
        return false;
    }

    public recieve(cinema : Cinema) {
        cinema.financeManager.earn(this._amount, 'Recieved loan');
    }

    get id(): number {
        return this._id;
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

class MafiaLoan extends Loan {
    constructor(id: number, amount: number, duration: number, interest: number) {
        super(id, 'Mafia loan', 0, amount, duration, interest);
    }

    public canApply(cinema : Cinema) : boolean {
        return 0 >= cinema.financeManager.credit;
    }
}

export {Loan, MafiaLoan }