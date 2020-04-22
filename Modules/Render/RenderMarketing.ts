import {Cinema} from "../Entity/Cinema";
import {GameSpeedManager} from "../Manager/GameSpeedManager";
import {Movie} from "../Entity/Movie";
import {MarketingCampaign} from "../Entity/MarketingCampaign";

class RenderMarketing implements RenderInterface {

    private readonly _cinema: Cinema;
    private readonly _gameSpeedManager: GameSpeedManager;

    constructor(cinema: Cinema, gameSpeedManager: GameSpeedManager) {
        this._cinema = cinema;
        this._gameSpeedManager = gameSpeedManager;
        this.renderOneTime();
    }

    private readonly _advertisingModal = $('#advertisingModal');
    private readonly _advertisingBtn = <HTMLElement>document.getElementById('advertisingButton');
    private readonly _durationPreview = <HTMLElement>document.getElementById('marketingDurationPreview');
    private readonly _movieDurationPreview = <HTMLElement>document.getElementById('movieMarketingDurationPreview');
    private readonly _costPreview = <HTMLElement>document.getElementById('costPreviewGeneric');
    private readonly _movieCostPreview = <HTMLElement>document.getElementById('costPreviewMovie');
    private _durationRange = <HTMLInputElement>document.getElementById('marketingDurationRange');
    private _movieDurationRange = <HTMLInputElement>document.getElementById('movieMarketingDurationRange');
    private readonly _submitMarketingButton = <HTMLElement>document.getElementById('marketingSubmit');
    private readonly _submitMovieMarketingButton = <HTMLElement>document.getElementById('movieMarketingSubmit');
    private readonly _marketingTypeOptions = <HTMLInputElement[]>Array.from(document.getElementsByName('optMarketing'));
    private readonly _movieMarketingTypeOptions = <HTMLInputElement[]>Array.from(document.getElementsByName('optMovieMarketing'));
    private readonly _movieMarketingSelector = <HTMLSelectElement>document.getElementById('movieMarketingSelector');
    private readonly _activeCampaignsList = <HTMLElement>document.getElementById('activeCampaigns');

    private readonly _freeTicketSliderHTML: string = '<input type="range" id="freeTicketAmountSlider" name="ticketRange" class="form-control-range" value="1" min="1" max="999"><br><span class="text-center" id="amountPreview"></span>';
    private readonly _movieDurationSliderHTML: string = '<input type="range" id="movieMarketingDurationRange" name="movieRange" class="form-control-range" value="1" min="1" max="12">';
    private readonly _movieRangeBox = <HTMLElement>document.getElementById('movieRangeBox');

    render(): void {

    }

    public renderOneTime() {
        this._advertisingBtn.addEventListener('click', _ => {
            this._gameSpeedManager.pause();
            this.resetRadioButtons();
            this.showDurationSlider();
            this.updateMovieSelector();
            this.updateActiveCampaigns();
            this.updateMarketingSlider();
            this.updateMovieMarketingSlider();
            this._advertisingModal.modal('show');
        });

        this._durationRange.addEventListener('input', () => {
            this.updateMarketingSlider();
        });

        this._movieDurationRange.addEventListener('input', () => {
            this.updateMovieMarketingSlider();
        });

        this._submitMarketingButton.addEventListener('click', () => {
            this.submitMarketingChoice();
        });

        this._submitMovieMarketingButton.addEventListener('click', () => {
            let selected: HTMLInputElement = <HTMLInputElement>this._movieMarketingTypeOptions.find((option) => {
                return option.checked;
            })
            if (selected.value !== 'Tickets') {
                this.submitMovieMarketingChoice();
                return;
            }
            this.submitMovieMarketingChoice(true, parseInt((<HTMLInputElement>document.getElementById('freeTicketAmountSlider')).value));
        });

        this._marketingTypeOptions.forEach(option => {
            option.addEventListener('input', () => {
                this._durationRange.value = '1';
                this.updateMarketingSlider();
            })
        });

        this._movieMarketingTypeOptions.forEach(option => {
            if (option.value === 'Tickets') {
                option.addEventListener('input', () => {
                    this.showAmountSlider();
                })
            } else {
                option.addEventListener('input', () => {
                    this.showDurationSlider();
                    this.updateMovieMarketingSlider();
                })
            }
        })
    }

    private updateMovieSelector() {
        this._cinema.movieManager.movies.forEach(movie => {
            let option = document.createElement('option');
            option.value = movie.id.toString();
            option.innerText = movie.title;
            this._movieMarketingSelector.appendChild(option);
        })
    }

    private showDurationSlider() {
        this._movieRangeBox.innerHTML = this._movieDurationSliderHTML;
        this._movieDurationRange = <HTMLInputElement>document.getElementById('movieMarketingDurationRange');
        document.getElementById('movieMarketingDurationRange')!.addEventListener('input', () => {
            this.updateMovieMarketingSlider();
        });
    }

