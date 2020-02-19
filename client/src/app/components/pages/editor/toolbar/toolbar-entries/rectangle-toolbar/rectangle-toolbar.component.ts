import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/toolbar-entries/abstract-toolbar-entry';
import { ToolsService } from 'src/app/components/pages/editor/tools.service';
import { RectangleContourType } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { ToolType } from 'src/app/models/tools/tool';

@Component({
  selector: 'app-rectangle-toolbar',
  templateUrl: './rectangle-toolbar.component.html',
  styleUrls: ['../../toolbar.component.scss'],
})
export class RectangleToolbarComponent extends AbstractToolbarEntry {
  rectangleContourTypes = RectangleContourType;
  rectangleContourNames = Object.values(this.rectangleContourTypes);

  constructor(tools: ToolsService) {
    super(ToolType.Rectangle, tools);
  }
}
