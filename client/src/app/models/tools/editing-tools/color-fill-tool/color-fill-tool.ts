import { EditorService } from '@services/editor.service';
import { Tool } from '@tools/tool';

export class ColorFillTool extends Tool {
  constructor(editorService: EditorService) {
    super(editorService);
    // todo: tool properties
  }

  initMouseHandler(): void {
    this.handleClick = () => {
      // PipetteTool.getColorAtPointAndExecute()
    };
  }
}
