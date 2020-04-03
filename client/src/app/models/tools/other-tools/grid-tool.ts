import { EditorService } from '@services/editor.service';
import { GridToolProperties } from '@tool-properties/editor-tool-properties/grid-tool-properties';
import { Tool } from '@tools/tool';

export class GridTool extends Tool {
  toolProperties: GridToolProperties;
  upscaleGrid(): void {
    this.editorService.view.smallGrid += 5;
    this.editorService.view.largeGrid = this.editorService.view.smallGrid * 5;
  }
  downscaleGrid(): void {
    this.editorService.view.smallGrid -= 5;
    this.editorService.view.largeGrid = this.editorService.view.smallGrid * 5;
  }
  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new GridToolProperties();
  }
}
