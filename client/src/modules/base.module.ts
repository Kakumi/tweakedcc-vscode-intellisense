import * as vscode from "vscode";
import { Method } from "../interfaces/method";

export default abstract class BaseModule {
  constructor(private readonly key: string, private readonly desc: string) {}

  public getBaseCompletion() {
    const object = new vscode.CompletionItem(
      this.key,
      vscode.CompletionItemKind.Module
    );
    object.documentation = new vscode.MarkdownString(this.desc);

    return object;
  }

  protected abstract getMethods(): Method[];

  public getProviders() {
    const key = this.key;
    const methods = this.getMethods();

    const provider1 = vscode.languages.registerCompletionItemProvider(
      { language: "lua", scheme: "file" },
      {
        provideCompletionItems(
          document: vscode.TextDocument,
          position: vscode.Position
        ) {
          const linePrefix = document
            .lineAt(position)
            .text.substr(0, position.character);

          // Show methods only if the line starts with <key>.
          const regex = new RegExp(String.raw`.*${key}.*\.$`, "i");
          if (!linePrefix.endsWith(key + ".") && !regex.test(linePrefix)) {
            return undefined;
          }

          const completionItems = methods.map((method) => {
            const item = new vscode.CompletionItem(
              method.label,
              vscode.CompletionItemKind.Method
            );
            if (method.documentation instanceof vscode.MarkdownString) {
              item.documentation = method.documentation;
            } else {
              item.documentation = new vscode.MarkdownString(
                method.documentation
              );
            }
            item.detail = method.detail;
            return item;
          });

          return completionItems;
        },
      },
      "."
    );

    const provider2 = vscode.languages.registerSignatureHelpProvider(
      { language: "lua", scheme: "file" },
      {
        provideSignatureHelp(
          document: vscode.TextDocument,
          position: vscode.Position
        ) {
          const linePrefix = document
            .lineAt(position)
            .text.substr(0, position.character);

          // Check if we are inside a io method call
          //help\.(\w+)\(
          const regex = new RegExp(String.raw`${key}\.(\w+)\(`);
          const methodMatch = linePrefix.match(regex);
          if (!methodMatch) {
            return undefined;
          }

          const methodName = methodMatch[1];
          const method = methods.find((m) => m.label === methodName);

          if (!method) {
            return undefined;
          }

          const signature = new vscode.SignatureInformation(
            method.detail,
            method.documentation
          );
          signature.parameters = method.parameters.map(
            (param) => new vscode.ParameterInformation(param)
          );

          const signatureHelp = new vscode.SignatureHelp();
          signatureHelp.signatures = [signature];
          signatureHelp.activeSignature = 0;
          signatureHelp.activeParameter = 0;

          return signatureHelp;
        },
      },
      "(",
      ","
    );

    return [provider1, provider2];
  }
}
