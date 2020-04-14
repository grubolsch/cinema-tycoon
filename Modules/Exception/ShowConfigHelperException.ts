class ShowConfigHelperException extends Error {
    //returning any on purpose here, we already know something bad happened, who knows what they tried for ID
    static invalidMovie(id : any) : ShowConfigHelperException {
        return new this('Could not find movie with id '+ id);
    }
}
export {ShowConfigHelperException}