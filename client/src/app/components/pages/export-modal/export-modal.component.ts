import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EditorService } from 'src/app//services/editor.service';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss'],
})
export class ExportModalComponent extends AbstractModalComponent {
  selectedExtension: string;
  fullName: string;
  name: string;
  extensions: string[] = ['svg', 'png', 'jpg'];
  previewImage: DrawingSurfaceComponent;

  constructor(
    public dialogRef: MatDialogRef<AbstractModalComponent>,
    public editorService: EditorService,
    private sanitizer: DomSanitizer,
  ) {
    super(dialogRef);
    this.previewImage = this.editorService.view;
  }

  previewURL(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.editorService.createDataURL(this.previewImage));
  }

  submit(): void {
    this.fullName = this.name + '.' + this.selectedExtension;
    console.log(this.fullName);
    if (this.name !== 'undefined' && this.selectedExtension !== 'undefined') {
      console.log(this.selectedExtension);
      this.editorService.exportSVGElement(this.fullName, this.previewImage);
    }
    this.dialogRef.close();
  }
}
