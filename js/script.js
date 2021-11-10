// selecting elements from the DOM & starter variables...
let searchContainer = document.querySelector(".search-container");
let gallery = document.querySelector("#gallery");
let employeeList = [];
let data;

// api url with 12 employees only and US nationality...
let api = "https://randomuser.me/api/?results=12&nat=us";
// console.log(fetch(api));

// handles fetch requests and manupulates data from the api
async function getEmployees(url){
    let employeeResponse = await fetch(url)
        .then(res => res.json())
        .then(data => {
            employeeList = data.results;
            employeeGallery(employeeList);
            // employeeModal(employeeList);
        })
        // for later...add error methods to log if there is an error...
        // look into the error message on the console.
}

// the functions shows employeers in the gallery by 12
function employeeGallery(data){
    data.map(employee => {
        employee = `
        <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
    </div>`

    gallery.insertAdjacentHTML("beforeend", employee);
    })
}

// following function displays and closes the modal when an employee is clicked...

function modalWindow(){
    let box = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.medium}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.phone}</p>
            <p class="modal-text">${employee.location.stree.number} ${employee.location.street.name} ${employee.location.city} ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${employee.dob.date.slice(5,7)}/ ${employee.dob.date.slice(8,10)}/ ${employee.dob.date.slice(0,4)} </p>
        </div>
    </div>` 

    // adds the box to the body
    gallery.insertAdjacentHTML("afterend", box);

    // closes the box
    let closeButton = document.getElementById("modal-close-btn");
    let boxContainer = document.getElementsByClassName("modal-container");
    closeButton.addEventListener("click", (e) => {
        boxContainer.remove();
    })

}




