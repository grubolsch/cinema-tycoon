enum MONTHS {
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
}

class TimeManager {
    //CONFIG
    private readonly TICKS_IN_MIN : number = 30;// the base speed

    private readonly  MINS_IN_HOURS = 60;
    private readonly  HOURS_IN_DAYS = 24;
    private readonly  DAYS_IN_MONTH = 4;
    private readonly  WEEKS_IN_MONTH = 4;
    private readonly  MONTHS_IN_YEAR = 12;

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

    private fixNumber(value : number) {
        return Math.floor(Math.max(0, value));
    }

    public updateTime() : void {
        this.ticks += this.TICKS_IN_MIN;

        let tmpTicks = this.ticks;

        let calc = this.MINS_IN_HOURS * this.HOURS_IN_DAYS * this.DAYS_IN_MONTH * this.WEEKS_IN_MONTH * this.MONTHS_IN_YEAR;
        let newYear = this.fixNumber(tmpTicks / calc);
        if(newYear) {
            tmpTicks -= newYear * calc;
        }

//23040 = month

        calc = this.MINS_IN_HOURS * this.HOURS_IN_DAYS * this.DAYS_IN_MONTH * this.WEEKS_IN_MONTH;
        let newMonth = this.fixNumber(tmpTicks / calc);
        if(newMonth) {
            tmpTicks -= newMonth * calc;
        }

        calc = this.MINS_IN_HOURS * this.HOURS_IN_DAYS * this.DAYS_IN_MONTH;
        let newWeek = this.fixNumber(tmpTicks / calc);
        if(newWeek) {
            tmpTicks -= newWeek * calc;
        }

        calc = this.MINS_IN_HOURS * this.HOURS_IN_DAYS ;
        let newDay = this.fixNumber(tmpTicks / calc);
        if(newDay) {
            tmpTicks -= newDay * calc;
        }

        calc = this.MINS_IN_HOURS;
        let newHour = this.fixNumber(tmpTicks / calc);
        if(newHour) {
            tmpTicks -= newHour * calc;
        }

        let newMinute = this.fixNumber(tmpTicks);

        //lets see if some datecategory had a changed, let the observers know
        if(newHour != this._hour) {
            this.observer.trigger('hour', [TimeManager]);
        }
        if(newDay != this._day) {
            this.observer.trigger('day', [TimeManager]);
        }
        if(newWeek != this._week) {
            this.observer.trigger('week', [TimeManager]);
        }
        if(newMonth != this._month) {
            this.observer.trigger('month', [TimeManager]);
        }
        if(newYear != this._year) {
            this.observer.trigger('year', [TimeManager]);
        }

        this._minute = newMinute;
        this._hour = newHour;
        this._day = newDay;
        this._week = newWeek;
        this._month = newMonth;
        this._year = newYear;
    }

    public getDate() : string {
        const formatMinute = this._minute.toString().padStart(2, 0);
        const formatHour = this._hour.toString().padStart(2, 0);

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
        return this.DAYS_IN_MONTH * this.WEEKS_IN_MONTH;
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
}