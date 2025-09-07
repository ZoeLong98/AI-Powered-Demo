import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';
import fs from 'fs';
import path from 'path';
import { llmClient as client } from '../llm/client';

const parkInfo = fs
  .readFileSync(path.join(__dirname, '..', 'prompts', 'WonderWorld.md'))
  .toString();
const instructions = template.replace('{{parkInfo}}', parkInfo);

type ChatResponse = {
  id: string;
  message: string;
};

// Public Interface
export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    const response = await client.generateText({
      model: 'gpt-4.1',
      prompt,
      instructions: instructions,
      temperature: 0.2,
      maxTokens: 500,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
    });

    return { id: response.id, message: response.output_text };
  },
};
