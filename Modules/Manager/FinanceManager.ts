import {ConfigManager} from "./ConfigManager";
import {capitalize} from "../Utils";

class FinanceReport extends Map<string, number> {}

class FinanceManager {
    private _incomeReport : FinanceReport = new FinanceReport;
    private _expensesReport : FinanceReport = new FinanceReport;
    private _balance : number = 0;
    private _credit: number;

    public constructor(startConfig: ConfigManager) {
        this._credit = startConfig.credit;
    }

    public canAfford(value: number, allowDebt : boolean = false): boolean {
        if (this._credit >= value || value === 0){
            return true;
        }
        if (allowDebt){
            return window.confirm('Are you sure you want to pay € ' + value + '? This would put you in the red!');
        }
        return false;
    }

    public pay(value : number, description : string) : void {
        if(this.bookTransaction(value, description, this._expensesReport)) {
            this._credit -= value;
            this._balance -= value;
        }
    }

    public earn(value : number, description : string) : void {
        if(this.bookTransaction(value, description, this._incomeReport)) {
            this._credit += value;
            this._balance += value;
        }
    }

    private bookTransaction(value : number, description : string, report : FinanceReport) {
        if(value === 0) {
            return false;
        }
        value = Math.abs(value);

        description = capitalize(description);

        let previousAmount = (report.has(description)) ? <number>report.get(description) : 0;
        report.set(description, value + previousAmount);

        return true;
    }

    get credit(): number {
        return this._credit;
    }

    get incomeReport(): FinanceReport {
        return this._incomeReport;
    }

    get expensesReport(): FinanceReport {
        return this._expensesReport;
    }

    get balance(): number {
        return this._balance;
    }

//this is run every month to clear the statistics
    resetReports() : void {
        this._incomeReport = new FinanceReport;
        this._expensesReport = new FinanceReport;
        this._balance = 0;
    }
}

export { FinanceManager , FinanceReport};