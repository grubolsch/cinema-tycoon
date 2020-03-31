# cinema-tycoon

## installation
After cloning, run: 
 
 - `npm install` _Installs npm dependencies_
 - `npm run dev` _enables the file watcher_
 
___

## Observers
You can listen to changes in time, like a shift in hours, with following code:

function doThis(hour) {
    console.log(hour);
}

$( document ).on("hour|day|week|month|year", function( event, newHour) {
    doThis(newHour);
});
