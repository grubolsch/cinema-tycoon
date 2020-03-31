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
    function TimeManager() {
        //CONFIG
        this.TICKS_IN_MIN = 30; // the base speed
        this.MINS_IN_HOURS = 60;
        this.HOURS_IN_DAYS = 24;
        this.DAYS_IN_MONTH = 4;
        this.WEEKS_IN_MONTH = 4;
        this.MONTHS_IN_YEAR = 12;
        this.startYear = 1980;
        this.minute = 1;
        this.hour = 1;
        this.day = 1;
        this.week = 1;
        this.month = 1;
        this.year = 1980;
        //    private readonly monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        //END CONFIG
        this.ticks = 0;
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
        newYear += this.startYear;
        newMonth++;
        newWeek++;
        newDay++;
        newHour++;
        newMinute++;
        //lets see if some datecategory had a check, let the observers know
        if (newHour != this.hour) {
            $(document).trigger("hour", [newHour]);
        }
        if (newDay != this.day) {
            $(document).trigger("day", [newDay]);
        }
        if (newWeek != this.week) {
            $(document).trigger("week", [newWeek]);
        }
        if (newMonth != this.month) {
            $(document).trigger("month", [newMonth]);
        }
        if (newYear != this.year) {
            $(document).trigger("year", [newYear]);
        }
        this.minute = newMinute;
        this.hour = newHour;
        this.day = newDay;
        this.week = newWeek;
        this.month = newMonth;
        this.year = newYear;
    };
    TimeManager.prototype.getDate = function () {
        var formatMinute = this.minute.toString().padEnd(2, 0);
        var formatHour = this.hour.toString().padEnd(2, 0);
        return formatMinute + ':' + formatHour + ' day ' + this.day + ', week ' + this.week + ' ' + MONTHS[this.month - 1] + ' ' + this.year;
    };
    Object.defineProperty(TimeManager.prototype, "getMonth", {
        get: function () {
            return this.month;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "getMonthAsWord", {
        get: function () {
            return MONTHS[this.month - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "getYear", {
        get: function () {
            return this.year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "getHour", {
        get: function () {
            return this.hour;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "getDaysInMonth", {
        get: function () {
            return this.DAYS_IN_MONTH * this.WEEKS_IN_MONTH;
        },
        enumerable: true,
        configurable: true
    });
    return TimeManager;
}());
