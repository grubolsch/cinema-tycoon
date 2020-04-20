import {Cinema} from "../Entity/Cinema";

type StatisticsManagerInternalStorageType = Array<Array<Array<number>>>;

class StatisticsManager {
    private _creditOverTime : StatisticsManagerInternalStorageType = [];
    private _fansOverTime : StatisticsManagerInternalStorageType = [];
    private _visitorsOverTime : StatisticsManagerInternalStorageType = [];
    
    private _cinema : Cinema;
    
    constructor(cinema: Cinema) {
        this._cinema = cinema;
    }

    public updateWeekly() {
        const year = this._cinema.timeManager.year;
        const month = this._cinema.timeManager.month;
        const week = this._cinema.timeManager.week;

        if(!this._creditOverTime[year]) {
            this._creditOverTime[year] = [];
            this._fansOverTime[year] = [];
            this._visitorsOverTime[year] = [];
        }

        if(!this._creditOverTime[year][month]) {
            this._creditOverTime[year][month] = [];
            this._fansOverTime[year][month] = [];
            this._visitorsOverTime[year][month] = [];
        }

        this._creditOverTime[year][month][week] = this._cinema.financeManager.credit;
        this._fansOverTime[year][month][week] = this._cinema.fans;
        this._visitorsOverTime[year][month][week] = this._cinema.boothManager.visitors;

        this._fansOverTime[year][month][1] = this._cinema.fans;
        this._fansOverTime[year][month][2] = 100;
        this._fansOverTime[year][month][3] = 200;
        this._fansOverTime[year][month][4] = 300;

        this._visitorsOverTime[year][month][1] = this._cinema.fans;
        this._visitorsOverTime[year][month][2] = 100;
        this._visitorsOverTime[year][month][3] = 200;
        this._visitorsOverTime[year][month][4] = 300;

        this._creditOverTime[year][month][1] = this._cinema.fans;
        this._creditOverTime[year][month][2] = 100;
        this._creditOverTime[year][month][3] = 200;
        this._creditOverTime[year][month][4] = 300;



        this._cinema.boothManager.resetVisitors();
    }

    getCreditOverTime(year : number): Array<Array<number>>|undefined {
        return this._creditOverTime[year];

    }

    getFansOverTime(year : number): Array<Array<number>>|undefined {
        return this._fansOverTime[year];
    }

    getVisitorsOverTime(year : number): Array<Array<number>>|undefined {
        return this._visitorsOverTime[year];
    }
}

export {StatisticsManager, StatisticsManagerInternalStorageType}