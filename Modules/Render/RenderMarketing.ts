import {Cinema} from "../Entity/Cinema";
import {GameSpeedManager} from "../Manager/GameSpeedManager";
import {Movie} from "../Entity/Movie";

class RenderMarketing implements RenderInterface {

    private readonly _cinema: Cinema;
    private readonly _gameSpeedManager: GameSpeedManager;

    constructor(cinema: Cinema, gameSpeedManager: GameSpeedManager) {
        this._cinema = cinema;
        this._gameSpeedManager = gameSpeedManager;
        this.renderOneTime();
    }

    private readonly advertisingModal = $('#advertisingModal');
    private readonly advertisingBtn = <HTMLElement>document.getElementById('advertisingButton');
    private readonly durationPreview = <HTMLElement>document.getElementById('MarketingDurationPreview');
    private readonly movieDurationPreview = <HTMLElement>document.getElementById('movieMarketingDurationPreview');
    private readonly durationRange = <HTMLElement>document.getElementById('marketingDurationRange');
    private readonly movieDurationRange = <HTMLElement>document.getElementById('movieMarketingDurationRange');
    private readonly submitMarketingButton = <HTMLElement>document.getElementById('marketingSubmit');
    private readonly submitMovieMarketingButton = <HTMLElement>document.getElementById('movieMarketingSubmit');
    private readonly marketingTypeOptions = <HTMLInputElement[]>Array.from(document.getElementsByName('optMarketing'));
    private readonly movieMarketingTypeOptions = <HTMLInputElement[]>Array.from(document.getElementsByName('optMovieMarketing'));
    private readonly movieMarketingSelector = <HTMLSelectElement>document.getElementById('movieMarketingSelector');
    private readonly activeCampaignsList = <HTMLElement>document.getElementById('activeCampaigns');


    render(): void {

    }

    public renderOneTime() {
        this.advertisingBtn.addEventListener('click', _ => {
            this._gameSpeedManager.pause();
            this.updateMovieSelector();
            this.updateActiveCampaigns();
            this.advertisingModal.modal('show');
        });

        this.durationRange.addEventListener('input', (e: Event) => {
            this.updateMarketingSlider(e);
        });

        this.movieDurationRange.addEventListener('input', (e: Event) => {
            this.updateMovieMarketingSlider(e);
        });

        this.movieMarketingTypeOptions.forEach(option => {
            option.addEventListener('input', (e) => {
                this.updateMovieMarketingSlider(e);
            })
        });

        this.movieDurationRange.addEventListener('input', (e: Event) => {
            this.updateMovieMarketingSlider(e);
        });

        this.submitMarketingButton.addEventListener('click', () => {
            this.submitMarketingChoice();
        });

        this.submitMovieMarketingButton.addEventListener('click', () => {
            this.submitMovieMarketingChoice();
        });

        this.marketingTypeOptions.forEach(option => {
            option.addEventListener('input', () => {
                this.durationPreview.innerText = '1 -> cost: ' + option.dataset.cost;
                (<HTMLInputElement>this.durationRange).value = '1';
            })
        });

        this.movieMarketingTypeOptions.forEach(option => {
            option.addEventListener('input', () => {
                this.movieDurationPreview.innerText = '1 -> cost: ' + option.dataset.cost;
                (<HTMLInputElement>this.movieDurationRange).value = '1';
            })
        })
    }

    private updateMovieSelector() {
        this._cinema.movieManager.movies.forEach(movie => {
            let option = document.createElement('option');
            option.value = movie.id.toString();
            option.innerText = movie.title;
            this.movieMarketingSelector.appendChild(option);
        })
    }

    updateActiveCampaigns(){
        if (this._cinema.marketingManager.activeMarketingCampaign){
            let genericItem = document.createElement('li');
            genericItem.innerText = this._cinema.marketingManager.activeMarketingCampaign.type.name + ' | ' + this._cinema.marketingManager.activeMarketingCampaign.remainingWeeks + ' weeks remaining';
            this.activeCampaignsList.appendChild(genericItem);
        }
        this._cinema.marketingManager.activeMovieCampaigns.forEach(movieCampaign => {
            let li = document.createElement('li');
            li.innerText = this._cinema.movieManager.findMovie((<Movie>movieCampaign.movie).id).title + ' | ' + movieCampaign.type.name + ' | ' + movieCampaign.remainingWeeks + ' weeks remaining';
            this.activeCampaignsList.appendChild(li);
        });
    }

    private submitMarketingChoice(): void {
        let rangeValue: number = parseInt((<HTMLInputElement>this.durationRange).value);
        rangeValue = this._cinema.marketingManager.checkWeekRangeMinMaxValue(rangeValue);
        let selectedOption: HTMLInputElement = <HTMLInputElement>this.marketingTypeOptions.find((element: HTMLInputElement) => {
            return element.checked;
        });
        if (selectedOption !== undefined) {
            let campaign = this._cinema.marketingManager.createCampaign(selectedOption.value, rangeValue);
            this._cinema.marketingManager.startCampaign(campaign, this._cinema);
            this.advertisingModal.modal('hide');
        }
    }

    private submitMovieMarketingChoice(): void {
        let rangeValue: number = parseInt((<HTMLInputElement>this.movieDurationRange).value);
        rangeValue = this._cinema.marketingManager.checkWeekRangeMinMaxValue(rangeValue);
        let selectedOption: HTMLInputElement = <HTMLInputElement>this.movieMarketingTypeOptions.find((element: HTMLInputElement) => {
            return element.checked;
        });
        let movieId = this.movieMarketingSelector.options[this.movieMarketingSelector.selectedIndex].value;
        if (selectedOption !== undefined) {
            let campaign = this._cinema.marketingManager.createCampaign(selectedOption.value, rangeValue, this._cinema.movieManager.findMovie(parseInt(movieId)));
            this._cinema.marketingManager.startMovieCampaign(campaign, this._cinema, movieId);
            this.advertisingModal.modal('hide');
        }
    }

    private updateMarketingSlider(e: Event) {
        let cost : number;
        this.marketingTypeOptions.forEach((option: HTMLInputElement) => {
            if (option.checked) {
                cost = this._cinema.marketingManager.calculatePreviewCost(option.value,parseInt((<HTMLInputElement>e.target).value),this._cinema);
            }
            this.durationPreview.innerText = (<HTMLInputElement>e.target).value + " -> cost: " + cost;
        });
    }

    private updateMovieMarketingSlider(e: Event) {
        let cost: number;
        this.movieMarketingTypeOptions.forEach((option: HTMLInputElement) => {
            if (option.checked) {
                cost = this._cinema.marketingManager.calculatePreviewCost(option.value,parseInt((<HTMLInputElement>e.target).value),this._cinema, true);
            }
            this.movieDurationPreview.innerText = (<HTMLInputElement>e.target).value + " -> cost: " + cost;
        });
    }
}

export {RenderMarketing}