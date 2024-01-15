document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  resetButton();
  addEventListeners();
})

// Grabs HTML elements
const searchBar = document.querySelector('#searchBar');
let workouts = [];

// Renders each card to page
function renderCards() {
   fetch('http://localhost:3000/workouts')
   .then(resp => resp.json())
   .then(data => {
    workouts = data
    data.forEach(workout => createCard(workout))})
  };

// Creates cards
function createCard(workout){
  const h4 = document.createElement('h4');
  const img = document.createElement('img');
  const p = document.createElement('p');
  
  h4.innerText = workout.name;
  img.src = workout.image;
  img.classList.add('workout-img');
  
// Append elements to card
  const workoutCard = document.createElement('div');
  let cardCollection = document.querySelector('#database');
  workoutCard.classList.add('card');
  workoutCard.appendChild(h4);
  workoutCard.appendChild(img);
  cardCollection.appendChild(workoutCard);
  
//Event listener that creates a shadow when mouse hovers over each card
  workoutCard.addEventListener("mouseover", () => workoutCard.setAttribute("style", "box-shadow: 10px 10px 5px #0000FF"));
  workoutCard.addEventListener("mouseout", () => workoutCard.setAttribute("style", "box-shadow: 0px 0px"));

// Event listener for when you click on a card, adds workout description 
h4.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelectorAll('.card').forEach(event => event.remove())
  
  fetch(`http://localhost:3000/workouts/${event.target.id}`)
  .then(resp => resp.json())
  .then(createCard(workout))

  const p = document.createElement('p')
  p.innerText = workout.description
  cardCollection.append(p)
    })
 };

 // Clears all of the cards once a search is submitted and searches for workouts for selected muscle
 function addEventListeners(){
  const form = document.querySelector('#workouts')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    let cardCollection = document.querySelector('#database')
    cardCollection.innerHTML = ''
    const muscleName = document.querySelector('select').value
    workouts.filter(workout => muscleName === workout.muscle).forEach(workout => createCard(workout))
   });
 }

// Creates View All reset button
function resetButton(){
  const footer = document.querySelector('footer')
  const resetBtn = document.createElement('button')
  resetBtn.innerText = 'View All'
  footer.appendChild(resetBtn)
  
  resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    renderCards();
    document.querySelectorAll('.card').forEach(event => event.remove())
    document.querySelectorAll('p').forEach(event => event.remove())
  })
};