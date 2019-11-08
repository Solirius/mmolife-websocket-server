import { GameInitEvent } from "./GameInitEvent";

export const exampleInit: GameInitEvent = {
  players: {
    "Bob": "ff00cc",
    "Jose": "00ffee",
  },
  config: {
    width: 100,
    height: 50,
  }
};
