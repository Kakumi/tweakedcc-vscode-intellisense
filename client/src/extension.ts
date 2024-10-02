import * as vscode from 'vscode';
import { getTermProviders, termObject } from './modules/terminal';
import { colorsObject, getColorsProviders } from './modules/colors';
import { URLSearchParams } from 'node:url';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
  } from 'vscode-languageclient/node';
import path from 'path';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    startLanguageServer(context);

    const pastebinCommand = createUploadPastebinCommand(context);

    context.subscriptions.push(pastebinCommand);

	const runCommand = vscode.commands.registerCommand('tweaked-cc-intellisense.run', () => {
		vscode.window.showInformationMessage('Tweaked:CC IntelliSense is now active.');
	});

    const termProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'lua', scheme: 'file' },
        {
            provideCompletionItems() {
                // Provide only the term object when no dot is typed
                return [termObject, colorsObject];
            }
        }
    );

    context.subscriptions.push(runCommand, termProvider, ...getTermProviders(), ...getColorsProviders());
}

export function deactivate() {}

function startLanguageServer(context: vscode.ExtensionContext) {
    const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));

    const debugOptions = {
        execArgv: ['--nolazy', '--inspect=6009'], env: {
            NODE_ENV: 'development'
        }
    };

    const runOptions = {
        env: {
            NODE_ENV: 'production'
        }
    };

    let serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc, options: runOptions },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            // The current version of node shipped with VSCode Insiders (as of April 3 2017) seems to have an issue with
            // --inspect debugging, so we'll assume that someone debugging the extension has a recent version of node on
            // on their PATH.
            // If you do not, comment this line out and replace the --inspect above with --debug.
            runtime: 'node',
            options: debugOptions
        }
    };

    const serverCommand = vscode.workspace.getConfiguration().get('lua.server.command') as string;
    if (serverCommand) {
        const serverArgs = vscode.workspace.getConfiguration().get('lua.server.args') as string[];
        serverOptions = {
            command: serverCommand, args: serverArgs
        };
    }

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: [
            { language: 'lua', scheme: 'file' },
            { language: 'lua', scheme: 'untitled' }
        ],
        synchronize: {
            configurationSection: [
                'lua'
            ]
        }
    };

    // Create the language client and start the client.
    new LanguageClient('luaLanguageServer', 'Lua Language Server', serverOptions, clientOptions).start();
}

function createUploadPastebinCommand(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('tweakedcc-intellisense.uploadToPastebin', async function () {
        const apiKey = await getApiKey(context.secrets);
        if (!apiKey) return;
    
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          vscode.window.showErrorMessage('you need to open a lua file in the editor');
          return;
        }

        if (!editor.document.fileName.endsWith("lua")) {
            vscode.window.showErrorMessage('You can only upload lua file');
            return;
        }
    
        const content = editor.document.getText();
    
        try {
            const postData = {
                api_dev_key: apiKey,
                api_option: 'paste',
                api_paste_code: content,
                api_paste_expire_date: '10M',
                api_paste_format: 'lua',
                api_paste_private: '1',
                api_paste_name: path.basename(editor.document.fileName)
            };
    
            const response = await axios.post('https://pastebin.com/api/api_post.php', new URLSearchParams(postData));
            
            const action = await vscode.window.showInformationMessage(
                `Fichier uploadé : ${response.data}`, 
                'Copy'
            );

            if (action === 'Copy') {
                await vscode.env.clipboard.writeText(response.data);
                vscode.window.showInformationMessage('Pastebin URL copied to clipboard.');
            }
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage('Error while uploading file : ' + error.message);
        }
      });
}

async function getApiKey(secretStorage) {
    let apiKey = await secretStorage.get('pastebinApiKey');
    
    if (!apiKey) {
      apiKey = await vscode.window.showInputBox({
        prompt: 'Enter your Pastebin API Key',
        ignoreFocusOut: true,
        password: true
      });
      
      if (apiKey) {
        await secretStorage.store('pastebinApiKey', apiKey);
        vscode.window.showInformationMessage('Pastebin API Key saved.');
      } else {
        vscode.window.showErrorMessage('Pastebin API Key required to upload on Pastebin.');
        return null;
      }
    }
    
    return apiKey;
  }