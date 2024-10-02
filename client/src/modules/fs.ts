import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class FsModule extends BaseModule {
  constructor() {
    super(
      "fs",
      `The \`fs\` object provides methods to interact with the filesystem in Lua.
    
You can use it to read and write files, list directories, get file attributes, and more.`
    );
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "list",
        documentation:
          new vscode.MarkdownString(`Lists all files in a directory.
              
              **Usage:** \`fs.list(path: string)\`
              - **path**: The directory path to list.
              
              **Returns:** A table of filenames as strings.`),
        detail: "fs.list(path: string): string[]",
        parameters: ["path: string"],
      },
      {
        label: "exists",
        documentation:
          new vscode.MarkdownString(`Checks if a file or directory exists.
              
              **Usage:** \`fs.exists(path: string)\`
              - **path**: The file or directory path to check.
              
              **Returns:** \`true\` if the file or directory exists, \`false\` otherwise.`),
        detail: "fs.exists(path: string): boolean",
        parameters: ["path: string"],
      },
      {
        label: "isDir",
        documentation:
          new vscode.MarkdownString(`Checks if a given path is a directory.
              
              **Usage:** \`fs.isDir(path: string)\`
              - **path**: The directory path to check.
              
              **Returns:** \`true\` if the path is a directory, \`false\` otherwise.`),
        detail: "fs.isDir(path: string): boolean",
        parameters: ["path: string"],
      },
      {
        label: "getSize",
        documentation:
          new vscode.MarkdownString(`Gets the size of a file in bytes.
              
              **Usage:** \`fs.getSize(path: string)\`
              - **path**: The file path.
              
              **Returns:** The size of the file as a number.`),
        detail: "fs.getSize(path: string): number",
        parameters: ["path: string"],
      },
      {
        label: "move",
        documentation:
          new vscode.MarkdownString(`Moves a file or directory from one location to another.
              
              **Usage:** \`fs.move(fromPath: string, toPath: string)\`
              - **fromPath**: The current location of the file or directory.
              - **toPath**: The destination location.
              
              **Returns:** \`true\` if the move was successful.`),
        detail: "fs.move(fromPath: string, toPath: string): boolean",
        parameters: ["fromPath: string", "toPath: string"],
      },
      {
        label: "copy",
        documentation:
          new vscode.MarkdownString(`Copies a file or directory from one location to another.
              
              **Usage:** \`fs.copy(fromPath: string, toPath: string)\`
              - **fromPath**: The source file or directory.
              - **toPath**: The destination location.
              
              **Returns:** \`true\` if the copy was successful.`),
        detail: "fs.copy(fromPath: string, toPath: string): boolean",
        parameters: ["fromPath: string", "toPath: string"],
      },
      {
        label: "delete",
        documentation: new vscode.MarkdownString(`Deletes a file or directory.
              
              **Usage:** \`fs.delete(path: string)\`
              - **path**: The file or directory to delete.`),
        detail: "fs.delete(path: string): void",
        parameters: ["path: string"],
      },
      {
        label: "open",
        documentation:
          new vscode.MarkdownString(`Opens a file for reading or writing.
              
              **Usage:** \`fs.open(path: string, mode: string)\`
              - **path**: The file to open.
              - **mode**: The mode to open the file in ("r" for read, "w" for write, etc.).
              
              **Returns:** A file handle, or \`nil\` if the file could not be opened.`),
        detail: "fs.open(path: string, mode: string): FileHandle | null",
        parameters: ["path: string", "mode: string"],
      },
      {
        label: "getDrive",
        documentation:
          new vscode.MarkdownString(`Gets the name of the drive that contains the given path.
              
              **Usage:** \`fs.getDrive(path: string)\`
              - **path**: The file or directory path.
              
              **Returns:** The name of the drive as a string, or \`nil\` if the path does not exist.`),
        detail: "fs.getDrive(path: string): string | null",
        parameters: ["path: string"],
      },
      {
        label: "attributes",
        documentation:
          new vscode.MarkdownString(`Gets attributes of a file or directory.
              
              **Usage:** \`fs.attributes(path: string)\`
              - **path**: The file or directory path.
              
              **Returns:** A table with the file's size, whether it's a directory, and the time of its last modification.`),
        detail:
          "fs.attributes(path: string): { size: number, isDir: boolean, modification: number }",
        parameters: ["path: string"],
      },
    ];
  }
}
