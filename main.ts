import {MarketingCampaign} from "./Modules/MarketingCampaign";
import {MovieGenerator} from "./Modules/Generator/MovieGenerator";
import {Movie} from "./Modules/Entity/Movie";

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
    let manyMovies: Array<Movie> = [];
    for (let i = 0; i < 10; i++){
        manyMovies[i] = MovieGenerator.newMovie();
    }
    console.log(manyMovies);
}

init();