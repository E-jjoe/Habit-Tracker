let tasks = [];
let points = 0;
let challenges = [];
let achievements = [];

// Event Listener for adding tasks
document.getElementById("addTaskBtn").addEventListener("click", function() {
    const taskName = prompt("Enter your task name:");
    const taskPoints = parseInt(prompt("How many points for this task?"));

    if (taskName && !isNaN(taskPoints)) {
        addTask(taskName, taskPoints);
    }
});

// Event Listener for adding challenges
document.getElementById("addChallengeBtn").addEventListener("click", function() {
    const challengeName = prompt("Enter your challenge name:");
    const challengePoints = parseInt(prompt("How many points for this challenge?"));

    if (challengeName && !isNaN(challengePoints)) {
        addChallenge(challengeName, challengePoints);
    }
});

function addTask(taskName, taskPoints) {
    const task = {
        name: taskName,
        points: taskPoints,
        completed: false
    };

    tasks.push(task);
    renderTasks();
}

function addChallenge(challengeName, challengePoints) {
    const challenge = {
        name: challengeName,
        points: challengePoints,
        completed: false
    };

    challenges.push(challenge);
    renderChallenges();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `${task.name} - ${task.points} points 
        <button onclick="completeTask(${index})">Complete</button>`;
        taskList.appendChild(taskItem);
    });

    updatePerformance();
}

function renderChallenges() {
    const challengesList = document.getElementById("challengesList");
    challengesList.innerHTML = "";

    challenges.forEach((challenge, index) => {
        const challengeItem = document.createElement("li");
        challengeItem.innerHTML = `${challenge.name} - ${challenge.points} points 
        <button onclick="completeChallenge(${index})">Complete</button>`;
        challengesList.appendChild(challengeItem);
    });
}

function completeTask(index) {
    tasks[index].completed = true;
    points += tasks[index].points;
    showAchievement("Task Completed!");
    renderTasks();
}

function completeChallenge(index) {
    challenges[index].completed = true;
    points += challenges[index].points;
    showAchievement("Challenge Completed!");
    renderChallenges();
}

function showAchievement(achievementMessage) {
    achievements.push(achievementMessage);
    displayAchievementPopup();
}

function displayAchievementPopup() {
    const popup = document.getElementById("achievementPopup");
    popup.style.display = "block";

    const closePopupBtn = document.getElementById("closePopupBtn");
    closePopupBtn.addEventListener("click", function() {
        popup.style.display = "none";
    });
}

function updatePerformance() {
    const performanceSummary = document.getElementById("performanceSummary");
    performanceSummary.innerHTML = `
        <p>Total Points: ${points}</p>
        <p>Tasks Completed: ${tasks.filter(task => task.completed).length}/${tasks.length}</p>
        <p>Challenges Completed: ${challenges.filter(challenge => challenge.completed).length}/${challenges.length}</p>
    `;
}