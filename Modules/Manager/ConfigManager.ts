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
    private readonly _popularityDropThreshold1 : number = 1;
    private readonly _popularityDropThreshold2 : number = 3;
    private readonly _popularityDrop1 : number = 20;
    private readonly _popularityDrop2 : number = 50;
    private readonly _popularityDrop3 : number = 80;

    private readonly _customerBase : number = 108;
    private readonly _customerGenreBonus : number = 20;
    private readonly _customerGenrePenalty : number = 20;
    private readonly _customerBlockbusterBonus : number = 20;
    private readonly _customerArthousePenalty : number = 20;
    private readonly _blockbusterMinRating: number = 8;
    private readonly _blockbusterChance: number = 50;
    private readonly _arthouseChance: number = 5;

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

    get popularityDropThreshold1(): number {
        return this._popularityDropThreshold1;
    }

    get popularityDropThreshold2(): number {
        return this._popularityDropThreshold2;
    }

    get popularityDrop1(): number {
        return this._popularityDrop1;
    }

    get popularityDrop2(): number {
        return this._popularityDrop2;
    }

    get popularityDrop3(): number {
        return this._popularityDrop3;
    }

    get customerBase(): number {
        return this._customerBase;
    }

    get customerGenreBonus(): number {
        return this._customerGenreBonus;
    }

    get customerGenrePenalty(): number {
        return this._customerGenrePenalty;
    }

    get customerBlockbusterBonus(): number {
        return this._customerBlockbusterBonus;
    }

    get customerArthousePenalty(): number {
        return this._customerArthousePenalty;
    }
    
    get blockbusterMinRating(): number {
        return this._blockbusterMinRating;
    }

    get blockbusterChance(): number {
        return this._blockbusterChance;
    }

    get arthouseChance(): number {
        return this._arthouseChance;
    }
}

export { ConfigManager }