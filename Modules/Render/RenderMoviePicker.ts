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

    // not good
    weeklyMoviePicker(render: Render) {

        render.pause();
        this.container.innerHTML = '';
        let movies = this._cinema.movieManager.generateThreeMovies();

        movies.forEach(movie => {
            this.renderMovieBox(movie);
        });

        // selection logic
        this.container.querySelectorAll('div.movie-block').forEach((element) => {
            element.addEventListener('click', () => {
                if (!element.classList.contains('active')) {
                    element.classList.add("active");
                } else {
                    element.classList.remove('active');
                }
            });
        });

        this.moviePickerModal.modal('show');
    }

    render(): void {

    }

    // good
    private renderMovieBox(movie: Movie): void {
        let clone = <HTMLElement>this.template.content.cloneNode(true);
        (<HTMLElement>clone.querySelector('.movie-title')).innerHTML = movie.title;
        (<HTMLElement>clone.querySelector('.movie-genre')).innerHTML = movie.genre;
        (<HTMLElement>clone.querySelector('.movie-cost')).innerHTML = `${movie.cost}`;
        (<HTMLElement>clone.querySelector('.movie-block')).dataset.movie = `${movie.id}`;
        this.container.appendChild(clone);
    }
}

export {RenderMoviePicker}
