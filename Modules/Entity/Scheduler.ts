import {Cinema} from "./Cinema";
import {Room} from "./Room";
import {Show} from "./Show";
/*
class TimePoint {
    private _hour : number;
    private _minute : number;

    constructor(minute: number, second: number) {
        this._hour = minute;
        this._minute = second;
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
}
*/
class Scheduler {
    private _cinema : Cinema;
    private _shows : Map<number, Array<Show>> = new Map<number, []>() ;

    constructor(cinema: Cinema) {
        this._cinema = cinema;
    }

    canPlan(showToPlan : Show) : boolean {
        let showsInRoom = this._shows.get(showToPlan.room.id);

        if(showsInRoom === undefined) {
            console.log('Scheduler undefined true');
            return true;
            //no rooms yet so we can just book the show
        }

        //make an array with ranges
        //0900 - 1030

        //loop over all ranges
        //cannot be between number

        console.log(showToPlan)

        for(let x in showsInRoom) {
            console.log('start', showsInRoom[x].start.getFullNumber(), showToPlan.start.getFullNumber());
            console.log('end', showsInRoom[x].end.getFullNumber(), showToPlan.end.getFullNumber());

            if(showsInRoom[x].start.getFullNumber() <= showToPlan.start.getFullNumber() && showsInRoom[x].end.getFullNumber() >= showToPlan.end.getFullNumber()) {
                console.log('Scheduler FALSE');
                return false;
            }
        }

        console.log('Scheduler default true');
        return true;
    }

    plan(show : Show) {
        if(!this._shows.has(show.room.id)) {
            this._shows.set(show.room.id, []);
        }

        this._shows.get(show.room.id)!.push(show);
    }

    getShowsByRoom(room : Room): Array<Show> {
        if(!this._shows.has(room.id)) {
            console.log('nothign found', this._shows)
            return [];
        }

        return this._shows.get(room.id)!;
    }
}

export {Scheduler}