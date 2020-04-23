import {Cinema} from "../Entity/Cinema";
import {RoomException} from "../Exception/RoomException";
import {$enum} from "ts-enum-util";
import {FacilityException} from "../Exception/FacilityException";
import {currency} from "../Utils";
import {SchedulerDeleteShowException} from "../Exception/SchedulerExceptionDeleteShow";
import {Product} from "../Entity/Product";
import {Facility} from "../Entity/Facilities/Facility";

class RenderFacilities implements RenderInterface {
    private readonly _cinema : Cinema;

    private readonly container = <HTMLElement>(document.querySelector('#facilities-menu'));
    private readonly template = <HTMLTemplateElement>document.querySelector('#build-facilities-template');

    private readonly containerBuildFacility = <HTMLElement>(document.querySelector('#facility-container'));
    private readonly templateBuildFacility = <HTMLTemplateElement>(document.querySelector('#facility-template'));

    constructor(cinema : Cinema) {
        this._cinema = cinema;

        this.renderOnce();
        this.renderOnChange();
    }

    renderOnce(): void{
        this._cinema.shopTypeManager.shops.forEach(facilityType => {
            var clone = <HTMLElement>(this.template.content.cloneNode(true));
            (<HTMLElement>clone.querySelector('.build-facilities-type')).innerHTML = facilityType.name;
            (<HTMLElement>clone.querySelector('.build-facilities-name')).innerHTML = facilityType.name;
            (<HTMLElement>clone.querySelector('.build-facilities-build-cost')).innerHTML = currency(facilityType.buildCost);
            (<HTMLElement>clone.querySelector('.build-facilities-capacity')).innerHTML = facilityType.capacityPerCashier.toString();
            (<HTMLElement>clone.querySelector('.build-facilities-maintenance')).innerHTML = currency(facilityType.monthlyCost);
            (<HTMLElement>clone.querySelector('.build-facilities-wages')).innerHTML = currency(facilityType.hourlyWagePerCashier);
            (<HTMLElement>clone.querySelector('button.build-facility')).dataset.facility = facilityType.name;

            this.container.appendChild(clone);
        });

        document.querySelectorAll('.build-facility').forEach(element => {
            element.addEventListener('click', event => {
                try {
                    let element = <HTMLElement>event.currentTarget;

                    if(element.dataset.facility == undefined) {
                        throw FacilityException.undefinedFacilityTypeError();
                    }

                    let facilityType = this._cinema.shopTypeManager.shops.get(element.dataset.facility);
                    if(facilityType == undefined){
                        throw FacilityException.undefinedFacilityTypeError(element.dataset.facility);
                    }
                    this._cinema.facilityManager.addFacility(facilityType);

                    this.renderOnChange();
                }
                catch(error) {
                    if(error instanceof FacilityException) {
                        alert(error.message);
                    } else {
                        console.error(error);//should never happen
                    }
                }
            })
        });
    }


    renderOnChange(): void {
        this.containerBuildFacility.innerHTML = '';

        this._cinema.facilityManager.getAllFacilities().forEach((facility) => {
            var clone = <HTMLElement>(this.templateBuildFacility.content.cloneNode(true));

            clone.querySelector('.facility-box')!.id = "facility-" + facility.id;
            clone.querySelector('.facility-name')!.innerHTML = facility.type.name;
            clone.querySelector('.facility-customers')!.innerHTML = facility.numberOfCustomer.toString();
            clone.querySelector('.facility-capacity')!.innerHTML = facility.capacity.toString();
            clone.querySelector('.facility-daily-profit')!.innerHTML = facility.profit.toString();

            let slider = <HTMLInputElement>clone.querySelector('.facility-slider');
            slider.min = '0';
            slider.value = facility.numberOfCashier.toString();
            slider.max = this._cinema.config.maximumCashiers.toString();

            slider.addEventListener('change', (event) => {
                let target = <HTMLInputElement>event.currentTarget;
                this.changeNumberOfCashiers(facility, parseInt(target.value));
            });

            this.containerBuildFacility.appendChild(clone);
        });

        return;
    }

    render(): void {
        this._cinema.facilityManager.getAllFacilities().forEach((facility) => {
            let element : HTMLElement | null = document.querySelector('#facility-' + facility.id);

            if(element === null) {
                throw FacilityException.couldNotFindElement(facility.id);
            }

            // @ts-ignore
            facility.bookSale( this._cinema.productManager.products.get(1));

            element.querySelector('.facility-customers')!.innerHTML = facility.numberOfCustomer.toString();
            element.querySelector('.facility-capacity')!.innerHTML = facility.capacity.toString();
            element.querySelector('.facility-daily-profit')!.innerHTML = currency(facility.profit);
        });
    }

    private changeNumberOfCashiers(facility : Facility, newNumberOfCashier: number) {
        try {
            facility.numberOfCashier = newNumberOfCashier;
            this.render();
        }
        catch(error) {
            if(error instanceof FacilityException) {
                alert(error.message);
            } else {
                console.error(error);//should never happen
            }
        }
    }
}

export {RenderFacilities}