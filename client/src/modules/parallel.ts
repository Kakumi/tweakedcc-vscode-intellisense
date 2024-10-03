import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class parallelModule extends BaseModule {
  constructor() {
    super(`parallel`, `A simple way to run several functions at once.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"waitForAny","detail":"waitForAny(... function The functions this task will run): void","parameters":["... function The functions this task will run"],"documentation":"Switches between execution of the functions, until any of them\nfinishes. If any of the functions errors, the message is propagated upwards\nfrom the parallel.waitForAny call.\n\n**Parameters:**\n- ... function The functions this task will run\n\n**Usage:**\n\nPrint a message every second until the q key is pressed.\n\n```\n\nlocal function tick()\n\n    while true do\n\n        os.sleep(1)\n\n        print(\"Tick\")\n\n    end\n\nend\n\nlocal function wait_for_q()\n\n    repeat\n\n        local _, key = os.pullEvent(\"key\")\n\n    until key == keys.q\n\n    print(\"Q was pressed!\")\n\nend\n\n\n\nparallel.waitForAny(tick, wait_for_q)\n\nprint(\"Everything done!\")\n\n```"},{"label":"waitForAll","detail":"waitForAll(... function The functions this task will run): void","parameters":["... function The functions this task will run"],"documentation":"Switches between execution of the functions, until all of them are\nfinished. If any of the functions errors, the message is propagated upwards\nfrom the parallel.waitForAll call.\n\n**Parameters:**\n- ... function The functions this task will run\n\n**Usage:**\n\nStart off two timers and wait for them both to run.\n\n```\n\nlocal function a()\n\n    os.sleep(1)\n\n    print(\"A is done\")\n\nend\n\nlocal function b()\n\n    os.sleep(3)\n\n    print(\"B is done\")\n\nend\n\n\n\nparallel.waitForAll(a, b)\n\nprint(\"Everything done!\")\n\n```"}];
  }
}
