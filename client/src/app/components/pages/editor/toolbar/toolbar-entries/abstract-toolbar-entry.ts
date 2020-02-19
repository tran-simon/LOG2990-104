import { Input } from '@angular/core';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar.component';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { Tool, ToolType } from 'src/app/models/tools/tool';

export abstract class AbstractToolbarEntry {
  readonly type: ToolType;

  @Input() thicknessSliderStep: number;

  @Input() tool: Tool;

  set toolProperties(properties: ToolProperties) {
    this.tool.toolProperties = properties;
  }

  get toolProperties(): ToolProperties {
    return this.tool.toolProperties;
  }

  constructor(type: ToolType) {
    this.type = type;
    this.thicknessSliderStep = ToolbarComponent.SLIDER_STEP;
  }
}
