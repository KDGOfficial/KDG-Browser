import React from 'react';
import { Play, Sparkles, Clock, Eye } from 'lucide-react';

export function VideoCard({ video, onClick, onAiClick }) {
  return (
    <div className="video-card" onClick={onClick}>
      <div className="video-thumbnail-container">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="video-thumbnail" 
          loading="lazy"
        />
        <div className="video-duration">
          <Clock size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          {video.duration}
        </div>
        <div className="video-play-overlay">
          <div className="play-icon-glow">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      </div>
      
      <div className="video-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="video-card-badge">{video.category}</span>
          <button 
            className="gamer-btn gamer-btn-purple" 
            style={{ padding: '4px 8px', fontSize: '0.65rem', textTransform: 'none' }}
            onClick={(e) => {
              e.stopPropagation();
              onAiClick(e);
            }}
          >
            <Sparkles size={10} />
            Анализ ИИ
          </button>
        </div>
        
        <h3 className="video-title" title={video.title}>
          {video.title}
        </h3>
        
        <div className="video-metadata">
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Eye size={12} />
            {video.views}
          </span>
          <span>{video.publishedAt}</span>
        </div>
      </div>
    </div>
  );
}
