import {Customer} from "../Entity/Customer";
import {Cinema} from "../Entity/Cinema";
import {CustomerAction} from "./CustomerAction";
import {LeaveCinemaAction} from "./LeaveCinemaAction";
import {MoveAction} from "./MoveAction";
import {randomNumber} from "../Utils";
import {GameAreaCoordinates} from "../Assets/GameAreaCoordinates";
import {RateRoom} from "../Manager/ExperienceRatings/RateRoom";
import {RateMovie} from "../Manager/ExperienceRatings/RateMovie";
import {RateShow} from "../Manager/ExperienceRatings/RateShow";
import {LoggerPriority} from "../Logger/LoggerPriority";

class WatchMovieAction implements CustomerAction {
    isFinished(cinema: Cinema, customer: Customer): boolean {
        let b = cinema.timeManager.hasTimePassed(customer.targetShow.end.hour, customer.targetShow.end.minute);
        customer.logger.log('finished '+ b, LoggerPriority.LOG);

        return (cinema.timeManager.hasTimePassed(customer.targetShow.end.hour, customer.targetShow.end.minute));
    }

    nextAction(cinema: Cinema, customer: Customer): CustomerAction {
        let rateMovie = new RateMovie(cinema.config);
        rateMovie.rate(customer.targetShow.movie, customer);

        let rateRoom = new RateRoom(cinema.config);
        rateRoom.rate(customer.targetShow.room, customer);

        let rateShow = new RateShow(cinema.config);
        rateShow.rate(customer.targetShow, customer);
        rateShow.payoutCommercial(cinema, customer);

        customer.logger.log('moving away', LoggerPriority.LOG);

        return new MoveAction({'x': customer.appearance.location!.x, 'y': randomNumber(GameAreaCoordinates.leavingCinemaStart, GameAreaCoordinates.leavingCinemaEnd)}, new LeaveCinemaAction());
    }

    update(cinema: Cinema, customer: Customer): void {
        //do nothing, only time will
    }

    getDescription(cinema: Cinema, customer: Customer): string {
        if(customer.targetShow.isPlaying(cinema)) {
            return 'Waiting for the movie '+ customer.targetShow.movie.title + ' to start.';
        }
        return "Watching the movie "+ customer.targetShow.movie.title;
    }
}

export {WatchMovieAction}