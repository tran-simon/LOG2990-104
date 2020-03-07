import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { ToolType } from 'src/app/models/tools/tool-type';
import { PolygonContourType, PolygonToolProperties } from '../../../../../models/tool-properties/polygon-tool-properties';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-polygon-toolbar',
  templateUrl: './polygon-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class PolygonToolbarComponent extends AbstractToolbarEntry<PolygonToolProperties> {
  polygonContourTypes: typeof PolygonContourType;
  polygonContourNames: string[];

  constructor(protected editorService: EditorService) {
    super(editorService, ToolType.Polygon);
    this.polygonContourTypes = PolygonContourType;
    this.polygonContourNames = Object.values(this.polygonContourTypes);
  }
}
