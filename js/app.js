"use strict";
let list = document.getElementById('list');
let movieForm = document.getElementById('movieForm');
let clear = document.getElementById('clear')
let table1 = document.querySelectorAll('table');
function Movie (name,image,release){
    this.name = name;
    this.image = `./img/${image}.png`;
    this.release = release;
    Movie.arr.push(this)
}

Movie.arr = [];


// function createTableHeader (table) {
//     let cr
// }





function render(arr) {
    list.innerHTML = ""
    let table = document.createElement('table');
    // createTableHeader(table);
    let tbody = document.createElement('tbody');
    for (let i=0 ; i < arr.length; i++) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = "X";
        td.className = i;
        tr.appendChild(td);
        let img = document.createElement('img')
        img.src = arr[i].image;
        td = document.createElement('td');
        td.appendChild(img);
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerText = arr[i].name;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerText = arr[i].release;
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    list.appendChild(table);
    localStorage.setItem('arr', JSON.stringify(Movie.arr));
}

function addToList(e) {
    e.preventDefault();
        let newMovie = new Movie(e.target.name.value, e.target.image.value, e.target.release.value);
        render(Movie.arr);
        movieForm.reset()
}


function start () {
    let localMovie = JSON.parse(localStorage.getItem('arr'));
    if (localMovie) {
        Movie.arr = localMovie;
        render(localMovie);
    }

}

movieForm.addEventListener('submit',addToList);


function removeItem (e) {
    if (e.target.innerText === "X") {
        Movie.arr.splice(e.target.className,1);
        render(Movie.arr);
    }
}

function removeAll (e) {
    Movie.arr = []
    render(Movie.arr);
}


clear.addEventListener('click',removeAll)

list.addEventListener('click',removeItem);

start()

