import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class GpsModule extends BaseModule {
  constructor() {
    super(
      "gps",
      `The \`gps\` object provides methods for determining the relative position of a computer using wireless modems.
    
It can be used to obtain the location of the device by triangulating signals from other computers acting as GPS hosts.`
    );
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "locate",
        documentation:
          new vscode.MarkdownString(`Gets the current coordinates of the computer using GPS.
              
              **Usage:** \`gps.locate([timeout: number], [debug: boolean])\`
              - **timeout**: The maximum time (in seconds) to wait for a response. Default is \`2\`.
              - **debug**: When \`true\`, prints debug information.
              
              **Returns:** The current X, Y, Z coordinates as three numbers, or \`nil\` if the position could not be determined.`),
        detail:
          "gps.locate(timeout?: number, debug?: boolean): [number, number, number] | null",
        parameters: ["timeout?: number", "debug?: boolean"],
      },
      {
        label: "host",
        documentation:
          new vscode.MarkdownString(`Turns the current computer into a GPS host.
              
              **Usage:** \`gps.host()\`
              - This function allows the computer to act as a GPS host by sending periodic signals to nearby computers. Other computers can use this host to determine their position.`),
        detail: "gps.host(): void",
        parameters: [],
      },
      {
        label: "stopHost",
        documentation:
          new vscode.MarkdownString(`Stops the current computer from acting as a GPS host.
              
              **Usage:** \`gps.stopHost()\`
              - This function halts the computer's GPS hosting, ceasing all outgoing GPS signals.`),
        detail: "gps.stopHost(): void",
        parameters: [],
      },
    ];
  }
}
