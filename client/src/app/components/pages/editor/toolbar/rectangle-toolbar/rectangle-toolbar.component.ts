import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { RectangleContourType } from 'src/app/models/tool-properties/rectangle-contour-type';
import { RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-rectangle-toolbar',
  templateUrl: './rectangle-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class RectangleToolbarComponent extends AbstractToolbarEntry<RectangleToolProperties> {
  rectangleContourTypes = RectangleContourType;
  rectangleContourNames = Object.values(this.rectangleContourTypes);

  constructor(protected editorService: EditorService) {
    super(editorService, ToolType.Rectangle);
  }
}
