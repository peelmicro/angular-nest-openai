import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-orthography-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './orthography-page.component.html',
    styleUrl: './orthography-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent { }
