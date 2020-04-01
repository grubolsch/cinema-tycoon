import {ConfigManager} from "./ConfigManager";

class FinanceManager {
    private _credit : number;

    public constructor(startConfig : ConfigManager) {
        this._credit = startConfig.credit;
    }

    public canAfford(value : number) : boolean {
        return (this._credit >= value);
    }

    public pay(value : number, description : string) : boolean {
        console.info('Paid money', value, description);//just for debugging
        this._credit -= value;
        return true;
    }

    public earn(value : number, description : string) : void {
        this._credit += value;
        console.info('Earned money', value, description);//just for debugging
    }

    get credit(): number {
        return this._credit;
    }
}

export { FinanceManager };