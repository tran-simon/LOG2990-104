import { Command } from './command';

export class CommandReceiver {
  private _commands: Command[];
  private _revertedCommands: Command[];

  get canUndo(): boolean {
    return this._commands.length > 0;
  }

  get canRedo(): boolean {
    return this._revertedCommands.length > 0;
  }

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
