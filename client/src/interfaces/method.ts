import * as vscode from "vscode";

export interface Method {
  label: string;
  documentation: string | vscode.MarkdownString;
  detail: string;
  parameters: string[];
}
