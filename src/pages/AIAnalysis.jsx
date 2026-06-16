import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Copy, Check, MessageSquare, ListMusic, FileText, Send } from 'lucide-react';
import { Player } from '../components/Player';
import { useAI } from '../hooks/useAI';

export function AIAnalysis({ video }) {
  const [startTime, setStartTime] = useState(0);
  const [activeTab, setActiveTab] = useState('summary');
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  const { 
    loading, 
    summarizeVideo, 
    generateDiscussionIdeas, 
    chatHistory, 
    sendMessage,
    clearChat
  } = useAI();

  const [summaryText, setSummaryText] = useState(video.summary);
  const [ideas, setIdeas] = useState(video.discussionIdeas);
  const [chatInput, setChatInput] = useState('');

  // Auto-fill or generate initial AI summary
  useEffect(() => {
    setSummaryText(video.summary);
    setIdeas(video.discussionIdeas);
    clearChat();
    setStartTime(0);
  }, [video]);

  // Request fresh AI summary from Gemini
  const handleRegenerateSummary = async () => {
    const freshSummary = await summarizeVideo(video);
    setSummaryText(freshSummary);
  };

  // Request fresh discussion ideas from Gemini
  const handleRegenerateIdeas = async () => {
    const freshIdeas = await generateDiscussionIdeas(video);
    setIdeas(freshIdeas);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || loading) return;
    const msg = chatInput;
    setChatInput('');
    await sendMessage(msg, video);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendChat();
    }
  };

  const handleTimestampClick = (seconds) => {
    // Set start time to trigger Player rebuild/seek
    setStartTime(seconds);
    // Add small offset to force useEffect to trigger if clicking same timestamp
    setTimeout(() => {
      setStartTime(prev => prev === seconds ? seconds + 0.001 : seconds);
    }, 50);
  };

  return (
    <div className="ai-analysis-container">
      {/* Left Pane: Player & Info */}
      <div className="player-panel">
        <div style={{ marginBottom: '16px' }}>
          <span className="video-card-badge" style={{ marginBottom: '8px' }}>{video.category}</span>
          <h1 style={{ fontFamily: 'var(--font-gamer)', fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.4 }}>
            {video.title}
          </h1>
        </div>

        <Player videoId={video.id} startTime={startTime} />

        <div className="video-description-box">
          <h2>Описание видео</h2>
          <div className="video-meta-row">
            <span>Просмотры: {video.views}</span>
            <span>Опубликовано: {video.publishedAt}</span>
            <span>Длительность: {video.duration}</span>
          </div>
          <p className="video-text-content">{video.description}</p>
        </div>
      </div>

      {/* Right Pane: AI Control Panel */}
      <div className="ai-control-panel">
        <div className="ai-tab-strip">
          <button
            className={`ai-tab ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            <FileText size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            Обзор ИИ
          </button>
          <button
            className={`ai-tab ${activeTab === 'moments' ? 'active' : ''}`}
            onClick={() => setActiveTab('moments')}
          >
            <ListMusic size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            Таймкоды
          </button>
          <button
            className={`ai-tab ${activeTab === 'ideas' ? 'active' : ''}`}
            onClick={() => setActiveTab('ideas')}
          >
            <Sparkles size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            Обсуждение
          </button>
          <button
            className={`ai-tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            Чат по видео
          </button>
        </div>

        <div className="ai-content-body">
          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="summary-container">
              <div className="ai-summary-card">
                <h3>Анализ контента от Gemini AI</h3>
                {loading ? (
                  <div className="kdg-loader">
                    <span className="glitch-spinner" />
                    <span className="loader-text">Анализируем видео...</span>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {summaryText}
                  </p>
                )}
              </div>
              <button
                className="gamer-btn gamer-btn-orange"
                onClick={handleRegenerateSummary}
                disabled={loading}
              >
                <Sparkles size={14} />
                Сделать глубокий ИИ-анализ
              </button>
            </div>
          )}

          {/* Moments / Timestamps Tab */}
          {activeTab === 'moments' && (
            <div className="timestamps-list">
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Кликните на временную метку, чтобы перекрутить видео к нужному моменту:
              </div>
              {video.timestamps.map((t, idx) => (
                <div
                  key={idx}
                  className="timestamp-item"
                  onClick={() => handleTimestampClick(t.seconds)}
                >
                  <div className="timestamp-badge">
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    {t.time}
                  </div>
                  <div className="timestamp-desc">{t.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Discussion Ideas Tab */}
          {activeTab === 'ideas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Готовые ИИ-идеи комментариев и вопросов для вовлечения в обсуждение видео:
              </div>
              {ideas.map((idea, idx) => (
                <div key={idx} className="discussion-card">
                  <p className="discussion-text">"{idea}"</p>
                  <div className="discussion-meta">
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Предложено ИИ</span>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(idea, idx)}
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check size={12} />
                          Скопировано
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          Копировать
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="gamer-btn gamer-btn-purple"
                onClick={handleRegenerateIdeas}
                disabled={loading}
              >
                <Sparkles size={14} />
                Обновить идеи с Gemini
              </button>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="ai-chat-messages" style={{ maxHeight: '350px' }}>
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`ai-message ${msg.sender}`}>
                    <div className="message-avatar">
                      {msg.sender === 'assistant' ? '🤖' : '🎮'}
                    </div>
                    <div className="message-bubble">{msg.text}</div>
                  </div>
                ))}
                
                {loading && (
                  <div className="ai-message assistant">
                    <div className="message-avatar">🤖</div>
                    <div className="message-bubble" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span className="glitch-spinner" style={{ width: '14px', height: '14px' }} />
                      <span>ИИ анализирует эпизод...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="ai-chat-input-area" style={{ marginTop: 'auto' }}>
                <input
                  type="text"
                  className="ai-chat-input"
                  placeholder="Спроси ИИ о моменте, боссе или прохождении..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={loading}
                />
                <button
                  className="gamer-btn gamer-btn-orange gamer-btn-icon"
                  style={{ width: '34px', height: '34px' }}
                  onClick={handleSendChat}
                  disabled={loading || !chatInput.trim()}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
