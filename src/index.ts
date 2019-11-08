import { GameState } from "./GameState";
import { Server, OPEN as WebSocketOpen } from "ws";
import { GameInitEvent } from "./GameInitEvent";
import { Game } from "./Game";
import {exampleInit} from "./GameInitEvent.example";

const wss = new Server({ port: 8081 });

wss.on("connection", ws => {
  // todo negotiate color / player name?
  const playerId = "player" + Math.random();

  // todo client asked to create a cell, send that somewhere
  ws.on("message", message => {
      const coOrd = JSON.parse(message as string);
      game.alterGrid(coOrd[0], coOrd[1]);
  });

});

class GameServer {

  constructor(
    private readonly socket: Server
  ) {}

  public pushState(state: GameState | GameInitEvent): void {
    for (const client of this.socket.clients) {
      if (client.readyState === WebSocketOpen) {
        client.send(JSON.stringify(state));
      }
    }
  }
}

const gameServer = new GameServer(wss);
let game = new Game(30, 60);

setInterval(() => {
  const grid = game.turn();
  gameServer.pushState(grid);
}, 500);

// setInterval(() => {
//   gameServer.pushState(game.getGrid());
// }, 10000);

setInterval(() => {
    game.reset();

    gameServer.pushState(exampleInit);
}, 9000);

setInterval(() => console.log("Clients connected: " + wss.clients.size), 1000);
