import {Cinema} from "./Cinema";
import {Room} from "./Room";
import {Show} from "./Show";

class Scheduler {
    private _cinema : Cinema;
    private _shows : Map<number, Array<Show>> = new Map<number, []>() ;

    constructor(cinema: Cinema) {
        this._cinema = cinema;
    }

    canPlan(showToPlan : Show) : boolean {
        let showsInRoom = this._shows.get(showToPlan.room.id);

        if(showsInRoom === undefined) {
            return true;  //no rooms yet so we can just book the show
        }

        for(let x in showsInRoom) {
            //you have a collesion if the start point OR the end point of the movie is between an existing show
            if((showsInRoom[x].start.getFullNumber() <= showToPlan.start.getFullNumber() && showsInRoom[x].end.getFullNumber() >= showToPlan.start.getFullNumber())
            || showsInRoom[x].start.getFullNumber() <= showToPlan.end.getFullNumber() && showsInRoom[x].end.getFullNumber() >= showToPlan.end.getFullNumber()) {
                return false; //collision!
            }
        }

        return true;
    }

    //return the id of the added movie
    plan(show : Show) : number {
        if(!this._shows.has(show.room.id)) {
            this._shows.set(show.room.id, []);
        }

        this._shows.get(show.room.id)!.push(show);

        return this._shows.get(show.room.id)!.length-1;
    }

    getShowsByRoom(room : Room): Array<Show> {
        if(!this._shows.has(room.id)) {
            console.log('nothign found', this._shows)
            return [];
        }

        return this._shows.get(room.id)!;
    }

    removeShow(room: Room, showId: number) : boolean {
        let roomsByShow = this._shows.get(room.id);
        if(roomsByShow === undefined || !roomsByShow[showId]) {
            console.error('Could not find show to delete', room.id, showId);
            return false;
        }

        if(roomsByShow[showId].isPlaying) {
            return false;
        }

        delete roomsByShow[showId];
        return true;
    }

    get allShows(): Array<Show> {
        let shows : Array<Show> = [];
        this._shows.forEach(function(showsPerRoom ) {
            shows = shows.concat(showsPerRoom);
        });
        return shows;
    }
}

export {Scheduler}