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

    private movieCostSum(movies: Movie[]): number {
        let sum: number = 0;
        movies.forEach(movie => {
            sum += movie.cost;
        });
        return sum;
    }
}

export {MovieManager}