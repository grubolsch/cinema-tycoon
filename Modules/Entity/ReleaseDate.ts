import {TimeManager} from "../Manager/TimeManager";

class ReleaseDate {
    private readonly _year : number;
    private readonly _month : number;

    constructor(year: number, month: number) {
        this._year = year;
        this._month = month;
    }

    get year(): number {
        return this._year;
    }

    get month(): number {
        return this._month;
    }

    calculateDifferenceInMonths(timeManager : TimeManager) : number {
        return Math.max(0, timeManager.month - this.month) + Math.min(0, timeManager.year - this.year) * TimeManager.MONTHS_IN_YEAR
    }
}

export {ReleaseDate}