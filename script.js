
// Constant: Workout form & list generator
const form = document.querySelector('form');
const exerciseList = document.querySelector('#exercise-list');
// Constant: Search for excersises
const searchInput = document.querySelector('#search');

let exercises = JSON.parse(localStorage.getItem('exercises')) || [];

// Add Workout
form.addEventListener('submit', (i) => {
	// Prevents the form submitting and page reloading//
	i.preventDefault();

	const date = document.querySelector('#date').value;
	const exercise = document.querySelector('#exercise').value;
	const reps = document.querySelector('#reps').value;
	const sets = document.querySelector('#sets').value;
	const weight = document.querySelector('#weight').value;

	const newExercise = {
		date,
		exercise,
		reps,
		sets,
		weight
	};

	exercises.push(newExercise);
	// Stores the array in browsers local storage//
	localStorage.setItem('exercises', JSON.stringify(exercises));

	displayExercises();
	form.reset();
});

// Remove Workout from the list
exerciseList.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const index = e.target.dataset.index;
		exercises.splice(index, 1);
		localStorage.setItem('exercises', JSON.stringify(exercises));
		displayExercises();
	}
});

// Display Workout list
function displayExercises() {
	exerciseList.innerHTML = exercises.map((exercise, index) => {
		return `
			<list>
				<span>${exercise.date}</span>
				<span>${exercise.exercise}</span>
				<span>${exercise.reps} reps</span>
				<span>${exercise.sets} sets</span>
				<span>${exercise.weight} kg</span>
				<button data-index="${index}">Remove</button>
			</list>
		`;
	}).join('');
}
// Search by excersice using for loop that goes trough the list of searched objects and prints out all the imputted values//
searchInput.addEventListener('input', () => {
	const searchValue = searchInput.value.toLowerCase().trim();
	const exerciseItems = document.querySelectorAll('#exercise-list list');
  
	for (let i = 0; i < exerciseItems.length; i++) {
	  const exerciseName = exerciseItems[i].querySelectorAll('span')[1].textContent.toLowerCase();
  
	  if (exerciseName.includes(searchValue)) {
		exerciseItems[i].style.display = 'flex';
	  } else {
		exerciseItems[i].style.display = 'none';
	  }
	}
  });
displayExercises();