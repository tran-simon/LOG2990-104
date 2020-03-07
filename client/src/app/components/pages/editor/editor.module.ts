import { NgModule } from '@angular/core';
import { ToolbarModule } from 'src/app/components/pages/editor/toolbar/toolbar.module';
import { MouselongpressDirective } from '../../../utils/events/mouselongpress.directive';
import { SharedModule } from '../../shared/shared.module';
import { DrawingSurfaceComponent } from './drawing-surface/drawing-surface.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  imports: [SharedModule, ToolbarModule],
  declarations: [DrawingSurfaceComponent, EditorComponent, MouselongpressDirective],
  exports: [EditorComponent],
})
export class EditorModule {}
