import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class keysModule extends BaseModule {
  constructor() {
    super(`keys`, `Constants for all keyboard "key codes", as queued by the key event.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"getName","detail":"getName(code: number): string","parameters":["code: number"],"documentation":"Translates a numerical key code to a human-readable name. The human-readable\nname is one of the constants in the keys API.\n\n**Parameters:**\n- **code: number** The key code to look up.\n\n**Returns:**\n- string | nil The name of the key, or nil if not a valid key code.\n\n**Usage:**\n\nkeys.getName(keys.enter)"}];
  }
}
