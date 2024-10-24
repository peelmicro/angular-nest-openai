import { Logger } from '@nestjs/common';
import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {

  const logger = new Logger(orthographyCheckUseCase.name);

  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
        Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
        Debes de responder en formato JSON, 
        tu tarea es corregirlos y retornar información soluciones, 
        también debes de dar un porcentaje de acierto por el usuario,
        
        Si no hay errores, debes de retornar un mensaje de felicitaciones.

        Ejemplo de salida:
        {
          userScore: number,
          errors: string[], // ['error -> solución']
          message: string, //  Usa emojis y texto para felicitar al usuario
        }
        `
      },
      {
        role: 'user',
        content: prompt,
      }
    ],
    // model: "gpt-3.5-turbo-1106",
    model: "gpt-4o",
    temperature: 0.3,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: 'json_object'
    }
  });

  const content = completion.choices[0].message.content;
  if (content === null) {
    throw new Error("Completion content is null");
  }
  const jsonResp = JSON.parse(content);

  return jsonResp;

}