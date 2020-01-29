import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';

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

    toggleCrayonOptions() {
        if (this.selectedTool == this.tools.Crayon) {
            if (this.drawer.opened) {
                this.drawer.close();
            } else {
                this.drawer.open();
            }
        } else {
            this.selectedTool = this.tools.Crayon;
            this.drawer.open();
        }
    }

    togglePinceauOptions() {
        if (this.selectedTool == this.tools.Pinceau) {
            if (this.drawer.opened) {
                this.drawer.close();
            } else {
                this.drawer.open();
            }
        } else {
            this.selectedTool = this.tools.Pinceau;
            this.drawer.open();
        }
    }

    toggleRectangleOptions() {
        if (this.selectedTool == this.tools.Rectangle) {
            if (this.drawer.opened) {
                this.drawer.close();
            } else {
                this.drawer.open();
            }
        } else {
            this.selectedTool = this.tools.Rectangle;
            this.drawer.open();
        }
    }

    toggleLigneOptions() {
        if (this.selectedTool == this.tools.Ligne) {
            if (this.drawer.opened) {
                this.drawer.close();
            } else {
                this.drawer.open();
            }
        } else {
            this.selectedTool = this.tools.Ligne;
            this.drawer.open();
        }
    }

    toggleColorPickerOptions() {
        if (this.selectedTool == this.tools.ColorPicker) {
            if (this.drawer.opened) {
                this.drawer.close();
            } else {
                this.drawer.open();
            }
        } else {
            this.selectedTool = this.tools.ColorPicker;
            this.drawer.open();
        }
    }
}
