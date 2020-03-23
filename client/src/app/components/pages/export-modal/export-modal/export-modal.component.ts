import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { EditorService } from 'src/app//services/editor.service';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ImageExportService } from 'src/app/services/image-export.service';
import { ExtensionType } from '../extension-type.enum';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss'],
})
export class ExportModalComponent extends AbstractModalComponent {
  selectedExtension: ExtensionType;
  extensions: string[] = Object.values(ExtensionType);
  href: SafeResourceUrl;
  name: string;
  previewImage: DrawingSurfaceComponent;
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AbstractModalComponent>,
    private editorService: EditorService,
    private imageExportService: ImageExportService
  ) {
    super(dialogRef);
    editorService.clearShapesBuffer();
    this.previewImage = this.editorService.view;
    this.name = '';
    this.selectedExtension = ExtensionType.SVG;
    this.imageExportService.exportSVGElement(this.previewImage);
    this.formGroup = new FormGroup({});
  }

  get fullName(): string {
    return this.name + '.' + this.selectedExtension;
  }

  changeExtension(): void {
    this.selectedExtension === ExtensionType.SVG ? this.imageExportService.exportSVGElement(this.previewImage) :
      this.imageExportService.exportImageElement(this.previewImage, this.selectedExtension);
  }

  submit(): void {
    if (!this.formGroup.invalid) {
      this.dialogRef.close();
    }
  }

  get previewURL(): SafeResourceUrl {
    return this.imageExportService.exportSVGElement(this.previewImage);
  }
}
