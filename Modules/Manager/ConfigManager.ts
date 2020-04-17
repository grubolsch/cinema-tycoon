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

    //Room
    private readonly _small = 'small';
    private readonly _meidium = 'medium';
    private readonly _large = 'large';

    private readonly _smallRoomMaintanaceCost = 100;
    private readonly _mediumRoomMaintanaceCost = 150;
    private readonly _largeRoomMaintanaceCost = 200;

    private readonly _smallRoomRows = 5;
    private readonly _mediumRoomRows = 7;
    private readonly _largeRoomRoomRows = 9;

    private readonly _seatsPerRow = 12;

    private readonly _newRoomPrice = 20000;
    private readonly _newRoomPriceCoefficient = 0.25;
    private readonly _roomUpgradeCost = 10000;


    private readonly _maximumRoomsDefault = 3;
    private readonly _maximumRoomsExtra = 2;

    private readonly _roomQualityProportionSeats = 0.20;

    //Room components
    private readonly _screen = 'screen';
    private readonly _projector = 'projector';
    private readonly _sound = 'sound';
    private readonly _heating = 'heating';

    private readonly _roomQualityProportionScreen = 0.25;
    private readonly _roomQualityProportionProjector = 0.30;
    private readonly _roomQualityProportionSound = 0.20;
    private readonly _roomQualityProportionHeating = 0.05;

    private readonly _basicScreenQuality = 20;
    private readonly _basicScreenDailyCost = 20;

    private readonly _basicProjectorQuality = 20;
    private readonly _basicProjectorDailyCost = 20;

    private readonly _basicSoundQuality = 20;
    private readonly _basicSoundDailyCost = 20;

    private readonly _basicHeatingQuality = 20;
    private readonly _basicHeatingDailyCost = 20;

    private readonly _maxPopularityPenalty: number = 100;

    private readonly _popularityDeviation: number = 2;
    private readonly _popularityToCustomerFactor: number = 10;
    private readonly _releaseDatePenalty: number = 5;
    private readonly _movieDurations: Array<number> = [90, 120, 150, 180];

    public readonly customerWaitingHour: number = 2;
    public readonly chanceWatchingAnotherMovie: number = 50;

    public readonly ticketBreakpointCustomer: number = 2;
    public readonly ticketBreakpointFan: number = 3;
    public readonly ticketCheapBonusThreshold: number = 0.5;

    public readonly boothBaseSpeed : number = 5;
    public readonly pcSpeedBonus: number = .8;
    public readonly queueSecondBreakpoint: number = 1.5;
    public readonly queueFinalBreakpoint: number = 2;
    public readonly cashierWages: number = 50;
    public readonly boothBuildprice : number = 3000;



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

    get small(): string {
        return this._small;
    }

    get meidium(): string {
        return this._meidium;
    }

    get large(): string {
        return this._large;
    }

    get smallRoomMaintanaceCost(): number {
        return this._smallRoomMaintanaceCost;
    }

    get mediumRoomMaintanaceCost(): number {
        return this._mediumRoomMaintanaceCost;
    }

    get largeRoomMaintanaceCost(): number {
        return this._largeRoomMaintanaceCost;
    }

    get smallRoomRows(): number {
        return this._smallRoomRows;
    }

    get mediumRoomRows(): number {
        return this._mediumRoomRows;
    }

    get largeRoomRoomRows(): number {
        return this._largeRoomRoomRows;
    }

    get seatsPerRow(): number {
        return this._seatsPerRow;
    }

    get newRoomPrice(): number {
        return this._newRoomPrice;
    }

    get newRoomPriceCoefficient() {
        return this._newRoomPriceCoefficient;
    }

    get roomUpgradeCost(): number {
        return this._roomUpgradeCost;
    }

    get maximumRoomsDefault(): number {
        return this._maximumRoomsDefault;
    }

    get maximumRoomsExtra(): number {
        return this._maximumRoomsExtra;
    }

    get roomQualityProportionSeats(): number {
        return this._roomQualityProportionSeats;
    }

    get screen(): string {
        return this._screen;
    }

    get projector(): string {
        return this._projector;
    }

    get sound(): string {
        return this._sound;
    }

    get heating(): string {
        return this._heating;
    }

    get roomQualityProportionScreen(): number {
        return this._roomQualityProportionScreen;
    }

    get roomQualityProportionProjector(): number {
        return this._roomQualityProportionProjector;
    }

    get roomQualityProportionSound(): number {
        return this._roomQualityProportionSound;
    }

    get roomQualityProportionHeating(): number {
        return this._roomQualityProportionHeating;
    }

    get basicScreenQuality(): number {
        return this._basicScreenQuality;
    }

    get basicScreenDailyCost(): number {
        return this._basicScreenDailyCost;
    }

    get basicProjectorQuality(): number {
        return this._basicProjectorQuality;
    }

    get basicProjectorDailyCost(): number {
        return this._basicProjectorDailyCost;
    }

    get basicSoundQuality(): number {
        return this._basicSoundQuality;
    }

    get basicSoundDailyCost(): number {
        return this._basicSoundDailyCost;
    }

    get basicHeatingQuality(): number {
        return this._basicHeatingQuality;
    }

    get basicHeatingDailyCost(): number {
        return this._basicHeatingDailyCost;
    }

    get maxPopularityPenalty(): number {
        return this._maxPopularityPenalty;
    }

    get popularityDeviation(): number {
        return this._popularityDeviation;
    }

    get popularityToCustomerFactor(): number {
        return this._popularityToCustomerFactor;
    }

    get releaseDatePenalty(): number {
        return this._releaseDatePenalty;
    }

    get movieDurations(): Array<number> {
        return this._movieDurations;
    }
}

export { ConfigManager }