class MovieTypeException extends Error {
    static invalidType() : MovieTypeException {
        return new this('A movie cannot be blockbuster & arthouse at  the same time!');
    }
}
export {MovieTypeException}