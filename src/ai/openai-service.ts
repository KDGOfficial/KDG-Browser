export class OpenAIService {
  private apiKey: string = '';

  constructor(apiKey?: string) {
    if (apiKey) this.apiKey = apiKey;
  }

  async generateText(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error("Ключ OpenAI API не настроен. Пожалуйста, используйте Google Gemini API в настройках.");
    }
    
    // In future, this could make a fetch request to OpenAI chat completions endpoint:
    // https://api.openai.com/v1/chat/completions
    // For now we throw an error pointing to Gemini as our primary engine.
    throw new Error("Интеграция с OpenAI находится на стадии разработки. Воспользуйтесь основным ИИ-движком Google Gemini.");
  }
}
