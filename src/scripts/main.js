/* eslint-disable max-len */
'use strict';

class Game {
  constructor() {
    this.cells = document.querySelectorAll('.cell');
    this.restartButton = document.querySelector('.player_restart');
    this.player1Message = document.querySelector('.win_message__player1');
    this.player2Message = document.querySelector('.win_message__player2');
    this.playerVsPlayerButton = document.querySelector('.player_vs_player');
    this.playerVsComputerButton = document.querySelector('.player_vs_computer');

    this.difficultyButtons = {
      easy: document.querySelector('.difficult_easy'),
      medium: document.querySelector('.difficult_medium'),
      hard: document.querySelector('.difficult_hard'),
    };
    this.scorePlayer1El = document.querySelector('.score-player_one');
    this.scorePlayer2El = document.querySelector('.score-player_two');
    this.player1Panel = document.querySelector('.player_one');
    this.player2Panel = document.querySelector('.player_two');
    this.playerOrComputerNameEl = document.querySelector('.player_computer');
    this.playerOrComputerMessageEl = document.querySelector('.player_or_computer_message');
    this.gameTable = document.querySelector('.game__table');

    this.gameState = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      scores: {
        X: 0, O: 0,
      },
      gameMode: 'computer',
      difficulty: 'hard',
      isGameOver: false,
    };

