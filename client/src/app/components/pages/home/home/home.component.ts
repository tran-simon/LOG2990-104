import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CreateDrawingModalComponent } from '../create-drawing-modal/create-drawing-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  previousDrawings = false;
  constructor(private router: Router, private dialog: MatDialog) {}

  openCreateModal(): void {
    this.dialog.open(CreateDrawingModalComponent, {});
  }

  openPage(nextLink: string): void {
    this.router.navigate([nextLink]);
  }
}
