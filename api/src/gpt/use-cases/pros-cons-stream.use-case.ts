import { Logger } from '@nestjs/common';
import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserStreamUseCase = async (openai: OpenAI, { prompt }: Options) => {

  const logger = new Logger(prosConsDicusserStreamUseCase.name);

  const content = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
        la respuesta debe de ser en formato markdown,
        los pros y contras deben de estar en una lista,
        `
      },
      {
        role: 'user',
        content: prompt,
      }
    ],
    model: "gpt-4o",
    temperature: 0.8,
    max_tokens: 500,
    top_p: 1,
    stream: true,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: 'text'
    }
  });

  // logger.debug(`Completion: ${JSON.stringify(completion)}`);
  // const content = completion.choices[0].message;
  // if (content === null) {
  //   throw new Error("Completion content is null");
  // }

  return content;

}