    this.winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    this.init();
  }

  init() {
    this.cells.forEach(cell => {
      cell.addEventListener('click', (e) => this.handleCellClick(e));
    });

    this.restartButton.addEventListener('click', () => this.fullRestart());

    this.playerVsPlayerButton.addEventListener('click', () => this.setGameMode('player'));
    this.playerVsComputerButton.addEventListener('click', () => this.setGameMode('computer'));

    this.difficultyButtons.easy.addEventListener('click', () => this.setDifficulty('easy'));
    this.difficultyButtons.medium.addEventListener('click', () => this.setDifficulty('medium'));
    this.difficultyButtons.hard.addEventListener('click', () => this.setDifficulty('hard'));

    this.updateUI();
  }

  handleCellClick(event) {
    if (this.gameState.isGameOver) {
      return;
    }

    const cell = event.currentTarget;
    const index = parseInt(cell.dataset.index);

    if (isNaN(index) || this.gameState.board[index] !== null) {
      return;
    }

    this.makeMove(cell, index);

    if (this.gameState.gameMode === 'computer' && !this.gameState.isGameOver && this.gameState.currentPlayer === 'O') {
      this.disableBoard();
      setTimeout(() => this.computerMove(), 1000);
    }
  }

  makeMove(cell, index) {
    this.gameState.board[index] = this.gameState.currentPlayer;
    cell.innerHTML = this.gameState.currentPlayer === 'X' ? '&#10060;' : '&#11093;';
    cell.classList.add(this.gameState.currentPlayer === 'X' ? 'cell-x' : 'cell-o');

    if (this.checkEndCondition()) {
      return;
    }

    this.switchPlayer();
    this.updateUI();
  }

  checkEndCondition() {
    const winnerInfo = this.checkWinner();

    if (winnerInfo) {
      this.endGame(winnerInfo.winner, winnerInfo.combination);

      return true;
    }

    if (this.isDraw()) {
      this.endGame(null);

      return true;
    }

    return false;
  }

  checkWinner() {
    for (const combination of this.winningCombinations) {
      const [a, b, c] = combination;

      if (this.gameState.board[a] && this.gameState.board[a] === this.gameState.board[b] && this.gameState.board[a] === this.gameState.board[c]) {
        return {
          winner: this.gameState.board[a], combination,
        };
      }
    }

    return null;
  }

  isDraw() {
    return this.gameState.board.every(cell => cell !== null);
  }

  endGame(winner, winningCombination = []) {
    this.gameState.isGameOver = true;
    this.disableBoard();

    if (winner) {
      this.gameState.scores[winner]++;
      winningCombination.forEach(index => this.cells[index].classList.add('cell-win'));
    } else {
      this.cells.forEach(cell => cell.classList.add('cell-pat'));
    }

    this.updateUI();

    if (this.gameState.scores.X === 5 || this.gameState.scores.O === 5) {
      this.showFinalWinner();
    } else {
      setTimeout(() => this.roundRestart(), 2000);
    }
  }

  showFinalWinner() {
    this.gameTable.style.display = 'none';

    if (this.gameState.scores.X === 5) {
      this.player1Message.removeAttribute('hidden');
    } else {
      this.player2Message.removeAttribute('hidden');
    }
  }

  switchPlayer() {
    this.gameState.currentPlayer = this.gameState.currentPlayer === 'X' ? 'O' : 'X';
  }

  computerMove() {
    if (this.gameState.isGameOver) {
      return;
    }

    let moveIndex = -1;
    const availableCells = this.getAvailableCells();

    if (this.gameState.difficulty === 'hard') {
      moveIndex = this.findWinningMove('O');

      if (moveIndex === -1) {
        moveIndex = this.findWinningMove('X');
      }
    }

    if (this.gameState.difficulty === 'medium') {
      if (Math.random() > 0.5) {
        moveIndex = this.findWinningMove('O');

        if (moveIndex === -1) {
          moveIndex = this.findWinningMove('X');
        }
      }
    }

    if (moveIndex === -1) {
      moveIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    }

    if (moveIndex !== undefined) {
      const cell = this.cells[moveIndex];

      this.makeMove(cell, moveIndex);
    }

    this.enableBoard();
  }

  findWinningMove(player) {
    for (const index of this.getAvailableCells()) {
      const tempBoard = [...this.gameState.board];

      tempBoard[index] = player;

      for (const combination of this.winningCombinations) {
        const [a, b, c] = combination;

        if (tempBoard[a] === player && tempBoard[b] === player && tempBoard[c] === player) {
          return index;
        }
      }
    }

    return -1;
  }

  getAvailableCells() {
    return this.gameState.board.map((val, index) => val === null ? index : null).filter(val => val !== null);
  }

  roundRestart() {
    this.gameState.board.fill(null);
    this.gameState.isGameOver = false;
    this.gameState.currentPlayer = 'X';

    this.cells.forEach(cell => {
      cell.innerHTML = '';
      cell.classList.remove('cell-x', 'cell-o', 'cell-win', 'cell-pat');
    });

    this.enableBoard();
    this.updateUI();
  }

  fullRestart() {
    this.roundRestart();

    this.gameState.scores = {
      X: 0, O: 0,
    };
    this.player1Message.setAttribute('hidden', true);
    this.player2Message.setAttribute('hidden', true);
    this.gameTable.style.display = 'flex';
    this.updateUI();
  }

  setGameMode(mode) {
    this.gameState.gameMode = mode;
    this.fullRestart();

    if (mode === 'player') {
      this.playerVsPlayerButton.style.transform = 'scale(1.2)';
      this.playerVsPlayerButton.style.backgroundColor = '#2f6d2f';
      this.playerVsComputerButton.style.transform = 'scale(1)';
      this.playerVsComputerButton.style.backgroundColor = 'rgb(143, 31, 31)';
      this.playerOrComputerNameEl.innerHTML = 'Player 2';
      this.playerOrComputerMessageEl.innerHTML = `Player 2 win!`;
    } else {
      this.playerVsComputerButton.style.transform = 'scale(1.2)';
      this.playerVsComputerButton.style.backgroundColor = '#2f6d2f';
      this.playerVsPlayerButton.style.transform = 'scale(1)';
      this.playerVsPlayerButton.style.backgroundColor = 'rgb(143, 31, 31)';
      this.playerOrComputerNameEl.innerHTML = 'Computer';
      this.playerOrComputerMessageEl.innerHTML = 'Computer win!';
    }
  }

  setDifficulty(level) {
    this.gameState.difficulty = level;

    Object.keys(this.difficultyButtons).forEach(key => {
      this.difficultyButtons[key].classList.remove('difficult_active');
    });
    this.difficultyButtons[level].classList.add('difficult_active');
  }

  updateUI() {
    this.scorePlayer1El.innerHTML = this.gameState.scores.X;
    this.scorePlayer2El.innerHTML = this.gameState.scores.O;

    if (!this.gameState.isGameOver) {
      if (this.gameState.currentPlayer === 'X') {
        this.player1Panel.style.backgroundColor = 'green';
        this.player1Panel.style.transform = 'scale(1.2)';
        this.player2Panel.style.backgroundColor = 'rgb(143, 31, 31)';
        this.player2Panel.style.transform = 'scale(1)';
      } else {
        this.player2Panel.style.backgroundColor = 'green';
        this.player2Panel.style.transform = 'scale(1.2)';
        this.player1Panel.style.backgroundColor = 'rgb(143, 31, 31)';
        this.player1Panel.style.transform = 'scale(1)';
      }
    }
  }

  disableBoard() {
    this.cells.forEach(cell => {
      cell.style.pointerEvents = 'none';
    });
  }

  enableBoard() {
    this.cells.forEach((cell, index) => {
      if (this.gameState.board[index] === null) {
        cell.style.pointerEvents = 'auto';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', new Game());
