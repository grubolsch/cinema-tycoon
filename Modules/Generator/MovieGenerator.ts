import {Movie} from "../Entity/Movie";
import {MovieType} from "../MovieTypes/MovieType";
import Genres  from  "../Assets/Genres.json";
import movieNames  from  "../Assets/movienames.json";
import {GenreManager} from "../Manager/GenreManager";

class MovieGenerator {
    public static newMovie(genreManager : GenreManager): Movie {
        return new Movie(this.titleGenerator(), this.ratingGenerator(), genreManager.getRandomGenre(), this.typeGenerator(), this.durationGenerator());
    }

    protected static typeGenerator() : MovieType{
        let typeBenchmark: number = 0.8;
        if (Math.random() >= typeBenchmark) {
            let specificType = Math.random();
            if(specificType > 0.5) {
                return MovieType.isArthouse();
            } else {
                return MovieType.isBlockbuster();
            }
        }
        return MovieType.isGeneric();
    }

    protected static ratingGenerator(): number {
        return Math.ceil(Math.random() * 10);
    }

    protected static titleGenerator() : string {
        let partOne : Array<string> = movieNames.firstpart;
        let partTwo : Array<string> = movieNames.lastpart;
        return  partOne[Math.floor(Math.random() * partOne.length)] + ' ' +
            partTwo[Math.floor(Math.random() * partTwo.length)];
    }

    private static durationGenerator() : number {
        const duration = [90, 120, 150, 180];

        return duration[Math.floor(Math.random() * duration.length)];
    }
}

export {MovieGenerator}