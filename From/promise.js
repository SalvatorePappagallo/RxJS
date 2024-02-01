const apiurl = "https://jsonplaceholder.typicode.com/albums";

const {from, of} = require ("rxjs");
const {switchMap} = require ("rxjs/operators");
const fetch = require ("node-fetch");

const promise = fetch(apiurl).then(body => body.json());
                //.then(response => console.log(response)); //lo commentiamo per provarlo con from(promise)

from(promise).pipe(
    switchMap(responceData=> from(responceData)) //UTILIZZO DI FROM (PER ARRAY O ELEMENTO ITERABILE)
    //switchMap(responceData => of(...responceData)) //UTILIZZO DI OF (PER ELEMENTI SINGOLI)
).subscribe(
    responce => console.log(responce)
);