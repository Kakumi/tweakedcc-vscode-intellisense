import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class CommandsModule extends BaseModule {
  constructor() {
    super(
      "commands",
      `The \`commands\` object provides methods to interact with the Minecraft command system in Lua.
    
You can use it to run commands, check command blocks, and more.`
    );
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "exec",
        documentation: new vscode.MarkdownString(`Executes a Minecraft command.
              
              **Usage:** \`commands.exec(command: string)\`
              - **command**: The Minecraft command to run as a string.
              
              **Returns:** A boolean indicating success, and a table with the command's result.`),
        detail: "commands.exec(command: string): [boolean, table]",
        parameters: ["command: string"],
      },
      {
        label: "execAsync",
        documentation:
          new vscode.MarkdownString(`Asynchronously executes a Minecraft command.
              
              **Usage:** \`commands.execAsync(command: string)\`
              - **command**: The Minecraft command to run as a string.
              
              **Returns:** A task ID, which can be used to query for results later.`),
        detail: "commands.execAsync(command: string): number",
        parameters: ["command: string"],
      },
      {
        label: "list",
        documentation:
          new vscode.MarkdownString(`Lists all available Minecraft commands.
              
              **Usage:** \`commands.list()\`
              - Returns a list of available commands as strings.`),
        detail: "commands.list(): string[]",
        parameters: [],
      },
      {
        label: "getBlockPosition",
        documentation:
          new vscode.MarkdownString(`Gets the block position of the command computer.
              
              **Usage:** \`commands.getBlockPosition()\`
              - Returns: The position as a table with x, y, z keys.`),
        detail:
          "commands.getBlockPosition(): {x: number, y: number, z: number}",
        parameters: [],
      },
      {
        label: "getBlockInfos",
        documentation:
          new vscode.MarkdownString(`Gets information about a block at a specific position.
              
              **Usage:** \`commands.getBlockInfos(x: number, y: number, z: number)\`
              - **x, y, z**: The block coordinates as numbers.
              
              **Returns:** Information about the block as a table.`),
        detail:
          "commands.getBlockInfos(x: number, y: number, z: number): table",
        parameters: ["x: number", "y: number", "z: number"],
      },
    ];
  }
}
