import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class gpsModule extends BaseModule {
  constructor() {
    super(`gps`, `Use modems to locate the position of the current turtle orcomputers.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"CHANNEL_GPS","detail":"CHANNEL_GPS(): void","parameters":[],"documentation":"The channel which GPS requests and responses are broadcast on."},{"label":"locate","detail":"locate(timeout?: number, debug?: boolean): number | nil","parameters":["timeout?: number","debug?: boolean"],"documentation":"Tries to retrieve the computer or turtles own location.\n\n**Parameters:**\n- **timeout?: number** = 2 The maximum time in seconds taken to establish our\nposition.\n- **debug?: boolean** = false Print debugging messages\n\n**Returns:**\n- number This computer's x position.\n- number This computer's y position.\n- number This computer's z position.\n- nil If the position could not be established."}];
  }
}
