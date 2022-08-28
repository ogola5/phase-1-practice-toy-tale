let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const addToyForm = document.querySelector(".add-toy-form")


document.addEventListener("DOMContentLoaded", () => {
   fetchToys();
   addBtn.addEventListener("click", toggleForm);
   addToyForm.addEventListener("submit", submitNewToy);
});

// hide & seek with the form
let toggleForm = () => {
   addToy = !addToy;
   if (addToy) {
      toyFormContainer.style.display = "block";
   } else {
      toyFormContainer.style.display = "none";
   }
}

// Fetches the toys details / info using the url provided.
let fetchToys = () => {
   fetch('http://localhost:3000/toys')
   .then(resp => resp.json())
   .then(toys => { renderToyDetails(toys) })
   .catch(error => { alert("Kuna Bug Mahali!") });
}

// Renders toy details for each retrieved toy from the response
let renderToyDetails = toys => {
   toys.forEach(toy => { createCardElement(toy) })
}

// Creates the card and it's child elements as well as interpolates the specific toy's details 
let createCardElement = toy => {
   const toysCard = document.createElement("div");
   toysCard.className = "card";
   document.getElementById("toy-collection").appendChild(toysCard);
   toysCard.innerHTML += `<h2>${toy.name}</h2>`
                           + `<img src="${toy.image}" class="toy-avatar">`
                           + `<p>${toy.likes} Likes </p>`
                           +`<button class="like-btn" id="${toy.id}">Like </button>`
   toysCard.querySelector(".like-btn").addEventListener('click', () => {
      toy.likes += 1;
      toysCard.querySelector('p').textContent = `${toy.likes} Likes` ;
      updateNoOfLikes(toy);
   });
}

// Adds a new toy to our list of toys after providing a name and an image
let submitNewToy = (e) => {
   e.preventDefault();
   let name = document.querySelector('[name="name"]').value;
   let image = document.querySelector('[name="image"]').value;
   
   // Data being sent in fetch() must be stored in the body of the configurationObject
   const submittedToy = {
      name: name,
      image: image,
      likes: 0
   };
   
   // The configurationObject contains three core components that are needed for standard POST requests: the HTTP verb, the headers, and the body.
   const configurationObject = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
      },
      // By passing an object in, JSON.stringify() will return a string.
      body: JSON.stringify(submittedToy),
   };
   
   // Using fetch() to send GET requests by handling responses to fetch()
   return fetch("http://localhost:3000/toys", configurationObject)
   .then(resp => resp.json())
   .then(toy => { createCardElement(toy) })
   .catch(error => { alert("Kuna Bug Mahali!") });
}

// Updates no of likes a cliking on the like button
let updateNoOfLikes = toy => {
   fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
			"Content-Type": "application/json",
		},
      body: JSON.stringify(toy)
   })
   .then(resp => resp.json())
   .catch(error => { alert("Kuna Bug Mahali!") });
}