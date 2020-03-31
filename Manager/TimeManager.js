var MONTHS;
(function (MONTHS) {
    MONTHS[MONTHS["January"] = 0] = "January";
    MONTHS[MONTHS["February"] = 1] = "February";
    MONTHS[MONTHS["March"] = 2] = "March";
    MONTHS[MONTHS["April"] = 3] = "April";
    MONTHS[MONTHS["May"] = 4] = "May";
    MONTHS[MONTHS["June"] = 5] = "June";
    MONTHS[MONTHS["July"] = 6] = "July";
    MONTHS[MONTHS["August"] = 7] = "August";
    MONTHS[MONTHS["September"] = 8] = "September";
    MONTHS[MONTHS["October"] = 9] = "October";
    MONTHS[MONTHS["November"] = 10] = "November";
    MONTHS[MONTHS["December"] = 11] = "December";
})(MONTHS || (MONTHS = {}));
var TimeManager = /** @class */ (function () {
    function TimeManager(observer) {
        //CONFIG
        this.TICKS_IN_MIN = 30; // the base speed
        this.MINS_IN_HOURS = 60;
        this.HOURS_IN_DAYS = 24;
        this.DAYS_IN_MONTH = 4;
        this.WEEKS_IN_MONTH = 4;
        this.MONTHS_IN_YEAR = 12;
        this.startYear = 1980;
        //END CONFIG
        this._minute = 0;
        this._hour = 0;
        this._day = 0;
        this._week = 0;
        this._month = 0;
        this._year = 0;
        this.ticks = 0;
        this.observer = observer;
    }
    TimeManager.prototype.fixNumber = function (value) {
        return Math.floor(Math.max(0, value));
    };
    TimeManager.prototype.updateTime = function () {
        this.ticks += this.TICKS_IN_MIN;
        var tmpTicks = this.ticks;
        var calc = this.MINS_IN_HOURS * this.HOURS_IN_DAYS * this.DAYS_IN_MONTH * this.WEEKS_IN_MONTH * this.MONTHS_IN_YEAR;
        var newYear = this.fixNumber(tmpTicks / calc);
        if (newYear) {
            tmpTicks -= newYear * calc;
        }
        //23040 = month
        calc = this.MINS_IN_HOURS * this.HOURS_IN_DAYS * this.DAYS_IN_MONTH * this.WEEKS_IN_MONTH;
        var newMonth = this.fixNumber(tmpTicks / calc);
        if (newMonth) {
            tmpTicks -= newMonth * calc;
        }
        calc = this.MINS_IN_HOURS * this.HOURS_IN_DAYS * this.DAYS_IN_MONTH;
        var newWeek = this.fixNumber(tmpTicks / calc);
        if (newWeek) {
            tmpTicks -= newWeek * calc;
        }
        calc = this.MINS_IN_HOURS * this.HOURS_IN_DAYS;
        var newDay = this.fixNumber(tmpTicks / calc);
        if (newDay) {
            tmpTicks -= newDay * calc;
        }
        calc = this.MINS_IN_HOURS;
        var newHour = this.fixNumber(tmpTicks / calc);
        if (newHour) {
            tmpTicks -= newHour * calc;
        }
        var newMinute = this.fixNumber(tmpTicks);
        //lets see if some datecategory had a changed, let the observers know
        if (newHour != this._hour) {
            this.observer.trigger('hour', [TimeManager]);
        }
        if (newDay != this._day) {
            this.observer.trigger('day', [TimeManager]);
        }
        if (newWeek != this._week) {
            this.observer.trigger('week', [TimeManager]);
        }
        if (newMonth != this._month) {
            this.observer.trigger('month', [TimeManager]);
        }
        if (newYear != this._year) {
            this.observer.trigger('year', [TimeManager]);
        }
        this._minute = newMinute;
        this._hour = newHour;
        this._day = newDay;
        this._week = newWeek;
        this._month = newMonth;
        this._year = newYear;
    };
    TimeManager.prototype.getDate = function () {
        var formatMinute = this._minute.toString().padStart(2, 0);
        var formatHour = this._hour.toString().padStart(2, 0);
        return formatHour + ':' + formatMinute + ' day ' + this.day + ', week ' + this.week + ' ' + MONTHS[this._month] + ' ' + this.year;
    };
    Object.defineProperty(TimeManager.prototype, "year", {
        get: function () {
            return this.startYear + this._year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "month", {
        get: function () {
            return this._month + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "monthAsWord", {
        get: function () {
            return MONTHS[this._month];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "daysInMonth", {
        get: function () {
            return this.DAYS_IN_MONTH * this.WEEKS_IN_MONTH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "week", {
        get: function () {
            return this._week + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "day", {
        get: function () {
            return this._day + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "hour", {
        get: function () {
            return this._hour;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "minute", {
        get: function () {
            return this._minute;
        },
        enumerable: true,
        configurable: true
    });
    return TimeManager;
}());
