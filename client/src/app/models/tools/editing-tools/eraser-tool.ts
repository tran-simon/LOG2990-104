import { Rectangle } from 'src/app/models/shapes/rectangle';
import { Tool } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class EraserTool extends Tool {
  static readonly DEFAULT_SIZE: number = 11;
  size: number;
  private eraserView: Rectangle;

  constructor(editorService: EditorService) {
    super(editorService);
    this.size = EraserTool.DEFAULT_SIZE;
  }

  initMouseHandler(): void {
    this.handleMouseMove = () => {
      if (!this.eraserView) {
        this.initEraserView();
      }

      const x = this.mousePosition.x - this.size / 2;
      const y = this.mousePosition.y - this.size / 2;
      this.eraserView.origin = new Coordinate(x, y);
    };
  }

  initEraserView(): void {
    this.eraserView = new Rectangle(new Coordinate(), this.size );
    this.eraserView.primaryColor = Color.WHITE;
    this.eraserView.updateProperties();

    this.editorService.addPreviewShape(this.eraserView);
  }
}
