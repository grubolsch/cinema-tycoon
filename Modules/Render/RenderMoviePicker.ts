import {Cinema} from "../Entity/Cinema";
import {Movie} from "../Entity/Movie";
import {Render} from "./Render";

class RenderMoviePicker implements RenderInterface {

    readonly _cinema: Cinema;

    readonly moviePickerModal = $('#moviePickerModal');
    private readonly container = (<HTMLElement>document.querySelector('#movies-container'));
    private readonly template = (<HTMLTemplateElement>document.querySelector('#movie-template'));
    private readonly purchaseBtn = (<HTMLTemplateElement>document.querySelector('#buy-movie-btn'));

    constructor(cinema: Cinema) {
        this._cinema = cinema;
    }

    weeklyMoviePicker(render: Render) {
        let speed = render.speed;
        render.speed = 0;
        this.container.innerHTML = '';
        let movies = this._cinema.movieManager.generateThreeMovies();
        movies.forEach(movie => {
            this.renderMovieBox(movie);
        });
        this.moviePickerModal.modal('show');

        document.querySelectorAll('div.movie-block').forEach(function (element) {
            element.addEventListener('click', () => {
                if (!element.classList.contains('active')) {
                    element.classList.add("active");
                } else {
                    element.classList.remove('active');
                }
            });
        });

        this.purchaseBtn.addEventListener('click', () => {
            let selectedMovies : Movie[] = this.getSelectedMovies(movies);
            this.moviePickerModal.modal('hide');
            render.speed = speed;
        })
    }

    private getSelectedMovies(movies: Movie[]) : Movie[] {
        let selectedIds: string[] = [];
        document.querySelectorAll('div.movie-block.active').forEach((element) => {
            let htmlElement = <HTMLElement>element;
            selectedIds.push(<string>htmlElement.dataset.movie);
        });
        let selectedMovies: Movie[] = [];
        selectedIds.forEach((movieID) => {
            movies.forEach((movie) => {
                if (parseInt(movieID) === movie.uniqueID) {
                    selectedMovies.push(movie);
                }
            })
        });
        return selectedMovies;
    }

    render(): void {
    }

    renderMovieBox(movie: Movie) {

        let clone = <HTMLElement>this.template.content.cloneNode(true);

        (<HTMLElement>clone.querySelector('.movie-title')).innerHTML = movie.movieTitle;
        (<HTMLElement>clone.querySelector('.movie-genre')).innerHTML = movie.movieGenre;
        // (<HTMLElement>clone.querySelector('.movie-cost')).innerHTML = 'nothing yet';

        let block = (<HTMLElement>clone.querySelector('.movie-block'));
        block.dataset.movie = `${movie.uniqueID}`;

        this.container.appendChild(clone);
    }
}

export {RenderMoviePicker}
