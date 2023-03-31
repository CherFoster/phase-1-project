document.addEventListener("DOMContentLoaded", () => {

    const workoutData = document.getElementById('database')
    const sumbitButton = document.querySelector('.search')
    const form = document.querySelector('form')
    const workoutImg = document.createElement('img')
    
    // Create a span of the workouts on the main page
    function displayWorkout(workouts){
        workouts.forEach(workout => {
            const workoutName = document.createElement('span')
            const workoutImg = document.createElement('img')
            workoutName.innerText = workout.name 
            workoutName.id = workout.id
            workoutImg.src = workout.image

            form.appendChild(workoutName)

            workoutName.appendChild(workoutImg)
        
            workoutName.addEventListener('dblclick', (getWorkoutId))
            workoutData.appendChild(workoutName)
            workoutData.appendChild(workoutImg)
            
            
        })
    };



    // GET request
    function getAllWorkouts(){
        fetch('http://localhost:3000/workouts')
        .then(resp => resp.json())
        .then(displayWorkout)
    }
    getAllWorkouts();
    
    function getWorkoutId(event){
        fetch(`http://localhost:3000/workouts/${event.target.id}`)
        .then(resp => resp.json())
        .then(renderInfo)
    };
    
    function renderInfo(workout){
        database.innerHTML = ""
        // const workoutImg = document.createElement('img')
        const heading = document.createElement('h2')
        const description = document.createElement('h3')
        
        workoutImg.src = workout.image
        heading.innerText = workout.name
        description.innerText = workout.description
    
        database.append(workoutImg, heading, description)
    };

    const resetBtn = document.createElement('button')
    resetBtn.innerText = 'View All Workouts'

    const footer = document.querySelector('footer')
    footer.appendChild(resetBtn)

    resetBtn.addEventListener('click', (event) => {
        event.preventDefault();
        handleCardLoad();
        document.querySelectorAll('.no-match').forEach(e => e.remove())
      });
})