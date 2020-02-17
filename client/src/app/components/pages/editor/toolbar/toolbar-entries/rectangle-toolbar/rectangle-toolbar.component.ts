import { Component, Input } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/toolbar-entries/abstract-toolbar-entry';
import { RectangleContourType, RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';

@Component({
  selector: 'app-rectangle-toolbar',
  templateUrl: './rectangle-toolbar.component.html',
  styleUrls: ['../../toolbar.component.scss'],
})
export class RectangleToolbarComponent extends AbstractToolbarEntry {
  @Input()
  toolProperties: RectangleToolProperties;

  rectangleContourTypes = RectangleContourType;
  rectangleContourNames = Object.values(this.rectangleContourTypes);
}
