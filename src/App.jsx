import { useState, useEffect } from 'react';
import { SearchControls } from './components/SearchControls';
import { Pagination } from './components/Pagination';
import { ImageGrid } from './components/ImageGrid';
import { ImageModal } from './components/ImageModal';

export default function GridImageViewer() {
  const [baseId, setBaseId] = useState(1943560);
  const [startId, setStartId] = useState(1943560);
  const [rangeSize, setRangeSize] = useState(500);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const baseUrl = 'https://nikearprod.vtexassets.com/arquivos/ids/';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  useEffect(() => {
    if (images.length === 0) return;
    const allLoaded = images.every(img => img.loaded);
    if (allLoaded) {
      setLoading(false);
    }
  }, [images]);

  // --- GRID SEARCH ---
  const generateImages = (start, count) => {
    const imageList = [];
    for (let i = 0; i < count; i++) {
      const id = start + i;
      imageList.push({ id, url: `${baseUrl}${id}-1200-1200?width=1200&height=1200&aspect=true`, loaded: false, error: false });
    }
    setImages(imageList);
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadStart = () => {
    setPage(1);
    setStartId(baseId);
    generateImages(baseId, rangeSize);
  };

  const goToPage = (newPage) => {
    if (newPage < 1) return;
    const newStart = baseId + (newPage - 1) * rangeSize;
    setPage(newPage);
    setStartId(newStart);
    generateImages(newStart, rangeSize);
  };

  const handleImageLoad = (id) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, loaded: true } : img));
  };

  const handleImageError = (id) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, error: true, loaded: true } : img));
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id.toString());
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setSelectedImageIndex(validImages.findIndex(img => img.id === image.id));
  };

  const navigateImage = (direction) => {
    if (selectedImageIndex === null) return;
    const newIndex = selectedImageIndex + direction;
    if (newIndex >= 0 && newIndex < validImages.length) {
      setSelectedImageIndex(newIndex);
      setSelectedImage(validImages[newIndex]);
    }
  };

  const loadedCount = images.filter(img => img.loaded).length;
  const successCount = images.filter(img => img.loaded && !img.error).length;
  const validImages = images.filter(img => !img.error);

  return (
    <div style={{
      background: '#080808', minHeight: '100vh', width: '100vw', overflowX: 'hidden',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', color: '#ffffff'
    }}>
      <style>{`
        * { user-select: none; box-sizing: border-box; }
        body { margin: 0; padding: 0; background: #080808; }
        html { margin: 0; padding: 0; }
        input, select { font-family: "Courier New", monospace; }
        select option { background: #1a1a1a; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          70% { box-shadow: 0 0 0 10px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expand {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .monitor-active { animation: pulse-ring 2s infinite; }
        .new-id-badge { animation: slide-in 0.3s ease; }
        .monitor-body { animation: expand 0.2s ease; }
        @media (max-width: 768px) {
          input, select, button { font-size: 16px !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 1.5rem)', width: '100%' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ margin: '0 0 0.5rem 0', fontSize: 'clamp(1.2rem, 4vw, 2rem)', fontWeight: '300', letterSpacing: '0.5px' }}>
            Pato
          </h1>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', width: '100%' }}></div>
        </div>

        <SearchControls
          baseId={baseId}
          setBaseId={setBaseId}
          rangeSize={rangeSize}
          setRangeSize={setRangeSize}
          onSearch={handleLoadStart}
          loading={loading}
          loadedCount={loadedCount}
          images={images}
          successCount={successCount}
        />

        <Pagination
          page={page}
          onPageChange={goToPage}
          images={images}
          startId={startId}
          rangeSize={rangeSize}
          successCount={successCount}
          position="top"
        />

        <ImageGrid
          images={validImages}
          onImageClick={openImageModal}
          onCopy={handleCopy}
          copied={copied}
          onImageLoad={handleImageLoad}
          onImageError={handleImageError}
        />

        <Pagination
          page={page}
          onPageChange={goToPage}
          images={images}
          startId={startId}
          rangeSize={rangeSize}
          successCount={successCount}
          position="bottom"
        />

        {images.length > 0 && validImages.length === 0 && loadedCount === images.length && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.4)' }}>
            <p style={{ fontSize: '2rem', margin: '0 0 0.75rem 0' }}>📭</p>
            <p style={{ margin: 0 }}>No se encontraron imágenes en este rango</p>
          </div>
        )}
      </div>

      <ImageModal
        image={selectedImage}
        imageIndex={selectedImageIndex}
        totalImages={validImages.length}
        onClose={() => setSelectedImage(null)}
        onNavigate={navigateImage}
        onCopy={handleCopy}
        copied={copied}
      />
    </div>
  );
}