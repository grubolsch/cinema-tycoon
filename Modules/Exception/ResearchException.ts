class ResearchException extends Error {
    static invalidProgress(progress : any) : ResearchException {
        return new this('You cannot give a technology a negative resource, got '+ progress);
    }
}

export {ResearchException}