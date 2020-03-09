import { NgModule } from '@angular/core';
import { ToolbarModule } from 'src/app/components/pages/editor/toolbar/toolbar.module';
import { ExportModalComponent } from 'src/app/components/pages/export-modal/export-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { DrawingSurfaceComponent } from './drawing-surface/drawing-surface.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  imports: [SharedModule, ToolbarModule],
  declarations: [DrawingSurfaceComponent, EditorComponent, ExportModalComponent],
  exports: [EditorComponent],
})
export class EditorModule { }
