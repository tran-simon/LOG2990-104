import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { KeyboardEventHandler } from 'src/app/utils/events/KeyboardEventHandler';
import { KeyboardListener } from 'src/app/utils/events/KeyboardListener';
import { CreateDrawingModalComponent } from '../create-drawing-modal/create-drawing-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements KeyboardEventHandler {
    previousDrawings = false;
    keyboardListener: KeyboardListener = new KeyboardListener(this);
    modalIsOpened = false;

    constructor(private router: Router, private dialog: MatDialog) {}

    openCreateModal(): void {
        if (!this.modalIsOpened) {
            this.dialog
                .open(CreateDrawingModalComponent, {})
                .afterClosed()
                .subscribe(() => {
                    this.modalIsOpened = false;
                });
            this.modalIsOpened = true;
        }
    }

    openPage(nextLink: string): void {
        this.router.navigate([nextLink]);
    }

    @HostListener('window:keydown', ['$event'])
    keyDown(event: KeyboardEvent): void {
        this.keyboardListener.keyDown(event);
    }

    ctrlO(event: KeyboardEvent): boolean {
        this.openCreateModal();
        return true;
    }

    ctrlE(event: KeyboardEvent): boolean {
        return true;
    }

    ctrlG(event: KeyboardEvent): boolean {
        return true;
    }

    ctrlS(event: KeyboardEvent): boolean {
        return true;
    }
}
