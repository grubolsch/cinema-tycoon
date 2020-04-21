import {Movie} from "../Entity/Movie";
import {Customer} from "../Entity/Customer";
import {FreeTicket} from "../Entity/FreeTicket";
import {ConfigManager} from "./ConfigManager";
import {Show} from "../Entity/Show";
import {Cinema} from "../Entity/Cinema";
import {MarketingCampaign} from "../Entity/MarketingCampaign";

class FreeTicketDistributor {

    private readonly _config: ConfigManager;

    constructor(config: ConfigManager) {
        this._config = config;
    }

    public giveFreeTicket(customer: Customer, movie: Movie) {
        customer.addInventoryItem('Free ticket', new FreeTicket(movie));
        movie.removeFreeTicket();
    }

    calculateFreeTicketPercentage(show: Show, cinema: Cinema): number {
        if (show.movie.hasRunningCampaign(cinema)) {
            let runningCampaign: MarketingCampaign = show.movie.getRunningCampaign(cinema);
            if (runningCampaign.type.name === 'Tickets') {
                return Math.floor(show.room.type.capacity / Math.exp(runningCampaign.daysActive / this._config.freeTicketSlope));
            }
        }
        return 0;
    }
}

export {FreeTicketDistributor}