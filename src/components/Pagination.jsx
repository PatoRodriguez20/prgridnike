import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ page, onPageChange, images, startId, rangeSize, successCount, position = 'top' }) {
  const btnBase = {
    border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
    borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem',
    fontWeight: '600', display: 'flex', alignItems: 'center',
    gap: '0.5rem', transition: 'all 0.2s ease'
  };

  if (images.length === 0) return null;

  if (position === 'bottom') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(0.5rem, 2vw, 0.75rem)', padding: 'clamp(0.75rem, 3vw, 1rem) 0 clamp(1.5rem, 5vw, 2.5rem) 0' }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          style={{
            ...btnBase, padding: '0.5rem 1rem',
            background: page === 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)',
            color: page === 1 ? 'rgba(255,255,255,0.2)' : '#fff',
            cursor: page === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft size={16} /> Anterior
        </button>
        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontFamily: '"Courier New", monospace' }}>
          Página <strong style={{ color: '#fff' }}>{page}</strong>
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          style={{ ...btnBase, padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.08)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          Siguiente <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '8px', padding: 'clamp(0.6rem, 2vw, 0.9rem) clamp(0.75rem, 3vw, 1.25rem)', marginBottom: '1.25rem',
      flexWrap: 'wrap', gap: 'clamp(0.5rem, 2vw, 0.75rem)'
    }}>
      <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontFamily: '"Courier New", monospace' }}>
        <span style={{ color: '#fff', fontWeight: '700' }}>Página {page}</span>
        {'  ·  '}
        IDs <span style={{ color: '#06b6d4' }}>{startId.toLocaleString()}</span>
        {' → '}
        <span style={{ color: '#06b6d4' }}>{(startId + rangeSize - 1).toLocaleString()}</span>
        {'  ·  '}
        <span style={{ color: '#10b981' }}>{successCount} encontradas</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          style={{
            ...btnBase, padding: '0.4rem 0.75rem', fontSize: '0.85rem',
            background: page === 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)',
            color: page === 1 ? 'rgba(255,255,255,0.2)' : '#fff',
            cursor: page === 1 ? 'not-allowed' : 'pointer'
          }}
          onMouseEnter={e => { if (page > 1) e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
          onMouseLeave={e => { if (page > 1) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
        >
          <ChevronLeft size={15} /> Anterior
        </button>
        <span style={{
          padding: '0.4rem 0.9rem', background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px',
          fontSize: '0.85rem', fontFamily: '"Courier New", monospace'
        }}>
          {page}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          style={{ ...btnBase, padding: '0.4rem 0.75rem', fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >
          Siguiente <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
