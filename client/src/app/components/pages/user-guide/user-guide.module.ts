import { NgModule } from '@angular/core';
import { CouleurComponent } from 'src/app/components/pages/user-guide/Couleur/couleur.component';
import { CrayonComponent } from 'src/app/components/pages/user-guide/Crayon/crayon.component';
import { LigneComponent } from 'src/app/components/pages/user-guide/Ligne/ligne.component';
import { PinceauComponent } from 'src/app/components/pages/user-guide/Pinceau/pinceau.component';
import { RectangleComponent } from 'src/app/components/pages/user-guide/Rectangle/rectangle.component';
import { WelcomeComponent } from 'src/app/components/pages/user-guide/welcome/welcome.component';
import { SharedModule } from '../../shared/shared.module';
import { UserGuideComponent } from './user-guide/user-guide.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    UserGuideComponent,
    WelcomeComponent,
    CrayonComponent,
    LigneComponent,
    PinceauComponent,
    RectangleComponent,
    CouleurComponent,
  ],
})
export class UserGuideModule {}
