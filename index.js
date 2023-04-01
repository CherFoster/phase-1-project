document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form')
    const searchBar = document.getElementById('searchbar')
    let divCollect = document.querySelector('#database')
    const footer = document.querySelector('footer')

// Renders each card to page
function renderCards() {
     fetch('http://localhost:3000/workouts')
     .then(resp => resp.json())
     .then(workouts => {
       workouts.forEach(workout => createCard(workout))})
     };

    renderCards();

    // Creates cards
    function createCard(workout){
       const h4 = document.createElement('h4')
       const img = document.createElement('img');
       const btn = document.createElement('button')

       h4.innerText = workout.name 

       img.setAttribute('src', workout.image)
       img.classList.add('workout-img')
    
       btn.setAttribute('id', `${workout.id}`)
       btn.classList.add('save-btn')
       btn.innerText = "save";
    
    
    // Append elements to card
      const divCard = document.createElement('div')
      divCard.classList.add('card')
      divCard.append(h4, img, btn)
      divCollect.append(divCard)
    
      
      divCard.addEventListener("mouseover", () => divCard.setAttribute("style", "box-shadow: 30px 30px 10px #545E63"));
      divCard.addEventListener("mouseout", () => divCard.setAttribute("style", "box-shadow: 0px 0px"));
    
        };


form.addEventListener('submit', (event) => {
    event.preventDefault()

document.querySelectorAll('.card').forEach(event => event.remove())
document.querySelectorAll('.not-found').forEach(event => event.remove())


fetch('http://localhost:3000/workouts')
  .then(resp => resp.json())
  .then(workouts => {
    workouts.forEach(workout => {
        if(workout.muscle === true){
        createCard(workout)
    }})

    handleError()},)
    .catch(error => console.error(error))
  })

  
// Creates reset button
function resetButton(){
const resetBtn = document.createElement('button')
resetBtn.innerText = 'View All'
footer.appendChild(resetBtn)

resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    renderCards();
    document.querySelector('.not-found').forEach(event => event.remove())
  })
};
resetButton()


})