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
            document.getElementById('active_campaign')!.innerText = this._cinema.marketingManager.activeMarketingCampaign.type.name;
        } else {
            document.getElementById('active_campaign')!.innerText = 'No active campaign :)'
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
                // @ts-ignore
                document.getElementById('MarketingDurationPreview')!.innerText = 1;
                // @ts-ignore
                document.getElementById('marketingDurationRange').value = 1
            })
        })

    }

    private submitMarketingChoice() {
        // @ts-ignore
        let rangeValue = document.getElementById('marketingDurationRange').value;
        rangeValue = this._cinema.marketingManager.checkWeekRangeMinMaxValue(rangeValue);

        let optMarketing = document.getElementsByName('optMarketing');
        let selectedOption: string = "";
        optMarketing.forEach(option => {
            // @ts-ignore
            if (option.checked) {
                // @ts-ignore
                selectedOption = option.value;
            }
        });
        // @ts-ignore
        if (TYPES[selectedOption] !== null) {
            let campaign = this._cinema.marketingManager.createCampaign(selectedOption, rangeValue);
            this._cinema.marketingManager.startCampaign(campaign, this._cinema);
        }
    }

    private updateMarketingSlider(e: Event) {
        let optMarketing = document.getElementsByName('optMarketing');
        let calculatedCost: number;
        optMarketing.forEach(option => {
            let costPerWeek: number;
            // @ts-ignore
            if (option.checked && option.dataset.cost) {
                // @ts-ignore
                costPerWeek = option.dataset.cost;
                // @ts-ignore
                calculatedCost = +e.target.value * costPerWeek;
            }
            // @ts-ignore
            document.getElementById('MarketingDurationPreview')!.innerText = e.target.value + " -> cost: " + calculatedCost;
        });
    }
}

export {RenderMarketing}