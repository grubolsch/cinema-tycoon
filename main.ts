import {MarketingCampaign} from "./MarketingCampaign";

function ask() {
    let campaign: MarketingCampaign = new MarketingCampaign("");

    let prompt: string | null = window.prompt('type ?');

    if (prompt !== null) {
        campaign.type = prompt;
    }

    let target = document.getElementById('target');

    if (target !== null) {
        target.innerText = campaign.type;
    }

    console.log(campaign.type);
}

function init() {
    let button = document.createElement('button');
    button.addEventListener('click', () => {
        ask();
    });
    document.body.appendChild(button);
}

init();