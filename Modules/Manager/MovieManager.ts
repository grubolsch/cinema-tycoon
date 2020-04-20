import {Movie} from "../Entity/Movie";
import {MovieGenerator} from "../Generator/MovieGenerator";
import {GenreManager} from "./GenreManager";
import {Cinema} from "../Entity/Cinema";
import {ConfigManager} from "./ConfigManager";

class MovieManager {

    private readonly _genreManager: GenreManager;
    private _movies : Map<number, Movie> = new Map<number, Movie>();
    private readonly _cinema : Cinema;
    private readonly _config : ConfigManager;
    public static counter: number = 0;

    constructor(cinema : Cinema, config : ConfigManager, genreManager: GenreManager) {
        this._genreManager = genreManager;
        this._cinema = cinema;
        this._config = config;
    }

    get genreManager(): GenreManager {
        return this._genreManager;
    }

    private generateMovies(amount: number): Movie[] {
        let movieGenerator = new MovieGenerator(this._cinema, this._cinema.timeManager, this.genreManager);

        let movies: Movie[] = [];
        for (let i = 0; i < amount; i++) {
            movies.push(movieGenerator.createNewMovie());
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
        if (cinema.financeManager.canAfford(cost, true)) {
            cinema.financeManager.pay(cost, 'movie licensing costs');
            selectedMovies.forEach(movie => {
                this.addMovie(movie);
            });
            return true;
        }
        return false;
    }

    private calculateCost(movies: Movie[]): number {
        let sum: number = 0;
        movies.forEach((movie) => {
            sum += movie.cost;
        });
        return sum;
    }

    addMovie(movie: Movie) {
        this._movies.set(movie.id, movie);
    }

    get movies(): Map<number, Movie> {
        return this._movies;
    }

    findMovie(id : number): Movie{
        return <Movie>this.movies.get(id);
    }

    calculatePopularity(movie : Movie) : number {
        let base = movie.startPopularity * this._config.popularityToCustomerFactor;
        return Math.max(0, base - movie.releaseDatePenalty);
    }
}

export {MovieManager}
