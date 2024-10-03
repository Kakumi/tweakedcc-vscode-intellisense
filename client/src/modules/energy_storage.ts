import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class energy_storageModule extends BaseModule {
  constructor() {
    super(`energy_storage`, `Methods for interacting with blocks which store energy.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"getEnergy","detail":"getEnergy(): number","parameters":[],"documentation":"Get the energy of this block.\n\n**Returns:**\n- number The energy stored in this block, in FE."},{"label":"getEnergyCapacity","detail":"getEnergyCapacity(): number","parameters":[],"documentation":"Get the maximum amount of energy this block can store.\n\n**Returns:**\n- number The energy capacity of this block."}];
  }
}
