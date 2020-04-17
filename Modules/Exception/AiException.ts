class AiException extends Error {
    static noNextAction() {
        return new this('Reached end of customer actions');
    }
}

export {AiException}