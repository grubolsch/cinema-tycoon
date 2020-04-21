import {Cinema} from "../Entity/Cinema";
import {TimePoint} from "../Entity/TimePoint";
import {Room} from "../Entity/Room";
import {ShowConfig} from "../Entity/ShowConfig";
import {ShowConfigHelper} from "./Helper/ShowConfigHelper";
import {Scheduler} from "../Entity/Scheduler";
import {Show} from "../Entity/Show";
import {TimeManager} from "../Manager/TimeManager";
import {AiException} from "../Exception/AiException";
import {SchedulerDeleteShowException} from "../Exception/SchedulerExceptionDeleteShow";

class RenderScheduler implements RenderInterface, RenderByHalfHourInterface {
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

            timeslot = timeslot.addMinutes(TimeManager.MINS_IN_HOURS/2);

        } while(timeslot.hour <= this.END_HOUR);
    }

    renderByHalfHour() : void {
        let timeTotal : number = (this._cinema.timeManager.hour+1) * TimeManager.MINS_IN_HOURS + this._cinema.timeManager.minute;

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
        this.renderSecretRow();

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
            event.dataTransfer!.setData('text', '');//some browsers needs some data
            event.dataTransfer!.dropEffect = "link";
            event.dataTransfer!.effectAllowed  = "link";
        });

        this.bindTdDragAndDropEvents();
    }

    private renderMovieElement(show : Show, movieElement : HTMLElement) : void {
        movieElement.classList.add('planned-movie');
        movieElement.dataset.show = show.id.toString();

        movieElement.innerText = show.showConfiguration.movie.title;
        movieElement.innerHTML += this.DELETE_ICON;
    }

    private deleteShow(target: HTMLElement) {
        try {
            let parent : HTMLElement = target.parentElement!;

            if(target.parentElement === null || parent.dataset.show === undefined) {
                throw new Error('Invalid target to delete show from');
            }

            let show = this._cinema.scheduler.findShowById(parseInt(parent.dataset.show));

            if(show === undefined) {
                throw new Error('Invalid target to delete show from');
            }

            this._cinema.scheduler.removeShow(show);

            do {
                //find the tr to re-render
                parent = <HTMLElement>parent.parentElement;

                if(parent === null) {
                    //just being safe and preventing and infinite loop here, this should never happen
                    SchedulerDeleteShowException.couldNotRefreshInterface();
                }

            } while(parent.nodeName != 'TR');

            this.reRenderRow(parent, show.room);
        }
        catch(error) {
            if(error instanceof SchedulerDeleteShowException) {
                alert(error.message);
            } else {
                console.error('Unexpected ERROR when deleting show: '+ error.message);
            }
        }
    }

    private renderHeader() : void {
        let tr = document.createElement('tr');

        let td = document.createElement('th');
        td.innerHTML = '';
        tr.appendChild(td);

        this._timePoints.forEach(function(timePoint) {
            if(timePoint.minute != 0) {
                return;
            }

            let td = document.createElement('th');

            td.innerHTML = timePoint.format();
            td.colSpan = 2;

            tr.appendChild(td);

            let col = document.createElement('col');
            col.span = 2;
        });

        let thead = document.createElement('thead');
        thead.appendChild(tr);
        this._table.appendChild(thead);
    }

    public renderSecretRow() {
        let tbody = this._table.querySelector('tbody')!;

        let secretRow = document.createElement('tr');
        secretRow.id = 'schedule-secret-row';
        secretRow.append(document.createElement('td'));

        this._timePoints.forEach((timePoint) => {
            secretRow.append(document.createElement('td'));
        });

        tbody.appendChild(secretRow);
    }

    private renderBody() : void {
        let tbody = document.createElement('tbody');

        var self = this;
        this._cinema.roomManager.rooms.forEach((room: Room) => {
            let tr = document.createElement('tr');
            this.renderRow(tr, room);
            tbody.appendChild(tr);
        });

        this._table.appendChild(tbody);
    }

    private renderRow(tr: HTMLTableRowElement, room : Room) {
        let td = document.createElement('th');
        td.innerHTML = room.name;
        tr.appendChild(td);

        let showsByTime = new Map<number, Show>();
        this._cinema.scheduler.getShowsByRoom(room).forEach(function(show) {
            showsByTime.set(show.start.timeInMinutes, show);
        });

        let skipsCells = 0;
        this._timePoints.forEach((timePoint) => {
            if(skipsCells > 0) {
                skipsCells--;
                return;
            }

            let td = document.createElement('td');
            td.className = 'drop-enabled';
            td.dataset.timeslot = timePoint.timeInMinutes.toString();
            td.dataset.room = room.id.toString();

            //td.scope="colgroup";

            td.colSpan = 1;
            if(showsByTime.has(timePoint.timeInMinutes)) {
                let show : Show = showsByTime.get(timePoint.timeInMinutes)!;

                this.renderMovieElement(show, td);

                let blockLength = show.showConfiguration.calculateQuantitySchedulerBlocks();
                td.colSpan = blockLength;
                skipsCells = blockLength-1;
            }

            tr.appendChild(td);
        });
    }

    private bindTdDragAndDropEvents() {
        let self = this;

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

                event.target.classList.add('drop-allowed');

                let blockLength = show.showConfiguration.calculateQuantitySchedulerBlocks();

                let showStart = show.start;
                do {
                    document.querySelector('[data-timeslot="'+ showStart.timeInMinutes +'"][data-room="'+ show.room.id +'"]')!.classList.add('drop-allowed');

                    showStart = showStart.addMinutes(30);
                    blockLength--;
                } while (blockLength > 0);
            });

            element.addEventListener('dragleave', function(event) { ///was dragend
                document.querySelectorAll('td.drop-allowed').forEach(function (element) {
                    element.classList.remove('drop-allowed');
                });

                ////////////REMOVE ALL CLASSES
            });

            element.addEventListener('drop', function(event) {
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

                self._cinema.scheduler.plan(show);

                let tr : HTMLElement|null = event.target.parentElement;
                if(tr !== null) {
                    self.reRenderRow(tr, room);
                }
            });
        });
    }

    private reRenderRow(tr : HTMLElement, room : Room) {
        tr.innerHTML = '';
        this.renderRow(<HTMLTableRowElement>tr, room);
        this.bindTdDragAndDropEvents();//shotgun approach
    }
}

export  {RenderScheduler}