import {Cinema} from "../Entity/Cinema";
import {FacilityType} from "../Entity/Facilities/FacilityType";
import {RoomException} from "../Exception/RoomException";
import {$enum} from "ts-enum-util";
import {FacilityException} from "../Exception/FacilityException";

class RenderFacilities implements RenderInterface {
    private readonly _cinema : Cinema;

    constructor(cinema : Cinema) {
        this._cinema = cinema;

        let self=this;

        this.renderOnMenuModal();

        document.querySelectorAll('.build-facility').forEach(function(element){
            element.addEventListener('click', function(){
                // @ts-ignore
                let facilityType = Number((<HTMLElement>element).dataset.facilityonmodal);
                if(facilityType == undefined){
                    throw FacilityException.undefinedFacilityTypeError()
                }
                self._cinema.facilityManager.addFacility(facilityType);
                self.renderOnChange()
            })
        });

        this.renderOnChange();
    }

    render(): void {

    }

    renderOnMenuModal(): void{
        let self=this;

        const types = $enum(FacilityType).getKeys(); // ['TOILET','ARCADE'...]
        for(let type in types) { // 0,1
            // @ts-ignore
            var clone = document.querySelector('#build-facilities-template').content.cloneNode(true);
            clone.querySelector('.facility-type').innerHTML = FacilityType[type];
            clone.querySelector('button.build-facility').dataset.facilityonmodal = type;
            document.querySelector('#facilities-menu')!.appendChild(clone);
        }
        console.log(document.querySelectorAll('.build-facility'));
    }

    renderOnChange(): void {
        let self=this;
        let allFacilities = this._cinema.facilityManager.facilities;
        console.log(allFacilities); //temp. debugging purpose, Map of all facilities

        let toilets = allFacilities.get(FacilityType.TOILET);
        let arcades = allFacilities.get(FacilityType.ARCADE);

        //game area
        document.querySelector('#toilet-container')!.innerHTML = '';
        document.querySelector('#arcade-container')!.innerHTML = '';

        // @ts-ignore
        toilets.forEach((toilet, key) => {
            // @ts-ignore
            var clone = document.querySelector('#toilet-template').content.cloneNode(true);
            clone.querySelector('.toilet-id').innerHTML = toilet.id + 1;
            clone.querySelector('.toilet-cashiers').innerHTML = toilet.numberOfCashier;
            clone.querySelector('.toilet-capacity').innerHTML = toilet.capacity;
            clone.querySelector('.toilet-customers').innerHTML = toilet.numberOfCustomer;
            clone.querySelector('.toilet-selling-price').innerHTML = toilet.sellingPrice;
            clone.querySelector('button.manage-toilet').dataset.toilet = key;
            document.querySelector('#toilet-container')!.appendChild(clone);
        });

        // @ts-ignore
        arcades.forEach((arcade, key)=>{
            // @ts-ignore
            var clone = document.querySelector('#arcade-template').content.cloneNode(true);
            clone.querySelector('.arcade-id').innerHTML = arcade.id + 1;
            clone.querySelector('.arcade-cashiers').innerHTML = arcade.numberOfCashier;
            clone.querySelector('.arcade-capacity').innerHTML = arcade.capacity;
            clone.querySelector('.arcade-customers').innerHTML = arcade.numberOfCustomer;
            clone.querySelector('.arcade-selling-price').innerHTML = arcade.sellingPrice;
            clone.querySelector('button.manage-arcade').dataset.arcade = key;
            document.querySelector('#arcade-container')!.appendChild(clone);
        })

    }
}

export {RenderFacilities}