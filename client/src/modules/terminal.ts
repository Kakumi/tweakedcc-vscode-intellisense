import * as vscode from 'vscode';

export const termObject = new vscode.CompletionItem('term', vscode.CompletionItemKind.Module);
termObject.documentation = new vscode.MarkdownString(`The \`term\` object provides methods to interact with the terminal display in Lua.
    
You can use it to write text, change colors, move the cursor, and more.`);

const termMethods = [
    {
        label: 'write',
        documentation: new vscode.MarkdownString(`Writes text to the terminal at the current cursor position.
        
        **Usage:** \`term.write(text: string)\`
        - **text**: The string to write to the terminal.`),
        detail: 'term.write(text: string): void',
        parameters: ['text: string']
    },
    {
        label: 'clear',
        documentation: new vscode.MarkdownString(`Clears the terminal screen.
        
        **Usage:** \`term.clear()\`
        - This function clears the terminal display.`),
        detail: 'term.clear(): void',
        parameters: []
    },
    {
        label: 'clearLine',
        documentation: new vscode.MarkdownString(`Clears the current line of the terminal.
        
        **Usage:** \`term.clearLine()\`
        - This function clears only the line where the cursor is currently positioned.`),
        detail: 'term.clearLine(): void',
        parameters: []
    },
    {
        label: 'setCursorPos',
        documentation: new vscode.MarkdownString(`Moves the cursor to a specified position.
        
        **Usage:** \`term.setCursorPos(x: number, y: number)\`
        - **x**: The new X position (1-based).
        - **y**: The new Y position (1-based).`),
        detail: 'term.setCursorPos(x: number, y: number): void',
        parameters: ['x: number', 'y: number']
    },
    {
        label: 'getCursorPos',
        documentation: new vscode.MarkdownString(`Gets the current cursor position.
        
        **Usage:** \`term.getCursorPos()\`
        - Returns: A tuple of two numbers representing the current X and Y position of the cursor.`),
        detail: 'term.getCursorPos(): [number, number]',
        parameters: []
    },
    {
        label: 'scroll',
        documentation: new vscode.MarkdownString(`Scrolls the terminal display.
        
        **Usage:** \`term.scroll(n: number)\`
        - **n**: The number of lines to scroll. Positive values scroll down, and negative values scroll up.`),
        detail: 'term.scroll(n: number): void',
        parameters: ['n: number']
    },
    {
        label: 'setTextColor',
        documentation: new vscode.MarkdownString(`Sets the text color of the terminal.
        
        **Usage:** \`term.setTextColor(color: number)\`
        - **color**: A color from the color palette, as an integer.`),
        detail: 'term.setTextColor(color: number): void',
        parameters: ['color: number']
    },
    {
        label: 'getTextColor',
        documentation: new vscode.MarkdownString(`Gets the current text color of the terminal.
        
        **Usage:** \`term.getTextColor()\`
        - Returns: The current text color as an integer.`),
        detail: 'term.getTextColor(): number',
        parameters: []
    },
    {
        label: 'setBackgroundColor',
        documentation: new vscode.MarkdownString(`Sets the background color of the terminal.
        
        **Usage:** \`term.setBackgroundColor(color: number)\`
        - **color**: A color from the color palette, as an integer.`),
        detail: 'term.setBackgroundColor(color: number): void',
        parameters: ['color: number']
    },
    {
        label: 'getBackgroundColor',
        documentation: new vscode.MarkdownString(`Gets the current background color of the terminal.
        
        **Usage:** \`term.getBackgroundColor()\`
        - Returns: The current background color as an integer.`),
        detail: 'term.getBackgroundColor(): number',
        parameters: []
    }
];

export function getTermProviders() {
    const provider1 = vscode.languages.registerCompletionItemProvider(
        { language: 'lua', scheme: 'file' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                
                // Show methods only if the line starts with 'term.'
                const regex = /.*term.*\.$/i;
                if (!linePrefix.endsWith('term.') && !regex.test(linePrefix)) {
                    return undefined;
                }

                const completionItems = termMethods.map(method => {
                    const item = new vscode.CompletionItem(method.label, vscode.CompletionItemKind.Method);
                    item.documentation = method.documentation;
                    item.detail = method.detail;
                    return item;
                });

                return completionItems;
            }
        },
        '.'
    );

    const provider2 = vscode.languages.registerSignatureHelpProvider(
        { language: 'lua', scheme: 'file' },
        {
            provideSignatureHelp(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                
                // Check if we are inside a term method call
                const methodMatch = linePrefix.match(/term\.(\w+)\(/);
                if (!methodMatch) {
                    return undefined;
                }
    
                const methodName = methodMatch[1];
                const method = termMethods.find(m => m.label === methodName);
    
                if (!method) {
                    return undefined;
                }
    
                const signature = new vscode.SignatureInformation(method.detail, method.documentation);
                signature.parameters = method.parameters.map(param => new vscode.ParameterInformation(param));
    
                const signatureHelp = new vscode.SignatureHelp();
                signatureHelp.signatures = [signature];
                signatureHelp.activeSignature = 0;
                signatureHelp.activeParameter = 0;
    
                return signatureHelp;
            }
        },
        '(', ','
    );

    return [provider1, provider2];
}