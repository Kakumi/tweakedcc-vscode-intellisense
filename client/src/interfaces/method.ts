import * as vscode from "vscode";

export interface Method {
  label: string;
  documentation: vscode.MarkdownString;
  detail: string;
  parameters: string[];
}
