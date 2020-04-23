import {AbstractBaseTicket} from "./AbstractBaseTicket";

class Ticket extends AbstractBaseTicket {
    static INV_TICKET: string = 'Ticket';
    description(): string {
        return 'Ticket for movie '+ this._movie.title;
    }
}

export {Ticket}