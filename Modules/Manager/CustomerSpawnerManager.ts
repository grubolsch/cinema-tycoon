import {Cinema} from "../Entity/Cinema";
import {ConfigManager} from "./ConfigManager";
import {Show} from "../Entity/Show";
import {CustomerGenerator} from "../Generator/CustomerGenerator";
import {Customer} from "../Entity/Customer";

class CustomerSpawnerManager {
    private readonly cinema: Cinema;
    private readonly config: ConfigManager;

    constructor(cinema: Cinema, config: ConfigManager) {
        this.cinema = cinema;
        this.config = config;
    }

    private getCustomersPerShow(show: Show): number {
        let base = this.config.customerBase * this.cinema.movieManager.calculatePopularity(show.movie) / 100;
        let percentage: number = this.calculatePercentage(show);
        let customers: number = base + (base * percentage / 100);

        //marketing is added ON TOP of the bonus of blockbuster, genre match - making it very potent
        if (this.cinema.marketingManager.activeMarketingCampaign !== null) {
            customers += customers * (this.calculateBonus(show) / 100);
        }

        return Math.round(customers);
    }

    private calculatePercentage(show: Show): number {
        let percentage: number = 0;

        if (this.cinema.genreManager.isPopular(show.movie.genre)) {
            percentage += this.config.customerGenreBonus;
        } else if (this.cinema.genreManager.isUnpopular(show.movie.genre)) {
            percentage -= this.config.customerGenrePenalty;
        }

        if (show.movie.type.isBlockbuster) {
            percentage += this.config.customerBlockbusterBonus;
        } else if (show.movie.type.isArthouse) {
            percentage -= this.config.customerArthousePenalty;
        }
        return percentage;
    }

    private getFansPerShow(): number {
        return Math.round(this.cinema.fans / this.cinema.timeManager.daysInMonth / this.cinema.scheduler.allShows.length);
    }

    updateByDay() {
        let generator = new CustomerGenerator(this.config);

        this.cinema.scheduler.allShows.forEach((show) =>{
            let totalCustomers = this.getCustomersPerShow(show);

            let freeTicketAmount: number = this.cinema.freeTicketDistributor.calculateFreeTicketPercentage(show, this.cinema);
            console.log('Free Tickets for this showing of ' + show.movie.title + ': ' + freeTicketAmount);
            let ticketsGiven: number = 0;

            for (let i = 1; i <= totalCustomers; i++) {
                let customer: Customer = generator.createCustomer(show);
                if (ticketsGiven < freeTicketAmount){
                    this.cinema.freeTicketDistributor.giveFreeTicket(customer, show.movie);
                    ticketsGiven++;
                }
                this.cinema.customerManager.add(customer);
            }

            let totalFans = this.getFansPerShow();
            for (let i = 1; i <= totalFans; i++) {
                this.cinema.customerManager.add(generator.createCustomer(show, true));
            }

            console.log('Free Tickets remaining = ' + show.movie.freeTicketsRemaining);

            console.log('Show ' + show.movie.title + ' gets ' + totalCustomers + ' customers, ' + totalFans + ' fans.');
        });
    }

    private calculateBonus(show: Show): number {
        if (show.movie.hasRunningCampaign(this.cinema)){
            let campaign = show.movie.getRunningCampaign(this.cinema);
            return (campaign.type.bonus * 2);
        }
        if (this.cinema.marketingManager.activeMarketingCampaign !== null){
            return this.cinema.marketingManager.activeMarketingCampaign.type.bonus;
        }
        return 0;
    }
}

export {CustomerSpawnerManager}