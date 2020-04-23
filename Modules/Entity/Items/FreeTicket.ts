import {Movie} from "../Movie";
import {AbstractBaseTicket} from "./AbstractBaseTicket";

class FreeTicket extends AbstractBaseTicket {
    public static readonly INV_FREE_TICKET : string = 'free ticket';

    description(): string {
        return 'Free ticket for movie '+ this._movie.title;
    }
}


export {FreeTicket}