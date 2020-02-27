import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { LineJunctionType } from 'src/app/models/tool-properties/line-junction-type';
import { LineToolProperties } from 'src/app/models/tool-properties/line-tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-line-toolbar',
  templateUrl: './line-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class LineToolbarComponent extends AbstractToolbarEntry<LineToolProperties> {
  lineJunctionTypes = LineJunctionType;
  lineJunctionNames = Object.values(this.lineJunctionTypes);

  constructor(protected editorService: EditorService) {
    super(editorService, ToolType.Line);
  }
}
