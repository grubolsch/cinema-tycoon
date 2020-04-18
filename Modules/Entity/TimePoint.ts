import {TimeManager} from "../Manager/TimeManager";

class TimePoint {
    private readonly MINUTES_IN_HOUR = 60;

    private _hour : number;
    private _minute : number;
    private readonly _timeInMinutes : number;

    constructor(hours: number, minutes: number) {
        this._hour = hours;
        this._minute = minutes;

        this._timeInMinutes = Math.round(hours * TimeManager.MINS_IN_HOURS + minutes);
    }

    get hour(): number {
        return this._hour;
    }

    get minute(): number {
        return this._minute;
    }

    getFullNumber() : number {
        return parseInt(this._hour.toString() + this._minute.toString().padEnd(2, '0'));
    }

    format() : string {
        return this.hour +':'+ this.minute.toString().padEnd(2, '0');
    }

    //this is an immutable object, changing the time gives you a new TimePoint object
    addMinutes(extraMinutes : number) : TimePoint {
        let timeInMinutes : number = this._timeInMinutes + extraMinutes;

        let hours : number = Math.floor(timeInMinutes / 60);
        let minutes : number = timeInMinutes % 60;

        return new TimePoint(hours, minutes);
    }

    get timeInMinutes(): number {
        return this._timeInMinutes;
    }

    static fromMinutes(minutes : number) : TimePoint {
        let timePoint = new TimePoint(0, 0);
        return timePoint.addMinutes(minutes);
    }

    hasTimePassed(hour : number, minute: number) : boolean {
        return ((this.hour === hour && this.minute >= minute)
            || (this.hour > hour));
    }
}

export {TimePoint}