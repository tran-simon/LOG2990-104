import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EditorComponent } from './components/pages/editor/editor.component';
import { HomeComponent } from './components/pages/home/home.component';
import { UserGuideComponent } from './components/pages/user-guide/user-guide.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'edit', component: EditorComponent },
            { path: 'help', component: UserGuideComponent },
        ]),
    ],
    declarations: [AppComponent, HomeComponent, EditorComponent, UserGuideComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
