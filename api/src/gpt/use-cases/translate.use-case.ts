import { Logger } from '@nestjs/common';
import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {

  const logger = new Logger(translateUseCase.name);

  const { prompt, lang } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        Traduce el siguiente texto al idioma ${lang}:${ prompt }
        `
      }
    ],
    model: "gpt-4o",
    temperature: 0.2,
    // max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const content = completion.choices[0].message.content;
  if (content === null) {
    throw new Error("Completion content is null");
  }

  return {
    message: content,
    lang
  }

}