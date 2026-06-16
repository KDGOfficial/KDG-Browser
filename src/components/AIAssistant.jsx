import React, { useState, useRef, useEffect } from 'react';
import { Send, X, BrainCircuit, RotateCcw, Sparkles, Globe, Layers, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useAI } from '../hooks/useAI';

export function AIAssistant({ isOpen, onClose, currentVideo, activeTabUrl, getActivePageContext }) {
  const { chatHistory, sendMessage, loading, clearChat } = useAI();
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);

  const isWebPage = activeTabUrl && !activeTabUrl.startsWith('kdg://');

  const quickPrompts = isWebPage 
    ? [
        'О чем эта статья?',
        'Каковы основные тезисы?',
        'Сделай краткое резюме на русском',
        'Кто автор этой страницы?'
      ]
    : [
        'Какое прохождение Ведьмака посмотреть?',
        'Посоветуй тактику для игры на сложности "На смерть!"',
        'Как выжить в Песьем Городе в Cyberpunk?',
        'Кто такой Добрый Геймер?',
      ];

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if ((!inputText.trim() && !selectedImage) || loading) return;
    const msg = inputText;
    setInputText('');
    const img = selectedImage;
    setSelectedImage(null);
    
    let context = null;
    if (isWebPage && getActivePageContext) {
      context = await getActivePageContext();
    }
    
    await sendMessage(msg, currentVideo, context, img?.inlineData);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCometaAction = async (actionType) => {
    if (loading || !getActivePageContext) return;
    
    const context = await getActivePageContext();
    if (!context) return;
    
    let actionPrompt = '';
    
    switch (actionType) {
      case 'summarize':
        actionPrompt = 'Сделай краткий пересказ (резюме) содержания этой веб-страницы. Выдели основные идеи в 2-3 абзацах.';
        break;
      case 'key_facts':
        actionPrompt = 'Найди ключевые факты, тезисы, выводы или важные данные на этой странице и оформи их нумерованным списком.';
        break;
      case 'translate':
        actionPrompt = 'Переведи эту страницу на русский язык или составь подробное русскоязычное саммари, если она на другом языке.';
        break;
      case 'explain':
        if (!context.selection) {
          alert('Пожалуйста, выделите мышкой текст на веб-странице, который нужно объяснить!');
          return;
        }
        actionPrompt = `Объясни простыми словами значение и контекст следующего выделенного текста со страницы: "${context.selection}"`;
        break;
      default:
        return;
    }
    
    await sendMessage(actionPrompt, currentVideo, context);
  };

  return (
    <div className="sidebar-ai-drawer">
      <div className="drawer-header">
        <h3>
          <BrainCircuit size={18} />
          {isWebPage ? 'Cometa ИИ-Ассистент' : 'ИИ-Помощник KDG'}
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={clearChat} 
            className="nav-btn" 
            title="Очистить диалог"
            style={{ width: '28px', height: '28px' }}
          >
            <RotateCcw size={14} />
          </button>
          <button 
            onClick={onClose} 
            className="nav-btn" 
            title="Закрыть панель"
            style={{ width: '28px', height: '28px' }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="ai-content-body">
        {currentVideo && (
          <div className="ai-summary-card" style={{ marginBottom: '12px', fontSize: '0.8rem' }}>
            <h3 style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} />
              Контекст видео активен
            </h3>
            <p style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '300px' }}>
              {currentVideo.title}
            </p>
          </div>
        )}

        {isWebPage && !currentVideo && (
          <div className="ai-summary-card" style={{ marginBottom: '12px', fontSize: '0.8rem', borderLeftColor: 'var(--accent-blue)' }}>
            <h3 style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-blue)' }}>
              <Globe size={12} />
              Связь со страницей активна
            </h3>
            <p style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '300px' }}>
              {activeTabUrl}
            </p>
          </div>
        )}

        {/* Cometa Quick Action Grid */}
        {isWebPage && (
          <div className="cometa-actions-container">
            <div className="cometa-actions-grid">
              <button className="cometa-action-btn" onClick={() => handleCometaAction('summarize')} disabled={loading}>
                <Sparkles size={12} />
                <span>Пересказать</span>
              </button>
              <button className="cometa-action-btn" onClick={() => handleCometaAction('key_facts')} disabled={loading}>
                <BrainCircuit size={12} />
                <span>Тезисы</span>
              </button>
              <button className="cometa-action-btn" onClick={() => handleCometaAction('translate')} disabled={loading}>
                <Globe size={12} />
                <span>Перевод</span>
              </button>
              <button className="cometa-action-btn" onClick={() => handleCometaAction('explain')} disabled={loading}>
                <Layers size={12} />
                <span>Объяснить</span>
              </button>
            </div>
          </div>
        )}

        <div className="ai-chat-messages">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`ai-message ${msg.sender}`}>
              <div className="message-avatar">
                {msg.sender === 'assistant' ? '🤖' : '🎮'}
              </div>
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="ai-message assistant">
              <div className="message-avatar">🤖</div>
              <div className="message-bubble" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span className="glitch-spinner" style={{ width: '14px', height: '14px' }} />
                <span>ИИ обдумывает ответ...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="prompt-chips">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              className="prompt-chip"
              onClick={async () => {
                if (loading) return;
                let context = null;
                if (isWebPage && getActivePageContext) {
                  context = await getActivePageContext();
                }
                sendMessage(prompt, currentVideo, context);
              }}
              disabled={loading}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="ai-chat-input-area">
          {selectedImage && (
            <div className="selected-image-preview" style={{ padding: '6px 10px', background: 'var(--bg-lighter)', borderRadius: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', border: '1px solid var(--border-color)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ImageIcon size={14} color="var(--accent-blue)" /> 
                {selectedImage.fileName}
              </span>
              <button onClick={() => setSelectedImage(null)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Удалить">
                <Trash2 size={14} />
              </button>
            </div>
          )}
          <div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'center' }}>
            <button 
              className="gamer-btn gamer-btn-outline gamer-btn-icon" 
              style={{ width: '34px', height: '34px', flexShrink: 0, padding: 0 }}
              onClick={async () => {
                if (!window.electronAPI?.openImageDialog) return;
                const imgData = await window.electronAPI.openImageDialog();
                if (imgData) setSelectedImage(imgData);
              }}
              disabled={loading}
              title="Загрузить изображение"
            >
              <ImageIcon size={16} />
            </button>
            <textarea
              className="ai-chat-input"
              style={{ flexGrow: 1 }}
              placeholder="Задай вопрос по странице или игре..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
            />
            <button 
              className="gamer-btn gamer-btn-orange gamer-btn-icon" 
              style={{ width: '34px', height: '34px', flexShrink: 0, padding: 0 }}
              onClick={handleSend}
              disabled={loading || (!inputText.trim() && !selectedImage)}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
