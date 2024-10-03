import * as vscode from "vscode";
import BaseModule from "./base.module";
import { Method } from "../interfaces/method";

export default class osModule extends BaseModule {
  constructor() {
    super(`os`, `The os API allows interacting with the current computer.`);
  }

  protected getMethods(): Method[] {
    return [
      {
        label: "loadAPI",
        detail: "loadAPI(path: string): boolean",
        parameters: ["path: string"],
        documentation:
          "When possible it's best to avoid using this function. It pollutes\nthe global table and can mask errors.\n\n**Parameters:**\n- **path: string** The path of the API to load.\n\n**Returns:**\n- boolean Whether or not the API was successfully loaded.",
      },
      {
        label: "unloadAPI",
        detail: "unloadAPI(name: string): void",
        parameters: ["name: string"],
        documentation:
          "See os.loadAPI for why.\n\n**Parameters:**\n- **name: string** The name of the API to unload.",
      },
      {
        label: "pullEvent",
        detail: "pullEvent(filter?: string): string | any",
        parameters: ["filter?: string"],
        documentation:
          'Pause execution of the current thread and waits for any events matching\nfilter.\n\n**Parameters:**\n- **filter?: string** Event to filter for.\n\n**Events:**\n- `alarm`: The alarm event is fired when an alarm started with os.setAlarm completes.\n\t- https://tweaked.cc/event/alarm.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- number: The ID of the alarm that finished.\n- `char`: The char event is fired when a character is typed on the keyboard.\n\t- https://tweaked.cc/event/char.html\n\t- **Returns:**\n- `computer_command`: The computer_command event is fired when the /computercraft queue command is run for the current computer.\n\t- https://tweaked.cc/event/computer_command.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string…: The arguments passed to the command.\n- `disk`: The disk event is fired when a disk is inserted into an adjacent or networked disk drive.\n\t- https://tweaked.cc/event/disk.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side of the disk drive that had a disk inserted.\n- `disk_eject`: The disk_eject event is fired when a disk is removed from an adjacent or networked disk drive.\n\t- https://tweaked.cc/event/disk_eject.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side of the disk drive that had a disk removed.\n- `file_transfer`: The file_transfer event is queued when a user drags-and-drops a file on an open computer.\n\t- https://tweaked.cc/event/file_transfer.html\n\t- **Returns:**\n- `http_check`: The http_check event is fired when a URL check finishes.\n\t- https://tweaked.cc/event/http_check.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL requested to be checked.\n\t\t- boolean: Whether the check succeeded.\n\t\t- string|nil: If the check failed, a reason explaining why the check failed.\n- `http_failure`: The http_failure event is fired when an HTTP request fails.\n\t- https://tweaked.cc/event/http_failure.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the site requested.\n\t\t- string: An error describing the failure.\n\t\t- http.Response|nil: A response handle if the connection succeeded, but the server\'s\n\t\t- response indicated failure.\n- `http_success`: The http_success event is fired when an HTTP request returns successfully.\n\t- https://tweaked.cc/event/http_success.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the site requested.\n\t\t- http.Response: The successful HTTP response.\n- `key`: This event is fired when any key is pressed while the terminal is focused.\n\t- https://tweaked.cc/event/key.html\n\t- **Returns:**\n- `key_up`: Fired whenever a key is released (or the terminal is closed while a key was being pressed).\n\t- https://tweaked.cc/event/key_up.html\n\t- **Returns:**\n- `modem_message`: The modem_message event is fired when a message is received on an open channel on any modem.\n\t- https://tweaked.cc/event/modem_message.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side of the modem that received the message.\n\t\t- number: The channel that the message was sent on.\n\t\t- number: The reply channel set by the sender.\n\t\t- any: The message as sent by the sender.\n\t\t- number|nil: The distance between the sender and the receiver in blocks, or nil if the message was sent between dimensions.\n- `monitor_resize`: The monitor_resize event is fired when an adjacent or networked monitor\'s size is changed.\n\t- https://tweaked.cc/event/monitor_resize.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side or network ID of the monitor that was resized.\n- `monitor_touch`: The monitor_touch event is fired when an adjacent or networked Advanced Monitor is right-clicked.\n\t- https://tweaked.cc/event/monitor_touch.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side or network ID of the monitor that was touched.\n\t\t- number: The X coordinate of the touch, in characters.\n\t\t- number: The Y coordinate of the touch, in characters.\n- `mouse_click`: This event is fired when the terminal is clicked with a mouse. This event is only fired on advanced computers (includingadvanced turtles and pocket computers).\n\t- https://tweaked.cc/event/mouse_click.html\n\t- **Returns:**\n- `mouse_drag`: This event is fired every time the mouse is moved while a mouse button is being held.\n\t- https://tweaked.cc/event/mouse_drag.html\n\t- **Returns:**\n- `mouse_scroll`: This event is fired when a mouse wheel is scrolled in the terminal.\n\t- https://tweaked.cc/event/mouse_scroll.html\n\t- **Returns:**\n- `mouse_up`: This event is fired when a mouse button is released or a held mouse leaves the computer\'s terminal.\n\t- https://tweaked.cc/event/mouse_up.html\n\t- **Returns:**\n- `paste`: The paste event is fired when text is pasted into the computer through Ctrl-V (or ⌘V on Mac).\n\t- https://tweaked.cc/event/paste.html\n\t- **Returns:**\n- `peripheral`: The peripheral event is fired when a peripheral is attached on a side or to a modem.\n\t- https://tweaked.cc/event/peripheral.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side the peripheral was attached to.\n- `peripheral_detach`: The peripheral_detach event is fired when a peripheral is detached from a side or from a modem.\n\t- https://tweaked.cc/event/peripheral_detach.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side the peripheral was detached from.\n- `rednet_message`: The rednet_message event is fired when a message is sent over Rednet.\n\t- https://tweaked.cc/event/rednet_message.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- number: The ID of the sending computer.\n\t\t- any: The message sent.\n\t\t- string|nil: The protocol of the message, if provided.\n- `redstone`: The redstone event is fired whenever any redstone inputs on the computer change.\n\t- https://tweaked.cc/event/redstone.html\n\t- **Returns:**\n- `speaker_audio_empty`: \n\t- https://tweaked.cc/event/speaker_audio_empty.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The name of the speaker which is available to play more audio.\n- `task_complete`: The task_complete event is fired when an asynchronous task completes. This is usually handled inside the function call that queued the task; however, functions such as commands.execAsync return immediately so the user can wait for completion.\n\t- https://tweaked.cc/event/task_complete.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- number: The ID of the task that completed.\n\t\t- boolean: Whether the command succeeded.\n\t\t- string: If the command failed, an error message explaining the failure. (This is not present if the command succeeded.)\n\t\t- …: Any parameters returned from the command.\n- `term_resize`: The term_resize event is fired when the main terminal is resized. For instance:\n\t- https://tweaked.cc/event/term_resize.html\n\t- **Returns:**\n- `terminate`: The terminate event is fired when Ctrl-T is held down.\n\t- https://tweaked.cc/event/terminate.html\n\t- **Returns:**\n- `timer`: The timer event is fired when a timer started with os.startTimer completes.\n\t- https://tweaked.cc/event/timer.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- number: The ID of the timer that finished.\n- `turtle_inventory`: The turtle_inventory event is fired when a turtle\'s inventory is changed.\n\t- https://tweaked.cc/event/turtle_inventory.html\n\t- **Returns:**\n- `websocket_closed`: The websocket_closed event is fired when an open WebSocket connection is closed.\n\t- https://tweaked.cc/event/websocket_closed.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the WebSocket that was closed.\n\t\t- string|nil: The server-provided reason\n\t\t- the websocket was closed. This will be nil if the connection was closed\n\t\t- abnormally.\n\t\t- number|nil: The connection close code,\n\t\t- indicating why the socket was closed. This will be nil if the connection\n\t\t- was closed abnormally.\n- `websocket_failure`: The websocket_failure event is fired when a WebSocket connection request fails.\n\t- https://tweaked.cc/event/websocket_failure.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the site requested.\n\t\t- string: An error describing the failure.\n- `websocket_message`: The websocket_message event is fired when a message is received on an open WebSocket connection.\n\t- https://tweaked.cc/event/websocket_message.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the WebSocket.\n\t\t- string: The contents of the message.\n\t\t- boolean: Whether this is a binary message.\n- `websocket_success`: The websocket_success event is fired when a WebSocket connection request returns successfully.\n\t- https://tweaked.cc/event/websocket_success.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the site.\n\t\t- http.Websocket: The handle for the WebSocket.\n\n**Returns:**\n- string event The name of the event that fired.\n- any param... Optional additional parameters of the event.\n\n**Usage:**\n\nListen for mouse_click events.\n\n```\n\nwhile true do\n\n    local event, button, x, y = os.pullEvent("mouse_click")\n\n    print("Button", button, "was clicked at", x, ",", y)\n\nend\n\nListen for multiple events.\n\nwhile true do\n\n    local eventData = {os.pullEvent()}\n\n    local event = eventData[1]\n\n\n\n    if event == "mouse_click" then\n\n        print("Button", eventData[2], "was clicked at", eventData[3], ",", eventData[4])\n\n    elseif event == "key" then\n\n        print("Key code", eventData[2], "was pressed")\n\n    end\n\nend\n\n```',
      },
      {
        label: "pullEventRaw",
        detail: "pullEventRaw(filter?: string): string | any",
        parameters: ["filter?: string"],
        documentation:
          "Pause execution of the current thread and waits for events, including the\nterminate event.\n\n**Parameters:**\n- **filter?: string** Event to filter for.\n\n**Events:**\n- `alarm`: The alarm event is fired when an alarm started with os.setAlarm completes.\n\t- https://tweaked.cc/event/alarm.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- number: The ID of the alarm that finished.\n- `char`: The char event is fired when a character is typed on the keyboard.\n\t- https://tweaked.cc/event/char.html\n\t- **Returns:**\n- `computer_command`: The computer_command event is fired when the /computercraft queue command is run for the current computer.\n\t- https://tweaked.cc/event/computer_command.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string…: The arguments passed to the command.\n- `disk`: The disk event is fired when a disk is inserted into an adjacent or networked disk drive.\n\t- https://tweaked.cc/event/disk.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side of the disk drive that had a disk inserted.\n- `disk_eject`: The disk_eject event is fired when a disk is removed from an adjacent or networked disk drive.\n\t- https://tweaked.cc/event/disk_eject.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side of the disk drive that had a disk removed.\n- `file_transfer`: The file_transfer event is queued when a user drags-and-drops a file on an open computer.\n\t- https://tweaked.cc/event/file_transfer.html\n\t- **Returns:**\n- `http_check`: The http_check event is fired when a URL check finishes.\n\t- https://tweaked.cc/event/http_check.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL requested to be checked.\n\t\t- boolean: Whether the check succeeded.\n\t\t- string|nil: If the check failed, a reason explaining why the check failed.\n- `http_failure`: The http_failure event is fired when an HTTP request fails.\n\t- https://tweaked.cc/event/http_failure.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the site requested.\n\t\t- string: An error describing the failure.\n\t\t- http.Response|nil: A response handle if the connection succeeded, but the server's\n\t\t- response indicated failure.\n- `http_success`: The http_success event is fired when an HTTP request returns successfully.\n\t- https://tweaked.cc/event/http_success.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the site requested.\n\t\t- http.Response: The successful HTTP response.\n- `key`: This event is fired when any key is pressed while the terminal is focused.\n\t- https://tweaked.cc/event/key.html\n\t- **Returns:**\n- `key_up`: Fired whenever a key is released (or the terminal is closed while a key was being pressed).\n\t- https://tweaked.cc/event/key_up.html\n\t- **Returns:**\n- `modem_message`: The modem_message event is fired when a message is received on an open channel on any modem.\n\t- https://tweaked.cc/event/modem_message.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side of the modem that received the message.\n\t\t- number: The channel that the message was sent on.\n\t\t- number: The reply channel set by the sender.\n\t\t- any: The message as sent by the sender.\n\t\t- number|nil: The distance between the sender and the receiver in blocks, or nil if the message was sent between dimensions.\n- `monitor_resize`: The monitor_resize event is fired when an adjacent or networked monitor's size is changed.\n\t- https://tweaked.cc/event/monitor_resize.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side or network ID of the monitor that was resized.\n- `monitor_touch`: The monitor_touch event is fired when an adjacent or networked Advanced Monitor is right-clicked.\n\t- https://tweaked.cc/event/monitor_touch.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side or network ID of the monitor that was touched.\n\t\t- number: The X coordinate of the touch, in characters.\n\t\t- number: The Y coordinate of the touch, in characters.\n- `mouse_click`: This event is fired when the terminal is clicked with a mouse. This event is only fired on advanced computers (includingadvanced turtles and pocket computers).\n\t- https://tweaked.cc/event/mouse_click.html\n\t- **Returns:**\n- `mouse_drag`: This event is fired every time the mouse is moved while a mouse button is being held.\n\t- https://tweaked.cc/event/mouse_drag.html\n\t- **Returns:**\n- `mouse_scroll`: This event is fired when a mouse wheel is scrolled in the terminal.\n\t- https://tweaked.cc/event/mouse_scroll.html\n\t- **Returns:**\n- `mouse_up`: This event is fired when a mouse button is released or a held mouse leaves the computer's terminal.\n\t- https://tweaked.cc/event/mouse_up.html\n\t- **Returns:**\n- `paste`: The paste event is fired when text is pasted into the computer through Ctrl-V (or ⌘V on Mac).\n\t- https://tweaked.cc/event/paste.html\n\t- **Returns:**\n- `peripheral`: The peripheral event is fired when a peripheral is attached on a side or to a modem.\n\t- https://tweaked.cc/event/peripheral.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side the peripheral was attached to.\n- `peripheral_detach`: The peripheral_detach event is fired when a peripheral is detached from a side or from a modem.\n\t- https://tweaked.cc/event/peripheral_detach.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The side the peripheral was detached from.\n- `rednet_message`: The rednet_message event is fired when a message is sent over Rednet.\n\t- https://tweaked.cc/event/rednet_message.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- number: The ID of the sending computer.\n\t\t- any: The message sent.\n\t\t- string|nil: The protocol of the message, if provided.\n- `redstone`: The redstone event is fired whenever any redstone inputs on the computer change.\n\t- https://tweaked.cc/event/redstone.html\n\t- **Returns:**\n- `speaker_audio_empty`: \n\t- https://tweaked.cc/event/speaker_audio_empty.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The name of the speaker which is available to play more audio.\n- `task_complete`: The task_complete event is fired when an asynchronous task completes. This is usually handled inside the function call that queued the task; however, functions such as commands.execAsync return immediately so the user can wait for completion.\n\t- https://tweaked.cc/event/task_complete.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- number: The ID of the task that completed.\n\t\t- boolean: Whether the command succeeded.\n\t\t- string: If the command failed, an error message explaining the failure. (This is not present if the command succeeded.)\n\t\t- …: Any parameters returned from the command.\n- `term_resize`: The term_resize event is fired when the main terminal is resized. For instance:\n\t- https://tweaked.cc/event/term_resize.html\n\t- **Returns:**\n- `terminate`: The terminate event is fired when Ctrl-T is held down.\n\t- https://tweaked.cc/event/terminate.html\n\t- **Returns:**\n- `timer`: The timer event is fired when a timer started with os.startTimer completes.\n\t- https://tweaked.cc/event/timer.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- number: The ID of the timer that finished.\n- `turtle_inventory`: The turtle_inventory event is fired when a turtle's inventory is changed.\n\t- https://tweaked.cc/event/turtle_inventory.html\n\t- **Returns:**\n- `websocket_closed`: The websocket_closed event is fired when an open WebSocket connection is closed.\n\t- https://tweaked.cc/event/websocket_closed.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the WebSocket that was closed.\n\t\t- string|nil: The server-provided reason\n\t\t- the websocket was closed. This will be nil if the connection was closed\n\t\t- abnormally.\n\t\t- number|nil: The connection close code,\n\t\t- indicating why the socket was closed. This will be nil if the connection\n\t\t- was closed abnormally.\n- `websocket_failure`: The websocket_failure event is fired when a WebSocket connection request fails.\n\t- https://tweaked.cc/event/websocket_failure.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the site requested.\n\t\t- string: An error describing the failure.\n- `websocket_message`: The websocket_message event is fired when a message is received on an open WebSocket connection.\n\t- https://tweaked.cc/event/websocket_message.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the WebSocket.\n\t\t- string: The contents of the message.\n\t\t- boolean: Whether this is a binary message.\n- `websocket_success`: The websocket_success event is fired when a WebSocket connection request returns successfully.\n\t- https://tweaked.cc/event/websocket_success.html\n\t- **Returns:**\n\t\t- string: The event name.\n\t\t- string: The URL of the site.\n\t\t- http.Websocket: The handle for the WebSocket.\n\n**Returns:**\n- string event The name of the event that fired.\n- any param... Optional additional parameters of the event.\n\n**Usage:**\n\nListen for terminate events.\n\n```\n\nwhile true do\n\n    local event = os.pullEventRaw()\n\n    if event == \"terminate\" then\n\n        print(\"Caught terminate event!\")\n\n    end\n\nend\n\n```",
      },
      {
        label: "sleep",
        detail: "sleep(time: number): void",
        parameters: ["time: number"],
        documentation:
          "Pauses execution for the specified number of seconds, alias of _G.sleep.\n\n**Parameters:**\n- **time: number** The number of seconds to sleep for, rounded up to the\nnearest multiple of 0.05.",
      },
      {
        label: "version",
        detail: "version(): string",
        parameters: [],
        documentation:
          "Get the current CraftOS version (for example, CraftOS 1.9).\n\n**Returns:**\n- string The current CraftOS version.\n\n**Usage:**\n\nos.version()",
      },
      {
        label: "run",
        detail:
          "run(env: table, path: string, ...  The arguments to pass to the program.): boolean",
        parameters: [
          "env: table",
          "path: string",
          "...  The arguments to pass to the program.",
        ],
        documentation:
          'Run the program at the given path with the specified environment and\narguments.\n\n**Parameters:**\n- **env: table** The environment to run the program with.\n- **path: string** The exact path of the program to run.\n- ...  The arguments to pass to the program.\n\n**Returns:**\n- boolean Whether or not the program ran successfully.\n\n**Usage:**\n\nRun the default shell from within your program:\n\n```\n\nos.run({}, "/rom/programs/shell.lua")\n\n```',
      },
      {
        label: "queueEvent",
        detail:
          "queueEvent(name: string, ...  The parameters of the event. These can be any primitive type (boolean, number, string) as well as\ntables. Other types (like functions), as well as metatables, will not be preserved.): void",
        parameters: [
          "name: string",
          "...  The parameters of the event. These can be any primitive type (boolean, number, string) as well as\ntables. Other types (like functions), as well as metatables, will not be preserved.",
        ],
        documentation:
          "Adds an event to the event queue. This event can later be pulled with\nos.pullEvent.\n\n**Parameters:**\n- **name: string** The name of the event to queue.\n- ...  The parameters of the event. These can be any primitive type (boolean, number, string) as well as\ntables. Other types (like functions), as well as metatables, will not be preserved.",
      },
      {
        label: "startTimer",
        detail: "startTimer(time: number): number | event,",
        parameters: ["time: number"],
        documentation:
          "Starts a timer that will run for the specified number of seconds. Once\nthe timer fires, a timer event will be added to the queue with the ID\nreturned from this function as the first parameter.\n\n**Parameters:**\n- **time: number** The number of seconds until the timer fires.\n\n**Returns:**\n- number The ID of the new timer. This can be used to filter the timer\n- event, or cancel the timer.",
      },
      {
        label: "cancelTimer",
        detail: "cancelTimer(token: number): void",
        parameters: ["token: number"],
        documentation:
          "Cancels a timer previously started with startTimer. This\nwill stop the timer from firing.\n\n**Parameters:**\n- **token: number** The ID of the timer to cancel.",
      },
      {
        label: "setAlarm",
        detail: "setAlarm(time: number): number | alarm",
        parameters: ["time: number"],
        documentation:
          "Sets an alarm that will fire at the specified in-game time.\nWhen it fires, an alarm event will be added to the event queue with the\nID returned from this function as the first parameter.\n\n**Parameters:**\n- **time: number** The time at which to fire the alarm, in the range [0.0, 24.0).\n\n**Returns:**\n- number The ID of the new alarm. This can be used to filter the\n- alarm event, or cancel the alarm.",
      },
      {
        label: "cancelAlarm",
        detail: "cancelAlarm(token: number): void",
        parameters: ["token: number"],
        documentation:
          "Cancels an alarm previously started with setAlarm. This will stop the\nalarm from firing.\n\n**Parameters:**\n- **token: number** The ID of the alarm to cancel.",
      },
      {
        label: "shutdown",
        detail: "shutdown(): void",
        parameters: [],
        documentation: "Shuts down the computer immediately.",
      },
      {
        label: "reboot",
        detail: "reboot(): void",
        parameters: [],
        documentation: "Reboots the computer immediately.",
      },
      {
        label: "getComputerID",
        detail: "getComputerID(): number",
        parameters: [],
        documentation:
          "Returns the ID of the computer.\n\n**Returns:**\n- number The ID of the computer.",
      },
      {
        label: "computerID",
        detail: "computerID(): number",
        parameters: [],
        documentation:
          "Returns the ID of the computer.\n\n**Returns:**\n- number The ID of the computer.",
      },
      {
        label: "getComputerLabel",
        detail: "getComputerLabel(): string",
        parameters: [],
        documentation:
          "Returns the label of the computer, or nil if none is set.\n\n**Returns:**\n- string | nil The label of the computer.",
      },
      {
        label: "computerLabel",
        detail: "computerLabel(): string",
        parameters: [],
        documentation:
          "Returns the label of the computer, or nil if none is set.\n\n**Returns:**\n- string | nil The label of the computer.",
      },
      {
        label: "setComputerLabel",
        detail: "setComputerLabel(label?: string): void",
        parameters: ["label?: string"],
        documentation:
          "Set the label of this computer.\n\n**Parameters:**\n- **label?: string** The new label. May be nil in order to clear it.",
      },
      {
        label: "clock",
        detail: "clock(): number",
        parameters: [],
        documentation:
          "Returns the number of seconds that the computer has been running.\n\n**Returns:**\n- number The computer's uptime.",
      },
      {
        label: "time",
        detail: "time(locale?: string): any",
        parameters: ["locale?: string"],
        documentation:
          'Returns the current time depending on the string passed in. This will\nalways be in the range [0.0, 24.0).\n\n**Parameters:**\n- **locale?: string** | table The locale of the time, or a table filled by os.date("*t") to decode. Defaults to ingame locale if not specified.\n\n**Returns:**\n- any The hour of the selected locale, or a UNIX timestamp from the table, depending on the argument passed in.\n\n**Usage:**\n\nPrint the current in-game time.\n\n```\n\ntextutils.formatTime(os.time())\n\n```',
      },
      {
        label: "day",
        detail: "day(args?: string): number",
        parameters: ["args?: string"],
        documentation:
          "Returns the day depending on the locale specified.\n\n**Parameters:**\n- **args?: string** The locale to get the day for. Defaults to ingame if not set.\n\n**Returns:**\n- number The day depending on the selected locale.",
      },
      {
        label: "epoch",
        detail: "epoch(args?: string): number",
        parameters: ["args?: string"],
        documentation:
          'Returns the number of milliseconds since an epoch depending on the locale.\n\n**Parameters:**\n- **args?: string** The locale to get the milliseconds for. Defaults to ingame if not set.\n\n**Returns:**\n- number The milliseconds since the epoch depending on the selected locale.\n\n**Usage:**\n\nGet the current time and use date to convert it to a table.\n\n```\n\n-- Dividing by 1000 converts it from milliseconds to seconds.\n\nlocal time = os.epoch("local") / 1000\n\nlocal time_table = os.date("*t", time)\n\nprint(textutils.serialize(time_table))\n\n```',
      },
      {
        label: "date",
        detail: "date(format?: string, time?: number): any",
        parameters: ["format?: string", "time?: number"],
        documentation:
          'Returns a date string (or table) using a specified format string and\noptional time to format.\n\n**Parameters:**\n- **format?: string** The format of the string to return. This defaults to %c, which expands to a string similar to "Sat Dec 24 16:58:00 2011".\n- **time?: number** The time to convert to a string. This defaults to the current time.\n\n**Returns:**\n- any The resulting format string.\n\n**Usage:**\n\nPrint the current date in a user-friendly string.\n\n```\n\nos.date("%A %d %B %Y") -- See the reference above!\n\n```',
      },
    ];
  }
}
