import { Component, Input } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/toolbar-entries/abstract-toolbar-entry';
import { LineJunctionType, LineToolProperties } from 'src/app/models/tool-properties/line-tool-properties';

@Component({
  selector: 'app-line-toolbar',
  templateUrl: './line-toolbar.component.html',
  styleUrls: ['../../toolbar.component.scss'],
})
export class LineToolbarComponent extends AbstractToolbarEntry {
  @Input()
  toolProperties: LineToolProperties;

  lineJunctionTypes = LineJunctionType;
  lineJunctionNames = Object.values(this.lineJunctionTypes);
}
