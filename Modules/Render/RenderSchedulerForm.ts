import {Cinema} from "../Entity/Cinema";
import {Movie} from "../Entity/Movie";
import {ShowConfigHelper} from "./Helper/ShowConfigHelper";
import {ShowConfig} from "../Entity/ShowConfig";

class RenderSchedulerForm implements RenderInterface {
    private readonly _cinema : Cinema;

    private readonly movieDraggerElement: HTMLElement = (<HTMLElement>document.querySelector('#schedule-movie-dragger'));
    private readonly breakElement: HTMLInputElement = (<HTMLInputElement>document.querySelector('#schedule-planner-break'));
    private readonly commercialElement: HTMLInputElement = (<HTMLInputElement>document.querySelector('#schedule-planner-commercial'));
    private readonly movieElement: HTMLInputElement = (<HTMLInputElement>document.querySelector('#schedule-planner-movies'));
    private readonly buttonElement: HTMLInputElement = (<HTMLInputElement>document.querySelector('#scheduleButton'));

    //store the amount of movies, if this changes, render the schedule again
    private renderedWithMovies : number = 0;

    constructor(cinema : Cinema) {
        this._cinema = cinema;
    }

    private shouldRender() : boolean {
        return (this.renderedWithMovies != this._cinema.movieManager.movies.size);
    }

    render() {
        this.buttonElement.disabled = (this.renderedWithMovies === 0);

        if(!this.shouldRender()) {
            return;
        }
        this.renderedWithMovies = this._cinema.movieManager.movies.size;

        var self = this;

        //@todo: use the new MovieDropdown class
        self.movieElement.innerHTML = '';
        this._cinema.movieManager.movies.forEach(function(movie: Movie) {
            self.movieElement.appendChild(new Option(movie.title, movie.id.toString()));
        });

        this.commercialElement.checked = false;
        this.breakElement.checked = false;

        self.updateMovieBlock();

        document.querySelector('#schedule-planner')!.addEventListener('submit', function(event) {
            event.preventDefault();
        });

        document.querySelectorAll('#schedule-planner input, #schedule-planner select').forEach(function(element) {
            element.addEventListener('change', function() {
                self.updateMovieBlock();
            });
        });
    }

    private updateMovieBlock() {
        let config : ShowConfig = ShowConfigHelper.createMovieConfig(this._cinema);

        this.movieDraggerElement.style.width = config.duration + "px";
        this.movieDraggerElement.innerText = config.movie.title;
    }
}

export  {RenderSchedulerForm}