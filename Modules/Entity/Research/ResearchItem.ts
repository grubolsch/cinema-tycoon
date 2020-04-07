import {ResearchCategory} from "./ResearchCategory";
import {ResearchExtraInfo} from "./ResearchExtraInfo";
import {ResearchException} from "../../Exception/ResearchException";

class ResearchItem {
    private _id : number;
    private _name : string;
    private _category : ResearchCategory;
    private _availableFrom : [number, number];
    private _pointsLeft: number;
    private _pointsRequired: number;
    private _researchExtraInfo: ResearchExtraInfo | null = null;
    private isResearched : boolean = false;

    constructor(id: number, name: string, category: ResearchCategory, availableFrom: [number, number], points: number) {
        this._id = id;
        this._name = name;
        this._category = category;
        this._availableFrom = availableFrom;
        this._pointsLeft = points;
        this._pointsRequired = points;
    }

    canResearch() : boolean {
        //@todo: implement
        return !this.isResearched;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get points(): number {
        return this._pointsLeft;
    }
    get category(): ResearchCategory {
        return this._category;
    }

    get availableFrom(): [number, number] {
        return this._availableFrom;
    }

    get researchExtraInfo(): ResearchExtraInfo | null {
        return this._researchExtraInfo;
    }

    addExtraInfo(researchExtraInfo: ResearchExtraInfo) {
        this._researchExtraInfo = researchExtraInfo;
    }

    //returns the amount of progress used to finish the tech.
    addProgress(progress: number) : number{
        if(progress <= 0) {
            throw ResearchException.invalidProgress(progress);
        }

        let progressUsed = Math.min(this._pointsLeft, progress);

        this._pointsLeft -= progressUsed;

        if(this._pointsLeft <= 0) {
            this.isResearched = true;
        }

        return Math.max(0, progress - progressUsed);
    }

    getProgressPercentage() : number {
        let progress = this._pointsRequired - this._pointsLeft;

        return progress * this._pointsRequired / 100;
    }
}

export {ResearchItem}