import { NgModule } from '@angular/core';
import { ToolbarModule } from 'src/app/components/pages/editor/toolbar/toolbar.module';
import { SharedModule } from '../../shared/shared.module';
import { DrawingSurfaceComponent } from './drawing-surface/drawing-surface.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  imports: [SharedModule, ToolbarModule],
  declarations: [DrawingSurfaceComponent, EditorComponent],
  exports: [DrawingSurfaceComponent, EditorComponent],
})
export class EditorModule {}
