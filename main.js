"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MarketingCampaign_1 = require("./MarketingCampaign");
function ask() {
    let campaign = new MarketingCampaign_1.MarketingCampaign("");
    let prompt = window.prompt('type ?');
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
