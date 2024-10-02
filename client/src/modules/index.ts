import ColorsModule from "./colors";
import CommandsModule from "./commands";
import DiskModule from "./disk";
import FsModule from "./fs";
import GpsModule from "./gps";
import HelpModule from "./help";
import HttpModule from "./http";
import IoModule from "./io";
import KeysModule from "./keys";
import TermModule from "./terminal";

export default [
  new ColorsModule(),
  new CommandsModule(),
  new DiskModule(),
  new FsModule(),
  new GpsModule(),
  new HelpModule(),
  new HttpModule(),
  new IoModule(),
  new TermModule(),
  new KeysModule(),
];
