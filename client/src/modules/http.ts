import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class HttpModule extends BaseModule {
  constructor() {
    super(
      "http",
      `The \`http\` object provides methods for sending HTTP requests and handling responses in Lua.
    
It allows you to interact with web APIs and download content over the web.`
    );
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "get",
        documentation:
          new vscode.MarkdownString(`Sends an HTTP GET request to the specified URL.
			  
			  **Usage:** \`http.get(url: string, [headers: table])\`
			  - **url**: The URL to send the request to.
			  - **headers**: Optional table of headers to include in the request.
			  
			  **Returns:** A response handle or \`nil\` if the request failed.`),
        detail: "http.get(url: string, headers?: table): HTTPResponse | null",
        parameters: ["url: string", "headers?: table"],
      },
      {
        label: "post",
        documentation:
          new vscode.MarkdownString(`Sends an HTTP POST request to the specified URL.
			  
			  **Usage:** \`http.post(url: string, body: string | table, [headers: table])\`
			  - **url**: The URL to send the request to.
			  - **body**: The data to send in the body of the POST request.
			  - **headers**: Optional table of headers to include in the request.
			  
			  **Returns:** A response handle or \`nil\` if the request failed.`),
        detail:
          "http.post(url: string, body: string | table, headers?: table): HTTPResponse | null",
        parameters: ["url: string", "body: string | table", "headers?: table"],
      },
      {
        label: "checkURL",
        documentation:
          new vscode.MarkdownString(`Checks if the specified URL is valid and reachable.
			  
			  **Usage:** \`http.checkURL(url: string)\`
			  - **url**: The URL to check.
			  
			  **Returns:** \`true\` if the URL is valid and reachable, \`false\` otherwise.`),
        detail: "http.checkURL(url: string): boolean",
        parameters: ["url: string"],
      },
      {
        label: "request",
        documentation:
          new vscode.MarkdownString(`Sends a custom HTTP request (with any method) to the specified URL.
			  
			  **Usage:** \`http.request(url: string, [body: string | table], [headers: table], [method: string])\`
			  - **url**: The URL to send the request to.
			  - **body**: Optional data to send in the request body.
			  - **headers**: Optional table of headers to include in the request.
			  - **method**: Optional HTTP method (e.g., \`GET\`, \`POST\`, etc.). Default is \`GET\`.
			  
			  **Returns:** A response handle or \`nil\` if the request failed.`),
        detail:
          "http.request(url: string, body?: string | table, headers?: table, method?: string): HTTPResponse | null",
        parameters: [
          "url: string",
          "body?: string | table",
          "headers?: table",
          "method?: string",
        ],
      },
    ];
  }
}
