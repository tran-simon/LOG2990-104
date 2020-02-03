import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BienvenueComponent } from './Bienvenue/bienvenue.component';
import { Sujet1Component } from './sujet1/sujet1.component';
import { Sujet2Component } from './sujet2/sujet2.component';
import { Sujet3Component } from './sujet3/sujet3.component';
import { Sujet4Component } from './sujet4/sujet4.component';
import { Sujet5Component } from './sujet5/sujet5.component';
import { Sujet6Component } from './sujet6/sujet6.component';
import { UserGuideComponent } from './user-guide/user-guide.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    UserGuideComponent,
    BienvenueComponent,
    Sujet1Component,
    Sujet2Component,
    Sujet3Component,
    Sujet4Component,
    Sujet5Component,
    Sujet6Component,
  ],
})
export class UserGuideModule {}
