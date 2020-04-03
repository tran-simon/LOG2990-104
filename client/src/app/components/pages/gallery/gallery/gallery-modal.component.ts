import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { Drawing } from 'src/app/models/drawing';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss'],
})
export class GalleryModalComponent extends AbstractModalComponent {
  drawings: Drawing[];
  nameQuery: string;
  tagsQuery: string;

  constructor(public dialogRef: MatDialogRef<AbstractModalComponent>, private apiService: APIService) {
    super(dialogRef);

    this.drawings = [];
    this.nameQuery = '';
    this.tagsQuery = '';
    this.fetchDrawings();
  }

  updateDrawings(): void {
    this.apiService.searchDrawings(this.nameQuery, this.tagsQuery.replace(/ /g, '')).subscribe((drawings: Drawing[]) => {
      this.drawings = drawings;
    });
  }

  fetchDrawings(): void {
    this.apiService.getAllDrawings().subscribe((drawings: Drawing[]) => {
      this.drawings = drawings;
    });
  }
}
