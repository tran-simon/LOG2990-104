import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { TagInputComponent } from 'src/app/components/shared/inputs/tag-input/tag-input.component';
import { Drawing } from 'src/app/models/drawing';
import { APIService } from 'src/app/services/api.service';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'app-save-drawing-modal',
  templateUrl: './save-drawing-modal.component.html',
  styleUrls: ['./save-drawing-modal.component.scss'],
})
export class SaveDrawingModalComponent extends AbstractModalComponent {
  tags: TagInputComponent[];
  name: string;
  errorMessage: string;
  formGroup: FormGroup;

  constructor(
    private apiService: APIService,
    private editorService: EditorService,
    public dialogRef: MatDialogRef<AbstractModalComponent>,
    private sanitizer: DomSanitizer,
  ) {
    super(dialogRef);
    this.tags = [new TagInputComponent()];
    this.name = '';
    this.errorMessage = '';
    this.formGroup = new FormGroup({});
  }

  saveDrawing(): void {
    const tagValues: string[] = [];

    this.tags.forEach((tag: TagInputComponent) => {
      tagValues.push(tag.value);
    });

    const data = JSON.stringify(this.editorService.shapes);
    const drawing = new Drawing(this.name, tagValues, data);

    this.apiService.uploadDrawing(drawing);

    this.dialogRef.close();
  }

  addTag(): void {
    this.tags.push(new TagInputComponent());
  }

  removeTag(): void {
    this.tags.pop();
  }

  previewURL(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.editorService.createDataURL(this.editorService.view));
  }
}
