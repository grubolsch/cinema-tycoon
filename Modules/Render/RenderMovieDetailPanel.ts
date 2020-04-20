import {currency} from "../Utils";
import {MovieManager} from "../Manager/MovieManager";
import {MovieDropdown} from "./Helper/MovieDropdown";
import {Movie} from "../Entity/Movie";
import {Scheduler} from "../Entity/Scheduler";
import {MovieSaleOverTime} from "../Manager/Graphs/MovieSaleOverTime";
import {Cinema} from "../Entity/Cinema";
import {ChartConfigInterface, GraphLine} from "../Manager/Graphs/ChartConfigInterface";
import {ChartConfigurationHelper} from "./Helper/ChartConfigurationHelper";

class RenderMovieDetailPanel implements RenderInterface {
    // @ts-ignore
    private readonly modal = $('#statisticsModal');

    private readonly container = (<HTMLElement>document.querySelector('#movie-detail-panel'));
    private readonly noMovieSelectedElement = (<HTMLElement>document.querySelector('#movie-detail-panel-no-movie'));
    private readonly movieSelector = (<HTMLSelectElement>document.querySelector('#movie-detail-selector'));
    private readonly retireMovieButton = (<HTMLElement>document.querySelector('#retire-movie-action'));
    private readonly chartContainer = (<HTMLElement>document.querySelector('#container-chart-movie-over-time'));
    private readonly movieDropdown : MovieDropdown;

    private readonly cinema : Cinema;
    private readonly movieManager : MovieManager;
    private readonly scheduler : Scheduler;
    private movie : Movie|undefined;

    constructor(cinema : Cinema) {
        this.cinema = cinema;
        this.movieManager = cinema.movieManager;
        this.scheduler = cinema.scheduler;
        this.movieDropdown = new MovieDropdown(this.movieManager, this.movieSelector, true);
        this.renderOnce();
    }

    renderOnce() {
        this.movieSelector.addEventListener('change', (event) => {
            this.movie = this.movieManager.movies.get(parseInt(this.movieSelector.value));
            if(this.movie === undefined) {
                this.noMovieSelectedElement.classList.remove('hide');
                this.container.classList.add('hide');
                return;
            }

            this.renderDetailScreen(this.movie);
            this.renderChart(this.movie);
        });

        this.retireMovieButton.addEventListener('click', (event) => {
            if(!confirm('Are you sure you want to retire this movie? \nThis will expire your license for this movie without a way of regaining access.')) {
                return;
            }

            let movieId = (<HTMLElement>event.target).dataset.movie;
            if(movieId === undefined) {
                return alert('Could not find movie to retire');
            }

            let movie = this.movieManager.movies.get(parseInt(movieId));

            if(movie === undefined) {
                return alert('Could not find movie to retire');
            }

            let foundShows : number = 0;
            this.scheduler.allShows.forEach((show ) => {
                if(show.movie.id === movie!.id) {
                    foundShows++;
                }
            });

            if(foundShows > 0) {
                return alert('This movie could not be retired because it still has '+ foundShows + ' running shows. Please remove these shows first in the scheduler.');
            }

            this.movieManager.retireMovie(movie);

            alert(`Removed movie ${movie.title}`);

            this.noMovieSelectedElement.classList.remove('hide');
            this.container.classList.add('hide');
        });
    }

    render(): void {
        this.movieDropdown.render();

        if(this.movie === undefined) {
            return;
        }

        this.container.querySelector('.total-profit')!.innerHTML = currency(this.movie.totalRevenue);
        this.container.querySelector('.total-profit')!.className = 'total-profit ' + ((this.movie.totalRevenue >= 0) ? 'positive' : 'negative');
        this.container.querySelector('.total-tickets')!.innerHTML = this.movie.totalTickets.toString();
    }

    renderDetailScreen(movie : Movie) {
        this.container.querySelector('.title')!.innerHTML = movie.title;
        this.container.querySelector('.genre')!.innerHTML = movie.genre.name;
        this.container.querySelector('.duration')!.innerHTML = movie.duration.toString();
        this.container.querySelector('.cost')!.innerHTML = currency(movie.cost);
        this.container.querySelector('.release-date')!.innerHTML = movie.releaseDate.format();

        this.loadReviews(movie);

        (<HTMLElement>this.container.querySelector('.movie-arthouse')).style.display = (movie.type.isArthouse) ? 'block' : 'none';
        (<HTMLElement>this.container.querySelector('.movie-blockbuster')).style.display = (movie.type.isBlockbuster) ? 'block' : 'none';

        this.retireMovieButton.dataset.movie = movie.id.toString();

        this.noMovieSelectedElement.classList.add('hide');
        this.container.classList.remove('hide');
    }

    private loadReviews(movie: Movie) {
        this.container.querySelector('.reviews')!.innerHTML = '';
        movie.reviews.forEach((review) => {
            let li = document.createElement('li');
            li.innerText = review;
            this.container.querySelector('.reviews')!.appendChild(li);
        });
    }

    renderChart(movie : Movie) {
        let chart = new MovieSaleOverTime(movie);

        let flattenedData: Array<GraphLine> = [];
        flattenedData.push(chart.getHeader());

        let rawData = chart.getData(this.cinema.statisticsManager, this.cinema.timeManager.year);
        if (rawData === undefined) {
            this.chartContainer.classList.add('hide');
            return;
        }
        this.chartContainer.classList.remove('hide');

        rawData.forEach(function (valueByWeeks, key) {
            let month = key;

            valueByWeeks.forEach(function (value, key) {
                flattenedData.push([`m ${month}, w ${key}`, value]);
            });
        });

        // @ts-ignore
        const chartElement = new google.visualization.LineChart(chart.targetNodeSelector());

        // @ts-ignore
        chartElement.draw(google.visualization.arrayToDataTable(flattenedData), ChartConfigurationHelper.getChartOptions(this.modal, chart));
    }
}

export {RenderMovieDetailPanel}