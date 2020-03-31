class ConfigManager {
    private readonly _credit : number = 10000;
    private readonly _ticketprice : number  = 10;
    private readonly _fans : number  = 0;

    get credit(): number {
        return this._credit;
    }

    get ticketprice(): number {
        return this._ticketprice;
    }

    get fans(): number {
        return this._fans;
    }
}

export { ConfigManager };