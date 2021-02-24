import { atom } from "recoil";
//Atoms
export const isDarkModeEnable = atom({ key: "isDarkMode", default: true });
export const difficulty = atom({ key: "difficulty", default: 3 });
export const selectedGameId = atom({ key: "gameId", default: "" });
export const gamesThumbnails = atom({
  key: "gamesThumbnails",
  default: { games: [] },
});
export const selectedNumber = atom({ key: "selectedNumber", default: false });
