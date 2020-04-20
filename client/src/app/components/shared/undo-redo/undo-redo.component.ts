import { Component } from '@angular/core';
import { EditorService } from '@services/editor.service';

@Component({
  selector: 'app-undo-redo',
  templateUrl: './undo-redo.component.html',
  styleUrls: ['./undo-redo.component.scss'],
})
export class UndoRedoComponent {
  constructor(public editorService: EditorService) {}
  onUndo(): void {
    this.editorService.commandReceiver.undo();
  }
  onRedo(): void {
    this.editorService.commandReceiver.redo();
  }
}
