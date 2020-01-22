import { NgModule } from '@angular/core';
import { CommonModuleModule } from '../../common-module/common-module.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [CommonModuleModule],
    declarations: [HomeComponent],
})
export class HomeModuleModule {}
