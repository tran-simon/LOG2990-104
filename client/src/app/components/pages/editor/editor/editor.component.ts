import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/utils/color/color';

export interface EditorParams {
  width: string;
  height: string;
  color: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  surfaceWidth = 0;
  surfaceHeight = 0;
  surfaceColor = Color.WHITE;

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.surfaceWidth = params.width ? +params.width : 500;
      this.surfaceHeight = params.height ? +params.height : 300;
      this.surfaceColor = params.color ? Color.hex(params.color) : Color.WHITE;
    });
  }
}
