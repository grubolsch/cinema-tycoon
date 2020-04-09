import {Cinema} from "../Entity/Cinema";
import {Room} from "../Entity/Room";

class RenderRooms implements RenderInterface {
    private readonly _cinema : Cinema;

    constructor(cinema : Cinema) {
        this._cinema = cinema;

        let self=this;
        document.querySelector('#build-room')!.addEventListener('click', function() {
            cinema.roomManager.addRoom();
            alert('build room');
            alert('You have now ' + cinema.rooms.length + 'room(s)');
            self.renderOnChange();
        });


        this.renderOnChange();
    }

    render(): void{

    }

    renderOnChange(): void {
        let self=this;

        document.querySelector('#room-container')!.innerHTML = '';
        this._cinema.roomManager.rooms.forEach(function(room : Room, index: number) {
            // @ts-ignore
            var clone = document.querySelector('#room-template').content.cloneNode(true);
            clone.querySelector('.room-name').innerHTML = room.name;
            clone.querySelector('.room-type').innerHTML = room.type.name;
            clone.querySelector('.room-daily-cost').innerHTML = room.maintenanceCost;
            clone.querySelector('.room-popularity').innerHTML = room.popularity;
            clone.querySelector('.room-upgrade').dataset.room = index;
            clone.querySelector('.room-components').dataset.room = index;

            document.querySelector('#room-container')!.appendChild(clone);
        });

        document.querySelectorAll('.room-upgrade').forEach(function(element){
            element.addEventListener('click', function(){
                // @ts-ignore
                self._cinema.roomManager.upgradeRoom(self._cinema.rooms[(<HTMLElement>element).dataset.room]);
                self.renderOnChange()
            })
        });
    }
}

export {RenderRooms}