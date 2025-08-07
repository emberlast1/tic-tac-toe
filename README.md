# Tic-Tac-Toe Game 🎮

This is a classic "Tic-Tac-Toe" game created using pure HTML, CSS, and JavaScript. The objective of the game is to be the first to get three of your marks in a row (horizontally, vertically, or diagonally). This project features both a two-player mode and a single-player mode against a computer with varying difficulty.

# Live Preview

[Tic Tac Toe](https://emberlast1.github.io/tic-tac-toe/)

### Technologies Used

* **HTML5:** To create the basic structure of the game board and UI elements.
* **CSS3:** For styling the grid, players, and the overall game interface.
* **Vanilla JavaScript (ES6+):**
    * **ES6 Classes:** The game logic is structured using a `Game` class, which makes the code clean, organized, and object-oriented.
    * **Event Handling:** To track user clicks on the cells and control buttons (like changing game mode or difficulty).

---

### Getting Started

Since this project has no external dependencies or build steps, running it locally is very simple.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/emberlast!/tic-tac-toe.git](https://github.com/emberlast1/tic-tac-toe.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd tic-tac-toe
    ```

3.  **Open the `index.html` file in your favorite web browser.**

That's it! You are ready to play.

---

### Gameplay & Features

* **Objective:** To get three of your marks (X or O) in a row before your opponent does.
* **Controls:** Use your mouse to click on an empty cell to place your mark.
* **Game Modes:** You can choose to play against another player on the same computer or against the AI.
* **AI Difficulty:** The computer opponent has three levels of difficulty: Easy, Medium, and Hard.
* **Scoring:** The game keeps score. The first player to win 5 rounds wins the entire match.
* **Game Over:** After a player wins 5 rounds, a final victory message is displayed.
* **Restart:** The "Restart" button allows you to reset the score and start a new match at any time. Rounds restart automatically after a win or a draw.
