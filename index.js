document.addEventListener("DOMContentLoaded", () => {

    const workoutData = document.getElementById('database')
    const sumbitButton = document.querySelector('.reset')
    
    // Create a span of the workouts
    function displayWorkout(workouts){
        workouts.forEach(workout => {
            const workoutName = document.createElement('span')
            workoutName.innerText = workout.name 
            workoutName.id = workout.id
    
            workoutName.addEventListener('click', (getWorkoutId))
            workoutData.appendChild(workoutName)
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
        // database.innerHTML = ""
        const workoutImg = document.createElement('img')
        const heading = document.createElement('h2')
        const description = document.createElement('h3')
        
        workoutImg.src = workout.image
        heading.innerText = workout.name
        description.innerText = workout.description
    
        database.append(workoutImg, heading, description)
    };


    
})

