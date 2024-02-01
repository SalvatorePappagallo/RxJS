const {from} = require ("rxjs");
const {filter, map, tap} = require ("rxjs/operators");

from([1, 2, 3, 4, 5, 6, 7, 8, 9]).pipe(
filter(number => number % 2 === 0),
tap(elements => console.log("tap = " + elements)),
map(number => number * number)
).subscribe(
    elements => console.log(elements)
);