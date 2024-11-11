import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import { 
  prosConsDiscusserUseCase, 
  orthographyCheckUseCase, 
  prosConsDicusserStreamUseCase, 
  translateUseCase, 
  textToAudioUseCase, 
  audioToTextUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,  
} from './use-cases';
import { 
  AudioToTextDto, 
  OrthographyDto, 
  ProsConsDiscusserDto, 
  TextToAudioDto, 
  TranslateDto,
  ImageGenerationDto,
  ImageVariationDto,  
 } from './dtos';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class GptService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  // Solo va a llamar casos de uso
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt
    });
  }

  async prosConsDicusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt
    });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async translateText(translateDto: TranslateDto) {
    return await translateUseCase(this.openai, {
      prompt: translateDto.prompt,
      lang: translateDto.lang
    });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios/',
      `${fileId}.mp3`,
    );

    const wasFound = fs.existsSync(filePath);

    if (!wasFound) throw new NotFoundException(`File ${fileId} not found`);

    return filePath;
  }

  async audioToText(audioFile: Express.Multer.File, audioToTextDto?: AudioToTextDto) {
    const { prompt } = audioToTextDto as AudioToTextDto;
    return await audioToTextUseCase(this.openai, { audioFile, prompt });
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, { ...imageGenerationDto });
  }

  getGeneratedImage(fileName: string) {

    const filePath = path.resolve('./', './generated/images/', fileName);
    const exists = fs.existsSync(filePath);

    if (!exists) {
      throw new NotFoundException('File not found');
    }

    return filePath;
  }

  async geneateImageVariation({ baseImage }: ImageVariationDto) {
    return imageVariationUseCase(this.openai, { baseImage });
  }

}