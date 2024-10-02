import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class ColorsModule extends BaseModule {
  constructor() {
    super(
      "colors",
      `Constants and functions for colour values, suitable for working with term and redstone.`
    );
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "white",
        documentation: new vscode.MarkdownString(`#F0F0F0`),
        detail: "colors.white",
        parameters: [],
      },
      {
        label: "orange",
        documentation: new vscode.MarkdownString(`#F2B233`),
        detail: "colors.orange",
        parameters: [],
      },
      {
        label: "magenta",
        documentation: new vscode.MarkdownString(`#E57FD8`),
        detail: "colors.magenta",
        parameters: [],
      },
      {
        label: "lightBlue",
        documentation: new vscode.MarkdownString(`#99B2F2`),
        detail: "colors.lightBlue",
        parameters: [],
      },
      {
        label: "yellow",
        documentation: new vscode.MarkdownString(`#DEDE6C`),
        detail: "colors.yellow",
        parameters: [],
      },
      {
        label: "lime",
        documentation: new vscode.MarkdownString(`#7FCC19`),
        detail: "colors.lime",
        parameters: [],
      },
      {
        label: "pink",
        documentation: new vscode.MarkdownString(`#F2B2CC`),
        detail: "colors.pink",
        parameters: [],
      },
      {
        label: "gray",
        documentation: new vscode.MarkdownString(`#4C4C4C`),
        detail: "colors.gray",
        parameters: [],
      },
      {
        label: "lightGray",
        documentation: new vscode.MarkdownString(`#999999`),
        detail: "colors.lightGray",
        parameters: [],
      },
      {
        label: "cyan",
        documentation: new vscode.MarkdownString(`#4C99B2`),
        detail: "colors.cyan",
        parameters: [],
      },
      {
        label: "purple",
        documentation: new vscode.MarkdownString(`#B266E5`),
        detail: "colors.purple",
        parameters: [],
      },
      {
        label: "blue",
        documentation: new vscode.MarkdownString(`#3366CC`),
        detail: "colors.blue",
        parameters: [],
      },
      {
        label: "brown",
        documentation: new vscode.MarkdownString(`#7F664C`),
        detail: "colors.brown",
        parameters: [],
      },
      {
        label: "green",
        documentation: new vscode.MarkdownString(`#57A64E`),
        detail: "colors.green",
        parameters: [],
      },
      {
        label: "red",
        documentation: new vscode.MarkdownString(`#CC4C4C`),
        detail: "colors.red",
        parameters: [],
      },
      {
        label: "black",
        documentation: new vscode.MarkdownString(`#111111`),
        detail: "colors.black",
        parameters: [],
      },
      {
        label: "combine",
        documentation:
          new vscode.MarkdownString(`Combines a set of colors (or sets of colors) into a larger set. Useful for Bundled Cables.
                
                **Usage:** \`colors.combine(colors.white, colors.magenta, colours.lightBlue)\``),
        detail: "colors.combine(color1: color, color2: color, ...)",
        parameters: ["color1: color", "color2: color"],
      },
      {
        label: "substract",
        documentation:
          new vscode.MarkdownString(`Removes one or more colors (or sets of colors) from an initial set. Useful for Bundled Cables.
                
                **Usage:** \`colours.subtract(colours.lime, colours.orange, colours.white)\``),
        detail: "colors.substract(color: color, color1: color, ...)",
        parameters: ["color: color", "color1: color"],
      },
      {
        label: "test",
        documentation:
          new vscode.MarkdownString(`Tests whether color is contained within colors. Useful for Bundled Cables.
                
                **Usage:** \`colors.test(colors.combine(colors.white, colors.magenta, colours.lightBlue), colors.lightBlue)\``),
        detail: "colors.test(colors: color[], color: color)",
        parameters: ["colors: color[]", "color: color"],
      },
      {
        label: "packRGB",
        documentation:
          new vscode.MarkdownString(`Combine a three-colour RGB value into one hexadecimal representation.
                
                **Usage:** \`colors.packRGB(0.7, 0.2, 0.6)\``),
        detail: "colors.packRGB(r: number, g: number, b: number)",
        parameters: ["r: number", "g: number", "b: number"],
      },
      {
        label: "unpackRGB",
        documentation:
          new vscode.MarkdownString(`Separate a hexadecimal RGB colour into its three constituent channels.
                
                **Usage:** \`colors.unpackRGB(0xb23399)\``),
        detail: "colors.unpackRGB(rgb: number)",
        parameters: ["rgb: number"],
      },
      {
        label: "toBlit",
        documentation:
          new vscode.MarkdownString(`Converts the given color to a paint/blit hex character (0-9a-f).
                
                **Usage:** \`colors.toBlit(colors.red)\``),
        detail: "colors.toBlit(color: color)",
        parameters: ["color: color"],
      },
      {
        label: "fromBlit",
        documentation:
          new vscode.MarkdownString(`Converts the given paint/blit hex character (0-9a-f) to a color.
                
                **Usage:** \`colors.fromBlit("e")\``),
        detail: "colors.fromBlit(hex: string)",
        parameters: ["hex: string"],
      },
    ];
  }
}
