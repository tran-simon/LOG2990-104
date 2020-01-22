import { NgModule } from '@angular/core';
import { CommonModuleModule } from '../../common-module/common-module.module';
import { EditorComponent } from './editor/editor.component';

@NgModule({
    imports: [CommonModuleModule],
    declarations: [EditorComponent],
})
export class EditorModuleModule {}
