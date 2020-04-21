import {Movie} from "../Entity/Movie";

class FreeTicketDistributor {
    private _movie: Movie;

    constructor(movie: Movie) {
        this._movie = movie;
    }
}

export {FreeTicketDistributor}