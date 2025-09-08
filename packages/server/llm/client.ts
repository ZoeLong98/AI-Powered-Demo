import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateTextOptions = {
  model?: string;
  prompt: string;
  instructions?: string;
  temperature?: number;
  maxTokens?: number;
  previous_response_id?: string;
};

type GenerateTextResponse = {
  id: string;
  output_text: string;
};

export const llmClient = {
  async generateText({
    model = 'gpt-4.1',
    prompt,
    instructions,
    temperature = 0.2,
    maxTokens = 500,
    previous_response_id,
  }: GenerateTextOptions): Promise<GenerateTextResponse> {
    const response = await client.responses.create({
      model,
      input: prompt,
      instructions,
      temperature,
      max_output_tokens: maxTokens,
      previous_response_id,
    });
    return { id: response.id, output_text: response.output_text };
  },
};
