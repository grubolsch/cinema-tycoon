import {ConfigManager} from "./ConfigManager";
import {Cinema} from "../Entity/Cinema";
import researchJson from "../Assets/research.json";
import {ResearchExtraInfo} from "../Entity/Research/ResearchExtraInfo";
import {ResearchCategory} from "../Entity/Research/ResearchCategory";
import {ResearchItem} from "../Entity/Research/ResearchItem";
import {Observer} from "./Observer";

class ResearchManager {
    private readonly DOUBLE_MAX_RESEARCH: number = 2;

    private _configManager : ConfigManager;
    private _cinema: Cinema;

    private _tree : Map<number, ResearchItem> = new Map<number, ResearchItem>();

    private _categories : Map<string, ResearchCategory> = new Map<string, ResearchCategory>();

    private _activeResearch : ResearchItem|null = null;
    private _level : number;
    private progressSaved: number = 0;

    constructor(cinema : Cinema, configManager: ConfigManager) {
        this._cinema = cinema;
        this._configManager = configManager;
        this._level = configManager.researchDefaultValue;

        this.ResearchTreeImport();
    }

    private ResearchTreeImport() {
        for (let i in researchJson.research) {
            let json = researchJson.research[i];

            if (!this._categories.has(json.category)) {
                this._categories.set(json.category, new ResearchCategory(json.category));
            }

            let category = this._categories.get(json.category)!;
            let researchItem = new ResearchItem(json.id, json.name, category, [json.availableFrom[0], json.availableFrom[1]], <number>json.points);
            if (json.popularity !== undefined) {
                researchItem.addExtraInfo(new ResearchExtraInfo(json.popularity, json.buildCost, json.maintenanceCost));
            }

            category.tree.set(json.id, researchItem);
            this._tree.set(json.id, researchItem);
        }
    }

    get tree(): Map<number, ResearchItem> {
        return this._tree;
    }

    setActiveResearch(researchItem : ResearchItem|null) : boolean {
        if(researchItem === null) {
            this._activeResearch = null;
            return true;
        }

        if(!researchItem.canResearch(this._cinema.timeManager)) {
            return false;
        }

        this._activeResearch = researchItem;

        return true;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    getMontlyCost() : number {
        if(this._activeResearch  === null) {
            return 0;
        }

        let baseCost : number = this._level * this._configManager.researchDefaultCostPerPoint;
        let percentageIncrease : number = (this._cinema.roomManager.rooms.size-1) * this._configManager.researchIncreasePercentageCostPerRoom;

        return baseCost + (baseCost * percentageIncrease / 100);
    }

    update(observer : Observer) : void {
        if(this._level <= 0 || this._activeResearch === null) {
            return;
        }

        this.progressSaved = this._activeResearch.addProgress(this._level + this.progressSaved);

        if(this._activeResearch.isResearched) {
            observer.trigger(observer.RESEARCH_FINISHED, {'research' : this._activeResearch});

            this._activeResearch = null;
        }

        this._cinema.financeManager.pay(this.getMontlyCost(), 'research');
    }

    getMaxLevel() : number {
        return this._configManager.researchDefaultValue * this.DOUBLE_MAX_RESEARCH;
    }

    getProgressPercentage() : number {
        if(this._activeResearch === null) {
            return 0;
        }
        return this._activeResearch.getProgressPercentage();
    }


    get activeResearch(): ResearchItem | null {
        return this._activeResearch;
    }


    get categories(): Map<string, ResearchCategory> {
        return this._categories;
    }
}

export {ResearchManager}