import {Movie} from "../Entity/Movie";
import {MovieType} from "../MovieTypes/MovieType";
import  Genres  from  "../Assets/Genres.json";

class MovieGenerator {

    public static newMovie(): Movie {
        return new Movie(this.titleGenerator(), this.ratingGenerator(), this.genreGenerator(), this.typeGenerator());
    }

    protected static typeGenerator() {
        let typeBenchmark: number = 0.8;
        if (Math.random() >= typeBenchmark) {
            let specificType = Math.random();
            MovieType.isArthouse(specificType > 0.5);
            MovieType.isBlockbuster(specificType <= 0.5);
            MovieType.isGeneric(false);
        }
        return MovieType;
    }

    protected static ratingGenerator(): number {
        return Math.ceil(Math.random() * 10);
    }

    protected static titleGenerator() {
        let partOne : Array<string> = ["The Shawshank ", "The Dark ", "The Godfather: ", "The Lord of the Rings: ",
                                        "Pulp ", "Schindler's ", "Fight ", "Forrest ", "The Good, The Bad ",
                                        "Star Wars: Episode V - "];
        let partTwo : Array<string> = ["Redemption",  "Knight", "Part II", "The Return of the King",
                                        "Fiction", "List", "Club", "Gump", "and the Ugly", "The Empire Strikes Back"];
        return  partOne[Math.floor(Math.random() * partOne.length)] +
            partTwo[Math.floor(Math.random() * partOne.length)];
    }

    protected static genreGenerator(): string{
        let randomIndex: number = Math.floor(Math.random() * 10);
        return  Genres["genres"][randomIndex]["genre"];
    }
}

export {MovieGenerator}