// script.js
document.addEventListener('DOMContentLoaded', () => {
  const habitList = document.getElementById('habit-list');
  const addHabitButton = document.getElementById('add-habit');

  // Sample habits array
  let habits = [
    { id: 1, name: 'Morning Walk', completed: false },
    { id: 2, name: 'Read for 30 minutes', completed: false },
  ];

  function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach(habit => {
      const habitItem = document.createElement('div');
      habitItem.className = 'habit-item';
      if (habit.completed) {
        habitItem.classList.add('completed');
      }

      habitItem.innerHTML = `
        <span>${habit.name}</span>
        <button data-id="${habit.id}">${habit.completed ? 'Undo' : 'Complete'}</button>
      `;

      habitList.appendChild(habitItem);
    });
  }

  habitList.addEventListener('click