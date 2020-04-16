import {Show} from "../Entity/Show";
import {TimePoint} from "../Entity/TimePoint";
import {randomNumber} from "../Utils";
import {CustomerThought} from "../Entity/CustomerThought";
import {Customer} from "../Entity/Customer";
import {Cinema} from "../Entity/Cinema";
import {TicketSaleException} from "../Exception/TicketSaleException";

/**
 * this class is responsible for selection a replacement movie if the original movie is sold out
 *
 * First checks their show (uses the free ticket), if full, it checks if there is a show with the same movie for the next 2 hours. It is smart enough to still use the free ticket.
 * Only if they cannot pick their original movie they will not use the ticket (and be mad).
 * they then look for a movie in the same genre (50% chance) or leave the cinema.
 * If there is nothing in the same genre, they pick a movie at random, but now they are really mad.
 */
class MoviePickerCustomer {
    private _cinema : Cinema;
    private _customer : Customer;

    constructor(cinema: Cinema, customer: Customer) {
        this._cinema = cinema;
        this._customer = customer;
    }

    pickShow(): Show {
        let self = this;

        let possibleShows : Array<Show> = this._cinema.scheduler.allShows.filter(function(show: Show) {
            return self.basicFilter(show)
        });

        if(possibleShows.length === 0) {
            throw TicketSaleException.noMoviesFound();
        }

        let foundShow = possibleShows.find(function (show: Show) {
            return self.lookForTheSameMovie(show)
        });

        if (foundShow === undefined && randomNumber(0, 100) > this._cinema.config.chanceWatchingAnotherMovie) {
            this._customer.addThought(new CustomerThought(CustomerThought.THOUGHT_MOVIE_SOLD_OUT_LEFT_CINEMA, false));
            throw TicketSaleException.customerWentHome();
        }

        this._customer.addThought(new CustomerThought(CustomerThought.THOUGHT_MOVIE_SOLD_OUT, false));

        foundShow = possibleShows.find(function (show: Show) {
            return self.lookForTheSameGenre(show)
        });

        if (foundShow === undefined) {
            foundShow = possibleShows[randomNumber(0, possibleShows.length-1)];
            this._customer.addThought(new CustomerThought(CustomerThought.MOVIE_NOT_SAME_GENRE, false));
        }

        return foundShow;
    }

    private basicFilter (show: Show) : boolean {
        if (this._cinema.timeManager.hasTimePassed(show.realStart.hour, show.realStart.minute)) {
            return false;//movie has already started
        }

        if (show.isFull()) {
            return false;//movie is full
        }

        //check if there is another movie in the next X hours that plays the same movie
        let maxWaitingTime = new TimePoint(this._cinema.timeManager.hour + this._cinema.config.customerWaitingHour, this._cinema.timeManager.minute);

        return (this._cinema.timeManager.hasTimePassed(show.realStart.hour, show.realStart.minute)
            && !maxWaitingTime.hasTimePassed(show.start.hour, show.start.hour))
    }

    private lookForTheSameMovie(show: Show) : boolean {
        return (show.movie.id === this._customer.targetShow.movie.id);
    }

    private lookForTheSameGenre(show: Show)  : boolean {
        return (show.movie.genre.name === this._customer.targetShow.movie.genre.name);
    }
}

export {MoviePickerCustomer}