import { useState, useCallback } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * Editable cell for product title - allows inline editing
 */
function EditableTitleCell({ value, productId, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = useCallback(() => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== value) {
      onSave(productId, trimmed);
    } else {
      setEditValue(value);
    }
    setIsEditing(false);
  }, [editValue, value, productId, onSave]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        autoFocus
        className="editable-input"
        aria-label="Edit product title"
      />
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={() => {
        setEditValue(value);
        setIsEditing(true);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setEditValue(value);
          setIsEditing(true);
        }
      }}
      className="editable-title"
      title="Click to edit"
    >
      {value}
    </span>
  );
}

/**
 * Products table with infinite scroll
 * Displays: Title (editable), brand, category, price, Rating
 */
export default function ProductsTable({
  products,
  loading,
  error,
  hasMore,
  loadMore,
  updateProductTitle,
}) {
  const sentinelRef = useIntersectionObserver(loadMore, {
    rootMargin: '100px',
    threshold: 0,
  });

  return (
    <div className="table-container">
      <table className="products-table" role="table" aria-label="Products list">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Brand</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <EditableTitleCell
                  value={product.title}
                  productId={product.id}
                  onSave={updateProductTitle}
                />
              </td>
              <td>{product.brand ?? '–'}</td>
              <td>{product.category ?? '–'}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>{product.rating ?? '–'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && (
        <div className="loading-indicator" role="status" aria-live="polite">
          Loading more products...
        </div>
      )}

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {hasMore && !loading && (
        <div
          ref={sentinelRef}
          className="scroll-sentinel"
          aria-hidden="true"
        />
      )}

      {!hasMore && products.length > 0 && (
        <p className="end-message">No more products to load</p>
      )}
    </div>
  );
}
