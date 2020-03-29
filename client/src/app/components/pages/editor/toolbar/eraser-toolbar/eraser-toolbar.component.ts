import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { CreatorToolProperties } from 'src/app/models/tool-properties/creator-tool-properties/creator-tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type.enum';

import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-eraser-toolbar',
  templateUrl: './eraser-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class EraserToolbarComponent extends AbstractToolbarEntry<CreatorToolProperties> {
  constructor(protected editorService: EditorService) {
    super(editorService, ToolType.Eraser);
  }
}
