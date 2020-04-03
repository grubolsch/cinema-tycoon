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
            // @ts-ignore
            document.getElementById('MarketingDurationPreview')!.innerText = e.target.value;
        });
        document.getElementById('marketingSubmit')!.addEventListener('click', () => {
            // @ts-ignore
            let rangeValue = document.getElementById('marketingDurationRange').value;
            rangeValue = this._cinema.marketingManager.checkWeekRangeMinMaxValue(rangeValue);

            let optMarketing = document.getElementsByName('optMarketing');
            let selectedOption : string = "";
            optMarketing.forEach(option => {
                // @ts-ignore
                if (option.checked){
                    // @ts-ignore
                    selectedOption = option.value;
                }
            });
            // @ts-ignore
            if (TYPES[selectedOption] !== null){
                let campaign = this._cinema.marketingManager.createCampaign(selectedOption, rangeValue);
                this._cinema.marketingManager.startCampaign(campaign, this._cinema);
            }
        })
    }
}

export {RenderMarketing}