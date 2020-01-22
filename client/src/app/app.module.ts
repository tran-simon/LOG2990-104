import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModuleModule } from './components/common-module/common-module.module';
import { EditorModuleModule } from './components/pages/editor-module/editor-module.module';
import { EditorComponent } from './components/pages/editor-module/editor/editor.component';
import { HomeModuleModule } from './components/pages/home-module/home-module.module';
import { HomeComponent } from './components/pages/home-module/home/home.component';
import { UserGuideModuleModule } from './components/pages/user-guide-module/user-guide-module.module';
import { UserGuideComponent } from './components/pages/user-guide-module/user-guide/user-guide.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModuleModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'edit', component: EditorComponent },
            { path: 'help', component: UserGuideComponent },
        ]),
        HomeModuleModule,
        EditorModuleModule,
        UserGuideModuleModule,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
