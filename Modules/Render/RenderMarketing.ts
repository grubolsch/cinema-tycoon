import {Cinema} from "../Entity/Cinema";

enum TYPES {
    flyers = 'Flyers',
    newspaper = 'Newspaper',
    radio = 'Radio',
    tv = 'TV',
    internet = 'Internet',
}

class RenderMarketing implements RenderInterface {

    private _cinema: Cinema;

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
        document.getElementById('FlyersCampaign')!.addEventListener('click', () => {
            let campaign = this._cinema.marketingManager.createCampaign(TYPES.flyers);
            this._cinema.marketingManager.startCampaign(campaign, this._cinema);
        });
        document.getElementById('NewspaperCampaign')!.addEventListener('click', () => {
            let campaign = this._cinema.marketingManager.createCampaign(TYPES.newspaper);
            this._cinema.marketingManager.startCampaign(campaign, this._cinema);
        });
        document.getElementById('RadioCampaign')!.addEventListener('click', () => {
            let campaign = this._cinema.marketingManager.createCampaign(TYPES.radio);
            this._cinema.marketingManager.startCampaign(campaign, this._cinema);
        });
        document.getElementById('TVCampaign')!.addEventListener('click', () => {
            let campaign = this._cinema.marketingManager.createCampaign(TYPES.tv);
            this._cinema.marketingManager.startCampaign(campaign, this._cinema);
        });
        document.getElementById('InternetCampaign')!.addEventListener('click', () => {
            let campaign = this._cinema.marketingManager.createCampaign(TYPES.internet);
            this._cinema.marketingManager.startCampaign(campaign, this._cinema);
        });
    }
}

export {RenderMarketing}