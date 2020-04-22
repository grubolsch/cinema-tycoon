import {FinanceManager} from "../Manager/FinanceManager";
import {TimeManager} from "../Manager/TimeManager";
import {ConfigManager} from "../Manager/ConfigManager";
import {MarketingManager} from "../Manager/MarketingManager";
import {LoanTaken} from "./LoanTaken";
import {BoothManager} from "../Manager/BoothManager";
import {RoomManager} from "../Manager/RoomManager";
import {Scheduler} from "./Scheduler";
import {ResearchManager} from "../Manager/ResearchManager";
import {MovieManager} from "../Manager/MovieManager";
import {GenreManager} from "../Manager/GenreManager";
import {CustomerSpawnerManager} from "../Manager/CustomerSpawnerManager";
import {ReleaseDatePenaltyManager} from "../Manager/ReleaseDatePenaltyManager";
import {CustomerManager} from "../Manager/CustomerManager";
import {FacilityManager} from "../Manager/FacilityManager";
import {StatisticsManager} from "../Manager/StatisticsManager";
import {ProductManager} from "../Manager/ProductManager";
import {ShopTypeManager} from "../Manager/ShopTypeManager";
import {FreeTicketDistributor} from "../Manager/FreeTicketDistributor";


class Cinema {
    private _name: string;
    private _fans: number;
    private _ticketPrice: number;

    private _loans: Map<number, LoanTaken> = new Map<number, LoanTaken>();

    private readonly _timeManager: TimeManager;
    private readonly _financeManager: FinanceManager;
    private readonly _boothManager: BoothManager;
    private readonly _researchManager: ResearchManager;
    private readonly _marketingManager: MarketingManager;
    private readonly _config: ConfigManager;
    private readonly _movieManager: MovieManager;
    private readonly _scheduler: Scheduler;
    private readonly _roomManager: RoomManager;
    private readonly _customerSpawnerManager: CustomerSpawnerManager;
    private readonly _releaseDatePenaltyManager: ReleaseDatePenaltyManager;
    private readonly _customerManager: CustomerManager;
    private readonly _facilityManager: FacilityManager;
    private readonly _statisticsManager: StatisticsManager;
    private readonly _productManager: ProductManager;
    private readonly _shopTypeManager: ShopTypeManager;
    private readonly _freeTicketDistributor: FreeTicketDistributor;


    public constructor(name: string, TimeManager: TimeManager, config: ConfigManager, financeManager: FinanceManager) {
        this._name = name;
        this._fans = config.fans;
        this._ticketPrice = config.ticketprice;
        this._timeManager = TimeManager;
        this._financeManager = financeManager;
        this._marketingManager = new MarketingManager(config);

        this._config = config;
        this._roomManager = new RoomManager(this, config);
        this._scheduler = new Scheduler(this);
        this._boothManager = new BoothManager(this);
        this._researchManager = new ResearchManager(this, config);
        this._customerSpawnerManager = new CustomerSpawnerManager(this, config);
        this._releaseDatePenaltyManager = new ReleaseDatePenaltyManager(this, config);
        this._movieManager = new MovieManager(this, config, new GenreManager(config));
        this._customerManager = new CustomerManager();
        this._facilityManager = new FacilityManager(this, config);
        this._statisticsManager = new StatisticsManager(this);
        this._productManager = new ProductManager();
        this._shopTypeManager = new ShopTypeManager(this._productManager);
        this._freeTicketDistributor = new FreeTicketDistributor(config);
    }

    get name(): string {
        return this._name;
    }

    get fans(): number {
        return this._fans;
    }

    public addFan(): void {
        this._fans++;
    }

    loseFan() {
        this._fans--;
    }

    get ticketPrice(): number {
        return this._ticketPrice;
    }

    get timeManager(): TimeManager {
        return this._timeManager;
    }

    get financeManager(): FinanceManager {
        return this._financeManager;
    }

    get boothManager(): BoothManager {
        return this._boothManager;
    }

    get scheduler(): Scheduler {
        return this._scheduler;
    }

    get researchManager(): ResearchManager {
        return this._researchManager;
    }

    get customerSpawnerManager(): CustomerSpawnerManager {
        return this._customerSpawnerManager;
    }

    get freeTicketDistributor(): FreeTicketDistributor {
        return this._freeTicketDistributor;
    }

    public update() {
        this.boothManager.update();

        this.timeManager.updateTime();
        this._releaseDatePenaltyManager.update();

        this.customerManager.update(this);
    }

    get loans(): Map<number, LoanTaken> {
        return this._loans;
    }

    get marketingManager(): MarketingManager {
        return this._marketingManager;
    }

    get genreManager(): GenreManager {
        return this._movieManager.genreManager;
    }

    get movieManager(): MovieManager {
        return this._movieManager;
    }

    get roomManager(): RoomManager {
        return this._roomManager;
    }

    get customerManager(): CustomerManager {
        return this._customerManager;
    }

    get facilityManager(): FacilityManager {
        return this._facilityManager;
    }

    get config(): ConfigManager {
        return this._config;
    }

    get statisticsManager(): StatisticsManager {
        return this._statisticsManager;
    }

    get productManager(): ProductManager {
        return this._productManager;
    }

    set ticketPrice(value: number) {
        this._ticketPrice = value;
    }
}

export {Cinema};