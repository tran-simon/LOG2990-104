import { Component } from '@angular/core';

import { EditorService } from '@services/editor.service';
import { EllipseToolProperties } from '@tool-properties/creator-tool-properties/shape-tool-properties/ellipse-tool-properties';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { ToolType } from 'src/app/models/tools/tool-type.enum';

@Component({
  selector: 'app-ellipse-toolbar',
  templateUrl: './ellipse-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class EllipseToolbarComponent extends AbstractToolbarEntry<EllipseToolProperties> {
  constructor(protected editorService: EditorService) {
    super(editorService, ToolType.Ellipse);
  }
}
