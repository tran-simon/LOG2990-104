import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/toolbar-entries/abstract-toolbar-entry';
import { ToolsService } from 'src/app/components/pages/editor/tools.service';
import { ToolType } from 'src/app/models/tools/tool';

@Component({
  selector: 'app-pen-toolbar',
  templateUrl: './pen-toolbar.component.html',
  styleUrls: ['../../toolbar.component.scss'],
})
export class PenToolbarComponent extends AbstractToolbarEntry {
  constructor(tools: ToolsService) {
    super(ToolType.Pen, tools);
  }
}
