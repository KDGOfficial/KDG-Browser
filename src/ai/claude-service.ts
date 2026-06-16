export class ClaudeService {
  private apiKey: string = '';

  constructor(apiKey?: string) {
    if (apiKey) this.apiKey = apiKey;
  }

  async generateText(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error("Ключ Claude API не настроен. Пожалуйста, используйте Google Gemini API в настройках.");
    }
    
    // In future, this could make a fetch request to Claude's API endpoint.
    // For now we throw an error pointing to Gemini as our primary engine.
    throw new Error("Интеграция с Claude находится на стадии разработки. Воспользуйтесь основным ИИ-движком Google Gemini.");
  }
}
