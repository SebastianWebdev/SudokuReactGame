import Dexie from "dexie";

// creating database
const maxGamesPerLevel = 6;
const db = new Dexie("sudoku_database");
db.version(2).stores({
  thumbnailsGames: "++id,date,percentage,level",
  sudokuDB: "++id,common_id,*solved,*toSolve,time",
});
export async function GetSudoku(sudokuId = "") {
  try {
    const data = [];
    await db.sudokuDB.each((game) => data.push(game));
    return data.filter((sudoku) => sudoku.common_id === sudokuId)[0];
  } catch (e) {
    console.log(e);
  }
}
export async function GetDB(DBname = "") {
  try {
    const data = [];
    await db[DBname].each((game) => data.push(game));
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function SetDB(DBname = "", data) {
  try {
    if (DBname === "thumbnailsGames") {
      const { level } = data;
      const prevData = await GetDB(DBname);
      const dataLength = prevData.filter((data) => data.level === level).length;
      if (dataLength < maxGamesPerLevel) {
        const response = await db[DBname].put(data);
        const newData = await GetDB(DBname);
        return newData;
      } else {
        return false;
      }
    }
    if (DBname === "sudokuDB") {
      console.log(data);
      await db[DBname].put(data);

      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
