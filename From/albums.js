function  createAlbumList(title){
    const ul = document.querySelector("#albums");
    if(ul){
        const li = document.createElement("li");
        li.textContent = title;
        ul.appendChild(li);
    }
}

function updateTotal(updateTotal){
    const span = document.querySelector("#total");
    if(span){
        span.textContent = total;
    }
}

const apiurl = "https://jsonplaceholder.typicode.com/albums";
const {from, of} = rxjs;
const {switchMap, map} = rxjs.operators;

const promise = fetch(apiurl).then(body => body.json());
                //.then(response => console.log(response)); //lo commentiamo per provarlo con from(promise)
const obs = from(promise);

obs.subscribe(responceData => updateTotal(responceData.length));
obs.pipe(
    switchMap(responceData => from(responceData)),//UTILIZZO DI FROM (PER ARRAY O ELEMENTO ITERABILE)
    //switchMap(responceData => of(...responceData)) //UTILIZZO DI OF (PER ELEMENTI SINGOLI)
    map(album => album.title)
).subscribe(createAlbumList)