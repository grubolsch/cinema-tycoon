import {Movie} from "../Movie";
import {InventoryItem} from "./InventoryItem";

abstract class AbstractBaseTicket implements InventoryItem {
    protected readonly _movie: Movie;

    constructor(movie: Movie) {
        this._movie = movie;
    }

    isDrink(): boolean {
        return false;
    }

    abstract description(): string;
}

export {AbstractBaseTicket}