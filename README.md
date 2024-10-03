# CC:Tweaked IntelliSense

VSCode Extension to support IntelliSense for [CC:Tweaked](https://tweaked.cc) (previously [ComputerCraft](https://github.com/dan200/ComputerCraft))
This project used [LSP Example](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample) and [vscode-lua](https://github.com/trixnz/vscode-lua).

## Functionality

This Language Server works for lua file. It has the following language features:

- Completions
- Diagnostics regenerated on each file change or configuration change
- Export LUA to Pastebin

## Upload to Pastebin

First, open your LUA file.

Then, execute the command palette with `CTRL + Shift + P` then write `Upload to Pastebin`. The first time you execute this command you will ask your Pastebin API Key. Get your for free at [Pastebin Developers API](https://pastebin.com/doc_api?ref=wolfwithsword.com) (Section 'Your Unique Developer API Key').

Now, a message box will appears with the pastebin URL and there is a button next to it to copy it to clipboard.

## Structure

```
.
├── client // Language Client
│   ├── src
│   │   ├── test // End to End tests for Language Client / Server
│   │   └── extension.ts // Language Client entry point
├── package.json // The extension manifest.
└── server // Language Server
    └── src
        └── server.ts // Language Server entry point
```

## Running the Sample

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to start compiling the client and server in [watch mode](https://code.visualstudio.com/docs/editor/tasks#:~:text=The%20first%20entry%20executes,the%20HelloWorld.js%20file.).
- Switch to the Run and Debug View in the Sidebar (Ctrl+Shift+D).
- Select `Launch Client` from the drop down (if it is not already).
- Press ▷ to run the launch config (F5).
- Select a .lua file and start coding !
