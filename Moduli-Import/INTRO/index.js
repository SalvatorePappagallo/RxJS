//PER USARE IL MODULO INVECE DELLA VERSIONE STANDARD "REQUIRED" DI NODE
//import { range } from 'rxjs';
//import { map, filter } from "rxjs/opeators";
//VERSIONE STANDARD DI NODE CON "required"
const { range } = require('rxjs');
const { map, filter } = require('rxjs/operators');

//-1-2-3-4-...- STREAM DI DATI
range(1, 200).pipe(
  filter(x => x % 2 === 0),
  map(x => x * x)
).subscribe(x => console.log(x));