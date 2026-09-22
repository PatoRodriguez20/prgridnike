import { X, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

export function ImageModal({ image, imageIndex, totalImages, onClose, onNavigate, onCopy, copied }) {
  const btnBase = {
    border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
    borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem',
    fontWeight: '600', display: 'flex', alignItems: 'center',
    gap: '0.5rem', transition: 'all 0.2s ease'
  };

  if (!image) return null;

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', zIndex: 1000 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1.75rem', maxWidth: '560px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontFamily: '"Courier New", monospace' }}>
            {imageIndex !== null ? `${imageIndex + 1}/${totalImages}` : ''}
          </span>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '0.25rem' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: '6px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '280px', position: 'relative' }}>
          <button
            onClick={() => onNavigate(-1)}
            disabled={imageIndex === 0}
            style={{
              position: 'absolute', left: '0.5rem', background: imageIndex === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
              border: 'none', color: imageIndex === 0 ? 'rgba(255,255,255,0.2)' : '#fff', cursor: imageIndex === 0 ? 'not-allowed' : 'pointer',
              padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <img src={image.url} alt={`Product ${image.id}`} style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain' }} />
          <button
            onClick={() => onNavigate(1)}
            disabled={imageIndex === totalImages - 1}
            style={{
              position: 'absolute', right: '0.5rem', background: imageIndex === totalImages - 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
              border: 'none', color: imageIndex === totalImages - 1 ? 'rgba(255,255,255,0.2)' : '#fff', cursor: imageIndex === totalImages - 1 ? 'not-allowed' : 'pointer',
              padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <p style={{ margin: '0 0 0.3rem 0', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>ID</p>
            <p
              onDoubleClick={() => onCopy(image.id)}
              style={{ margin: 0, fontSize: '1.5rem', fontFamily: '"Courier New", monospace', fontWeight: '700', cursor: 'pointer', transition: 'color 0.2s', color: copied === image.id ? '#10b981' : '#fff' }}
              title="Doble click para copiar"
            >
              {image.id}
            </p>
          </div>
          <button
            onClick={() => onCopy(image.id)}
            style={{
              ...btnBase, padding: '0.65rem 1.25rem',
              background: copied === image.id ? '#10b981' : 'rgba(255,255,255,0.08)',
            }}
          >
            {copied === image.id ? <><Check size={16} /> Copiado</> : <><Copy size={16} /> Copiar ID</>}
          </button>
        </div>
      </div>
    </div>
  );
}
