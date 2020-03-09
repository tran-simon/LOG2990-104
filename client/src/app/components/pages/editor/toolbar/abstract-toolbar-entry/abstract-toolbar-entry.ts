import { Input } from '@angular/core';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { ToolType } from 'src/app/models/tools/tool-type';
import { ToolProperties } from '../../../../../models/tool-properties/tool-properties';
import { EditorService } from '../../../../../services/editor.service';

export abstract class AbstractToolbarEntry<T extends ToolProperties> {
  @Input() thicknessSliderStep: number;

  protected constructor(protected editorService: EditorService, protected type: ToolType) {
    this.thicknessSliderStep = ToolbarComponent.SLIDER_STEP;
  }

  get toolProperties(): T {
    const tool = this.editorService.tools.get(this.type);
    if (!tool) {
      throw new Error('Tool not found error: ' + this.type);
    }
    if (tool instanceof CreatorTool) {
      return tool.toolProperties as T;
    } else {
      return {} as T;
    }
  }
}
