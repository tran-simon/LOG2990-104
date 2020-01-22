import { NgModule } from '@angular/core';
import { CommonModuleModule } from '../../common-module/common-module.module';
import { UserGuideComponent } from './user-guide/user-guide.component';

@NgModule({
    imports: [CommonModuleModule],
    declarations: [UserGuideComponent],
})
export class UserGuideModuleModule {}
