import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class KeysModule extends BaseModule {
  constructor() {
    super(
      "keys",
      `The \`keys\` object provides constants and methods to interact with keyboard input in Lua.
    
You can use it to detect key presses and handle keyboard interactions in your programs.`
    );
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "getName",
        documentation:
          new vscode.MarkdownString(`Gets the name of a key from its numeric code.
              
              **Usage:** \`keys.getName(keyCode: number)\`
              - **keyCode**: The numeric code of the key.
              
              **Returns:** The name of the key as a string, or \`nil\` if the key is unknown.`),
        detail: "keys.getName(keyCode: number): string | nil",
        parameters: ["keyCode: number"],
      },
      {
        label: "getKeyCode",
        documentation:
          new vscode.MarkdownString(`Gets the numeric code of a key from its name.
              
              **Usage:** \`keys.getKeyCode(keyName: string)\`
              - **keyName**: The name of the key.
              
              **Returns:** The numeric code of the key, or \`nil\` if the key name is unknown.`),
        detail: "keys.getKeyCode(keyName: string): number | nil",
        parameters: ["keyName: string"],
      },
      {
        label: "isCtrl",
        documentation:
          new vscode.MarkdownString(`Checks if a key is the Ctrl key.
              
              **Usage:** \`keys.isCtrl(keyCode: number)\`
              - **keyCode**: The numeric code of the key.
              
              **Returns:** \`true\` if the key is Ctrl, otherwise \`false\`.`),
        detail: "keys.isCtrl(keyCode: number): boolean",
        parameters: ["keyCode: number"],
      },
      {
        label: "isAlt",
        documentation:
          new vscode.MarkdownString(`Checks if a key is the Alt key.
              
              **Usage:** \`keys.isAlt(keyCode: number)\`
              - **keyCode**: The numeric code of the key.
              
              **Returns:** \`true\` if the key is Alt, otherwise \`false\`.`),
        detail: "keys.isAlt(keyCode: number): boolean",
        parameters: ["keyCode: number"],
      },
      {
        label: "isShift",
        documentation:
          new vscode.MarkdownString(`Checks if a key is the Shift key.
              
              **Usage:** \`keys.isShift(keyCode: number)\`
              - **keyCode**: The numeric code of the key.
              
              **Returns:** \`true\` if the key is Shift, otherwise \`false\`.`),
        detail: "keys.isShift(keyCode: number): boolean",
        parameters: ["keyCode: number"],
      },
    ];
  }
}
