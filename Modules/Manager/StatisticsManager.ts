import {Cinema} from "../Entity/Cinema";

class StatisticsManager {
    private _creditOverTime : Array<Array<Number>> = [];
    private _fansOverTime : Array<Array<Number>> = [];
    private _visitorsOverTime : Array<Array<Number>> = [];
    
    private _cinema : Cinema;
    
    constructor(cinema: Cinema) {
        this._cinema = cinema;
    }

    public updateWeekly() {
        let key = this._cinema.timeManager.year +'_'+ this._cinema.timeManager.month;

        if(!this._creditOverTime[this._cinema.timeManager.year]) {
            this._creditOverTime[this._cinema.timeManager.year] = [];
        }

        this._creditOverTime[this._cinema.timeManager.year][this._cinema.timeManager.month] = this._cinema.financeManager.credit;
        this._creditOverTime[this._cinema.timeManager.year][this._cinema.timeManager.month] = this._cinema.fans;
        this._creditOverTime[this._cinema.timeManager.year][this._cinema.timeManager.month] = this._cinema.boothManager.visitors;

        this._cinema.boothManager.resetVisitors();
    }

    get creditOverTime(): Array<Array<Number>> {
        return this._creditOverTime;
    }

    get fansOverTime(): Array<Array<Number>> {
        return this._fansOverTime;
    }

    get visitorsOverTime(): Array<Array<Number>> {
        return this._visitorsOverTime;
    }
}

export {StatisticsManager}