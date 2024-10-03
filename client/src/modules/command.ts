import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class commandModule extends BaseModule {
  constructor() {
    super(`command`, `This peripheral allows you to interact with command blocks.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"getCommand","detail":"getCommand(): string","parameters":[],"documentation":"Get the command this command block will run.\n\n**Returns:**\n- string The current command."},{"label":"setCommand","detail":"setCommand(command: string): void","parameters":["command: string"],"documentation":"Set the command block's command.\n\n**Parameters:**\n- **command: string** The new command."},{"label":"runCommand","detail":"runCommand(): boolean | string","parameters":[],"documentation":"Execute the command block once.\n\n**Returns:**\n- boolean If the command completed successfully.\n- string | nil A failure message."}];
  }
}
