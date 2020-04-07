import {Cinema} from "../Entity/Cinema";

class RenderMoviePicker implements RenderInterface {

    readonly _cinema : Cinema;

    readonly moviePickerModal = $('#moviePickerModal');
    readonly moviePickerBody = <HTMLElement>document.getElementById('moviePickerBody');

    constructor(cinema: Cinema) {
        this._cinema = cinema;
    }

    render(): void {
        let movies = this._cinema.movieManager.generateThreeMovies();
        this.moviePickerBody.innerHTML = '';
        movies.forEach((movie, index) => {
            let movieSelector = document.createElement('input');
            movieSelector.setAttribute('type', 'checkbox');
            movieSelector.classList.add('movieSelector');
            movieSelector.setAttribute('data-movie', movie.movieTitle);
            movieSelector.textContent = movie.movieTitle;
            let label = document.createElement('label');
            label.innerText = 'movie ' + index;
            label.appendChild(movieSelector);
            this.moviePickerBody.appendChild(movieSelector);
        });
        this.moviePickerModal.modal('show');
    }
}

export {RenderMoviePicker}
