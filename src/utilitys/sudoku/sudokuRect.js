class Rect {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this._numbersToChoose = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.choosenNumber = 0;
  }
  drawNumber(correction = 0) {
    // if correction algorithm pass a corerction number to choose
    if (correction !== 0) {
      const index = this._numbersToChoose.indexOf(correction);
      this.choosenNumber = correction;
      this.removeNumber(correction);
      return { number: this.choosenNumber, index };
    } else {
      // standard sytuation
      const length = this._numbersToChoose.length;
      const index = Math.floor(Math.random() * length);
      this.choosenNumber = this._numbersToChoose[index]
        ? this._numbersToChoose[index]
        : 0;
      this.removeNumber(this.choosenNumber);
      return { number: this.choosenNumber, index };
    }
  }
  removeNumber(number) {
    const index = this.numbersToChoose.indexOf(number);
    return index !== -1 ? this.numbersToChoose.splice(index, 1) : null;
  }

  // getters
  get number() {
    return this.choosenNumber;
  }
  get numbersToChoose() {
    return this._numbersToChoose;
  }
  getRectData() {
    return { row: this.row, col: this.column, number: this.choosenNumber };
  }
  // setters

  set setNumbersToChoose(numbers = []) {
    this._numbersToChoose = numbers;
  }
  set setChoosenNumber(number) {
    this.choosenNumber = number;
  }
  set setRow(row) {
    this.row = row;
  }
  set setColumn(column) {
    this.column = column;
  }
}
export default Rect;
