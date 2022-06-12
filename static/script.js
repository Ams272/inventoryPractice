const retrieveData = document.querySelector('.submit');
const addData = document.querySelector('.add');
const grid = document.querySelector('.toadd');
const addForm = document.querySelector('.add-form');
function retrieve(e){
    e.preventDefault();
    fetch('/info/get')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        grid.innerHTML = '';
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