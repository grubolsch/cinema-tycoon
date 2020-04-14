import {Cinema} from "../Entity/Cinema";
import {ConfigManager} from "./ConfigManager";
import {Show} from "../Entity/Show";
import {CustomerGenerator} from "../Generator/CustomerGenerator";

class CustomerSpawnerManager {
    private cinema : Cinema;
    private config : ConfigManager;

    constructor(cinema: Cinema, config : ConfigManager) {
        this.cinema = cinema;
        this.config = config;
    }

    private getCustomersPerShow(show : Show) : number {
        let base = this.config.customerBase * show.movie.popularity / 100;
        let percentage : number = 0;

        if(this.cinema.genreManager.isPopular(show.movie.genre)) {
            percentage += this.config.customerGenreBonus;
        }
        else if(this.cinema.genreManager.isUnpopular(show.movie.genre)) {
            percentage -= this.config.customerGenrePenalty;
        }

        if(show.movie.type.isBlockbuster) {
            percentage += this.config.customerBlockbusterBonus;
        }
        else if(show.movie.type.isArthouse) {
            percentage -= this.config.customerArthousePenalty;
        }

        let customers = base + (base * percentage / 100);

        //marketing is added ON TOP of the bonus of blockbuster, genre match - making it very potent
        if(this.cinema.marketingManager.activeMarketingCampaign !== null) {
            customers += customers * this.cinema.marketingManager.activeMarketingCampaign.type.bonus / 100;
        }

        //@todo : implement free ticket

        return Math.round(customers);
    }

    private getFansPerShow() : number {
        return Math.round(this.cinema.fans / this.cinema.timeManager.daysInMonth / this.cinema.scheduler.allShows.length);
    }

    updateByDay() {
        let generator = new CustomerGenerator(this.config);

        let self = this;
        this.cinema.scheduler.allShows.forEach(function(show) {
            let totalCustomers = self.getCustomersPerShow(show);
            for (let i = 0; i < totalCustomers; i++) {
                self.cinema.customerManager.add(generator.createCustomer(), show.movie, show.start);
            }

            let totalFans = self.getFansPerShow();
            for (let i = 0; i < totalCustomers; i++) {
                self.cinema.customerManager.add(generator.createCustomer(true), show.movie, show.start);
            }

            console.log('Show '+ show.movie.title + ' gets '+ totalCustomers + ' customers, '+ totalFans +' fans.');
        });
    }
}

export {CustomerSpawnerManager}