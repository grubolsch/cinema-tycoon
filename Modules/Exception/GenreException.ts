class GenreException extends Error {
    private constructor(msg: string) {
        super(msg);
    }

    static invalidType() {
        return new this('A genre cannot be both a hype and unpopular');
    }
}

export {GenreException}