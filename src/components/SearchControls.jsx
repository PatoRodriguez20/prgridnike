import { Search } from 'lucide-react';

export function SearchControls({ baseId, setBaseId, rangeSize, setRangeSize, onSearch, loading, loadedCount, images, successCount }) {
  const btnBase = {
    border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
    borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem',
    fontWeight: '600', display: 'flex', alignItems: 'center',
    gap: '0.5rem', transition: 'all 0.2s ease'
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '8px', padding: 'clamp(1rem, 3vw, 1.75rem)', marginBottom: '1rem'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
            ID Inicial
          </label>
          <input
            type="number"
            min="1"
            value={baseId}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val > 0 || e.target.value === '') setBaseId(val || 1);
            }}
            style={{
              width: '100%', padding: 'clamp(0.5rem, 2vw, 0.65rem) clamp(0.5rem, 2vw, 0.75rem)',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px', color: '#fff', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', cursor: 'text'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
            Cantidad
          </label>
          <select
            value={rangeSize}
            onChange={(e) => setRangeSize(Number(e.target.value))}
            style={{
              width: '100%', padding: 'clamp(0.5rem, 2vw, 0.65rem) clamp(0.5rem, 2vw, 0.75rem)',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px', color: '#fff', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', cursor: 'pointer'
            }}
          >
            {[100, 200, 300, 400, 500, 1000, 2000].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button
            onClick={onSearch}
            style={{
              ...btnBase, width: '100%', padding: '0.65rem',
              background: 'rgba(255,255,255,0.08)', justifyContent: 'center'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            <Search size={16} />
            {loading && images.length > 0 && loadedCount < images.length ? 'Cargando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {images.length > 0 && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: 'clamp(0.75rem, 2vw, 1rem)', marginTop: '1.25rem',
          background: 'rgba(255,255,255,0.02)', borderRadius: '4px', padding: 'clamp(0.6rem, 2vw, 0.9rem)'
        }}>
          {[
            { label: 'Total buscados', value: images.length, color: '#fff' },
            { label: 'Procesadas', value: `${loadedCount}/${images.length}`, color: '#f59e0b' },
            { label: 'Encontradas', value: successCount, color: '#06b6d4' },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <p style={{ margin: '0 0 0.2rem 0', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{label}</p>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700', color }}>{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
