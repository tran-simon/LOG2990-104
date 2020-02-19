import { Injectable } from '@angular/core';
import { Command } from './command';

@Injectable({
  providedIn: 'root',
})
export class CommandReceiver {
  _commands: Command[];
  _revertedCommands: Command[];

  add(command: Command) {
    this._commands.push(command);
    command.execute();
  }

  undo() {
    const command = this._commands.pop();
    if (command) {
      this._revertedCommands.push(command);
      command.undo();
    }
  }

  redo() {
    const command = this._revertedCommands.pop();
    if (command) {
      this._commands.push(command);
      command.execute();
    }
  }
}
