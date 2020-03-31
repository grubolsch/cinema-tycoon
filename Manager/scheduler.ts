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

    private minute : number = 1;
    private hour : number = 1;
    private day : number = 1;
    private week : number = 1;
    private month : number = 1;
    private year : number = 1980;

//    private readonly monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //END CONFIG

    private ticks : number = 0;

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

        newYear += this.startYear;
        newMonth++;
        newWeek++;
        newDay++;
        newHour++;
        newMinute++;

        //lets see if some datecategory had a check, let the observers know
        if(newHour != this.hour) {
            $( document ).trigger( "hour", [newHour]);
        }
        if(newDay != this.day) {
            $( document ).trigger( "day", [newDay]);
        }
        if(newWeek != this.week) {
            $( document ).trigger( "week", [newWeek]);
        }
        if(newMonth != this.month) {
            $( document ).trigger( "month", [newMonth]);
        }
        if(newYear != this.year) {
            $( document ).trigger( "year", [newYear]);
        }

        this.minute = newMinute;
        this.hour = newHour;
        this.day = newDay;
        this.week = newWeek;
        this.month = newMonth;
        this.year = newYear;
    }

    public getDate() : string {
        const formatMinute = this.minute.toString().padEnd(2, 0);
        const formatHour = this.hour.padEnd(2, 0);

        return formatMinute + ':' + formatHour + ' day ' + this.day + ', week ' + this.week + ' ' + MONTHS[this.month-1] + ' ' + this.year;
    }

    get getMonth() : number {
        return this.month;
    }

    get getMonthAsWord() : string {
        return MONTHS[this.month-1];
    }

    get getYear()  : number {
        return this.year;
    }

    get getHour() : number  {
        return this.hour;
    }

    get getDaysInMonth()  : number {
        return this.DAYS_IN_MONTH * this.WEEKS_IN_MONTH;
    }
}