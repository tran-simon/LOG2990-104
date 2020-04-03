import { EditorService } from '@services/editor.service';
import { GridToolProperties } from '@tool-properties/editor-tool-properties/grid-tool-properties';
import { Tool } from '@tools/tool';

export class GridTool extends Tool {
  toolProperties: GridToolProperties;
  upscaleGrid(): void {
    // tslint:disable-next-line:no-magic-numbers
    this.editorService.view.smallGrid += 5;
    // tslint:disable-next-line:no-magic-numbers
    this.editorService.view.largeGrid = this.editorService.view.smallGrid * 5;
  }
  downscaleGrid(): void {
    // tslint:disable-next-line:no-magic-numbers
    this.editorService.view.smallGrid -= 5;
    // tslint:disable-next-line:no-magic-numbers
    this.editorService.view.largeGrid = this.editorService.view.smallGrid * 5;
  }
  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new GridToolProperties();
  }
}
