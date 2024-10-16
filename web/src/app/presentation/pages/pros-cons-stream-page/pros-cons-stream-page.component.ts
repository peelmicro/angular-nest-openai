import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-pros-cons-stream-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './pros-cons-stream-page.component.html',
    styleUrl: './pros-cons-stream-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent { }
