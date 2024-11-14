import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async( openai: OpenAI, options: Options ) => {

  const { threadId, assistantId = 'asst_EkJH6X4NuZZsU4RcXdPf95Hu' } = options;

  const run = await openai.beta.threads.runs.create( threadId, {
    assistant_id: assistantId,
    // instructions; // OJO! Sobrescribe el asistente
  });

  console.log({run});

  return run;

}