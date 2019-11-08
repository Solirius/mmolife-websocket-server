import { example } from "./GameState.example";
import { GameState } from "./GameState";
import { Server } from "ws";

const wss = new Server({ port: 8081 });

wss.on("connection", ws => {
  // todo negotiate color / player name?

  // todo client asked to create a cell, send that somewhere
  ws.on("message", message => {
    console.log("received: %s", message);
  });

});

class GameServer {

  constructor(
    private readonly socket: Server
  ) {}

  public pushState(state: GameState): void {
    for (const client of this.socket.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(state);
      }
    }
  }

}

const gameServer = new GameServer(wss);

setInterval(() => gameServer.pushState(example), 500);
setInterval(() => console.log("Clients connected: " + wss.clients.size), 1000);
