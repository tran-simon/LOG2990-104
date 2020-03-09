import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EditorService } from 'src/app//services/editor.service';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ExtensionType } from '../extension-type.enum';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss'],
})
export class ExportModalComponent extends AbstractModalComponent {
  selectedExtension: ExtensionType;
  extensions: string[] = Object.values(ExtensionType);
  fullName: string;
  href: SafeResourceUrl;
  name: string;
  previewImage: DrawingSurfaceComponent;
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AbstractModalComponent>,
    private editorService: EditorService,
    private sanitizer: DomSanitizer,
  ) {
    super(dialogRef);
    editorService.clearShapesBuffer();
    this.previewImage = this.editorService.view;
    this.name = '';
    this.selectedExtension = ExtensionType.SVG;
    this.exportSVGElement();
    this.formGroup = new FormGroup({});
  }

  previewURL(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.editorService.createDataURL(this.previewImage));
  }

  exportSVGElement(): void {
    this.href = this.previewURL();
  }

  exportImageElement(): void {
    const image = new Image();
    const canvas = document.createElement('canvas');
    image.src = this.editorService.createDataURL(this.previewImage);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    image.onload = () => {
      canvas.width = this.previewImage.width;
      canvas.height = this.previewImage.height;
      ctx.drawImage(image, 0, 0);
      this.href = canvas.toDataURL(`image/${this.selectedExtension}`);
    };
  }

  changeName(): void {
    this.fullName = this.name + '.' + this.selectedExtension;
  }

  changeExtension(): void {
    this.fullName = this.name + '.' + this.selectedExtension;
    this.selectedExtension === ExtensionType.SVG ? this.exportSVGElement() : this.exportImageElement();
  }

  submit(): void {
    if (!this.formGroup.invalid) {
      this.dialogRef.close();
    }
  }
}
