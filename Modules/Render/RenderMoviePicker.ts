import {Cinema} from "../Entity/Cinema";
import {Movie} from "../Entity/Movie";
import {Render} from "./Render";
import {GameSpeedManager} from "../Manager/GameSpeedManager";
import {currency, randomNumber} from "../Utils";
import reviews from "../Assets/reviews.json";

class RenderMoviePicker implements RenderInterface, RenderByWeekInterface {

    private readonly _cinema: Cinema;
    private readonly _gsm: GameSpeedManager;

    private readonly moviePickerModal = $('#moviePickerModal');
    private readonly container = (<HTMLElement>document.querySelector('#movies-container'));
    private readonly buttonContainer = (<HTMLElement>document.querySelector('#movies-button-container'));
    private readonly errorContainer = (<HTMLElement>document.querySelector('#movies-error-container'));
    private readonly template = (<HTMLTemplateElement>document.querySelector('#movie-template'));

    constructor(cinema: Cinema, gsm : GameSpeedManager) {
        this._cinema = cinema;
        this._gsm = gsm;
    }

    renderByWeek(): void {
        this.weeklyMoviePicker();
    }

    private weeklyMoviePicker(): void {
        this._gsm.pause();
        this.container.innerHTML = '';
        this.buttonContainer.innerHTML = '';
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

        let btn = document.createElement('button');
        btn.innerText = 'Purchase';
        btn.classList.add('btn', 'btn-success');

        btn.addEventListener('click', () => {
            let selectedMovieIds = this.getSelectedMovieIds();
            if (this._cinema.movieManager.handleMoviePicker(this._cinema, selectedMovieIds, movies)) {
                this.moviePickerModal.modal('hide');
                this._gsm.resume();
            } else {
                this.errorContainer.innerHTML = '';
                let error = document.createElement('div');
                error.classList.add('alert', 'alert-warning');
                error.innerText = "You don't have enough money for this purchase";
                this.errorContainer.appendChild(error);
            }
        });

        this.buttonContainer.appendChild(btn);
        this.moviePickerModal.modal('show');
    }

    render(): void {

    }

    private getSelectedMovieIds(): string[] {
        let selectedMovieIds: string[] = [];
        (document.querySelectorAll('.movie-block.active')).forEach((element) => {
            let HTMLElement = <HTMLElement>element;
            selectedMovieIds.push(<string>HTMLElement.dataset.movie);
        });
        return selectedMovieIds;
    }

    // good
    private renderMovieBox(movie: Movie): void {
        let clone = <HTMLElement>this.template.content.cloneNode(true);
        (<HTMLElement>clone.querySelector('.movie-title')).innerText = movie.title;
        (<HTMLElement>clone.querySelector('.movie-genre')).innerText = movie.genre.name;
        (<HTMLElement>clone.querySelector('.movie-cost span')).innerHTML = currency(movie.cost);
        (<HTMLElement>clone.querySelector('.movie-block')).dataset.movie = `${movie.id}`;

        movie.reviews.forEach((review) => {
            let li = document.createElement('li');
            li.innerText = review;
            (<HTMLElement>clone.querySelector('.movie-reviews')).appendChild(li);
        });

        if (movie.type.isArthouse) {
            (<HTMLElement>clone.querySelector('.movie-arthouse')).style.display = 'block';
        } else if (movie.type.isBlockbuster) {
            (<HTMLElement>clone.querySelector('.movie-blockbuster')).style.display = 'block';
        }

        this.container.appendChild(clone);
    }
}

export {RenderMoviePicker}
