import {Observer} from "./Observer";

enum MONTHS {
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
}

class TimeManager {
    //CONFIG
    private readonly TICKS_IN_MIN : number = 30;// the base speed

    public static readonly MINS_IN_HOURS : number  = 60;
    public static readonly  HOURS_IN_DAYS : number  = 24;
    public static readonly  DAYS_IN_WEEK : number  = 4;
    public static readonly  WEEKS_IN_MONTH : number  = 4;
    public static readonly MONTHS_IN_YEAR : number = 12;

    private readonly startYear : number = 1980;
    //END CONFIG

    private _minute : number = 0;
    private _hour : number = 0;
    private _day : number = 0;
    private _week : number = 0;
    private _month : number = 0;
    private _year : number = 0;

    private ticks : number = 0;

    private observer: Observer;

    constructor(observer : Observer) {
        this.observer = observer;
    }

    private fixNumber(value : number) : number {
        return Math.floor(Math.max(0, value));
    }

    public updateTime() : void {
        this.ticks += this.TICKS_IN_MIN;

        let tmpTicks = this.ticks;

        let calc = TimeManager.MINS_IN_HOURS * TimeManager.HOURS_IN_DAYS * TimeManager.DAYS_IN_WEEK * TimeManager.WEEKS_IN_MONTH * TimeManager.MONTHS_IN_YEAR;
        let newYear = this.fixNumber(tmpTicks / calc);
        if(newYear) {
            tmpTicks -= newYear * calc;
        }

        calc = TimeManager.MINS_IN_HOURS * TimeManager.HOURS_IN_DAYS * TimeManager.DAYS_IN_WEEK * TimeManager.WEEKS_IN_MONTH;
        let newMonth = this.fixNumber(tmpTicks / calc);
        if(newMonth) {
            tmpTicks -= newMonth * calc;
        }

        calc = TimeManager.MINS_IN_HOURS * TimeManager.HOURS_IN_DAYS * TimeManager.DAYS_IN_WEEK;
        let newWeek = this.fixNumber(tmpTicks / calc);
        if(newWeek) {
            tmpTicks -= newWeek * calc;
        }

        calc = TimeManager.MINS_IN_HOURS * TimeManager.HOURS_IN_DAYS ;
        let newDay = this.fixNumber(tmpTicks / calc);
        if(newDay) {
            tmpTicks -= newDay * calc;
        }

        calc = TimeManager.MINS_IN_HOURS;
        let newHour = this.fixNumber(tmpTicks / calc);
        if(newHour) {
            tmpTicks -= newHour * calc;
        }

        let newMinute = this.fixNumber(tmpTicks);

        //lets see if some datecategory had a changed, let the observers know
        if(newMinute === (TimeManager.MINS_IN_HOURS/2)) {
            this.observer.trigger(this.observer.HALFHOUR, {'timeManager': TimeManager});
        }
        if(newHour != this._hour) {
            this.observer.trigger(this.observer.HALFHOUR, {'timeManager': TimeManager});
            this.observer.trigger(this.observer.HOUR, {'timeManager': TimeManager});
        }
        if(newDay != this._day) {
            this.observer.trigger(this.observer.DAY, {'timeManager': TimeManager});
        }
        if(newWeek != this._week) {
            this.observer.trigger(this.observer.WEEK, {'timeManager': TimeManager});
        }
        if(newMonth != this._month) {
            this.observer.trigger(this.observer.MONTH, {'timeManager': TimeManager});
        }
        if(newYear != this._year) {
            this.observer.trigger(this.observer.YEAR, {'timeManager': TimeManager});
        }

        this._minute = newMinute;
        this._hour = newHour;
        this._day = newDay;
        this._week = newWeek;
        this._month = newMonth;
        this._year = newYear;
    }

    public getDate() : string {
        const formatMinute = this._minute.toString().padStart(2, '0');
        const formatHour = this._hour.toString().padStart(2, '0');

        return formatHour + ':' + formatMinute + ' day ' + this.day + ', week ' + this.week + ' ' + MONTHS[this._month] + ' ' + this.year;
    }

    get year() : number {
        return this.startYear + this._year;
    }

    get month() : number {
        return this._month + 1;
    }

    get monthAsWord() : string {
        return MONTHS[this._month];
    }

    get daysInMonth()  : number {
        return TimeManager.DAYS_IN_WEEK * TimeManager.WEEKS_IN_MONTH;
    }

    get week() : number  {
        return this._week + 1;
    }

    get day() : number  {
        return this._day + 1;
    }

    get hour() : number  {
        return this._hour;
    }

    get minute() : number  {
        return this._minute;
    }

    hasDatePassed(year: number, month: number) : boolean {
        return ((this.year === year && this.month >= month)
            || (this.year > year));
    }

    hasTimePassed(hour : number, minute: number) : boolean {
        return ((this.hour === hour && this.minute >= minute)
            || (this.hour > hour));
    }
}

export { TimeManager, MONTHS };