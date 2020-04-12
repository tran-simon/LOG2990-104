import { Injectable } from '@angular/core';
import { Drawing } from '@models/drawing';
import { EditorService } from './editor.service';

@Injectable({
  providedIn: 'root',
})
export class LocalSaveService {
  private _drawing: Drawing;

  constructor(private editorService: EditorService) {}

  takeSnapchot(): void {
    this._drawing = new Drawing(
      'localsave',
      [],
      '', // this.editor.exportDrawing(),
      this.editorService.view.color.toString(),
      this.editorService.view.width,
      this.editorService.view.height,
      '',
    );
  }

  get drawing(): Drawing {
    return this._drawing;
  }
}
