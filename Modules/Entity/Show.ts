import {Room} from "./Room";
import {TimePoint} from "./TimePoint";
import {ShowConfig} from "./ShowConfig";

class Show {
    private _showConfiguration : ShowConfig;

    private _start : TimePoint;
    private _end : TimePoint;

    private _room : Room;

    constructor(room: Room, start : TimePoint, showConfiguration : ShowConfig) {
        this._showConfiguration = showConfiguration;

        this._room = room;
        this._start = start;
        this._end = this.calculateEnd();
    }

    private calculateEnd(): TimePoint {
        let hoursDuration : number = Math.floor(this._showConfiguration.duration / 60);
        let minutesDuration : number = this._showConfiguration.duration % 60;

        let minutes = this.start.minute + minutesDuration;
        if(minutes >= 60) {
            minutes -= 60;
            hoursDuration++;
        }

        this._end = new TimePoint(this.start.hour + hoursDuration, minutes);
        return this._end;
    }

    get start(): TimePoint {
        return this._start;
    }

    get end(): TimePoint {
        return this._end;
    }

    get room(): Room {
        return this._room;
    }
}

export {Show}