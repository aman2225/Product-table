# Products Catalog - Fullstack/Frontend Engineer Intern Assignment

A React application that displays products from the DummyJSON API in a table with editable product names and infinite scroll functionality.

## Features

- **Product Table**: Displays Title, Brand, Category, Price, and Rating
- **Editable Title**: Click on any product title to edit it inline (Enter to save, Escape to cancel)
- **Infinite Scroll**: Automatically loads more products as you scroll using Intersection Observer API
- **Responsive Design**: Readable on desktop and mobile devices

## Technologies Used

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **Vanilla CSS** - Styling (no UI libraries)

## Setup Instructions

### Prerequisites

- Node.js 18+ (or 20.19+ / 22.12+ for latest Vite)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd products-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:5173` (or the port shown in terminal).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
products-app/
├── src/
│   ├── components/
│   │   └── ProductsTable.jsx   # Table with editable titles
│   ├── hooks/
│   │   ├── useInfiniteProducts.js   # Product fetching + infinite scroll state
│   │   └── useIntersectionObserver.js   # Intersection Observer hook
│   ├── services/
│   │   └── productsApi.js   # API client for DummyJSON
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## API

Uses [DummyJSON Products API](https://dummyjson.com/products):

- Endpoint: `https://dummyjson.com/products?limit=10&skip={n}`
- Pagination: `limit` and `skip` parameters for infinite scroll

## Environment Variables

No API keys or environment variables are required for this application. The DummyJSON API is free and does not require authentication.

## Deployment

### Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
