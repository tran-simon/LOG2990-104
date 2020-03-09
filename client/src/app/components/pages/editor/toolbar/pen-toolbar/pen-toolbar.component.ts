import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { ToolType } from 'src/app/models/tools/tool-type';
import { PenToolProperties } from '../../../../../models/tool-properties/pen-tool-properties';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-pen-toolbar',
  templateUrl: './pen-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class PenToolbarComponent extends AbstractToolbarEntry<PenToolProperties> {
  constructor(editorService: EditorService) {
    super(editorService, ToolType.Pen);
  }
}
