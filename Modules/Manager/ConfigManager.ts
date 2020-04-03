class ConfigManager {
    private readonly _credit : number = 10000;
    private readonly _ticketprice : number  = 10;
    private readonly _fans : number  = 0;

    //Config customer
    private readonly _breakTolerance = 0.2;
    private readonly _commercialTolerance = 0.2;


    get credit(): number {
        return this._credit;
    }

    get ticketprice(): number {
        return this._ticketprice;
    }

    get fans(): number {
        return this._fans;
    }

    get breakTolerance(): number {
        return this._breakTolerance;
    }

    get commercialTolerance(): number {
        return this._commercialTolerance;
    }
}

export { ConfigManager };