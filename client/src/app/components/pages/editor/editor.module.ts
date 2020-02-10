import { AfterViewInit, NgModule, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DrawingSurfaceComponent } from './drawing-surface/drawing-surface.component';
import { EditorComponent } from './editor/editor.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [SharedModule],
  declarations: [DrawingSurfaceComponent, EditorComponent, ToolbarComponent],
  exports: [EditorComponent],
})
export class EditorModule implements AfterViewInit {
  @ViewChild('toolbar', { static: false })
  toolbar: ToolbarComponent;

  ngAfterViewInit() {
    console.log(this.toolbar.stepthickness);
  }
}
