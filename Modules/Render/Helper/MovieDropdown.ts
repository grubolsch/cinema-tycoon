import {Movie} from "../../Entity/Movie";
import {MovieManager} from "../../Manager/MovieManager";

class MovieDropdown {
    private readonly movieManager: MovieManager;
    private readonly element: HTMLElement;
    private readonly showEmptyOption: boolean;

    //store the amount of movies, if this changes, render the schedule again
    private renderedWithMovies : number = 0;

    constructor(movieManager : MovieManager, element : HTMLElement, showEmptyOption : boolean = false) {
        this.movieManager = movieManager;
        this.element = element;
        this.showEmptyOption = showEmptyOption;
    }

    render() {
        if(!this.shouldRender()) {
            return;
        }
        this.renderedWithMovies = this.movieManager.movies.size;

        this.element.innerHTML = '';

        if(this.showEmptyOption) {
            this.element.appendChild(new Option('Choose movie', '0'));
        }

        this.movieManager.movies.forEach((movie: Movie) => {
            this.element.appendChild(new Option(movie.title, movie.id.toString()));
        });
    }

    private shouldRender() : boolean {
        return (this.renderedWithMovies != this.movieManager.movies.size);
    }

}

export {MovieDropdown}