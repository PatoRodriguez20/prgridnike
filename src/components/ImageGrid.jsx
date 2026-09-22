import { Copy, Check } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export function ImageGrid({ images, onImageClick, onCopy, copied, onImageLoad, onImageError }) {
  const [visibleIds, setVisibleIds] = useState(new Set());
  const imageRefs = useRef({});

  useEffect(() => {
    setVisibleIds(new Set(images.map(img => String(img.id))));
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: 'clamp(0.4rem, 2vw, 0.6rem)', marginBottom: '1.5rem'
    }}>
      {images.map((image) => (
        <div
          key={image.id}
          ref={(ref) => { imageRefs.current[image.id] = ref; }}
          data-image-id={image.id}
          onClick={() => onImageClick(image)}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '5px', overflow: 'hidden', cursor: 'pointer',
            transition: 'all 0.2s ease', aspectRatio: '1', display: 'flex', flexDirection: 'column'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div style={{
            flex: 1, background: 'rgba(0,0,0,0.3)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative'
          }}>
            {!image.loaded && <div style={{ position: 'absolute', fontSize: '1.2rem', opacity: 0.4 }}>⏳</div>}
            {visibleIds.has(String(image.id)) ? (
              <img
                src={image.url}
                alt={`Product ${image.id}`}
                onLoad={() => onImageLoad(image.id)}
                onError={() => onImageError(image.id)}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', opacity: image.loaded ? 1 : 0.2, transition: 'opacity 0.3s' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }} />
            )}
          </div>
          <div style={{
            padding: 'clamp(0.2rem, 1vw, 0.3rem) clamp(0.2rem, 1vw, 0.4rem)', background: 'rgba(0,0,0,0.5)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(0.2rem, 1vw, 0.4rem)'
          }}>
            <span style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.65rem)', color: 'rgba(255,255,255,0.6)', fontFamily: '"Courier New", monospace', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {image.id}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onCopy(image.id); }}
              style={{
                background: copied === image.id ? '#10b981' : 'rgba(255,255,255,0.08)',
                border: 'none', color: '#fff', padding: '0.2rem', borderRadius: '2px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                minWidth: '20px', minHeight: '20px', transition: 'background 0.2s', flexShrink: 0
              }}
            >
              {copied === image.id ? <Check size={11} /> : <Copy size={11} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
