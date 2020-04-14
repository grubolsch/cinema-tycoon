import {Cinema} from "../Entity/Cinema";
import {Movie} from "../Entity/Movie";
import {ShowConfigHelper} from "./Helper/ShowConfigHelper";
import {ShowConfig} from "../Entity/ShowConfig";

class RenderSchedulerForm implements RenderInterface {
    private readonly _cinema : Cinema;

    private readonly movieDraggerElement: HTMLElement;
    private readonly breakElement: HTMLInputElement;
    private readonly commercialElement: HTMLInputElement;
    private readonly movieElement: HTMLInputElement;

    constructor(cinema : Cinema) {
        this._cinema = cinema;

        this.movieDraggerElement = (<HTMLElement>document.querySelector('#schedule-movie-dragger'));
        this.breakElement = (<HTMLInputElement>document.querySelector('#schedule-planner-break'));
        this.commercialElement = (<HTMLInputElement>document.querySelector('#schedule-planner-commercial'));
        this.movieElement = (<HTMLInputElement>document.querySelector('#schedule-planner-movies'));

        this.renderOnce();
    }

    private renderOnce() {
        var self = this;

        this._cinema.movies.forEach(function(movie: Movie) {
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

    render(): void {
        //we only have to re render this if the movies or rooms changed
    }

    private updateMovieBlock() {
        let config : ShowConfig = ShowConfigHelper.createMovieConfig(this._cinema);

        this.movieDraggerElement.style.width = config.duration + "px";
        this.movieDraggerElement.innerText = config.movie.title;
    }
}

export  {RenderSchedulerForm}