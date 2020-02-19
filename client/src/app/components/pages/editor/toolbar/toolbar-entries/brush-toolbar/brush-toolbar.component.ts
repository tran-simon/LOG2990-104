import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/toolbar-entries/abstract-toolbar-entry';
import { BrushTextureType } from 'src/app/models/tool-properties/brush-tool-properties';
import { ToolType } from 'src/app/models/tools/tool';

@Component({
  selector: 'app-brush-toolbar',
  templateUrl: './brush-toolbar.component.html',
  styleUrls: ['../../toolbar.component.scss'],
})
export class BrushToolbarComponent extends AbstractToolbarEntry {
  brushTextureNames = Object.values(BrushTextureType);

  constructor() {
    super(ToolType.Brush);
  }
}
