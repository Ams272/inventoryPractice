const retrieveData = document.querySelector('.submit');
const addData = document.querySelector('.add');
const grid = document.querySelector('.grid');
const addForm = document.querySelector('.add-form');
function retrieve(e){
    e.preventDefault();
    fetch('http://localhost:3000/info/get')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        data.forEach(data => {
            let html = `
                <div>${data.name}</div>
                <div>${data.qty}</div>
                <div>${data.comment}</div>
            `
            grid.innerHTML += html;
            return grid;
        });
    });
}

retrieveData.addEventListener('click', retrieve);