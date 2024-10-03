import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class fluid_storageModule extends BaseModule {
  constructor() {
    super(`fluid_storage`, `Methods for interacting with tanks and other fluid storage blocks.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"tanks","detail":"tanks(): {","parameters":[],"documentation":"Get all \"tanks\" in this fluid storage.\n\n**Returns:**\n- { table | nil... } All tanks in this fluid storage."},{"label":"pushFluid","detail":"pushFluid(toName: string, limit?: number, fluidName?: string): number","parameters":["toName: string","limit?: number","fluidName?: string"],"documentation":"Move a fluid from one fluid container to another connected one.\n\n**Parameters:**\n- **toName: string** The name of the peripheral/container to push to. This is the string given to peripheral.wrap,\nand displayed by the wired modem.\n- **limit?: number** The maximum amount of fluid to move.\n- **fluidName?: string** The fluid to move. If not given, an arbitrary fluid will be chosen.\n\n**Returns:**\n- number The amount of moved fluid."},{"label":"pullFluid","detail":"pullFluid(fromName: string, limit?: number, fluidName?: string): number","parameters":["fromName: string","limit?: number","fluidName?: string"],"documentation":"Move a fluid from a connected fluid container into this one.\n\n**Parameters:**\n- **fromName: string** The name of the peripheral/container to push to. This is the string given to peripheral.wrap,\nand displayed by the wired modem.\n- **limit?: number** The maximum amount of fluid to move.\n- **fluidName?: string** The fluid to move. If not given, an arbitrary fluid will be chosen.\n\n**Returns:**\n- number The amount of moved fluid."}];
  }
}
