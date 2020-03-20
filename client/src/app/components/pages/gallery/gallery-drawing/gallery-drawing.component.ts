import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Drawing } from 'src/app/models/drawing';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gallery-drawing',
  templateUrl: './gallery-drawing.component.html',
  styleUrls: ['./gallery-drawing.component.scss'],
})
export class GalleryDrawingComponent {
  @Input() drawing: Drawing;

  constructor(private sanitizer: DomSanitizer, private apiService: APIService) {}

  get previewURL(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.drawing.previewURL);
  }

  delete(): void {
    this.apiService.deleteDrawing();
  }
}
