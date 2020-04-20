import {currency} from "../Utils";
import {MovieManager} from "../Manager/MovieManager";
import {MovieDropdown} from "./Helper/MovieDropdown";
import {Movie} from "../Entity/Movie";
import {Scheduler} from "../Entity/Scheduler";

class RenderMovieDetailPanel implements RenderInterface {
    private readonly container = (<HTMLElement>document.querySelector('#movie-detail-panel'));
    private readonly noMovieSelectedElement = (<HTMLElement>document.querySelector('#movie-detail-panel-no-movie'));
    private readonly movieElement = (<HTMLSelectElement>document.querySelector('#movie-detail-selector'));
    private readonly retireMovieButton = (<HTMLElement>document.querySelector('#retire-movie-action'));
    private readonly movieDropdown : MovieDropdown;

    private readonly movieManager : MovieManager;
    private readonly scheduler : Scheduler;

    constructor(scheduler : Scheduler, movieManager: MovieManager) {
        this.movieManager = movieManager;
        this.scheduler = scheduler;
        this.movieDropdown = new MovieDropdown(this.movieManager, this.movieElement, true);
        this.renderOnce();
    }

    renderOnce() {
        this.movieElement.addEventListener('change', (event) => {
            let movie = this.movieManager.movies.get(parseInt(this.movieElement.value));
            if(movie === undefined) {
                this.noMovieSelectedElement.classList.remove('hide');
                this.container.classList.add('hide');
                return;
            }

            this.renderDetailScreen(movie);
        });

        this.retireMovieButton.addEventListener('click', (event) => {
            if(!confirm('Are you sure you want to retire this movie? \nThis will expire your license for this movie without a way of regaining access.')) {
                return;
            }

            let movieId = (<HTMLElement>event.target).dataset.movie;
            if(movieId === undefined) {
                return alert('Could not find movie to retire');
            }

            let movie = this.movieManager.movies.get(parseInt(movieId));

            if(movie === undefined) {
                return alert('Could not find movie to retire');
            }

            let foundShows : number = 0;
            this.scheduler.allShows.forEach((show ) => {
                if(show.movie.id === movie!.id) {
                    foundShows++;
                }
            });

            if(foundShows > 0) {
                return alert('This movie could not be retired because it still has '+ foundShows + ' running shows. Please remove these shows first in the scheduler.');
            }

            this.movieManager.retireMovie(movie);

            alert(`Removed movie ${movie.title}`);

            this.noMovieSelectedElement.classList.remove('hide');
            this.container.classList.add('hide');
        });
    }

    render(): void {
        this.movieDropdown.render();
    }

    renderDetailScreen(movie : Movie) {
        this.container.querySelector('.title')!.innerHTML = movie.title;
        this.container.querySelector('.genre')!.innerHTML = movie.genre.name;
        this.container.querySelector('.duration')!.innerHTML = movie.duration.toString();
        this.container.querySelector('.cost')!.innerHTML = currency(movie.cost);
        this.container.querySelector('.release-date')!.innerHTML = movie.releaseDate.format();


        this.container.querySelector('.reviews')!.innerHTML = '';
        movie.reviews.forEach((review) => {
            let li = document.createElement('li');
            li.innerText = review;
            this.container.querySelector('.reviews')!.appendChild(li);
        });


        (<HTMLElement>this.container.querySelector('.movie-arthouse')).style.display = (movie.type.isArthouse) ? 'block' : 'none';
        (<HTMLElement>this.container.querySelector('.movie-blockbuster')).style.display = (movie.type.isBlockbuster) ? 'block' : 'none';

        this.retireMovieButton.dataset.movie = movie.id.toString();

        this.noMovieSelectedElement.classList.add('hide');
        this.container.classList.remove('hide');
    }
}

export {RenderMovieDetailPanel}