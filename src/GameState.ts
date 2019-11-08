
export interface GameState {
  players: Record<PlayerId, HexColor>,
  grid: Cell[][]
}

export type HexColor = string;
export type PlayerId = string;
export type Cell = PlayerId | null;
