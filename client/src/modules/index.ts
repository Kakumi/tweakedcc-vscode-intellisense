import { commands } from "vscode";
import _GModule from "./_G";
import cc_audio_dfpwmModule from "./cc_audio_dfpwm";
import cc_completionModule from "./cc_completion";
import cc_expectModule from "./cc_expect";
import cc_image_nftModule from "./cc_image_nft";
import cc_prettyModule from "./cc_pretty";
import cc_requireModule from "./cc_require";
import cc_shell_completionModule from "./cc_shell_completion";
import cc_stringsModule from "./cc_strings";
import colorsModule from "./colors";
import coloursModule from "./colours";
import computerModule from "./computer";
import commandsModule from "./commands";
import commandModule from "./command";
import diskModule from "./disk";
import driveModule from "./drive";
import energy_storageModule from "./energy_storage";
import fluid_storageModule from "./fluid_storage";
import fsModule from "./fs";
import gpsModule from "./gps";
import helpModule from "./help";
import httpModule from "./http";
import inventoryModule from "./inventory";
import ioModule from "./io";
import keysModule from "./keys";
import modemModule from "./modem";
import monitorModule from "./monitor";
import multishellModule from "./multishell";
import osModule from "./os";
import paintutilsModule from "./paintutils";
import parallelModule from "./parallel";
import peripheralModule from "./peripheral";
import pocketModule from "./pocket";
import printerModule from "./printer";
import rednetModule from "./rednet";
import redstoneModule from "./redstone";
import settingsModule from "./settings";
import shellModule from "./shell";
import speakerModule from "./speaker";
import termModule from "./term";
import textutilsModule from "./textutils";
import turtleModule from "./turtle";
import vectorModule from "./vector";
import windowModule from "./window";

export default [
  new _GModule(),
  new cc_audio_dfpwmModule(),
  new cc_completionModule(),
  new cc_expectModule(),
  new cc_image_nftModule(),
  new cc_prettyModule(),
  new cc_requireModule(),
  new cc_shell_completionModule(),
  new cc_stringsModule(),
  new colorsModule(),
  new coloursModule(),
  new commandModule(),
  new commandsModule(),
  new computerModule(),
  new diskModule(),
  new driveModule(),
  new energy_storageModule(),
  new fluid_storageModule(),
  new fsModule(),
  new gpsModule(),
  new helpModule(),
  new httpModule(),
  new inventoryModule(),
  new ioModule(),
  new keysModule(),
  new modemModule(),
  new monitorModule(),
  new multishellModule(),
  new osModule(),
  new paintutilsModule(),
  new parallelModule(),
  new peripheralModule(),
  new pocketModule(),
  new printerModule(),
  new rednetModule(),
  new redstoneModule(),
  new settingsModule(),
  new shellModule(),
  new speakerModule(),
  new termModule(),
  new textutilsModule(),
  new turtleModule(),
  new vectorModule(),
  new windowModule(),
];
