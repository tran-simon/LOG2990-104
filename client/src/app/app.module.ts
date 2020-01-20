import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot([{ path: '', component: HomeComponent }])],
    declarations: [AppComponent, HomeComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
