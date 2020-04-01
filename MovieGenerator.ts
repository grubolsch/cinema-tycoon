import {Movie} from "./Movie";

class MovieGenerator {

    public static newMovie(): Movie {
        let parameters: [string] = ["genre"];
        return new Movie(this.titleGenerator(), this.ratingGenerator(), parameters[0], this.typeGenerator());
    }

    protected static typeGenerator(): Map<string, boolean> {
        let typeBenchmark : number = 0.8;
        let movieType : Map<string, boolean> = new Map<string, boolean>();
        if (Math.random() >= typeBenchmark) {
            if (Math.random()>= 0.5) {
                movieType.set("Arthouse", true);
                movieType.set("Blockbuster", false);
            } else {
                movieType.set("Arthouse", false);
                movieType.set("Blockbuster", true);
            }
        } else {
            movieType.set("Arthouse", false);
            movieType.set("Blockbuster", false);
        }
        return movieType;
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

    public genreGenerator(){

    }
}

export {MovieGenerator}
//Generate a random genre for it (make a json with some random genres, we can extend it later)