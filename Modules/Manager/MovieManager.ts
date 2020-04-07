import {Movie} from "../Entity/Movie";
import {MovieGenerator} from "../Generator/MovieGenerator";

class MovieManager {

    private static generateMovies(amount: number): Movie[] {
        let movies: Movie[] = [];
        for (let i = 0; i < amount; i++) {
            movies.push(MovieGenerator.newMovie());
        }
        return movies;
    }

    generateThreeMovies(){
        return MovieManager.generateMovies(3);
    }
}

export {MovieManager}