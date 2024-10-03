import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class cc_image_nftModule extends BaseModule {
  constructor() {
    super(`cc_image_nft`, `Read and draw nft ("Nitrogen Fingers Text") images.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"parse","detail":"parse(image: string): table","parameters":["image: string"],"documentation":"Parse an nft image from a string.\n\n**Parameters:**\n- **image: string** The image contents.\n\n**Returns:**\n- table The parsed image."},{"label":"load","detail":"load(path: string): table | nil | string | loaded.","parameters":["path: string"],"documentation":"Load an nft image from a file.\n\n**Parameters:**\n- **path: string** The file to load.\n\n**Returns:**\n- table The parsed image.\n- nil If the file does not exist or could not be loaded.\n- string An error message explaining why the file could not be\n- loaded."},{"label":"draw","detail":"draw(image: table, xPos: number, yPos: number, target?: term): void","parameters":["image: table","xPos: number","yPos: number","target?: term"],"documentation":"Draw an nft image to the screen.\n\n**Parameters:**\n- **image: table** An image, as returned from load or parse.\n- **xPos: number** The x position to start drawing at.\n- **yPos: number** The y position to start drawing at.\n- **target?: term**.Redirect The terminal redirect to draw to. Defaults to the\ncurrent terminal."}];
  }
}
