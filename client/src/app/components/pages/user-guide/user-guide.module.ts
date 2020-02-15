import { NgModule } from '@angular/core';
import { BrushGuideComponent } from 'src/app/components/pages/user-guide/brush-guide/brush-guide.component';
import { ColorGuideComponent } from 'src/app/components/pages/user-guide/color-guide/color-guide.component';
import { LineGuideComponent } from 'src/app/components/pages/user-guide/line-guide/line-guide.component';
import { PenGuideComponent } from 'src/app/components/pages/user-guide/pen-guide/pen-guide.component';
import { RectangleGuideComponent } from 'src/app/components/pages/user-guide/rectangle-guide/rectangle-guide.component';
import { WelcomeComponent } from 'src/app/components/pages/user-guide/welcome/welcome.component';
import { SharedModule } from '../../shared/shared.module';
import { UserGuideComponent } from './user-guide/user-guide.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    UserGuideComponent,
    WelcomeComponent,
    PenGuideComponent,
    LineGuideComponent,
    BrushGuideComponent,
    RectangleGuideComponent,
    ColorGuideComponent,
  ],
})
export class UserGuideModule {}
