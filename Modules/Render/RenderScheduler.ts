import {Cinema} from "../Entity/Cinema";
import {TimePoint} from "../Entity/TimePoint";
import {Room} from "../Entity/Room";
import {ShowConfig} from "../Entity/ShowConfig";
import {ShowConfigHelper} from "./Helper/ShowConfigHelper";
import {Scheduler} from "../Entity/Scheduler";
import {Show} from "../Entity/Show";
import {TimeManager} from "../Manager/TimeManager";

/**
 * @todo
 *  - Make it render again when movie / room changes
 *  - Make it show scheduled movies
 *  - Make the current hour column light up
 *  - Provide a delete button
 * */
class RenderScheduler implements RenderInterface, RenderByHourInterface {
    private readonly _cinema : Cinema;
    private _timePoints : Array<TimePoint> = [];

    private readonly _movieDraggerElement = (<HTMLElement>document.querySelector('#schedule-movie-dragger'));
    private readonly _table = (<HTMLElement>document.querySelector('#schedule-table'));

    private readonly START_HOUR : number = 9;
    private readonly END_HOUR = 23;

    private readonly DELETE_ICON = '<i class="fa fa-trash delete-show clickable"></i>';

    //store the amount of movies and rooms, if this changes, render the schedule again
    private renderedWithMovies : number = 0;
    private renderedWithRooms : number = 0;

    constructor(cinema : Cinema) {
        this._cinema = cinema;

        this.calculateTimeslots();
    }

    private calculateTimeslots() {
        let timeslot = new TimePoint(this.START_HOUR, 0);

        do {
            this._timePoints.push(timeslot);

            timeslot = timeslot.addMinutes(TimeManager.MINS_IN_HOURS);
        } while(timeslot.hour <= this.END_HOUR);
    }

    renderByHour() : void {
        let timeTotal : number = (this._cinema.timeManager.hour+1) * TimeManager.MINS_IN_HOURS;

        this._table.querySelectorAll('td.active').forEach(function(element) {
            element.classList.remove('active');
        });

        this._table.querySelectorAll('[data-timeslot="'+ timeTotal +'"]').forEach(function(element) {
            element.classList.add('active');
        });
    }

    private shouldRender() : boolean {
        return (this.renderedWithMovies != this._cinema.movieManager.movies.size || this.renderedWithRooms != this._cinema.roomManager.rooms.size);
    }

    render(): void {
        var self = this;
        //we only have to re render this if the movies or rooms changed

        if(this._cinema.movieManager.movies.size === 0) {
            return;
        }

        if(!this.shouldRender()) {
            return;
        }

        this.renderedWithMovies = this._cinema.movieManager.movies.size;
        this.renderedWithRooms = this._cinema.roomManager.rooms.size;

        this._table.innerHTML = '';
        this.renderHeader();
        this.renderBody();

        //make the "delete" button work
        this._table.addEventListener('click', function(e) {
            //this event is more complex because elements might appear after rendering the grid.
            // loop parent nodes from the target to the delegation node
            for (var target = e.target; target && target != this; target = (<HTMLElement>target).parentNode) {
                if ((<HTMLElement>target).matches('i.delete-show')) {
                    self.deleteShow(<HTMLElement>target);
                    break;
                }
            }
        }, false);

        //make the "movie dragger element" on top work
        this._movieDraggerElement.addEventListener('dragstart', function(event: DragEvent) {
            //event.dataTransfer!.setData('text/plain', 'movie');
            event.dataTransfer!.dropEffect = "move";
        });

        //make all individual td-fields work
        document.querySelectorAll('td.drop-enabled').forEach(function (element) {
            element.addEventListener('dragover', function(event) {
                let config : ShowConfig = ShowConfigHelper.createMovieConfig(self._cinema);
                if (!(event.target instanceof HTMLElement) || event.target.dataset.timeslot === undefined || event.target.dataset.room === undefined) {
                    return;
                }
                var room = self._cinema.roomManager.find(parseInt(event.target.dataset.room));

                if(room === undefined) {
                    console.log('room not found');
                    return;
                }

                var start = TimePoint.fromMinutes(parseInt(event.target.dataset.timeslot));
                let show = new Show(room, start, config);

                if(!self._cinema.scheduler.canPlan(show)) {
                    return;
                }
                event.preventDefault();

                self.removeDraggerShadow();

                let shadowElement = (<HTMLElement>document.createElement('div'));
                shadowElement.classList.add('planned-movie');
                shadowElement.style.width = config.duration + "px";
                shadowElement.innerText = config.movie.title;
                shadowElement.id = 'draggerShadow';
                event.target.appendChild(shadowElement);
            });

            element.addEventListener('dragleave', function(event) {
                let convertedEvent = (<DragEvent>event);

                if(convertedEvent.relatedTarget === null || ((<HTMLElement>convertedEvent.relatedTarget).id != 'draggerShadow' && (<HTMLElement>convertedEvent.relatedTarget).parentElement!.id != 'draggerShadow')) {
                    self.removeDraggerShadow();
                }
            });

            element.addEventListener('drop', function(event) {
                self.removeDraggerShadow();

                if (!(event.target instanceof HTMLElement) || event.target.dataset.timeslot === undefined || event.target.dataset.room === undefined) {
                    return;
                }
                var room = self._cinema.roomManager.find(parseInt(event.target.dataset.room));

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
                let showId = self._cinema.scheduler.plan(show);

                let movieElement = (<HTMLElement>document.createElement('div'));
                movieElement.classList.add('planned-movie');
                movieElement.style.width = config.duration + "px";
                movieElement.innerText = config.movie.title;
                movieElement.innerHTML += self.DELETE_ICON;
                movieElement.dataset.show = showId.toString();
                movieElement.dataset.room = room.id.toString();
                event.target.appendChild(movieElement);

                console.log('shows', self._cinema.scheduler.getShowsByRoom(room));
            });
        });
    }

    private deleteShow(target: HTMLElement) {
        let parent : HTMLElement = target.parentElement!;

        if(target.parentElement === null || parent.dataset.room === undefined || parent.dataset.show === undefined) {
            return;
        }

        var room = this._cinema.roomManager.find(parseInt(parent.dataset.room));

        if(room === undefined) {
            return;
        }

        if(!this._cinema.scheduler.removeShow(room, parseInt(parent.dataset.show))) {
            alert('You cannot delete shows that are currently playing.');
            return;
        }

        parent.remove();

    }

    private removeDraggerShadow() : void {
        let draggerShadow = (<HTMLElement>document.querySelector('#draggerShadow'));
        if (draggerShadow !== null) {
            draggerShadow.remove();
        }
    }

    private renderHeader() : void {
        let tr = document.createElement('tr');

        let td = document.createElement('th');
        td.innerHTML = '';
        tr.appendChild(td);

        this._timePoints.forEach(function(timePoint) {
            let td = document.createElement('th');

            td.innerHTML = timePoint.format();

            tr.appendChild(td);
        });

        let thead = document.createElement('thead');
        thead.appendChild(tr);
        this._table.appendChild(thead);
    }

    private renderBody() : void {
        let tbody = document.createElement('tbody');
        this._table.appendChild(tbody);

        var self = this;
        this._cinema.roomManager.rooms.forEach(function(room : Room) {
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

            tbody.appendChild(tr);
        });
    }
}

export  {RenderScheduler}