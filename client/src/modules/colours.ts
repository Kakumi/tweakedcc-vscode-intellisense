import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class coloursModule extends BaseModule {
  constructor() {
    super(`colours`, `An alternative version of colors for lovers of British spelling.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"grey","detail":"grey(): void","parameters":[],"documentation":"Grey. Written as 7 in paint files and term.blit, has a default\nterminal colour of #4C4C4C."},{"label":"lightGrey","detail":"lightGrey(): void","parameters":[],"documentation":"Light grey. Written as 8 in paint files and term.blit, has a\ndefault terminal colour of #999999."}];
  }
}
