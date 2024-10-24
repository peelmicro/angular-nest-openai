import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-ortography',
  standalone: true,
  imports: [
  ],
  templateUrl: './gpt-message-ortography.component.html',
  styleUrl: './gpt-message-ortography.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrtographyComponent {
  @Input({ required: true }) userScore!: number;
  @Input({ required: true }) text!: string;
  @Input() errors: string[] = [];  
}
