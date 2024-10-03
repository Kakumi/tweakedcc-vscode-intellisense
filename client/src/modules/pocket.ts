import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class pocketModule extends BaseModule {
  constructor() {
    super(`pocket`, `Control the current pocket computer, adding or removing upgrades.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"equipBack","detail":"equipBack(): boolean | string","parameters":[],"documentation":"Search the player's inventory for another upgrade, replacing the existing one with that item if found.\n\n**Returns:**\n- boolean If an item was equipped.\n- string | nil The reason an item was not equipped."},{"label":"unequipBack","detail":"unequipBack(): boolean | string","parameters":[],"documentation":"Remove the pocket computer's current upgrade.\n\n**Returns:**\n- boolean If the upgrade was unequipped.\n- string | nil The reason an upgrade was not unequipped."}];
  }
}
