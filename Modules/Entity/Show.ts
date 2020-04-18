import {Room} from "./Room";
import {TimePoint} from "./TimePoint";
import {ShowConfig} from "./ShowConfig";
import {Movie} from "./Movie";
import {Cinema} from "./Cinema";

class Show {
    private _showConfiguration : ShowConfig;

    private _start : TimePoint;
    private _end : TimePoint;

    private _room : Room;

    private ticketsSold : number = 0;

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

    //start without commercial (you can still buy a ticket)
    get realStart() : TimePoint {
        if(this.showConfiguration.hasCommercial) {
            return this._start.addMinutes(this.showConfiguration.durationBreakTime);
        }

        return this._start;
    }

    get end(): TimePoint {
        return this._end;
    }

    get room(): Room {
        return this._room;
    }

    isPlaying(cinema : Cinema): boolean {
        return (cinema.timeManager.hasTimePassed(this.start.hour, this.start.minute) && !cinema.timeManager.hasTimePassed(this.end.hour, this.end.minute));
    }

    get showConfiguration(): ShowConfig {
        return this._showConfiguration;
    }

    get movie() : Movie {
        return this._showConfiguration.movie;
    }

    //this should be run every day at 0:00 to reset shows
    public resetTickets() : void {
        this.ticketsSold = 0;
    }

    public sellTicket() : void {
        if(this.isFull()) {
            throw new Error('The show is sold out');
        }

        this.ticketsSold++;
    }

    public isFull() : boolean {
        return (this.ticketsSold >= this.room.type.capacity)
    }
}

export {Show}