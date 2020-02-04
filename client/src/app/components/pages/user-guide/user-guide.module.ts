import { NgModule } from '@angular/core';
import { Subject1Component } from 'src/app/components/pages/user-guide/subject1/subject1.component';
import { Subject2Component } from 'src/app/components/pages/user-guide/subject2/subject2.component';
import { Subject3Component } from 'src/app/components/pages/user-guide/subject3/subject3.component';
import { Subject4Component } from 'src/app/components/pages/user-guide/subject4/subject4.component';
import { Subject5Component } from 'src/app/components/pages/user-guide/subject5/subject5.component';
import { Subject6Component } from 'src/app/components/pages/user-guide/subject6/subject6.component';
import { WelcomeComponent } from 'src/app/components/pages/user-guide/welcome/welcome.component';
import { SharedModule } from '../../shared/shared.module';
import { UserGuideComponent } from './user-guide/user-guide.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    UserGuideComponent,
    WelcomeComponent,
    Subject1Component,
    Subject2Component,
    Subject3Component,
    Subject4Component,
    Subject5Component,
    Subject6Component,
  ],
})
export class UserGuideModule {}
