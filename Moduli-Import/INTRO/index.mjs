import { range } from 'rxjs';
import { map, filter } from 'rxjs/opeators';

//-1-2-3-4-...- STREAM DI DATI
range(1, 200).pipe(
  filter(x => x % 2 === 0),
  map(x => x * x)
).subscribe(x => console.log(x));