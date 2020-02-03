import { Command } from './command';

export class AddShapeCommand implements Command {
    execute() {
        console.log(1);
    }
    undo() {
        console.log(1);
    }
}
