import {Cell, GameState} from "./GameState";
import { Rules } from "./Rules";

export class Game {
    private grid: Cell[][];

    constructor(
        private readonly height: number,
        private readonly width: number) {
        this.grid = this.getGrid();
    }

    private getGrid(): Cell[][] {
        return [this.height, this.width].map(e => Array(e).fill(null));
    }
    public reset(): void {
        this.grid = this.getGrid();
    }

    public alterGrid(height: number, width: number): void {
        this.grid[height][width] = "Bob";
    }

    turn(): GameState {
        const newState = this.getGrid();
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                const neighbours = Rules.cell(this.grid, i, j);
                if (neighbours >= 4 || neighbours <= 1) {
                    newState[i][j] = null;
                } else if (this.grid[i][j] === null && neighbours === 3) {
                    newState[i][j] = "Bob";
                }
            }
        }

        this.grid = newState;

        return this.grid;
    }
}