document.addEventListener('DOMContentLoaded', () => {

// Grabs HTML elements
const form = document.querySelector('form')
const searchBar = document.querySelector('#searchbar')
let cardCollection = document.querySelector('#database')
const footer = document.querySelector('footer')
const submit = document.querySelector('.submit')
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

    

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
       btn.innerText = "♡";
    
    
    // Append elements to card
      const workoutCard = document.createElement('div')
      workoutCard.classList.add('card')
      workoutCard.append(h4, img, btn)
      cardCollection.append(workoutCard)
    

    //   Event listener that creates a shadow when mouse hovers over each card
      workoutCard.addEventListener("mouseover", () => workoutCard.setAttribute("style", "box-shadow: 30px 30px 10px #545E63"));
      workoutCard.addEventListener("mouseout", () => workoutCard.setAttribute("style", "box-shadow: 0px 0px"));
    
    //   Fills in heart emoji when clicked
    btn.addEventListener('click', (event) => {
        if (event.target.classList[0] === 'save-btn') {
            const activated = event.target.classList.contains('activated-heart');
            if(activated) {
                event.target.classList.remove('activated-heart')
                event.target.innerText = EMPTY_HEART
            }else {
                event.target.classList.add("activated-heart");
                event.target.innerHTML = FULL_HEART;
            }
        }
    })

    // Event listener for when you click on a card, adds description 
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


const option = document.querySelector('option')
const selectedOption = option.value

// Clears all of the cards once a search is submitted and searches for selected muscle
form.addEventListener('submit', (event) => {
    event.preventDefault()
    document.querySelectorAll('.card').forEach(event => event.remove())
   
  });

  
// Creates View All reset button
function resetButton(){
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
resetButton();

// Creates a Liked button and shows what workouts were liked
function likesButton(){
    const likesBtn = document.createElement('button')
    likesBtn.classList.add('liked-workouts')
    likesBtn.innerText = "Liked"
    footer.appendChild(likesBtn)

    likesBtn.addEventListener('click', (event) => {
        event.preventDefault();
  
    })
}
likesButton()

})