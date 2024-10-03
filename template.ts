import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class templateModuleNameModule extends BaseModule {
  constructor() {
    super(`templateModuleName`, `templateModuleDesc`);
  }

  protected getMethods(): Method[] {
    return templateModuleArray;
  }
}
