import { Injectable } from '@angular/core';
import { orthographyUseCase, prosConsDiscusserUseCase, prosConsStreamUseCase, textToAudioUseCase, translateTextUseCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  constructor() { }

  checkOrthography( prompt: string ) {
    return from( orthographyUseCase(prompt) ) ;
  }  

  prosConsDiscusser( prompt: string ) {
    return from( prosConsDiscusserUseCase(prompt) ) ;
  }  

  prosConsStreamDiscusser( prompt: string, abortSignal: AbortSignal ) {
    return prosConsStreamUseCase(prompt, abortSignal );
  }

  translateText(prompt: string, lang: string) {
    return from(translateTextUseCase(prompt, lang));
  }

  textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }  

}