    private showAmountSlider() {
        this._movieRangeBox.innerHTML = this._freeTicketSliderHTML;
        document.getElementById('freeTicketAmountSlider')!.addEventListener('input', () => {
            this.updateTicketSlider();
        });
    }

    updateActiveCampaigns() {
        this._activeCampaignsList.innerHTML = '';
        if (this._cinema.marketingManager.activeMarketingCampaign) {
            let genericItem = document.createElement('li');
            genericItem.innerText = this._cinema.marketingManager.activeMarketingCampaign.type.name + ' | ' + this._cinema.marketingManager.activeMarketingCampaign.remainingWeeks + ' weeks remaining';
            this._activeCampaignsList.appendChild(genericItem);
        }
        this._cinema.marketingManager.activeMovieCampaigns.forEach(movieCampaign => {
            let li = document.createElement('li');
            li.innerText = this._cinema.movieManager.findMovie((<Movie>movieCampaign.movie).id).title + ' | ' + movieCampaign.type.name + ' | ' + movieCampaign.remainingWeeks + ' weeks remaining';
            this._activeCampaignsList.appendChild(li);
        });
    }

    private submitMarketingChoice(): void {
        let rangeValue: number = parseInt((<HTMLInputElement>this._durationRange).value);
        rangeValue = this._cinema.marketingManager.checkWeekRangeMinMaxValue(rangeValue);
        let selectedOption: HTMLInputElement = <HTMLInputElement>this._marketingTypeOptions.find((element: HTMLInputElement) => {
            return element.checked;
        });
        if (selectedOption !== undefined) {
            let campaign = this._cinema.marketingManager.createCampaign(selectedOption.value, rangeValue);
            this._cinema.marketingManager.startCampaign(campaign, this._cinema);
            this._advertisingModal.modal('hide');
        }
    }

    private submitMovieMarketingChoice(ticketsCampaign: boolean = false, ticketsAmount: number = 0): void {
        let rangeValue: number = parseInt((<HTMLInputElement>this._movieDurationRange).value);
        rangeValue = this._cinema.marketingManager.checkWeekRangeMinMaxValue(rangeValue);
        let selectedOption: HTMLInputElement = <HTMLInputElement>this._movieMarketingTypeOptions.find((element: HTMLInputElement) => {
            return element.checked;
        });
        let movieId = this._movieMarketingSelector.options[this._movieMarketingSelector.selectedIndex].value;
        if (selectedOption !== undefined) {
            let campaign: MarketingCampaign;
            if (ticketsCampaign) {
                campaign = this._cinema.marketingManager.createCampaign(selectedOption.value, rangeValue, this._cinema.movieManager.findMovie(parseInt(movieId)), ticketsAmount);
            } else {
                campaign = this._cinema.marketingManager.createCampaign(selectedOption.value, rangeValue, this._cinema.movieManager.findMovie(parseInt(movieId)));
            }
            this._cinema.marketingManager.startMovieCampaign(campaign, this._cinema, movieId);
            this._advertisingModal.modal('hide');
        }
    }

    private updateMarketingSlider() {
        let cost: number = 0;
        this._marketingTypeOptions.forEach((option: HTMLInputElement) => {
            if (option.checked) {
                cost = this._cinema.marketingManager.calculatePreviewCost(option.value, parseInt(this._durationRange.value), this._cinema);
            }
            this._durationPreview.innerText = this._durationRange.value;
            this._costPreview.innerText = cost.toString();
        });
    }

    private updateMovieMarketingSlider() {
        let cost: number = 0;
        this._movieMarketingTypeOptions.forEach((option: HTMLInputElement) => {
            if (option.checked) {
                cost = this._cinema.marketingManager.calculatePreviewCost(option.value, parseInt(this._movieDurationRange.value), this._cinema, true);
            }
            this._movieDurationPreview.innerText = this._movieDurationRange.value;
            this._movieCostPreview.innerText = cost.toString();
        });
    }

    private updateTicketSlider() {
        let cost = this._cinema.marketingManager.calculateFreeTicketsCost(parseInt((<HTMLInputElement>document.getElementById('freeTicketAmountSlider')).value), this._cinema);
        this._movieDurationPreview.innerText = '4';
        this._movieCostPreview.innerText = cost.toString();
        document.getElementById('amountPreview')!.innerText = (<HTMLInputElement>document.getElementById('freeTicketAmountSlider')).value;
    }

    private resetRadioButtons() {
        this._movieMarketingTypeOptions[0].checked = true;
        this._marketingTypeOptions[0].checked = true;
    }
}

export {RenderMarketing}