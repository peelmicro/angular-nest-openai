import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent, TextMessageBoxEvent } from "@components/index";
import { TextMessageBoxFileComponent, TextMessageEvent } from "../../components/text-boxes/text-message-box-file/text-message-box-file.component";
import { TextMessageBoxSelectComponent } from "../../components/text-boxes/text-message-box-select/text-message-box-select.component";
import { Message } from "@interfaces/message.interface";
import { OpenAiService } from "app/presentation/services/open-ai.service";

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
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

  public messages = signal<Message[]>([ { text: 'Hola Mundo', isGpt: false } ]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiService );  

  handleMessage(prompt: string) {
    console.log({ prompt });
  }

  handleMessageWithFile( { prompt, file }: TextMessageEvent ) {
    console.log({ prompt, file });
  }

  handleMessageWithSelect( event: TextMessageBoxEvent ) {
    console.log(event);
  }  
}
