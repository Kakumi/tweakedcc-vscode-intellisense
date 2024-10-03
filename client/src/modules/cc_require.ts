import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class cc_requireModule extends BaseModule {
  constructor() {
    super(`cc_require`, `A pure Lua implementation of the builtin require function andpackage library.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"make","detail":"make(env: table, dir: string): function | table","parameters":["env: table","dir: string"],"documentation":"Build an implementation of Lua's package library, and a require\nfunction to load modules within it.\n\n**Parameters:**\n- **env: table** The environment to load packages into.\n- **dir: string** The directory that relative packages are loaded from.\n\n**Returns:**\n- function The new require function.\n- table The new package library."}];
  }
}
