import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AbstractModalComponent } from '../../../shared/abstract-modal/abstract-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    previousDrawings = false;
    constructor(private dialog: MatDialog) {}

    openCreateModal(): void {
        this.dialog.open(AbstractModalComponent, {});
    }
}
