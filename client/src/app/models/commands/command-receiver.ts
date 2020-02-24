import { Injectable } from '@angular/core';
import { Command } from './command';

@Injectable({
  providedIn: 'root',
})
export class CommandReceiver {
  private _commands: Command[];
  private _revertedCommands: Command[];

  constructor() {
    this._commands = new Array<Command>();
    this._revertedCommands = new Array<Command>();
  }

  add(command: Command): void {
    this._revertedCommands = new Array<Command>();
    this._commands.push(command);
    command.execute();
  }

  undo(): void {
    const command = this._commands.pop();
    if (command) {
      this._revertedCommands.push(command);
      command.undo();
    }
  }

  redo(): void {
    const command = this._revertedCommands.pop();
    if (command) {
      this._commands.push(command);
      command.execute();
    }
  }
}
