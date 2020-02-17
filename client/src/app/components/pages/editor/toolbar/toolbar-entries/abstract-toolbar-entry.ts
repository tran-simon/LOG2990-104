import { Input } from '@angular/core';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar.component';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';

export abstract class AbstractToolbarEntry {
  abstract toolProperties: ToolProperties;
  @Input() thicknessSliderStep: number;

  constructor() {
    this.thicknessSliderStep = ToolbarComponent.SLIDER_STEP;
  }
}
