import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class computerModule extends BaseModule {
  constructor() {
    super(`computer`, `A computer or turtle wrapped as a peripheral.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"turnOn","detail":"turnOn(): void","parameters":[],"documentation":"Turn the other computer on."},{"label":"shutdown","detail":"shutdown(): void","parameters":[],"documentation":"Shutdown the other computer."},{"label":"reboot","detail":"reboot(): void","parameters":[],"documentation":"Reboot or turn on the other computer."},{"label":"getID","detail":"getID(): number","parameters":[],"documentation":"Get the other computer's ID.\n\n**Returns:**\n- number The computer's ID."},{"label":"isOn","detail":"isOn(): boolean","parameters":[],"documentation":"Determine if the other computer is on.\n\n**Returns:**\n- boolean If the computer is on."},{"label":"getLabel","detail":"getLabel(): string","parameters":[],"documentation":"Get the other computer's label.\n\n**Returns:**\n- string | nil The computer's label."}];
  }
}
