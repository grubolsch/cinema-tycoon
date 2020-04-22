import {Cinema} from "../Entity/Cinema";
import {Movie} from "../Entity/Movie";
import {ShowConfigHelper} from "./Helper/ShowConfigHelper";
import {ShowConfig} from "../Entity/ShowConfig";
import {MovieDropdown} from "./Helper/MovieDropdown";
import {RenderMovieDetailPanel} from "./RenderMovieDetailPanel";

class RenderSchedulerForm implements RenderInterface {
    private readonly _cinema : Cinema;

    private readonly movieDraggerElement: HTMLElement = (<HTMLElement>document.querySelector('#schedule-movie-dragger'));
    private readonly breakElement: HTMLInputElement = (<HTMLInputElement>document.querySelector('#schedule-planner-break'));
    private readonly commercialElement: HTMLInputElement = (<HTMLInputElement>document.querySelector('#schedule-planner-commercial'));
    private readonly movieElement: HTMLInputElement = (<HTMLInputElement>document.querySelector('#schedule-planner-movies'));
    private readonly buttonElement: HTMLInputElement = (<HTMLInputElement>document.querySelector('#scheduleButton'));

    private readonly movieDropdown: MovieDropdown;
    private renderMovieDetailPanel: RenderMovieDetailPanel;

    constructor(cinema : Cinema, renderMovieDetailPanel : RenderMovieDetailPanel) {
        this._cinema = cinema;
        this.movieDropdown = new MovieDropdown(this._cinema.movieManager, this.movieElement);
        this.renderMovieDetailPanel = renderMovieDetailPanel;
    }

    renderOnce() {
        this.commercialElement.checked = false;
        this.breakElement.checked = false;

        this.updateMovieBlock();

        document.querySelector('#schedule-planner')!.addEventListener('submit', function(event) {
            event.preventDefault();
        });

        var self = this;
        document.querySelectorAll('#schedule-planner input, #schedule-planner select').forEach(element => {
            element.addEventListener('change', () => {
                self.updateMovieBlock();
            });
        });
    }

    render() {
        this.buttonElement.disabled = (this._cinema.movieManager.movies.size === 0);
        this.movieDropdown.render();

        if(this._cinema.movieManager.movies.size > 0) {
            this.movieDropdown.render();
            this.updateMovieBlock();
        }
    }

    private readonly modal = $('#statisticsModal');

    private updateMovieBlock() {
        let config : ShowConfig = ShowConfigHelper.createMovieConfig(this._cinema);

//        this.movieDraggerElement.style.width = (config.duration*2) + "px";
        this.movieDraggerElement.innerText = config.movie.title + " ( "+ config.movie.duration + "min)";

        let movieId = (<HTMLSelectElement>document.querySelector('#schedule-planner select')).value;

        let movie : Movie | undefined = this._cinema.movieManager.movies.get(Number(movieId));

        if(movie === undefined) {
            return;
        }


        (<HTMLElement>document.querySelector('#scheduler-movie-detail-genre')).innerText = movie.genre.name;
        (<HTMLElement>document.querySelector('#scheduler-movie-detail-button')).dataset.movie = movie.id.toString();

        document.querySelector('#scheduler-movie-detail-button')!.addEventListener('click', (element) => {
            let movieId = (<HTMLElement>element.target).dataset.movie;
            if(movieId === undefined) {
                return;
            }

            this.renderMovieDetailPanel.modal.modal('show');
            (<HTMLElement>document.querySelector('#statistics-movie-tab')).click();
            (<HTMLSelectElement>document.querySelector('#movie-detail-selector')).value = movieId;

            this.renderMovieDetailPanel.showMovieScreen(parseInt(movieId));
        });
    }
}

export  {RenderSchedulerForm}