import { NgModule } from '@angular/core';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { RectangleToolbarComponent } from './rectangle-toolbar/rectangle-toolbar.component';

@NgModule({
  declarations: [ToolbarComponent, PenToolbarComponent, BrushToolbarComponent, RectangleToolbarComponent, LineToolbarComponent],
  imports: [SharedModule],
  exports: [ToolbarComponent, PenToolbarComponent, BrushToolbarComponent, RectangleToolbarComponent, LineToolbarComponent],
})
export class ToolbarModule {}
