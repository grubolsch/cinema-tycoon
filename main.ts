import {MarketingCampaign} from "./Modules/MarketingCampaign";
import {MovieGenerator} from "./MovieGenerator";

function init() {
    let btn = document.createElement('button');
    btn.innerText = 'TEST';
    btn.addEventListener('click', () => {
        newMarketingCampaign();
        generateMovie();
    });
    document.body.appendChild(btn);
}

function newMarketingCampaign() {
    let newCampaign = new MarketingCampaign();
    newCampaign.type = 'test';
    console.log(newCampaign.type);
}

function generateMovie() {
    let movieGenerator = new MovieGenerator();
    console.log(movieGenerator.genreGenerator());
}

init();