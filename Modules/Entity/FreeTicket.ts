import {Movie} from "./Movie";
import {InventoryItem} from "./InventoryItem";

class FreeTicket extends InventoryItem{
    private readonly _movie : Movie;

    constructor(movie: Movie) {
        super();
        this._movie = movie;
    }

    get movie(): Movie {
        return this._movie;
    }
}

export {FreeTicket}