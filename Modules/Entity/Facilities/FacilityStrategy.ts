import {Customer} from "../Customer";
import {Facility} from "./Facility";
import {Cinema} from "../Cinema";

interface FacilityStrategy {
    shop(facility : Facility, cinema: Cinema, customer: Customer): void
}

export {FacilityStrategy};