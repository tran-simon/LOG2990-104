import { NgModule } from '@angular/core';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { EraserToolbarComponent } from 'src/app/components/pages/editor/toolbar/eraser-toolbar/eraser-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { EllipseToolbarComponent } from './ellipse-toolbar/ellipse-toolbar.component';
import { GridToolbarComponent } from './grid-toolbar/grid-toolbar.component';
import { PolygonToolbarComponent } from './polygon-toolbar/polygon-toolbar.component';
import { RectangleToolbarComponent } from './rectangle-toolbar/rectangle-toolbar.component';
import { SprayToolbarComponent } from './spray-toolbar/spray-toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    PenToolbarComponent,
    BrushToolbarComponent,
    RectangleToolbarComponent,
    LineToolbarComponent,
    EllipseToolbarComponent,
    PolygonToolbarComponent,
    SprayToolbarComponent,
    EraserToolbarComponent,
    GridToolbarComponent,
  ],
  imports: [SharedModule],
  exports: [
    ToolbarComponent,
    PenToolbarComponent,
    BrushToolbarComponent,
    RectangleToolbarComponent,
    LineToolbarComponent,
    GridToolbarComponent,
    EllipseToolbarComponent,
    PolygonToolbarComponent,
    SprayToolbarComponent,
    EraserToolbarComponent,
  ],
})
export class ToolbarModule {}