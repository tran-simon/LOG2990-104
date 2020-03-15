import { Tool } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';

export class EraserTool extends Tool{

  constructor(editorService: EditorService) {
    super(editorService);
  }

  initMouseHandler(): void {
    this.handleMouseMove = (e) => {
      const size = 50;
      const x = this.mousePosition.x - size / 2;
      const y = this.mousePosition.y - size / 2;
      const elements: Array<Element> = [];

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const element: Element | null = document.elementFromPoint(x + i, y + j);

          if (element && element.id !== '') {
            if (!(elements.indexOf(element) > -1)) {
              elements.push(element);
            }
          }
        }
      }
      console.log(elements);
    }
  }
}
