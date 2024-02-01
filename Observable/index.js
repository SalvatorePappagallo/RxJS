const {Observable} = require("rxjs");

const objs = new Observable(subscriber =>{
    // i 3 metodi che si possono chiamare sono: next, error, complete
    subscriber.next(1);
    subscriber.next(2);
    setTimeout(() => {subscriber.next(4)}, 4000); //serve per mandare in modo asincrono un valore dopo x millisecondi
    subscriber.complete();
    subscriber.next(3); // messo dopo il complete, non viene preso
});

//passaggio del parametro come funzione
objs.subscribe(
    value => {
        console.log(value);
    },

    error => {
        console.log(error);
    },

    () => {
        console.log("Values Emitted");
    }
);

//passaggio del parametro come oggetto
objs.subscribe({
    next: value => {
        console.log("subscribe2 =" + value)
    },

    complete: () => {
        console.log("Second subscriber finisced")
    },

    error: error => {
        console.log(error)
    }
});