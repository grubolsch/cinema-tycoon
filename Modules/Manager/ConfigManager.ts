class ConfigManager {
    private readonly _credit : number = 10000;
    private readonly _ticketprice : number  = 10;
    private readonly _fans : number  = 0;
    private readonly _researchDefaultValue : number = 100;
    private readonly _researchDefaultCostPerPoint : number = 12;
    private readonly _researchIncreasePercentageCostPerRoom : number = 20;

    //Config customer
    private readonly _breakTolerance = 0.2;
    private readonly _commercialTolerance = 0.2;

    private readonly _hypeChance : number = 50;
    private readonly _hypeChanceDropRate : number = 10;
    private readonly _hypeMinimumDuration : number = 2;
    private readonly _hypeMaximumDuration : number = 6;

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

    get researchDefaultValue(): number {
        return this._researchDefaultValue;
    }

    get researchDefaultCostPerPoint(): number {
        return this._researchDefaultCostPerPoint;
    }

    get researchIncreasePercentageCostPerRoom(): number {
        return this._researchIncreasePercentageCostPerRoom;
    }

    get hypeChance(): number {
        return this._hypeChance;
    }

    get hypeChanceDropRate(): number {
        return this._hypeChanceDropRate;
    }

    get hypeMinimumDuration(): number {
        return this._hypeMinimumDuration;
    }

    get hypeMaximumDuration(): number {
        return this._hypeMaximumDuration;
    }
}

export { ConfigManager }