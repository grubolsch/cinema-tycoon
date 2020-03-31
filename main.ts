import {MarketingCampaign} from "./Modules/MarketingCampaign";
import {FlyersCampaignType} from "./Modules/MarketingCampaignTypes/FlyersCampaignType";
import {NewspaperCampaignType} from "./Modules/MarketingCampaignTypes/NewspaperCampaignType";
import {RadioCampaignType} from "./Modules/MarketingCampaignTypes/RadioCampaignType";
import {TvCampaignType} from "./Modules/MarketingCampaignTypes/TvCampaignType";
import {InternetCampaignType} from "./Modules/MarketingCampaignTypes/InternetCampaignType";

function init() {

    function makeMarketingButtons() {
        let types: Array<string> = ['Flyers', 'Newspaper', 'Radio', 'TV', 'Internet'];
        types.forEach(type => {
            let btn = document.createElement('button');
            btn.innerText = type;
            btn.addEventListener('click', () => {
                if (window.confirm('are you sure you want to start a ' + type + ' campaign ?')){
                    newMarketingCampaign(type);
                }
            });
            document.body.appendChild(btn);
        });
    }

    (function makeStartCampaignButton() {
        let btn = document.createElement('button');
        btn.innerText = 'Start a marketing campaign';
        btn.addEventListener('click', () => {
            makeMarketingButtons();
        });
        document.body.appendChild(btn);
    }());
}

function newMarketingCampaign(type: string) {
    let campaign: MarketingCampaign;
    switch (type) {
        case 'Flyers':
            campaign = new MarketingCampaign(new FlyersCampaignType());
            break;
        case 'Newspaper':
            campaign = new MarketingCampaign(new NewspaperCampaignType());
            break;
        case 'Radio':
            campaign = new MarketingCampaign(new RadioCampaignType());
            break;
        case 'TV':
            campaign = new MarketingCampaign(new TvCampaignType());
            break;
        case 'Internet':
            campaign = new MarketingCampaign(new InternetCampaignType());
            break;
    }
    // TODO set campaign as active on the cinema object
    console.log(campaign!.type);
}

init();