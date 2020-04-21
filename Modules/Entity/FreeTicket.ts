import {InventoryItem} from "./InventoryItem";
import {Movie} from "./Movie";

class FreeTicket extends InventoryItem{

    private readonly _movie: Movie;

    constructor(movie: Movie) {
        super();
        this._movie = movie;
    }
}

export {FreeTicket}