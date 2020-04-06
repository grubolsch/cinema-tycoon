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

    render(): void {
        if (this._cinema.marketingManager.activeMarketingCampaign !== null) {
            (<HTMLElement>document.getElementById('active_campaign')).innerText = this._cinema.marketingManager.activeMarketingCampaign.type.name;
            (<HTMLElement>document.getElementById('duration_campaign')).innerText = '| time left: ' + this._cinema.marketingManager.activeMarketingRemainingDuration + ' weeks';
        } else {
            (<HTMLElement>document.getElementById('active_campaign')).innerText = 'No active campaign';
            (<HTMLElement>document.getElementById('duration_campaign')).innerText = '';

        }
    }

    public renderOneTime() {
        document.getElementById('marketingDurationRange')!.addEventListener('input', (e) => {
            this.updateMarketingSlider(e);
        });
        document.getElementById('marketingSubmit')!.addEventListener('click', () => {
            this.submitMarketingChoice();
        });
        let optMarketing = document.getElementsByName('optMarketing');
        optMarketing.forEach(option => {
            option.addEventListener('input', () => {
                (<HTMLElement>document.getElementById('MarketingDurationPreview')).innerText = '1';
                (<HTMLInputElement>document.getElementById('marketingDurationRange')).value = '1';
            })
        })

    }

    private submitMarketingChoice() {
        let rangeValue: number = parseInt((<HTMLInputElement>document.getElementById('marketingDurationRange')).value);
        rangeValue = this._cinema.marketingManager.checkWeekRangeMinMaxValue(rangeValue);

        let selectedOption : HTMLInputElement | undefined = (<HTMLInputElement[]>Array.from(document.getElementsByName('optMarketing'))).find((option) => {
            return option.checked;
        });

        // @ts-ignore
        if (selectedOption !== undefined && TYPES[selectedOption.value] !== null) {
            let campaign = this._cinema.marketingManager.createCampaign(selectedOption.value, rangeValue);
            this._cinema.marketingManager.startCampaign(campaign, this._cinema);
        }
    }

    private updateMarketingSlider(e: Event) {
        let optMarketing = (<HTMLInputElement[]>Array.from(document.getElementsByName('optMarketing')));
        let calculatedCost: number;
        optMarketing.forEach((option:HTMLInputElement) => {
            let costPerWeek: number;
            if (option.checked && option.dataset.cost) {
                costPerWeek = parseInt(option.dataset.cost);
                // @ts-ignore
                calculatedCost = e.target.value * costPerWeek;
            }
            // @ts-ignore
            document.getElementById('MarketingDurationPreview')!.innerText = e.target.value + " -> cost: " + calculatedCost;
        });
    }
}

export {RenderMarketing}