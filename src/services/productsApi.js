/**
 * API service for fetching products from DummyJSON
 * Base URL: https://dummyjson.com/products
 */

const API_BASE_URL = 'https://dummyjson.com/products';
const DEFAULT_LIMIT = 10;

/**
 * Fetches a paginated list of products
 * @param {number} skip - Number of products to skip (for pagination)
 * @param {number} limit - Number of products to fetch per request
 * @returns {Promise<{products: Array, total: number}>}
 */
export async function fetchProducts(skip = 0, limit = DEFAULT_LIMIT) {
  const url = `${API_BASE_URL}?limit=${limit}&skip=${skip}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return {
    products: data.products,
    total: data.total,
    skip: data.skip,
    limit: data.limit,
  };
}
