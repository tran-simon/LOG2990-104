import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { TagInputComponent } from 'src/app/components/shared/inputs/tag-input/tag-input.component';
import { Drawing } from 'src/app/models/drawing';

@Component({
  selector: 'app-save-drawing-modal',
  templateUrl: './save-drawing-modal.component.html',
  styleUrls: ['./save-drawing-modal.component.scss'],
})
export class SaveDrawingModalComponent extends AbstractModalComponent {
  tags: TagInputComponent[];
  name: string;

  constructor(public dialogRef: MatDialogRef<AbstractModalComponent>) {
    super(dialogRef);
    this.tags = [new TagInputComponent()];
    this.name = '';
  }

  saveDrawing(): void {
    const tagValues: string[] = [];

    this.tags.forEach((tag: TagInputComponent) => {
      tagValues.push(tag.value);
    });

    const drawing = new Drawing(this.name, tagValues, '');
    console.log(drawing);
    this.dialogRef.close();
  }

  addTag(): void {
    this.tags.push(new TagInputComponent());
  }

  removeTag(): void {
    this.tags.pop();
  }
}
