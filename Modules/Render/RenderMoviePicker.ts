import {Cinema} from "../Entity/Cinema";
import {Movie} from "../Entity/Movie";
import {Render} from "./Render";

class RenderMoviePicker implements RenderInterface {

    readonly _cinema: Cinema;

    private readonly moviePickerModal = $('#moviePickerModal');
    private readonly container = (<HTMLElement>document.querySelector('#movies-container'));
    private readonly template = (<HTMLTemplateElement>document.querySelector('#movie-template'));
    private readonly purchaseBtn = (<HTMLTemplateElement>document.querySelector('#buy-movie-btn'));

    constructor(cinema: Cinema) {
        this._cinema = cinema;
    }

    weeklyMoviePicker(render: Render) {

        render.pause();

        this.container.innerHTML = '';

        let movies = this._cinema.movieManager.generateThreeMovies();

        movies.forEach(movie => {
            this.renderMovieBox(movie);
        });

        document.querySelectorAll('div.movie-block').forEach(function (element) {
            element.addEventListener('click', () => {
                if (!element.classList.contains('active')) {
                    element.classList.add("active");
                } else {
                    element.classList.remove('active');
                }
            });
        });

        let handleMoviePicker = () => {
            let selectedMovieIDs: string[] = this.getSelectedMovies();

            if (this._cinema.movieManager.checkCanAffordMovies(this._cinema, movies)){
                this._cinema.movieManager.activateMovies(movies, selectedMovieIDs, this._cinema);

                console.log(this._cinema.movies);

                this.moviePickerModal.modal('hide');
                this.purchaseBtn.removeEventListener('click', handleMoviePicker);
                render.resume();
            } else {
                console.error('not enough money');
            }
        };
        this.purchaseBtn.addEventListener('click', handleMoviePicker);

        this.moviePickerModal.modal('show');
    }

    private getSelectedMovies(): string[] {
        let selectedIds: string[] = [];
        document.querySelectorAll('div.movie-block.active').forEach((element) => {
            let htmlElement = <HTMLElement>element;
            selectedIds.push(<string>htmlElement.dataset.movie);
        });
        return  selectedIds;
    }

    render(): void {

    }

    private renderMovieBox(movie: Movie): void {

        let clone = <HTMLElement>this.template.content.cloneNode(true);

        (<HTMLElement>clone.querySelector('.movie-title')).innerHTML = movie.movieTitle;
        (<HTMLElement>clone.querySelector('.movie-genre')).innerHTML = movie.movieGenre;
        (<HTMLElement>clone.querySelector('.movie-cost')).innerHTML = `${movie.cost}`;

        let block = (<HTMLElement>clone.querySelector('.movie-block'));
        block.dataset.movie = `${movie.uniqueID}`;

        this.container.appendChild(clone);
    }
}

export {RenderMoviePicker}
