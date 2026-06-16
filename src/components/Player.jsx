import React, { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

export function Player({ videoId, startTime, onPlayerReady }) {
  const iframeRef = useRef(null);

  // Construct YouTube URL with parameters
  const getEmbedUrl = () => {
    let url = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`;
    if (startTime > 0) {
      url += `&start=${startTime}&autoplay=1`;
    }
    return url;
  };

  useEffect(() => {
    if (onPlayerReady) {
      onPlayerReady();
    }
  }, [videoId, onPlayerReady]);

  return (
    <div className="player-wrapper glow-orange">
      {videoId ? (
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src={getEmbedUrl()}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="kdg-loader" style={{ height: '100%' }}>
          <Play size={40} className="logo-icon" />
          <div className="loader-text">Выберите видео для начала просмотра</div>
        </div>
      )}
    </div>
  );
}
