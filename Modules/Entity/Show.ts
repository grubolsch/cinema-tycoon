import {Room} from "./Room";
import {TimePoint} from "./TimePoint";
import {ShowConfig} from "./ShowConfig";
import {Movie} from "./Movie";

class Show {
    private _showConfiguration : ShowConfig;

    private _start : TimePoint;
    private _end : TimePoint;

    private _room : Room;

    //@todo make sure once we are actually playing movies to flag this boolean on
    private _isPlaying : boolean = false;

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

    get isPlaying(): boolean {
        return this._isPlaying;
    }

    set isPlaying(value: boolean) {
        this._isPlaying = value;
    }

    get showConfiguration(): ShowConfig {
        return this._showConfiguration;
    }

    get movie() : Movie {
        return this._showConfiguration.movie;
    }
}

export {Show}