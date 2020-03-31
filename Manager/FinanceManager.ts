class FinanceManager {
    private _credit : number;

    public constructor(startConfig : ConfigManager) {
        this._credit = startConfig.credit;
    }

    public canAfford(value : number) : boolean {
        return (this._credit >= value)
    }

    public pay(value : number, description : string) : boolean {
        if(!this.canAfford(value)) {
            return false;
        }

        console.log('Paid money', value, description);//just for debugging
        this._credit -= value;
        return true;
    }

    public earn(value : number, description : string) : void {
        this._credit += value;
        console.log('Earned money', value, description);//just for debugging
    }

    get credit(): number {
        return this._credit;
    }
}