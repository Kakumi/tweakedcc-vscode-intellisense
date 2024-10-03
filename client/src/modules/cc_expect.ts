import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class cc_expectModule extends BaseModule {
  constructor() {
    super(`cc_expect`, `The cc.expect library provides helper functions for verifying thatfunction arguments are well-formed and of the correct type.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"expect","detail":"expect(index: number, value  The argument's value., ... string The allowed types of the argument.): The","parameters":["index: number","value  The argument's value.","... string The allowed types of the argument."],"documentation":"Expect an argument to have a specific type.\n\n**Parameters:**\n- **index: number** The 1-based argument index.\n- value  The argument's value.\n- ... string The allowed types of the argument.\n\n**Returns:**\n- The given value."},{"label":"field","detail":"field(tbl: table, index: string, ... string The allowed types of the argument.): The","parameters":["tbl: table","index: string","... string The allowed types of the argument."],"documentation":"Expect an field to have a specific type.\n\n**Parameters:**\n- **tbl: table** The table to index.\n- **index: string** The field name to check.\n- ... string The allowed types of the argument.\n\n**Returns:**\n- The contents of the given field."},{"label":"range","detail":"range(num: number, min?: number, max?: number): The","parameters":["num: number","min?: number","max?: number"],"documentation":"Expect a number to be within a specific range.\n\n**Parameters:**\n- **num: number** The value to check.\n- **min?: number** = -math.huge The minimum value.\n- **max?: number** = math.huge The maximum value.\n\n**Returns:**\n- The given value."}];
  }
}
