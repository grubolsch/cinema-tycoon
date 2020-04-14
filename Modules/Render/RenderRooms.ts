import {Cinema} from "../Entity/Cinema";
import {Room} from "../Entity/Room";
import {RoomException} from "../Exception/RoomException";

class RenderRooms implements RenderInterface {
    private readonly _cinema : Cinema;

    constructor(cinema : Cinema) {
        this._cinema = cinema;

        let self=this;
        document.querySelector('#build-room')!.addEventListener('click', function() {
            cinema.roomManager.addRoom();
            alert('build room');
            alert('You have now ' + cinema.roomManager.rooms.size + 'room(s)');
            self.renderOnChange();
        });


        this.renderOnChange();
    }

    render(): void{

    }

    renderOnChange(): void {
        let self=this;

        document.querySelector('#room-container')!.innerHTML = '';
        this._cinema.roomManager.rooms.forEach(function(room : Room) {
            // @ts-ignore
            var clone = document.querySelector('#room-template').content.cloneNode(true);
            clone.querySelector('.room-name').innerHTML = room.name;
            clone.querySelector('.room-type').innerHTML = room.type.name;
            clone.querySelector('.room-daily-cost').innerHTML = room.calculateMaintenanceCost();
            clone.querySelector('.room-quality').innerHTML = room.calculateRoomQuality();
            clone.querySelector('.room-upgrade').dataset.room = room.id;
            clone.querySelector('.room-components').dataset.room = room.id;

            document.querySelector('#room-container')!.appendChild(clone);
        });

        document.querySelectorAll('.room-upgrade').forEach(function(element){
            element.addEventListener('click', function(){
                // @ts-ignore
                let roomKey = Number((<HTMLElement>element).dataset.room);
                let room = self._cinema.roomManager.rooms.get(roomKey);
                // In normal cases, the room should not be undefined, otherwise throw error.
                if(room == undefined){
                    throw RoomException.noSuchRoom()
                }
                self._cinema.roomManager.upgradeRoom(room);
                self.renderOnChange()
            })
        });
    }
}

export {RenderRooms}