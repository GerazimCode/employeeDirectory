// selecting elements from the DOM & starter variable...
let employeeList = [];
let searchContainer = document.querySelector(".search-container");
let gallery = document.querySelector("#gallery");

// api url with 12 employees only and US nationality...
let api = "https://randomuser.me/api/?results=12&nat=us";
// console.log(fetch(api));

// handles fetch requests, manupulates data from the api and handles errors...
async function getEmployees(url){
    let employeeResponse = await fetch(url)
        .then(res => res.json())
        .then(data => {
            employeeList = data.results;
            // console.log(employeeList);
            employeeGallery(employeeList);
            clickedEmployee(employeeList);
            
        })
        .catch(error => {
            console.log("Error Fetching Data: ", error);
        })
}

// the functions shows employees in the gallery by 12 and inserts in the html body
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
// checks which employee has been clicked and sends the data to the modalWindow function to display it...

function clickedEmployee(data){
    let card = document.querySelectorAll(".card");
    for(let i=0; i< data.length; i++){
        card[i].addEventListener("click", (e) => {
            modalWindow(data[i]);
        })
    }
} 

// following function displays and closes the modal when an employee is clicked...
function modalWindow(employee){
    let streetNumber = employee.location.street.number;
    let streetName = employee.location.street.name;
    let city = employee.location.city;
    let state = employee.location.state;
    let postCode = employee.location.postcode;

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
            <p class="modal-text">${streetNumber} ${streetName}, ${city}, ${state}, ${postCode}</p>
            <p class="modal-text">Birthday: ${employee.dob.date.slice(5,7)}/${employee.dob.date.slice(8,10)}/${employee.dob.date.slice(0,4)} </p>
        </div>
    </div>` 
    // adds the box to the body
    gallery.insertAdjacentHTML("afterend", box);

    // closes the modal box
    let closeButton = document.getElementById("modal-close-btn");
    let boxContainer = document.querySelector(".modal-container");
    closeButton.addEventListener("click", (e) => {
        boxContainer.remove();
    })

}
// call the getEmployees function
getEmployees(api);




