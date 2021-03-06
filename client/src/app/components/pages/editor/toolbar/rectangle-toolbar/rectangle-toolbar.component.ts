import { Component } from '@angular/core';
import { EditorService } from '@services/editor.service';
import { ShapeToolProperties } from '@tool-properties/creator-tool-properties/shape-tool-properties/shape-tool-properties';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { ToolType } from 'src/app/models/tools/tool-type.enum';

@Component({
  selector: 'app-rectangle-toolbar',
  templateUrl: './rectangle-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class RectangleToolbarComponent extends AbstractToolbarEntry<ShapeToolProperties> {
  constructor(protected editorService: EditorService) {
    super(editorService, ToolType.Rectangle);
  }
}
