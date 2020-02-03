import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserGuideComponent } from './user-guide/user-guide.component';

@NgModule({
  imports: [SharedModule],
  declarations: [UserGuideComponent],
})
export class UserGuideModule {}
