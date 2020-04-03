import { EditorService } from '@services/editor.service';
import { Tool } from '@tools/tool';

export class GridTool extends Tool {
  largeGridSize: number;
  smallGridSize: number;
  constructor(editorService: EditorService) {
    super(editorService);
  }
}
