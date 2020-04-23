import {Cinema} from "./Cinema";
import {Room} from "./Room";
import {Show} from "./Show";
import {TimeManager} from "../Manager/TimeManager";
import {SchedulerDeleteShowException} from "../Exception/SchedulerExceptionDeleteShow";

class ShowMap extends Map<number, Show> {}

class Scheduler {
    private _cinema : Cinema;
    private _shows: Map<number, ShowMap> = new Map<number, ShowMap>();

    public static showCounter : number = 0;

    constructor(cinema: Cinema) {
        this._cinema = cinema;
    }

    canPlan(showToPlan : Show) : boolean {
        if(showToPlan.end.hour >= TimeManager.HOURS_IN_DAYS && showToPlan.end.minute > 0) {
            return false;
        }

        let showsInRoom = this._shows.get(showToPlan.room.id);

        if(showsInRoom === undefined) {
            return true;  //no rooms yet so we can just book the show
        }

        let canPlan = true;

        let hit = Array.from(showsInRoom).filter((element) => {
            let show : Show = element[1];

            if((show.start.getFullNumber() <= showToPlan.start.getFullNumber() && show.end.getFullNumber() > showToPlan.start.getFullNumber())
                || show.start.getFullNumber() < showToPlan.end.getFullNumber() && show.end.getFullNumber() >= showToPlan.end.getFullNumber()) {
                return true;//collision
            }

            return false;
        });


        return hit.length == 0;
    }

    plan(show : Show) : void {
        if(!this._shows.has(show.room.id)) {
            this._shows.set(show.room.id, new ShowMap());
        }

        this._shows.get(show.room.id)!.set(show.id, show);
    }

    getShowsByRoom(room : Room): ShowMap {
        if(!this._shows.has(room.id)) {
            return new ShowMap();
        }

        return this._shows.get(room.id)!;
    }

    removeShow(show : Show) : void {
        let roomsByShow = this._shows.get(show.room.id);
        if(roomsByShow === undefined) {
            throw SchedulerDeleteShowException.couldNotFindShow(show.room.id);
        }

        if(show.isPlaying(this._cinema)) {
            throw SchedulerDeleteShowException.isPlaying();
        }

        roomsByShow.delete(show.id);
    }

    get allShows(): Array<Show> {
        let shows : Array<Show> = [];
        this._shows.forEach(function(showsPerRoom ) {
            showsPerRoom.forEach(function(show) {
                shows.push(show);
            });
        });
        return shows;
    }

    resetShows() : void {
        this.allShows.forEach(function(show) {
           show.resetTickets();
        });
    }

    //you do not need to pass the room, but it will the lookup faster
    public findShowById(showId : number) : Show|undefined {
        return this.allShows.find((show) => {
            return show.id === showId;
        });
    }
}

export {Scheduler}