import {Movie} from "../Entity/Movie";
import {MovieGenerator} from "../Generator/MovieGenerator";
import {Cinema} from "../Entity/Cinema";

class MovieManager {

    private static generateMovies(amount: number): Movie[] {
        let movies: Movie[] = [];
        for (let i = 0; i < amount; i++) {
            movies.push(MovieGenerator.newMovie());
        }
        return movies;
    }

    generateThreeMovies(): Movie[] {
        return MovieManager.generateMovies(3);
    }

    activateMovies(availableMovies: Movie[], selectedIds: string[], cinema: Cinema,) {
        let movies = this.getSelectedMovies(availableMovies, selectedIds);
        if (this.checkCanAffordMovies(cinema, movies)){
            this.payForMovies(cinema, this.movieCostSum(movies));
            movies.forEach((movie) => {
                cinema.addMovie(movie);
            })
        }
    }

    private getSelectedMovies(movies: Movie[], selectedIds: string[]) {
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

    private payForMovies(cinema : Cinema, cost : number){
        cinema.financeManager.pay(cost, 'purchased movie rights');
    }

    checkCanAffordMovies(cinema: Cinema, movies: Movie[]) {
        let cost = this.movieCostSum(movies);
        return cinema.financeManager.canAfford(cost);
    }

    private movieCostSum(movies: Movie[]): number {
        let sum: number = 0;
        movies.forEach(movie => {
            sum += movie.cost;
        });
        return sum;
    }
}

export {MovieManager}