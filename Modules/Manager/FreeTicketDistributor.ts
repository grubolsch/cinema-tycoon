import {Movie} from "../Entity/Movie";
import {Customer} from "../Entity/Customer";
import {FreeTicket} from "../Entity/FreeTicket";
import {ConfigManager} from "./ConfigManager";
import {Show} from "../Entity/Show";
import {Cinema} from "../Entity/Cinema";
import {MarketingCampaign} from "../Entity/MarketingCampaign";
import {InventoryItem} from "../Entity/InventoryItem";

class FreeTicketDistributor {

    private readonly _config: ConfigManager;

    constructor(config: ConfigManager) {
        this._config = config;
    }

    public giveFreeTicket(customer: Customer, movie: Movie) {
        customer.addInventoryItem(InventoryItem.INV_FREE_TICKET, new &(movie));
        movie.removeFreeTicket();
    }

    calculateFreeTicketPercentage(show: Show, cinema: Cinema): number {
        if (show.movie.hasRunningCampaign(cinema)) {
            let runningCampaign: MarketingCampaign = <MarketingCampaign>show.movie.getRunningCampaign(cinema);
            if (runningCampaign.type.isTicketCampaign()) {
                return Math.floor((show.room.type.capacity * (this._config.maxFreeTicketPercentage / 100)) / Math.exp(runningCampaign.daysActive / this._config.freeTicketSlope));
            }
        }
        return 0;
    }
}

export {FreeTicketDistributor}