import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class TermModule extends BaseModule {
  constructor() {
    super(
      "term",
      `The \`term\` object provides methods to interact with the terminal display in Lua.
    
You can use it to write text, change colors, move the cursor, and more.`
    );
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "write",
        documentation:
          new vscode.MarkdownString(`Writes text to the terminal at the current cursor position.
              
              **Usage:** \`term.write(text: string)\`
              - **text**: The string to write to the terminal.`),
        detail: "term.write(text: string): void",
        parameters: ["text: string"],
      },
      {
        label: "clear",
        documentation: new vscode.MarkdownString(`Clears the terminal screen.
              
              **Usage:** \`term.clear()\`
              - This function clears the terminal display.`),
        detail: "term.clear(): void",
        parameters: [],
      },
      {
        label: "clearLine",
        documentation:
          new vscode.MarkdownString(`Clears the current line of the terminal.
              
              **Usage:** \`term.clearLine()\`
              - This function clears only the line where the cursor is currently positioned.`),
        detail: "term.clearLine(): void",
        parameters: [],
      },
      {
        label: "setCursorPos",
        documentation:
          new vscode.MarkdownString(`Moves the cursor to a specified position.
              
              **Usage:** \`term.setCursorPos(x: number, y: number)\`
              - **x**: The new X position (1-based).
              - **y**: The new Y position (1-based).`),
        detail: "term.setCursorPos(x: number, y: number): void",
        parameters: ["x: number", "y: number"],
      },
      {
        label: "getCursorPos",
        documentation:
          new vscode.MarkdownString(`Gets the current cursor position.
              
              **Usage:** \`term.getCursorPos()\`
              - Returns: A tuple of two numbers representing the current X and Y position of the cursor.`),
        detail: "term.getCursorPos(): [number, number]",
        parameters: [],
      },
      {
        label: "scroll",
        documentation: new vscode.MarkdownString(`Scrolls the terminal display.
              
              **Usage:** \`term.scroll(n: number)\`
              - **n**: The number of lines to scroll. Positive values scroll down, and negative values scroll up.`),
        detail: "term.scroll(n: number): void",
        parameters: ["n: number"],
      },
      {
        label: "setTextColor",
        documentation:
          new vscode.MarkdownString(`Sets the text color of the terminal.
              
              **Usage:** \`term.setTextColor(color: number)\`
              - **color**: A color from the color palette, as an integer.`),
        detail: "term.setTextColor(color: number): void",
        parameters: ["color: number"],
      },
      {
        label: "getTextColor",
        documentation:
          new vscode.MarkdownString(`Gets the current text color of the terminal.
              
              **Usage:** \`term.getTextColor()\`
              - Returns: The current text color as an integer.`),
        detail: "term.getTextColor(): number",
        parameters: [],
      },
      {
        label: "setBackgroundColor",
        documentation:
          new vscode.MarkdownString(`Sets the background color of the terminal.
              
              **Usage:** \`term.setBackgroundColor(color: number)\`
              - **color**: A color from the color palette, as an integer.`),
        detail: "term.setBackgroundColor(color: number): void",
        parameters: ["color: number"],
      },
      {
        label: "getBackgroundColor",
        documentation:
          new vscode.MarkdownString(`Gets the current background color of the terminal.
              
              **Usage:** \`term.getBackgroundColor()\`
              - Returns: The current background color as an integer.`),
        detail: "term.getBackgroundColor(): number",
        parameters: [],
      },
    ];
  }
}
