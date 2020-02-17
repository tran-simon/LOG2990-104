import { Component, Input } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/toolbar-entries/abstract-toolbar-entry';
import { PenToolProperties } from 'src/app/models/tool-properties/pen-tool-properties';

@Component({
  selector: 'app-pen-toolbar',
  templateUrl: './pen-toolbar.component.html',
  styleUrls: ['../../toolbar.component.scss'],
})
export class PenToolbarComponent extends AbstractToolbarEntry {
  @Input()
  toolProperties: PenToolProperties;
}
