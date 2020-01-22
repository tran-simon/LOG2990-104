import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material';

import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'edit', component: EditorComponent },
            { path: 'help', component: UserGuideComponent },
        ]),
        BrowserAnimationsModule,
        MatSliderModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
    ],
    entryComponents: [AbstractModalComponent],
    declarations: [AppComponent, HomeComponent, AbstractModalComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
