import { PlayerId } from "./GameState";

export interface GameInitEvent {
  players: Record<PlayerId, HexColor>,
  config: {
    width: number,
    height: number
  }
}

export type HexColor = string;
