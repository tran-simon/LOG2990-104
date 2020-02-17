import { Component, Input } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/toolbar-entries/abstract-toolbar-entry';
import { BrushTextureType, BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';

@Component({
  selector: 'app-brush-toolbar',
  templateUrl: './brush-toolbar.component.html',
  styleUrls: ['../../toolbar.component.scss'],
})
export class BrushToolbarComponent extends AbstractToolbarEntry {
  @Input()
  toolProperties: BrushToolProperties;

  brushTextureNames = Object.values(BrushTextureType);
}
