import {Room} from "./Room";
import {TimePoint} from "./TimePoint";
import {ShowConfig} from "./ShowConfig";
import {Movie} from "./Movie";
import {Cinema} from "./Cinema";
import {TimeManager} from "../Manager/TimeManager";
import {TicketSaleException} from "../Exception/TicketSaleException";
import {Scheduler} from "./Scheduler";

type ShowDuration = {'hour': number, 'minute': number};

class Show {
    private _showConfiguration : ShowConfig;

    private _start : TimePoint;
    private _end : TimePoint;

    private _room : Room;

    private ticketsSold : number = 0;
    private _id: number;

    constructor(room: Room, start : TimePoint, showConfiguration : ShowConfig) {
        this._id = Scheduler.showCounter++;
        this._showConfiguration = showConfiguration;

        this._room = room;
        this._start = start;
        this._end = this.calculateEnd();
    }

    private get duration() : ShowDuration {
        let hoursDuration : number = Math.floor(this._showConfiguration.duration / TimeManager.MINS_IN_HOURS);
        let minutesDuration : number = this._showConfiguration.duration % TimeManager.MINS_IN_HOURS;

        let minutes = this.start.minute + minutesDuration;
        if(minutes >= TimeManager.MINS_IN_HOURS) {
            minutes -= TimeManager.MINS_IN_HOURS;
            hoursDuration++;
        }

        return {'hour': hoursDuration, 'minute': minutes};
    }

    private calculateEnd(): TimePoint {
        let duration = this.duration;

        this._end = new TimePoint(this.start.hour + duration.hour, duration.minute);
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
            throw TicketSaleException.showSoldOut();
        }

        this.ticketsSold++;
    }

    public isFull() : boolean {
        return (this.ticketsSold >= this.room.type.capacity)
    }

    get id(): number {
        return this._id;
    }
}

export {Show}