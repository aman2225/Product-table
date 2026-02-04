import ProductsTable from './components/ProductsTable';
import { useInfiniteProducts } from './hooks/useInfiniteProducts';
import './App.css';

function App() {
  const {
    products,
    total,
    loading,
    error,
    hasMore,
    loadMore,
    updateProductTitle,
  } = useInfiniteProducts();

  return (
    <main className="app">
      <header className="app-header">
        <h1>Products Catalog</h1>
        <p className="subtitle">
          Displaying {products.length} of {total} products • Scroll for more
        </p>
      </header>

      {error ? (
        <div className="error-banner" role="alert">
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <ProductsTable
          products={products}
          loading={loading}
          error={error}
          hasMore={hasMore}
          loadMore={loadMore}
          updateProductTitle={updateProductTitle}
        />
      )}
    </main>
  );
}

export default App;
