import { Component } from '@angular/core';
import { AbstractToolbarEntry } from 'src/app/components/pages/editor/toolbar/abstract-toolbar-entry/abstract-toolbar-entry';
import { EllipseContourType, EllipseToolProperties } from 'src/app/models/tool-properties/ellipse-tool-properties';
import { ToolType } from 'src/app/models/tools/tool';
import { EditorService } from '../../../../../services/editor.service';

@Component({
  selector: 'app-ellipse-toolbar',
  templateUrl: './ellipse-toolbar.component.html',
  styleUrls: ['../toolbar/toolbar.component.scss'],
})
export class EllipseToolbarComponent extends AbstractToolbarEntry<EllipseToolProperties> {
  ellipseContourTypes = EllipseContourType;
  ellipseContourNames = Object.values(this.ellipseContourTypes);

  constructor(protected editorService: EditorService) {
    super(editorService, ToolType.Ellipse);
  }
}
