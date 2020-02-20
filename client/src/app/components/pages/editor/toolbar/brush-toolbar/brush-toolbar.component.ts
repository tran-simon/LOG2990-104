import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { BrushTextureType } from 'src/app/models/tool-properties/brush-tool-properties';
import { ToolType } from 'src/app/models/tools/tool';

@Component({
  selector: 'app-brush-toolbar',
  templateUrl: './brush-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class BrushToolbarComponent extends AbstractToolbarEntry {
  brushTextureNames = Object.values(BrushTextureType);
  // todo: Fix unresolved variable 'texture'

  constructor() {
    super(ToolType.Brush);
  }
}
