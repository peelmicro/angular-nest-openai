import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TypingLoaderComponent, MyMessageComponent, ChatMessageComponent, TextMessageBoxComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/open-ai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,    
  ],
  templateUrl: './pros-cons-page.component.html',
  styleUrl: './pros-cons-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent { 
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );

  handleMessage( prompt: string ) {
    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.openAiService.prosConsDiscusser(prompt)
      .subscribe((resp: { role: string; content: string; }) => {
        this.isLoading.set(false);

        this.messages.update(prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.content,
          }
        ])
      })

  }
}
