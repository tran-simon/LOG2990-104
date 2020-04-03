import { Component } from '@angular/core';
import { GridToolProperties } from '@tool-properties/editor-tool-properties/grid-tool-properties';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { ToolType } from 'src/app/models/tools/tool-type.enum';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-grid-toolbar',
  templateUrl: './grid-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class GridToolbarComponent extends AbstractToolbarEntry<GridToolProperties> {
  constructor(protected editorService: EditorService) {
    super(editorService, ToolType.Grid);
    this.thicknessSliderStep = 5;
  }
}
