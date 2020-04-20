import {ConfigManager} from "./ConfigManager";
import {capitalize} from "../Utils";

class FinanceReport extends Map<string, number> {}

class FinanceManager {
    private _incomeReport : FinanceReport = new FinanceReport;
    private _expensesReport : FinanceReport = new FinanceReport;

    private _credit : number;

    public constructor(startConfig : ConfigManager) {
        this._credit = startConfig.credit;
    }

    public canAfford(value : number) : boolean {
        return (this._credit >= value);
    }

    public pay(value : number, description : string) : void {
        if(this.bookTransaction(value, description, this._expensesReport)) {
            this._credit -= value;
        }
    }

    public earn(value : number, description : string) : void {
        if(this.bookTransaction(value, description, this._incomeReport)) {
            this._credit += value;
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

    calculateTotal() : number {
        let income = Array.from(this._incomeReport).reduce(function(a,b, d){
            return a + d;
        }, 0);
        let expenses = Array.from(this._incomeReport).reduce(function(a,b, d){
            return a + d;
        }, 0);

        return income - expenses;
    }

    //this is run every month to clear the statistics
    resetReports() : void {
        this._incomeReport = new FinanceReport;
        this._expensesReport = new FinanceReport;
    }
}

export { FinanceManager , FinanceReport};