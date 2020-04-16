import {Cinema} from "../Entity/Cinema";

class RenderCinema implements RenderInterface  {
    private cinema : Cinema;

    constructor(cinema: Cinema) {
        this.cinema = cinema;
    }

    render(): void {


        

    }

}

export {RenderCinema}