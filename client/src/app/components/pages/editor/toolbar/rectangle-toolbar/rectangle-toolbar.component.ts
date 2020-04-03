import { Component } from '@angular/core';
import { RectangleToolProperties } from '@tool-properties/creator-tool-properties/shape-tool-properties/rectangle-tool-properties';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { ToolType } from 'src/app/models/tools/tool-type.enum';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-rectangle-toolbar',
  templateUrl: './rectangle-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class RectangleToolbarComponent extends AbstractToolbarEntry<RectangleToolProperties> {
  constructor(protected editorService: EditorService) {
    super(editorService, ToolType.Rectangle);
  }
}
