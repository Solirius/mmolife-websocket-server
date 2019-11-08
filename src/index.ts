import { exampleState } from "./GameState.example";
import { GameState } from "./GameState";
import { Server, OPEN as WebSocketOpen } from "ws";
import { exampleInit } from "./GameInitEvent.example";
import { GameInitEvent } from "./GameInitEvent";

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

  public pushState(state: GameState | GameInitEvent): void {
    for (const client of this.socket.clients) {
      if (client.readyState === WebSocketOpen) {
        client.send(JSON.stringify(state));
      }
    }
  }

}

const gameServer = new GameServer(wss);

setInterval(() => gameServer.pushState(exampleState), 500);
setInterval(() => gameServer.pushState(exampleInit), 10000);
setInterval(() => console.log("Clients connected: " + wss.clients.size), 1000);
