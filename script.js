document.addEventListener('DOMContentLoaded', () => {
  const habitCardsContainer = document.getElementById('habit-cards');
  const addHabitButton = document.getElementById('add-habit');
  const completedList = document.getElementById('completed-list');
  const streakDisplay = document.getElementById('streak-display');
  const challengeDisplay = document.getElementById('challenge-display');

  const habitSuggestions = [
    { id: 1, name: 'Drink 8 glasses of water', category: 'Wellness', completed: false },
    { id: 2, name: '5-minute meditation', category: 'Mindfulness', completed: false },
    { id: 3, name: 'Stretch for 10 minutes', category: 'Fitness', completed: false },
    { id: 4, name: 'Complete 10 minutes of reading', category: 'Focus', completed: false },
    { id: 5, name: 'Take a 5-minute walk', category: 'Energy', completed: false },
  ];

  let completedHabits = [];
  let streak = 0;
  let challenge = generateDailyChallenge();

  function renderHabits() {
    habitCardsContainer.innerHTML = '';
    habitSuggestions.forEach(habit => {
      const habitCard = document.createElement('div');
      habitCard.className = 'habit-card' + (habit.completed ? ' completed' : '');
      habitCard.innerHTML = `
        <h3>${habit.name}</h3>
        <button class="complete-btn" data-id="${habit.id}">${habit.completed ? 'Completed' : 'Complete'}</button>
      `;
      habitCardsContainer.appendChild(habitCard);
    });

    // Add event listeners for completing habits
    document.querySelectorAll('.complete-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        completeHabit(id);
      });
    });
  }

  function completeHabit(id) {
    const habit = habitSuggestions.find(h => h.id === id);
    if (habit && !habit.completed) {
      habit.completed = true;
      completedHabits.push(habit.name);
      showAchievement(habit.name);
      updateStreak();
      renderHabits();
    }
  }

  function updateStreak() {
    streak++;
    streakDisplay.textContent = `Streak: ${streak} days! 🎉`;

    // Show a special achievement if the streak hits certain milestones
    if (streak === 5) {
      showAchievement("5 Days in a Row! 💪");
    } else if (streak === 10) {
      showAchievement("10 Days! You're on fire! 🔥");
    }
  }

  function showAchievement(habitName) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement';
    achievement.innerText = `Achieved: ${habitName}`;
    completedList.appendChild(achievement);

    setTimeout(() => {
      achievement.remove();
    }, 3000);
  }

  function generateDailyChallenge() {
    const challenges = [
      "Complete 3 habits today!",
      "Try a new habit today!",
      "Have a productive day – get all habits done!",
      "Complete your wellness habits today!",
    ];
    return challenges[Math.floor(Math.random() * challenges.length)];
  }

  function showChallenge() {
    challengeDisplay.textContent = `Today's Challenge: ${challenge}`;
  }

  addHabitButton.addEventListener('click', () => {
    const habitName = prompt('Enter your new habit:');
    if (habitName) {
      habitSuggestions.push({ id: Date.now(), name: habitName, category: 'Custom', completed: false });
      renderHabits();
    }
  });

  // Initial setup
  renderHabits();
  streakDisplay.textContent = `Streak: ${streak} days!`;
  showChallenge();
});