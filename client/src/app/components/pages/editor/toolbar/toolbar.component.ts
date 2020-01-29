import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';

enum Tool {
    Crayon,
    Pinceau,
    Rectangle,
    Ligne,
    ColorPicker,
}

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
    @ViewChild('drawer', { static: false })
    drawer: MatDrawer;

    tools = Tool;

    epaisseurCrayon = 50;
    epaisseurPinceau = 50;
    minEpaisseur = 1;
    maxEpaisseur = 100;
    stepEpaisseur = 0.1;
    selectedTool: Tool;

    constructor(private router: Router) {}

    selectTool(selection: Tool) {
        if (this.selectedTool === selection) {
            if (this.drawer.opened) {
                this.drawer.close();
            } else {
                this.drawer.open();
            }
        } else {
            this.selectedTool = selection;
            this.drawer.open();
        }
    }

    goHome() {
        this.router.navigate(['']);
    }
}
