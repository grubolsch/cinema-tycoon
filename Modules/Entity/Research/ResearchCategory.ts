import {ResearchItem} from "./ResearchItem";
import {TimeManager} from "../../Manager/TimeManager";

class ResearchCategory {
    private _name: string;

    private _tree: Map<number, ResearchItem> = new Map<number, ResearchItem>();

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get tree(): Map<number, ResearchItem> {
        return this._tree;
    }

    getNextResearch(timeManager: TimeManager): ResearchItem | undefined {
        let treeAsArray = Array.from(this._tree.values());

        return treeAsArray.find(function (researchItem) {
            return researchItem.canResearch(timeManager);
        });
    }
}

export {ResearchCategory}