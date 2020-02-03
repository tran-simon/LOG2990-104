import { Component } from '@angular/core';

@Component({
    selector: 'app-user-guide',
    templateUrl: './user-guide.component.html',
    styleUrls: ['./user-guide.component.scss'],
})
export class UserGuideComponent {
    opened: boolean;
    previous() {
        console.log('previous');
    }
    next() {
        console.log('next');
    }
}
