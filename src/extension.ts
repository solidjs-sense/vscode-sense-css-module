// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { resolve } from 'path';
import path = require('path');
import * as vscode from 'vscode';
import * as lsp from 'vscode-languageclient/node';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration("sense-css-module");
	const isEnable = config.get<boolean>("enable", false);
	// extension is disable
	if (!isEnable) {
	  return;
	}
	// The server is implemented in node
	let serverModule = context.asAbsolutePath(path.join("dist", "server"));
  
	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: lsp.ServerOptions = {
	  run: {
		module: serverModule,
		transport: lsp.TransportKind.ipc,
	  },
	  debug: {
		module: serverModule,
		transport: lsp.TransportKind.ipc,
	  },
	};
  
	const globalStyleFiles = config.get<string[]>("global-style-files", []);
  
	// Options to control the language client
	let clientOptions: lsp.LanguageClientOptions = {
	  documentSelector: [
		"javascriptreact",
		"javascript.jsx",
		"typescriptreact",
		"typescript.tsx",
		"css",
		"scss",
		"less",
	  ],
	  initializationOptions: {
		"global-style-files": globalStyleFiles,
	  },
	};
  
	// Create the language client and start the client.
	let client = new lsp.LanguageClient(
	  "sense-css-module",
	  "sense-css-module language server",
	  serverOptions,
	  clientOptions
	);
  
    client.start();
  
}

// This method is called when your extension is deactivated
export function deactivate() {}
