import {Cell, GameState} from "./GameState";
import { Rules } from "./Rules";

export class Game {
    private grid: Cell[][];
    private activeGame;

    constructor(
        private readonly height: number,
        private readonly width: number) {
        this.grid = this.getGrid();
    }

    private getGrid(): Cell[][] {
        return new Array(this.height).fill([]).map(() => new Array(this.width).fill(null));
    }

    public reset(): void {
        this.grid = this.getGrid();
        // this.activeGame = false;
        //
        // this.activeGame = true;
    }

    public gameState() {
        return this.activeGame;
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