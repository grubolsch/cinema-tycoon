class GenreManager {
    private hypes : Array<Genre> = [];
    private antiHypes : Array<Genre> = [];

    public getHypes() {
        return this.hypes;
    }
    this.getAntiHypes() {
        return this.antiHypes;
    }
    this.addHype(genre, duration) {
        this.hypes[genre] = duration;
    }
    this.addAntiHype(genre, duration) {
        this.antiHypes[genre] = duration;
    }
    this.isHype(genre) {
        return this.hypes[genre];
    }
    this.isAntiHype(genre) {
        return this.antiHypes[genre];
    }
}