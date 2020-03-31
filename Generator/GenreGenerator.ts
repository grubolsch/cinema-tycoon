class Genre {}

class GenreGenerator {
    private rollNewGenre(genres) {
        var balance = ConfigManager.get('general', 'balance');

        var chance = balance.genre.baseChance - (balance.genre.penaltyChance * genres.length);
        if(random(0, 100) <= chance) {
            var duration = random(balance.genre.minDuration, balance.genre.maxDuration);

            var i = 0;

            var genre; //find a valid genre - NOT already a hype, and not already unpopular
            do {
                genre = {"genre": this.genres[random(0, this.genres.length)], "duration": duration}
                i++;

                if(i === 20) {
                    alert('Too many loops over genre', "warning", false);
                    return null;
                }
            } while (cinema.isHype(genre.genre) || cinema.isAntiHype(genre.genre));

            return genre;
        }
        else {
            return null;
        }
    }

    private runOverActiveGenres(genres: Array<Genre>) {
        for(var genre in genres) {
            genres[genre]--;

            if(genres[genre] === 0) {
                delete genres[genre];
            }
        }
    }

    constructor(cinema : Cinema, configManager : ConfigManager) {
        this.genres = ConfigManager.get('generator', 'genres');
        this.cinema = cinema;

        this.runOverActiveGenres(this.cinema.getHypes());
        this.runOverActiveGenres(this.cinema.getAntiHypes());

        var hype = this.rollNewGenre(this.cinema.getHypes());
        if (hype !== null) {
            this.cinema.addHype(hype.genre, hype.duration);
            alert('Our marketing research detected a new hype: ' + hype.genre);
        }

        var antiHype = this.rollNewGenre(this.cinema.getAntiHypes());
        if (antiHype !== null) {
            this.cinema.addAntiHype(antiHype.genre, antiHype.duration);
            alert('Our marketing research detected a new unpopular genre: ' + antiHype.genre);
        }
    }
}
