class ConfigManager {

    public readonly credit: number = 50000;
    public readonly ticketprice: number = 10;
    public readonly fans: number = 0;
    public readonly researchDefaultValue: number = 100;
    public readonly researchDefaultCostPerPoint: number = 12;
    public readonly researchIncreasePercentageCostPerRoom: number = 20;

    public readonly commercialFeePerCustomer = 0.10;

    //Config customer
    public readonly commercialTolerance = 20;

    public readonly minQueueingTolerance = 2;
    public readonly maxQueueingTolerance = 5;
    public readonly minPriceToleranceShop = 12;
    public readonly maxPriceToleranceShop = 25;
    public readonly minPriceToleranceTicket = 12;
    public readonly maxPriceToleranceTicket = 25;

    public readonly baseShoppingChance: number = 40;
    public readonly fanShoppingBonus: number = 20;

    public readonly hypeChance: number = 50;
    public readonly hypeChanceDropRate: number = 10;
    public readonly hypeMinimumDuration: number = 2;
    public readonly hypeMaximumDuration: number = 6;
    public readonly popularityDropThreshold1: number = 1;
    public readonly popularityDropThreshold2: number = 3;
    public readonly popularityDrop1: number = 20;
    public readonly popularityDrop2: number = 50;
    public readonly popularityDrop3: number = 80;

    public readonly customerBase: number = 108;
    public readonly customerGenreBonus: number = 20;
    public readonly customerGenrePenalty: number = 20;
    public readonly customerBlockbusterBonus: number = 20;
    public readonly customerArthousePenalty: number = 20;
    public readonly blockbusterMinRating: number = 8;
    public readonly blockbusterChance: number = 50;
    public readonly arthouseChance: number = 5;

    public readonly maxFreeTicketPercentage: number = 75;
    public readonly freeTicketSlope: number = 3; // 1 = very steep, 2 = less steep, 3 = even less steep
    public readonly freeTicketCostPercentage: number = 20; // you pay 1/5 for every free ticket

    public readonly numberOfReviews: number = 3;

    //Marketing
    public readonly marketing_max_weeks = 12;
    public readonly marketing_min_weeks = 1;

    public readonly flyers_base_cost = 50;
    public readonly newspapers_base_cost = 250;
    public readonly radio_base_cost = 500;
    public readonly tv_base_cost = 750;
    public readonly internet_base_cost = 1000;

    public readonly flyers_base_bonus = 5;
    public readonly newspapers_base_bonus = 10;
    public readonly radio_base_bonus = 15;
    public readonly tv_base_bonus = 20;
    public readonly internet_base_bonus = 25;

    //Room
    public readonly small = 'small';
    public readonly medium = 'medium';
    public readonly large = 'large';

    public readonly smallRoomMaintenanceCost = 100;
    public readonly mediumRoomMaintenanceCost = 150;
    public readonly largeRoomMaintenanceCost = 200;

    public readonly smallRoomRows = 5;
    public readonly mediumRoomRows = 7;
    public readonly largeRoomRoomRows = 9;

    public readonly seatsPerRow = 12;

    public readonly newRoomPrice = 20000;
    public readonly newRoomPriceCoefficient = 0.25;
    public readonly roomUpgradeCost = 10000;


    public readonly maximumRoomsDefault = 3;
    public readonly maximumRoomsExtra = 2;

    public readonly roomQualityProportionSeats = 0.20;

    //Room components
    public readonly screen = 'screen';
    public readonly projector = 'projector';
    public readonly sound = 'sound';
    public readonly heating = 'heating';

    public readonly roomQualityProportionScreen = 0.25;
    public readonly roomQualityProportionProjector = 0.30;
    public readonly roomQualityProportionSound = 0.20;
    public readonly roomQualityProportionHeating = 0.05;

    public readonly basicScreenQuality = 20;
    public readonly basicScreenDailyCost = 20;

    public readonly basicProjectorQuality = 20;
    public readonly basicProjectorDailyCost = 20;

    public readonly basicSoundQuality = 20;
    public readonly basicSoundDailyCost = 20;

    public readonly basicHeatingQuality = 20;
    public readonly basicHeatingDailyCost = 20;

    public readonly maxPopularityPenalty: number = 100;

    public readonly popularityDeviation: number = 2;
    public readonly popularityToCustomerFactor: number = 10;
    public readonly releaseDatePenalty: number = 5;
    public readonly movieDurations: Array<number> = [90, 120, 150, 180];

    public readonly customerWaitingHour: number = 2;
    public readonly chanceWatchingAnotherMovie: number = 50;

    public readonly ticketBreakpointCustomer: number = 2;
    public readonly ticketBreakpointFan: number = 3;
    public readonly ticketCheapBonusThreshold: number = 0.5;

    //the amount of customers per tick
    public readonly boothBaseSpeed: number = Math.round(this.smallRoomRows * this.seatsPerRow * 1.5);
    public readonly boothTrainedSpeed: number = Math.round(this.smallRoomRows * this.seatsPerRow * 1.8);
    public readonly boothPcSpeed: number = Math.round(this.mediumRoomRows * this.seatsPerRow * 1.5);
    public readonly boothSelfService: number = Math.round(this.largeRoomRoomRows * this.seatsPerRow * 1.5);

    public readonly queueSecondBreakpoint: number = 1.5;
    public readonly queueFinalBreakpoint: number = 2;
    public readonly cashierWages: number = 15;
    public readonly boothBuildprice: number = 3000;

    public readonly chanceLosingFan : number = 50;
    public readonly bonusArthouseFanConversion : number = 20;
    public readonly penaltyBlockbusterFanConversion : number = 20;

    public readonly licenseFeeExtraPerRoom: number = 20;
    public readonly licenseBlockbusterExtraCost: number = 10;
    public readonly licenseFeeMin: number = 800;
    public readonly licenseFeeMax: number = 1000;

    public readonly thoughtPositiveBonus: number = 5;
    public readonly thoughtNegativeBonus: number = 5;

    public readonly movieToQualityFactor: number = 10 * 0.25;
    public readonly roomToQualityFactor: number = 0.75;

    public readonly qualityRoomVeryBad: number = 20;
    public readonly qualityRoomBad: number = 40;
    public readonly qualityRoomGood: number = 70;
    public readonly qualityRoomVeryGood: number = 90;

    public readonly qualityMovieVeryBad: number = 2;
    public readonly qualityMovieBad: number = 4;
    public readonly qualityMovieGood: number = 7;
    public readonly qualityMovieVeryGood: number = 9;

    //facilities
    //Common
    public readonly maximumCashiers = 4;
    public readonly defaultCashiers = 1;

    public readonly toiletBasicChance: number = 20;
    public readonly toiletDrinkChance: number = 20;
    public readonly ticksNeedToShop: number = 1;

    public readonly maxProductsInOneShopVisit: number = 4;

    public readonly serviceMaxPrice: number = 2;
    public readonly itemCheapBonusThreshold: number = 0.5;
}

export {ConfigManager}