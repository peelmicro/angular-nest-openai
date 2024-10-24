import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent, GptMessageOrtographyComponent } from "@components/index";
import { TextMessageBoxFileComponent } from "../../components/text-boxes/text-message-box-file/text-message-box-file.component";
import { TextMessageBoxSelectComponent } from "../../components/text-boxes/text-message-box-select/text-message-box-select.component";
import { Message } from "@interfaces/message.interface";
import { OpenAiService } from "app/presentation/services/open-ai.service";

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    GptMessageOrtographyComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './orthography-page.component.html',
  styleUrl: './orthography-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.openAiService.checkOrthography(prompt)
      .subscribe((resp: { message: string; userScore: number; errors: string[]; }) => {
        this.isLoading.set(false);

        this.messages.update(prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
            info: {
              message: resp.message,
              userScore: resp.userScore,
              errors: resp.errors
            },
          }
        ])
      })
  }
}
