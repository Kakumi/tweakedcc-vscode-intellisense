import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class IoModule extends BaseModule {
  constructor() {
    super(
      "io",
      `The \`io\` object provides methods for interacting with input and output, mainly for file handling.
    
It allows you to open, read, write, and manipulate files.`
    );
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "open",
        documentation:
          new vscode.MarkdownString(`Opens a file in the specified mode.
				  
				  **Usage:** \`io.open(filename: string, [mode: string])\`
				  - **filename**: The name of the file to open.
				  - **mode**: The mode to open the file in. Defaults to \`"r"\` (read mode).
				  
				  **Returns:** A file handle, or \`nil\` if the file cannot be opened.`),
        detail: "io.open(filename: string, mode?: string): file | null",
        parameters: ["filename: string", "mode?: string"],
      },
      {
        label: "input",
        documentation:
          new vscode.MarkdownString(`Sets the current input file or returns the current input file handle.
				  
				  **Usage:** \`io.input([file: file | string])\`
				  - **file**: The file or file name to set as the current input. If omitted, returns the current input file handle.`),
        detail: "io.input(file?: file | string): file",
        parameters: ["file?: file | string"],
      },
      {
        label: "output",
        documentation:
          new vscode.MarkdownString(`Sets the current output file or returns the current output file handle.
				  
				  **Usage:** \`io.output([file: file | string])\`
				  - **file**: The file or file name to set as the current output. If omitted, returns the current output file handle.`),
        detail: "io.output(file?: file | string): file",
        parameters: ["file?: file | string"],
      },
      {
        label: "read",
        documentation:
          new vscode.MarkdownString(`Reads from the current input file.
				  
				  **Usage:** \`io.read([format: string])\`
				  - **format**: The format of what to read (\`"*all"\`, \`"*line"\`, \`"*number"\`, etc.). Defaults to \`"*line"\` if omitted.
				  
				  **Returns:** The data read from the file in the specified format.`),
        detail: "io.read(format?: string): string | number | null",
        parameters: ["format?: string"],
      },
      {
        label: "write",
        documentation:
          new vscode.MarkdownString(`Writes to the current output file.
				  
				  **Usage:** \`io.write(...)\`
				  - Accepts multiple arguments of different types to write to the file.
				  
				  **Returns:** \`true\` on success, or \`nil\` on failure.`),
        detail: "io.write(...): boolean",
        parameters: ["..."],
      },
      {
        label: "flush",
        documentation:
          new vscode.MarkdownString(`Flushes the current output file, ensuring that all written data is saved.
				  
				  **Usage:** \`io.flush()\`
				  
				  **Returns:** \`true\` if the flush was successful, or \`nil\` on failure.`),
        detail: "io.flush(): boolean",
        parameters: [],
      },
      {
        label: "close",
        documentation:
          new vscode.MarkdownString(`Closes the current input or output file.
				  
				  **Usage:** \`io.close([file: file])\`
				  - **file**: The file handle to close. If omitted, closes the current file.
				  
				  **Returns:** \`true\` if the file was closed successfully, or \`nil\` on failure.`),
        detail: "io.close(file?: file): boolean",
        parameters: ["file?: file"],
      },
      {
        label: "type",
        documentation:
          new vscode.MarkdownString(`Returns the type of the provided file handle.
				  
				  **Usage:** \`io.type(file: file)\`
				  - **file**: The file handle to check.
				  
				  **Returns:** A string representing the type of the file handle (\`"file"\` or \`"closed file"\`).`),
        detail: "io.type(file: file): string",
        parameters: ["file: file"],
      },
    ];
  }
}
