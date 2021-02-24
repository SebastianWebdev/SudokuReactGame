import Rect from "./sudokuRect.js";
class Sudoku {
  #sudokuArray = [];
  #sudokuToSolve = [];
  #difficultySettings = {
    1: {
      min: 18,
      max: 22,
    },
    2: {
      min: 23,
      max: 28,
    },
    3: {
      min: 29,
      max: 34,
    },
    4: {
      min: 35,
      max: 42,
    },
    5: { min: 60, max: 70 },
  };
  #flag = false;
  difficulty = 1;
  constructor(settings = { autoGenerate: true }) {
    const { autoGenerate } = settings;

    this.#sudokuArray = this.initializeSudoku();
    if (autoGenerate) {
      this.generateSudoku();
    }
  }
  // private methods
  initializeSudoku() {
    // creating sudoku array with init values
    const sudoku = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(new Rect(i, j));
      }
      sudoku.push(row);
    }
    return sudoku;
  }
  eliminateNumbersToChoose(number, row, col, sudoku = []) {
    //Eliminate numbers in Row

    for (let i = col + 1; i < 9; i++) {
      sudoku[row][i].removeNumber(number);
    }
    // eliminate numbers in Column
    for (let i = row + 1; i < 9; i++) {
      sudoku[i][col].removeNumber(number);
    }
    // eliminate numbers in small sudokuRect
    const rowCoord = row % 3;
    const colCoord = col % 3;
    const bigCol = Math.floor(col / 3);
    const bigRow = Math.floor(row / 3);

    const rectRowArr = [0, 1, 2];
    const rectColArr = [0, 1, 2];

    const finalLocalRows = rectRowArr.filter((item) => item > rowCoord);
    const finalLocalCols = rectColArr.filter((item) => item !== colCoord);

    finalLocalRows.forEach((finalrow) => {
      const totalRowNumber = finalrow + 3 * bigRow;

      for (let i = 0; i < finalLocalCols.length; i++) {
        const totalColNumber = finalLocalCols[i] + 3 * bigCol;
        sudoku[totalRowNumber][totalColNumber].removeNumber(number);
      }
      // eliminate Errors
    });
    return sudoku;
  }
  errorCorrection(row, col, sudoku) {
    // corection for rows
    if (row > 0 && col > 2 && col < 6) {
      const numbersToCheck = sudoku[row][col].numbersToChoose;
      const corespondingNumbers = sudoku[row][col + 3].numbersToChoose;
      // comparing arrays
      const testNumbers = numbersToCheck.filter(
        (number) => corespondingNumbers.indexOf(number) === -1
      );
      const choosedNumber = testNumbers.length > 0 ? testNumbers[0] : 0;
      return choosedNumber;
    }
    return 0;
  }

  createSingleSudoku() {
    const sudoku = this.initializeSudoku();
    sudoku.forEach((row) => {
      row.forEach((rect) => {
        const { number } = rect.drawNumber(
          this.errorCorrection(rect.row, rect.column, sudoku)
        );
        return this.eliminateNumbersToChoose(
          number,
          rect.row,
          rect.column,
          sudoku
        );
      });
    });
    return sudoku;
  }
  createSudokuToSolve(difficulty = this.difficulty, sudokuArray = []) {
    const sudoku = this.createCopy(sudokuArray);
    const indexes = [];
    sudoku.forEach((item) => {
      item.forEach((rect) => {
        indexes.push({
          row: rect.row,
          column: rect.column,
        });
      });
    });
    const removedItems = [];
    const amountOfNumbersToEliminate = this.difficultySettings;
    const numbersCount =
      Math.floor(
        Math.random() *
          (amountOfNumbersToEliminate[difficulty].max -
            amountOfNumbersToEliminate[difficulty].min)
      ) + amountOfNumbersToEliminate[difficulty].min;

    for (let i = 0; i < 81 - numbersCount; i++) {
      const index = Math.floor(Math.random() * indexes.length);

      const rect = indexes[index];
      sudoku[rect.row][rect.column].choosenNumber = 0;
      indexes.splice(index, 1);
      removedItems.push(rect);
    }
    this.#sudokuToSolve = sudoku;
    return sudoku;
  }
  createCopy(sudoku = []) {
    const copy = [];
    sudoku.forEach((row) => {
      const newRow = [];
      row.forEach((rect) => {
        const { row, column, choosenNumber, numbersToChoose } = rect;
        const newRect = new Rect(row, column);
        newRect.setChoosenNumber = choosenNumber;
        newRect.setNumbersToChoose = [...numbersToChoose];
        newRow.push(newRect);
      });
      copy.push(newRow);
    });
    return copy;
  }
  getSudokuNumbers(sudoku = []) {
    const sudokuNumbersArr = [];
    sudoku.forEach((row) => {
      const newRow = [];
      row.forEach((rect) => {
        newRow.push(rect.number);
      });
      sudokuNumbersArr.push(newRow);
    });
    return sudokuNumbersArr;
  }
  // --------------------------Public methods
  checkSudoku(sudoku = []) {
    const sudokuNumbers = this.getSudokuNumbers([...sudoku]);
    let sudokuSum = 0;
    sudokuNumbers.forEach((row) => {
      row.forEach((number) => {
        sudokuSum += number;
      });
    });
    if (sudokuSum === 405) {
      return true;
    } else {
      return false;
    }
  }
  generateSudoku(difficulty = 1) {
    this.flag = false;
    let index = 0;
    let sudoku = [];
    while (!this.flag && index < 10000) {
      const tempSudoku = this.createSingleSudoku();
      const flag = this.checkSudoku(tempSudoku);
      if (flag) {
        this.#sudokuArray = tempSudoku;
        this.#flag = flag;
        sudoku = tempSudoku;
        break;
      }
      index++;
    }
    const sudokuToSolve = this.createSudokuToSolve(difficulty, sudoku);
    this.#sudokuToSolve = sudokuToSolve;

    return {
      origin: { sudoku, numbersArr: this.getSudokuNumbers(sudoku) },
      toSolve: {
        difficulty,
        sudoku: sudokuToSolve,
        numbersArr: this.getSudokuNumbers(sudokuToSolve),
      },
    };
  }
  async generateSudokuAsync(difficulty = 1) {
    this.flag = false;
    let index = 0;
    let sudoku = [];
    let tempSudokutoSolve = [];
    try {
      while (!this.flag && index < 10000) {
        const tempSudoku = this.createSingleSudoku();
        const flag = this.checkSudoku(tempSudoku);
        if (flag) {
          this.#sudokuArray = tempSudoku;
          this.#flag = flag;
          sudoku = tempSudoku;
          break;
        }
        index++;
      }
      const sudokuToSolve = this.createSudokuToSolve(difficulty, sudoku);
      tempSudokutoSolve = sudokuToSolve;
      this.#sudokuToSolve = sudokuToSolve;
    } catch (error) {
      throw new Error(error);
    }
    return {
      origin: { sudoku, numbersArr: this.getSudokuNumbers(sudoku) },
      toSolve: {
        difficulty,
        sudoku: tempSudokutoSolve,
        numbersArr: this.getSudokuNumbers(tempSudokutoSolve),
      },
    };
  }
  //getters
  get sudokuNumbers() {
    return this.getSudokuNumbers(this.#sudokuArray);
  }
  get sudoku() {
    return this.#sudokuArray;
  }
  get sudokuNumbersToSolve() {
    return this.getSudokuNumbers(this.#sudokuToSolve);
  }
  get sudokuToSolve() {
    return this.#sudokuToSolve;
  }
  get difficultySettings() {
    return this.#difficultySettings;
  }
  //setters
  set sudocuDifficulty(difficulty = 1) {
    this.difficulty = difficulty;
  }
  set sudokuDifficultySettings(setings = {}) {
    this.#difficultySettings = setings;
  }
}

export const sudoku = new Sudoku();
