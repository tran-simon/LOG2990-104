import { Input } from '@angular/core';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar.component';
import { ToolsService } from 'src/app/components/pages/editor/tools.service';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { ToolType } from 'src/app/models/tools/tool';

export abstract class AbstractToolbarEntry {
  readonly type: ToolType;

  tool: CreatorTool;

  @Input() thicknessSliderStep: number;

  set toolProperties(properties: ToolProperties) {
    this.tool.toolProperties = properties;
  }

  get toolProperties(): ToolProperties {
    return this.tool.toolProperties;
  }

  constructor(type: ToolType, public tools: ToolsService) {
    this.type = type;
    this.thicknessSliderStep = ToolbarComponent.SLIDER_STEP;

    this.tool = tools.getByType(type);
  }
}
