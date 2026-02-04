import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/productsApi';

const PAGE_SIZE = 10;

/**
 * Custom hook for infinite scroll product fetching
 * Uses Intersection Observer for load-more detection
 */
export function useInfiniteProducts() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const loadProducts = useCallback(async (reset = false) => {
    const currentSkip = reset ? 0 : skip;
    if (currentSkip > 0 && !reset) {
      setLoading(true);
    } else if (reset) {
      setLoading(true);
    }

    try {
      const { products: newProducts, total: totalCount } = await fetchProducts(
        currentSkip,
        PAGE_SIZE
      );

      setProducts((prev) => (reset ? newProducts : [...prev, ...newProducts]));
      setTotal(totalCount);
      setSkip((prev) => (reset ? PAGE_SIZE : prev + PAGE_SIZE));
      setHasMore(currentSkip + newProducts.length < totalCount);
      setError(null);
    } catch (err) {
      setError(err.message);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [skip]);

  useEffect(() => {
    loadProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only on mount
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadProducts(false);
    }
  }, [loading, hasMore, loadProducts]);

  const updateProductTitle = useCallback((productId, newTitle) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, title: newTitle } : p))
    );
  }, []);

  return {
    products,
    total,
    loading,
    error,
    hasMore,
    loadMore,
    updateProductTitle,
    refetch: () => loadProducts(true),
  };
}
