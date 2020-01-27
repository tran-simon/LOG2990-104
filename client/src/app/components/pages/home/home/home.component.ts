import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    previousDrawings = false;
    constructor(private router: Router) {}

    openCreateModal(nextLink: string): void {
        this.router.navigate([nextLink]);
    }
}
