import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/utils/color/color';

export interface EditorParams {
    surfaceWidth: number;
    surfaceHeight: number;
    surfaceColor: Color;
}

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
    params: EditorParams = { surfaceColor: Color.WHITE, surfaceHeight: 0, surfaceWidth: 0 };

    constructor(private router: ActivatedRoute) {}

    ngOnInit() {
        this.router.params.subscribe((params) => {
            this.params.surfaceWidth = params.width ? +params.width : 500;
            this.params.surfaceHeight = params.height ? +params.height : 300;
            this.params.surfaceColor = params.color ? Color.hex(params.color) : Color.WHITE;
        });
    }
}
