import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-audio-to-text-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './audio-to-text-page.component.html',
    styleUrl: './audio-to-text-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent { }
