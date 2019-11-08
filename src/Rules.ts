import { Cell } from "./GameState";

export class Rules {

    static cell(grid: Cell[][], height: number, width: number) {
        let neighbours = 0;

        neighbours += grid[this.getCoOrd(height - 1, grid.length)][this.getCoOrd(width - 1, grid[0].length)] === null ? 0 : 1;
        neighbours += grid[this.getCoOrd(height, grid.length)][this.getCoOrd(width - 1, grid[0].length)] === null ? 0 : 1;
        neighbours += grid[this.getCoOrd(height + 1, grid.length)][this.getCoOrd(width - 1, grid[0].length)] === null ? 0 : 1;
        neighbours += grid[this.getCoOrd(height - 1, grid.length)][this.getCoOrd(width, grid[0].length)] === null ? 0 : 1;
        neighbours += grid[this.getCoOrd(height + 1, grid.length)][this.getCoOrd(width, grid[0].length)] === null ? 0 : 1;
        neighbours += grid[this.getCoOrd(height - 1, grid.length)][this.getCoOrd(width + 1, grid[0].length)] === null ? 0 : 1;
        neighbours += grid[this.getCoOrd(height, grid.length)][this.getCoOrd(width + 1, grid[0].length)] === null ? 0 : 1;
        neighbours += grid[this.getCoOrd(height + 1, grid.length)][this.getCoOrd(width + 1, grid[0].length)] === null ? 0 : 1;

        return neighbours;
    }

    static getCoOrd (coOrd: number, len: number) {
        return (len + coOrd) % len;
    }
}