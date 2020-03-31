import {MarketingCampaign} from "./Modules/MarketingCampaign";

function init() {
    let btn = document.createElement('button');
    btn.innerText = 'TEST';
    btn.addEventListener('click', () => {
        newMarketingCampaign();
    });
    document.body.appendChild(btn);
}

function newMarketingCampaign() {
    let newCampaign = new MarketingCampaign();
    newCampaign.type = 'test';
    console.log(newCampaign.type);
}

init();