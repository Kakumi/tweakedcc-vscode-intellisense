import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class printerModule extends BaseModule {
  constructor() {
    super(`printer`, `The printer peripheral allows printing text onto pages. These pages can then be crafted together into printed pagesor books.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"write","detail":"write(text: string): void","parameters":["text: string"],"documentation":"Writes text to the current page.\n\n**Parameters:**\n- **text: string** The value to write to the page."},{"label":"getCursorPos","detail":"getCursorPos(): number","parameters":[],"documentation":"Returns the current position of the cursor on the page.\n\n**Returns:**\n- number The X position of the cursor.\n- number The Y position of the cursor."},{"label":"setCursorPos","detail":"setCursorPos(x: number, y: number): void","parameters":["x: number","y: number"],"documentation":"Sets the position of the cursor on the page.\n\n**Parameters:**\n- **x: number** The X coordinate to set the cursor at.\n- **y: number** The Y coordinate to set the cursor at."},{"label":"getPageSize","detail":"getPageSize(): number","parameters":[],"documentation":"Returns the size of the current page.\n\n**Returns:**\n- number The width of the page.\n- number The height of the page."},{"label":"newPage","detail":"newPage(): boolean","parameters":[],"documentation":"Starts printing a new page.\n\n**Returns:**\n- boolean Whether a new page could be started."},{"label":"endPage","detail":"endPage(): boolean","parameters":[],"documentation":"Finalizes printing of the current page and outputs it to the tray.\n\n**Returns:**\n- boolean Whether the page could be successfully finished."},{"label":"setPageTitle","detail":"setPageTitle(title?: string): void","parameters":["title?: string"],"documentation":"Sets the title of the current page.\n\n**Parameters:**\n- **title?: string** The title to set for the page."},{"label":"getInkLevel","detail":"getInkLevel(): number","parameters":[],"documentation":"Returns the amount of ink left in the printer.\n\n**Returns:**\n- number The amount of ink available to print with."},{"label":"getPaperLevel","detail":"getPaperLevel(): number","parameters":[],"documentation":"Returns the amount of paper left in the printer.\n\n**Returns:**\n- number The amount of paper available to print with."}];
  }
}
