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

getEmployees(api)


