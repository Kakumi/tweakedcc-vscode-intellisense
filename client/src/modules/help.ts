import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class helpModule extends BaseModule {
  constructor() {
    super(`help`, `Find help files on the current computer.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"path","detail":"path(): string","parameters":[],"documentation":"Returns a colon-separated list of directories where help files are searched\nfor. All directories are absolute.\n\n**Returns:**\n- string The current help search path, separated by colons."},{"label":"setPath","detail":"setPath(newPath: string): void","parameters":["newPath: string"],"documentation":"Sets the colon-separated list of directories where help files are searched\nfor to newPath\n\n**Parameters:**\n- **newPath: string** The new path to use.\n\n**Usage:**\n\nhelp.setPath( \"/disk/help/\" )\n\n```\n\nhelp.setPath( help.path() .. \":/myfolder/help/\" )\n\n```"},{"label":"lookup","detail":"lookup(topic: string): string | cannot","parameters":["topic: string"],"documentation":"Returns the location of the help file for the given topic.\n\n**Parameters:**\n- **topic: string** The topic to find\n\n**Returns:**\n- string | nil The path to the given topic's help file, or nil if it\n- cannot be found.\n\n**Usage:**\n\nhelp.lookup(\"disk\")"},{"label":"topics","detail":"topics(): table","parameters":[],"documentation":"Returns a list of topics that can be looked up and/or displayed.\n\n**Returns:**\n- table A list of topics in alphabetical order.\n\n**Usage:**\n\nhelp.topics()"},{"label":"completeTopic","detail":"completeTopic(prefix: string): table","parameters":["prefix: string"],"documentation":"Returns a list of topic endings that match the prefix. Can be used with\nread to allow input of a help topic.\n\n**Parameters:**\n- **prefix: string** The prefix to match\n\n**Returns:**\n- table A list of matching topics."}];
  }
}
