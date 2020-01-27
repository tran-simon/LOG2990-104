import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface EditorParams {
    surfaceWidth: number;
    surfaceHeight: number;
    surfaceColor: number; // Change when Color type implemented
}

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
    private params: EditorParams = { surfaceColor: 0, surfaceHeight: 0, surfaceWidth: 0 };

    constructor(private router: ActivatedRoute) {}

    ngOnInit() {
        this.router.params.subscribe(params => {
            this.params.surfaceWidth = +params.width || 500;
            this.params.surfaceHeight = +params.height || 300;
            this.params.surfaceColor = +params.color; // Change when Color type implemented
        });
    }
}
