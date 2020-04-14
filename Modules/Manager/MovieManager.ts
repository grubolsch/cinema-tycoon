import {Movie} from "../Entity/Movie";
import {MovieGenerator} from "../Generator/MovieGenerator";
import {GenreManager} from "./GenreManager";
import {Cinema} from "../Entity/Cinema";

class MovieManager {

    private readonly _genreManager: GenreManager;

    constructor(genreManager: GenreManager) {
        this._genreManager = genreManager;
    }

    get genreManager(): GenreManager {
        return this._genreManager;
    }

    private generateMovies(amount: number): Movie[] {
        let movies: Movie[] = [];
        for (let i = 0; i < amount; i++) {
            movies.push(MovieGenerator.newMovie(this.genreManager));
        }
        return movies;
    }

    generateThreeMovies(): Movie[] {
        return this.generateMovies(3);
    }

    handleMoviePicker(cinema: Cinema, selectedMovieIds: string[], movies: Movie[]): boolean {
        let selectedMovies: Movie[] = [];
        selectedMovieIds.forEach((id) => {
            selectedMovies.push(<Movie>movies.find((movie) => { return movie.id === parseInt(id)}));
        });
        let cost = this.calculateCost(selectedMovies);
        if (cinema.financeManager.canAfford(cost)) {
            cinema.financeManager.pay(cost, 'movie licensing costs');
            selectedMovies.forEach(movie => {
                cinema.addMovie(movie);
            });
            return true;
        }
        return false;
    }

    private calculateCost(movies: Movie[]): number {
        let sum: number = 0;
        movies.forEach((movie) => {
            sum += movie.cost;
        })
        return sum;
    }
}

export {MovieManager}