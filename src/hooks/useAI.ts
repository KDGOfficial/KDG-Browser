import { useState } from 'react';
import { getLocalAIResponse } from '../ai/local-models';
import { KDGVideo } from './useYouTube';

export interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

export interface PageContext {
  url: string;
  title: string;
  content?: string;
  selection?: string;
}

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: 'Привет! Я твой ИИ-помощник KDG с функциями Cometa. Я могу ответить на любые вопросы, а также проанализировать видеоролики или текущую веб-страницу!',
      timestamp: Date.now()
    }
  ]);

  const electronAPI = (window as any).electronAPI;

  // 1. Summarize video using Gemini (with local fallback)
  const summarizeVideo = async (video: KDGVideo): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      if (electronAPI?.generateAIContent) {
        const prompt = `Составь краткий обзор (резюме) для игрового прохождения видеоролика под названием: "${video.title}". \nОписание видео: "${video.description}". \nСделай обзор на русском языке, выдели ключевые моменты и напиши, в каком стиле ведется прохождение (лампово, детально, на какой сложности). Обзор должен состоять из 2-3 абзацев.`;
        const response = await electronAPI.generateAIContent({ prompt });
        setLoading(false);
        return response;
      } else {
        throw new Error('Electron API not available');
      }
    } catch (err: any) {
      console.warn('Gemini summary failed, falling back to database summary:', err);
      setLoading(false);
      return video.summary || 'Краткий обзор недоступен для этого видео.';
    }
  };

  // 2. Generate discussion questions/comments using Gemini (with local fallback)
  const generateDiscussionIdeas = async (video: KDGVideo): Promise<string[]> => {
    setLoading(true);
    setError(null);
    try {
      if (electronAPI?.generateAIContent) {
        const prompt = `Проанализируй видеоролик "${video.title}" с описанием "${video.description}". Сгенерируй 3 интересных идеи или вопроса для обсуждения этого видео в комментариях на YouTube. Темы должны быть глубоко связаны с игрой (геймплей, сюжетные решения, билды персонажа). Верни строго список из 3 элементов, разделенных переносом строки, без лишнего текста и нумерации.`;
        const response = await electronAPI.generateAIContent({ prompt });
        setLoading(false);
        const ideas = response
          .split('\n')
          .map((line: string) => line.replace(/^[-*•\d.\s]+/, '').trim())
          .filter((line: string) => line.length > 0)
          .slice(0, 3);
        
        return ideas.length > 0 ? ideas : video.discussionIdeas;
      } else {
        throw new Error('Electron API not available');
      }
    } catch (err) {
      console.warn('Gemini discussion generation failed, falling back to database:', err);
      setLoading(false);
      return video.discussionIdeas;
    }
  };

  // 3. Ask assistant chat message (updates chatHistory state)
  const sendMessage = async (message: string, currentVideo?: KDGVideo, pageContext?: PageContext, imagePart?: any) => {
    if (!message.trim() && !imagePart) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: message || 'Опиши это изображение',
      timestamp: Date.now()
    };

    setChatHistory(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    // Build prompt with context if video or webpage is selected
    let prompt = message || 'Опиши это изображение';
    let systemInstruction = undefined;

    if (pageContext) {
      systemInstruction = `Ты — ИИ-помощник KDG Browser с возможностями Cometa. Ты помогаешь пользователю анализировать открытую веб-страницу.
Информация о странице:
- URL: ${pageContext.url}
- Заголовок: ${pageContext.title}
${pageContext.selection ? `- Выделенный фрагмент текста пользователем: "${pageContext.selection}"` : ''}

Твои ответы должны базироваться на содержимом этой страницы (если применимо). Если пользователь просит пересказать, перевести или объяснить, опирайся строго на переданные данные. Отвечай на русском языке, кратко, грамотно, дружелюбно и по делу.`;

      if (pageContext.content) {
        prompt = `Текст веб-страницы:\n\"\"\"\n${pageContext.content.slice(0, 15000)}\n\"\"\"\n\nЗапрос пользователя: ${prompt}`;
      }
    } else if (currentVideo) {
      systemInstruction = `Ты — экспертный игровой ИИ-помощник для "Канала Доброго Геймера". Ты помогаешь пользователю анализировать видеоролик "${currentVideo.title}". Описание этого видео: "${currentVideo.description}". Твои ответы должны базироваться на этой игре и прохождении. Отвечай кратко, профессионально и в дружелюбном геймерском стиле.`;
    }

    try {
      if (electronAPI?.generateAIContent) {
        const response = await electronAPI.generateAIContent({ prompt, systemInstruction, imagePart });
        const assistantMsg: ChatMessage = {
          sender: 'assistant',
          text: response,
          timestamp: Date.now()
        };
        setChatHistory(prev => [...prev, assistantMsg]);
      } else {
        throw new Error('Electron API not available');
      }
    } catch (err: any) {
      console.warn('Gemini chat failed, falling back to local model:', err);
      const localResponse = getLocalAIResponse(message, currentVideo?.title || pageContext?.title);
      const assistantMsg: ChatMessage = {
        sender: 'assistant',
        text: localResponse,
        timestamp: Date.now()
      };
      setChatHistory(prev => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Clear chat logs
  const clearChat = () => {
    setChatHistory([
      {
        sender: 'assistant',
        text: 'Привет! Я твой ИИ-помощник KDG с функциями Cometa. Задай мне любой вопрос или используй Cometa-кнопки для анализа веб-страниц!',
        timestamp: Date.now()
      }
    ]);
  };

  return {
    loading,
    error,
    chatHistory,
    sendMessage,
    summarizeVideo,
    generateDiscussionIdeas,
    clearChat
  };
}
