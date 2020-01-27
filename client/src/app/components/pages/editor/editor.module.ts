import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DrawingSurfaceComponent } from './drawing-surface/drawing-surface.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
    imports: [SharedModule],
    declarations: [EditorComponent, DrawingSurfaceComponent],
})
export class EditorModule {}
