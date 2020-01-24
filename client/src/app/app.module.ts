import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EditorModule } from './components/pages/editor/editor.module';
import { EditorComponent } from './components/pages/editor/editor/editor.component';
import { HomeModule } from './components/pages/home/home.module';
import { HomeComponent } from './components/pages/home/home/home.component';
import { UserGuideModule } from './components/pages/user-guide/user-guide.module';
import { UserGuideComponent } from './components/pages/user-guide/user-guide/user-guide.component';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'edit', component: EditorComponent },
            { path: 'help', component: UserGuideComponent },
        ]),
        HomeModule,
        EditorModule,
        UserGuideModule,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
