import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SujetGuideComponent } from './sujetGuide/sujetGuide.component';
import { UserGuideComponent } from './user-guide/user-guide.component';

@NgModule({
    imports: [SharedModule],
    declarations: [UserGuideComponent, SujetGuideComponent],
})
export class UserGuideModule {}
