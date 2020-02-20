import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { RectangleContourType } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { ToolType } from 'src/app/models/tools/tool';

@Component({
  selector: 'app-rectangle-toolbar',
  templateUrl: './rectangle-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class RectangleToolbarComponent extends AbstractToolbarEntry {
  rectangleContourTypes = RectangleContourType;
  rectangleContourNames = Object.values(this.rectangleContourTypes);

  constructor() {
    super(ToolType.Rectangle);
  }
}
