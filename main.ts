import {MarketingCampaign} from "./Modules/MarketingCampaign";
import {Observer} from "./Modules/Manager/Observer";
import {ConfigManager} from "./Modules/Manager/ConfigManager";
import {TimeManager} from "./Modules/Manager/TimeManager";
import {Cinema} from "./Modules/Entity/Cinema";
import {Customer} from "./Modules/Entity/Customer";
import {Render} from "./Modules/Render/Render";
import {FinanceManager} from "./Modules/Manager/FinanceManager";

function init() {
    let btn = document.createElement('button');
    btn.innerText = 'TEST';
    btn.addEventListener('click', () => {
        newMarketingCampaign();
    });
    document.body.appendChild(btn);

    let btnCustomer = document.createElement('button');
    btnCustomer.innerText = 'Customer Test'
    btnCustomer.addEventListener('click', () =>{
        testCustomer();
    })
    document.body.appendChild(btnCustomer);
}

function newMarketingCampaign() {
    let newCampaign = new MarketingCampaign();
    newCampaign.type = 'test';
    console.log(newCampaign.type);
}

function testCustomer(){
    let customer = new Customer();
    customer.printCustomerInformation();
}

var observer = new Observer;
var configManager = new ConfigManager;

document.addEventListener('DOMContentLoaded', function() {
    // temporary code, this should come from a save or a "create new game" menu
    init();

    let cinema = new Cinema("Our own Cinema", new TimeManager(observer), configManager, new FinanceManager(configManager));

    //Object responsible for rendering changes in state
    let render = new Render;

    //the main loop that makes the game has a flow of time
    setInterval(function () {
        for (var i = 0; render.speed > i; i++) {
            cinema.update();
        }
        render.render(cinema);
    }, 1000);

    //example code
    observer.subscribe('hour', function() {
        console.log('the hour changed!');
    });
    //end example code

    //control the speed buttons
    document.querySelectorAll('img.speed').forEach(function(element) {
        element.addEventListener('click', function () {
            render.speed = this.dataset.ticks;
        });
    });
});