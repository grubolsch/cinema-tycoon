import {Cinema} from "../Entity/Cinema";

enum TYPES {
    flyers = 'Flyers',
    newspaper = 'Newspaper',
    radio = 'Radio',
    tv = 'TV',
    internet = 'Internet',
}

class RenderMarketing implements RenderInterface {

    readonly _cinema: Cinema;

    constructor(cinema: Cinema) {
        this._cinema = cinema;
        this.renderOneTime();
    }

    readonly activeCampaignSpan = <HTMLElement>document.getElementById('active_campaign');
    readonly durationCampaignSpan = <HTMLElement>document.getElementById('duration_campaign');
    readonly durationPreview = <HTMLElement>document.getElementById('MarketingDurationPreview');
    readonly durationRange = <HTMLElement>document.getElementById('marketingDurationRange');
    readonly submitMarketingButton = <HTMLElement>document.getElementById('marketingSubmit');
    readonly marketingTypeOptions = <HTMLInputElement[]>Array.from(document.getElementsByName('optMarketing'));

    render(): void {
        if (this._cinema.marketingManager.activeMarketingCampaign !== null) {
            this.activeCampaignSpan.innerText = this._cinema.marketingManager.activeMarketingCampaign.type.name;
            this.durationCampaignSpan.innerText = '| time left: ' + this._cinema.marketingManager.activeMarketingRemainingDuration + ' weeks';
        } else {
            this.activeCampaignSpan.innerText = 'No active campaign';
            this.durationCampaignSpan.innerText = '';
        }
    }

    public renderOneTime() {
        this.durationRange.addEventListener('input', (e: Event) => {
            this.updateMarketingSlider(e);
        });
        this.submitMarketingButton.addEventListener('click', () => {
            this.submitMarketingChoice();
        });
        let optMarketing = document.getElementsByName('optMarketing');
        optMarketing.forEach(option => {
            option.addEventListener('input', () => {
                this.durationPreview.innerText = '1';
                (<HTMLInputElement>this.durationRange).value = '1';
            })
        })
    }

    private submitMarketingChoice() {
        let rangeValue: number = parseInt((<HTMLInputElement>this.durationRange).value);
        rangeValue = this._cinema.marketingManager.checkWeekRangeMinMaxValue(rangeValue);

        let selectedOption: HTMLInputElement | undefined = this.marketingTypeOptions.find((element: HTMLInputElement) => {
            return element.checked;
        });

        if (selectedOption !== undefined && selectedOption.value !== typeof TYPES) {
            let campaign = this._cinema.marketingManager.createCampaign(selectedOption.value, rangeValue);
            this._cinema.marketingManager.startCampaign(campaign, this._cinema);
        }
    }

    private updateMarketingSlider(e: Event) {
        let calculatedCost: number;
        this.marketingTypeOptions.forEach((option: HTMLInputElement) => {
            let costPerWeek: number;
            if (option.checked && option.dataset.cost) {
                costPerWeek = parseInt(option.dataset.cost);
                calculatedCost = parseInt((<HTMLInputElement>e.target).value) * costPerWeek;
            }
            this.durationPreview.innerText = (<HTMLInputElement>e.target).value + " -> cost: " + calculatedCost;
        });
    }
}

export {RenderMarketing}