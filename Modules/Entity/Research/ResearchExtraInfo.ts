class ResearchExtraInfo {
    private _popularity : number;
    private _buildCost : number;
    private _maintenanceCost : number;
    private _dateFirstBuild : [number, number]  | null = null;

    constructor(popularity: number, buildCost: number, maintenanceCost: number) {
        this._popularity = popularity;
        this._buildCost = buildCost;
        this._maintenanceCost = maintenanceCost;
    }

    get popularity(): number {
        return this._popularity;
    }

    get buildCost(): number {
        return this._buildCost;
    }

    get maintenanceCost(): number {
        return this._maintenanceCost;
    }

    get dateFirstBuild(): [number, number] | null {
        return this._dateFirstBuild;
    }

    set dateFirstBuild(value: [number, number] | null) {
        this._dateFirstBuild = value;
    }
}

export {ResearchExtraInfo}