import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class DiskModule extends BaseModule {
  constructor() {
    super(
      "disk",
      `The \`disk\` object provides methods to interact with disk drives in Lua.
    
You can use it to get the contents of a disk, eject it, or check if a disk is present.`
    );
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "isPresent",
        documentation:
          new vscode.MarkdownString(`Checks if a disk is present in the specified side.
              
              **Usage:** \`disk.isPresent(side: string)\`
              - **side**: The side of the computer to check (e.g., "left", "right").
              
              **Returns:** A boolean indicating if a disk is present.`),
        detail: "disk.isPresent(side: string): boolean",
        parameters: ["side: string"],
      },
      {
        label: "getLabel",
        documentation:
          new vscode.MarkdownString(`Gets the label of the disk in the specified drive.
              
              **Usage:** \`disk.getLabel(side: string)\`
              - **side**: The side where the disk drive is located.
              
              **Returns:** The label of the disk as a string, or \`nil\` if there is no label.`),
        detail: "disk.getLabel(side: string): string | null",
        parameters: ["side: string"],
      },
      {
        label: "setLabel",
        documentation:
          new vscode.MarkdownString(`Sets the label of the disk in the specified drive.
              
              **Usage:** \`disk.setLabel(side: string, label: string)\`
              - **side**: The side where the disk drive is located.
              - **label**: The new label to assign to the disk.
              
              **Returns:** \`true\` if the label was successfully set.`),
        detail: "disk.setLabel(side: string, label: string): boolean",
        parameters: ["side: string", "label: string"],
      },
      {
        label: "hasData",
        documentation:
          new vscode.MarkdownString(`Checks if the disk in the specified drive contains data.
              
              **Usage:** \`disk.hasData(side: string)\`
              - **side**: The side where the disk drive is located.
              
              **Returns:** \`true\` if the disk contains data, \`false\` otherwise.`),
        detail: "disk.hasData(side: string): boolean",
        parameters: ["side: string"],
      },
      {
        label: "getMountPath",
        documentation:
          new vscode.MarkdownString(`Gets the path where the disk in the specified drive is mounted.
              
              **Usage:** \`disk.getMountPath(side: string)\`
              - **side**: The side where the disk drive is located.
              
              **Returns:** The path where the disk is mounted, or \`nil\` if the disk cannot be mounted.`),
        detail: "disk.getMountPath(side: string): string | null",
        parameters: ["side: string"],
      },
      {
        label: "eject",
        documentation:
          new vscode.MarkdownString(`Ejects the disk from the specified drive.
              
              **Usage:** \`disk.eject(side: string)\`
              - **side**: The side where the disk drive is located.
              
              **Returns:** \`true\` if the disk was successfully ejected, \`false\` otherwise.`),
        detail: "disk.eject(side: string): boolean",
        parameters: ["side: string"],
      },
      {
        label: "hasAudio",
        documentation:
          new vscode.MarkdownString(`Checks if the disk in the specified drive contains an audio track.
              
              **Usage:** \`disk.hasAudio(side: string)\`
              - **side**: The side where the disk drive is located.
              
              **Returns:** \`true\` if the disk contains audio, \`false\` otherwise.`),
        detail: "disk.hasAudio(side: string): boolean",
        parameters: ["side: string"],
      },
      {
        label: "playAudio",
        documentation:
          new vscode.MarkdownString(`Plays the audio track from the disk in the specified drive.
              
              **Usage:** \`disk.playAudio(side: string)\`
              - **side**: The side where the disk drive is located.`),
        detail: "disk.playAudio(side: string): void",
        parameters: ["side: string"],
      },
      {
        label: "stopAudio",
        documentation:
          new vscode.MarkdownString(`Stops the audio track from the disk in the specified drive.
              
              **Usage:** \`disk.stopAudio(side: string)\`
              - **side**: The side where the disk drive is located.`),
        detail: "disk.stopAudio(side: string): void",
        parameters: ["side: string"],
      },
      {
        label: "getAudioTitle",
        documentation:
          new vscode.MarkdownString(`Gets the title of the audio track from the disk in the specified drive.
              
              **Usage:** \`disk.getAudioTitle(side: string)\`
              - **side**: The side where the disk drive is located.
              
              **Returns:** The title of the audio track as a string, or \`nil\` if no audio is present.`),
        detail: "disk.getAudioTitle(side: string): string | null",
        parameters: ["side: string"],
      },
    ];
  }
}
