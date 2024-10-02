import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class HelpModule extends BaseModule {
  constructor() {
    super(
      "help",
      `The \`help\` object provides methods to access and manage the help system in Lua.
    
It allows you to retrieve help topics and search for terms.`
    );
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "lookup",
        documentation:
          new vscode.MarkdownString(`Retrieves the help text for a specific topic.
				  
				  **Usage:** \`help.lookup(topic: string)\`
				  - **topic**: The name of the topic to look up.
				  
				  **Returns:** The help text as a string, or \`nil\` if no help is available for the given topic.`),
        detail: "help.lookup(topic: string): string | null",
        parameters: ["topic: string"],
      },
      {
        label: "path",
        documentation:
          new vscode.MarkdownString(`Gets the current help path, which is a list of directories that contain help files.
				  
				  **Usage:** \`help.path()\`
				  - This function returns a list of directories where help topics are stored.`),
        detail: "help.path(): string[]",
        parameters: [],
      },
      {
        label: "topics",
        documentation:
          new vscode.MarkdownString(`Lists all available help topics.
				  
				  **Usage:** \`help.topics()\`
				  - Returns an array of all available help topics as strings.`),
        detail: "help.topics(): string[]",
        parameters: [],
      },
    ];
  }
}
