import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DrawingSurfaceComponent } from './drawing-surface/drawing-surface.component';
import { EditorComponent } from './editor/editor.component';
import { BrushToolbarComponent } from './toolbar/toolbar-entries/brush-toolbar/brush-toolbar.component';
import { LineToolbarComponent } from './toolbar/toolbar-entries/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from './toolbar/toolbar-entries/pen-toolbar/pen-toolbar.component';
import { RectangleToolbarComponent } from './toolbar/toolbar-entries/rectangle-toolbar/rectangle-toolbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    DrawingSurfaceComponent,
    EditorComponent,
    ToolbarComponent,
    PenToolbarComponent,
    BrushToolbarComponent,
    RectangleToolbarComponent,
    LineToolbarComponent,
    LineToolbarComponent,
  ],
  exports: [EditorComponent],
})
export class EditorModule {}
