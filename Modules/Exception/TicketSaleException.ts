class TicketSaleException extends Error {
    static noMoviesFound() {
        return new this('Not a single movie is available to choose from.');
    }

    static customerWentHome() {
        return new this('Customer decided to go home because his movie was not available');
    }

    static ticketTooExpensive() {
        return new this('Customer decided to go home because his ticket was too expensive');
    }

    static showSoldOut() {
        return new this('The show is sold out');
    }
}

export {TicketSaleException}