import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class cc_audio_dfpwmModule extends BaseModule {
  constructor() {
    super(`cc_audio_dfpwm`, `Convert between streams of DFPWM audio data and a list of amplitudes.`);
  }

  protected getMethods(): Method[] {
    return [{"label":"make_encoder","detail":"make_encoder(): function(pcm:","parameters":[],"documentation":"Create a new encoder for converting PCM audio data into DFPWM.\n\n**Returns:**\n- function(pcm: { number... }):string The encoder function"},{"label":"encode","detail":"encode(input { number... } The table of amplitude data.): string","parameters":["input { number... } The table of amplitude data."],"documentation":"A convenience function for encoding a complete file of audio at once.\n\n**Parameters:**\n- input { number... } The table of amplitude data.\n\n**Returns:**\n- string The encoded DFPWM data."},{"label":"make_decoder","detail":"make_decoder(): function(dfpwm:","parameters":[],"documentation":"Create a new decoder for converting DFPWM into PCM audio data.\n\n**Returns:**\n- function(dfpwm: string):{ number... } The encoder function\n\n**Usage:**\n\nReads \"data/example.dfpwm\" in blocks of 16KiB (the speaker can accept a maximum of 128×1024 samples), decodes\n\n```\n\nthem and then plays them through the speaker.\n\nlocal dfpwm = require \"cc.audio.dfpwm\"\n\nlocal speaker = peripheral.find(\"speaker\")\n\n\n\nlocal decoder = dfpwm.make_decoder()\n\nfor input in io.lines(\"data/example.dfpwm\", 16 * 1024) do\n\n  local decoded = decoder(input)\n\n  while not speaker.playAudio(decoded) do\n\n    os.pullEvent(\"speaker_audio_empty\")\n\n  end\n\nend\n\n```"},{"label":"decode","detail":"decode(input: string): {","parameters":["input: string"],"documentation":"A convenience function for decoding a complete file of audio at once.\n\n**Parameters:**\n- **input: string** The DFPWM data to convert.\n\n**Returns:**\n- { number... } The produced amplitude data."}];
  }
}
