import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';
import { AppComponent } from './app.component';
import { EditorModule } from './components/pages/editor/editor.module';
import { EditorComponent } from './components/pages/editor/editor/editor.component';
import { HomeModule } from './components/pages/home/home.module';
import { HomeComponent } from './components/pages/home/home/home.component';
import { SaveDrawingModule } from './components/pages/save-drawing/save-drawing.module';
import { SaveDrawingModalComponent } from './components/pages/save-drawing/save-drawing/save-drawing-modal.component';
import { UserGuideModule } from './components/pages/user-guide/user-guide.module';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    EditorModule,
    UserGuideModule,
    SaveDrawingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'edit', component: EditorComponent },
    ]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  entryComponents: [UserGuideModalComponent, SaveDrawingModalComponent],
})
export class AppModule {}
