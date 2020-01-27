import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EditorComponent } from './editor/editor.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
    imports: [SharedModule],
    declarations: [EditorComponent, ToolbarComponent],
    exports: [EditorComponent],
})
export class EditorModule {}
