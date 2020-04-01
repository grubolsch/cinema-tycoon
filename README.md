# Cinema tycoon

## installation
After cloning, run: 
 
 - `npm install` _Installs npm dependencies_
 - `npm run dev` _enables the file watcher_
 
___

## Observers
You can listen to changes in time, like a shift in hours, with following code:

```
function doThis(hour) {
    console.log(hour);
}

observer.subscribe("hour|day|week|month|year", function( TimeManager ) {
    doThis(TimeManager.hour);
});
```

## Debug bar
You can show the debug bar with typing the command `showDebug()` in the console.
This panel has buttons to trigger time chances: for example,, to test a year or a month chance event.