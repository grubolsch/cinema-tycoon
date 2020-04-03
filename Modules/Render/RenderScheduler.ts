import {Cinema} from "../Entity/Cinema";
import {TimePoint} from "../Entity/TimePoint";
import {Room} from "../Entity/Room";
import {ShowConfig} from "../Entity/ShowConfig";
import {ShowConfigHelper} from "./Helper/ShowConfigHelper";
import {Scheduler} from "../Entity/Scheduler";
import {Show} from "../Entity/Show";

class RenderScheduler implements RenderInterface {
    private readonly _cinema : Cinema;
    private _table: Element;
    private _timePoints : Array<TimePoint> = [];
    private isDirty : boolean = true;
    private readonly _movieDraggerElement = (<HTMLElement>document.querySelector('#schedule-movie-dragger'));

    constructor(cinema : Cinema) {
        this._cinema = cinema;
        this._table = document.querySelector('#schedule-table')!;

        this.calculateTimeslots();
    }

    private calculateTimeslots() {

        let timeslot = new TimePoint(12, 0);

        do {
            this._timePoints.push(timeslot);

            timeslot = timeslot.addMinutes(60);
        } while(timeslot.hour <= 23)
    }

    render(): void {
        var self = this;
        //we only have to re render this if the movies or rooms changed

        if(!this.isDirty) {
            return;
        }

        this._table.innerHTML = '';
        this.renderHeader();
        this.renderBody();

        this.isDirty = false;


        this._movieDraggerElement.addEventListener('dragstart', function(event: DragEvent) {
            event.dataTransfer!.setData('text/plain', 'movie');
            event.dataTransfer!.dropEffect = "link";
        });

        document.querySelectorAll('td.drop-enabled').forEach(function (element) {
            element.addEventListener('dragover', function(event) {
                let config : ShowConfig = ShowConfigHelper.createMovieConfig(self._cinema);
                if (!(event.target instanceof HTMLElement) || event.target.dataset.timeslot === undefined || event.target.dataset.room === undefined) {
                    console.log('breaking');
                    return;
                }
                var room = self._cinema.findRoom(parseInt(event.target.dataset.room));

                if(room === undefined) {
                    console.log('room not found');
                    return;
                }

                var start = TimePoint.fromMinutes(parseInt(event.target.dataset.timeslot));
                let show = new Show(room, start, config);

                if(!self._cinema.scheduler.canPlan(show)) {
                    console.log('can plan');
                    return;
                }
                event.preventDefault();

                self.removeDraggerShadow();

                let shadowElement = (<HTMLElement>self._movieDraggerElement.cloneNode(true));
                shadowElement.style.opacity = '50%';
                shadowElement.id = 'draggerShadow';
                event.target.appendChild(shadowElement);
            });

            element.addEventListener('dragleave', function(event) {
                self.removeDraggerShadow();
            });

            element.addEventListener('drop', function(event) {
                self.removeDraggerShadow();

                if (!(event.target instanceof HTMLElement) || event.target.dataset.timeslot === undefined || event.target.dataset.room === undefined) {
                    return;
                }
                var room = self._cinema.findRoom(parseInt(event.target.dataset.room));

                if(room === undefined) {
                    return;
                }

                let config : ShowConfig = ShowConfigHelper.createMovieConfig(self._cinema);
                var start = TimePoint.fromMinutes(parseInt(event.target.dataset.timeslot));
                let show = new Show(room, start, config);

                if(!self._cinema.scheduler.canPlan(show)) {
                    return;
                }
                event.preventDefault();
                self._cinema.scheduler.plan(show);

                let shadowElement = (<HTMLElement>self._movieDraggerElement.cloneNode(true));
                shadowElement.style.backgroundColor = 'lightgreen';
                event.target.appendChild(shadowElement);

                console.log('shows', self._cinema.scheduler.getShowsByRoom(room));

                console.log('drop', event.target.dataset.timeslot);
            });
        });
    }

    private removeDraggerShadow() {
        let draggerShadow = (<HTMLElement>document.querySelector('#draggerShadow'));
        if (draggerShadow !== null) {
            draggerShadow.remove();
        }
    }

    private renderHeader() {
        let tr = document.createElement('tr');

        let td = document.createElement('th');
        td.innerHTML = 'Rooms';
        tr.appendChild(td);

        this._timePoints.forEach(function(timePoint) {
            let td = document.createElement('th');

            td.innerHTML = timePoint.format();

            tr.appendChild(td);
        });
        this._table.appendChild(tr);
    }

    private renderBody() {
        var self = this;
        this._cinema.rooms.forEach(function(room : Room) {
            let tr = document.createElement('tr');
            let td = document.createElement('th');
            td.innerHTML = room.name;
            tr.appendChild(td);

            self._timePoints.forEach(function(timePoint) {
                let td = document.createElement('td');
                td.innerHTML = '';
                td.className = 'drop-enabled';
                td.dataset.timeslot = timePoint.timeInMinutes.toString();
                td.dataset.room = room.id.toString();
                tr.appendChild(td);
            });

            self._table.appendChild(tr);
        });
    }
}

export  {RenderScheduler}