# Cloud Glasses Ecommerce App

This is a simple React frontend and Node.js backend ecommerce app for selling glasses. It includes a product catalog, cart, and checkout flow.

## Run locally for development

1. Start both frontend and backend together:
   ```bash
   npm run dev
   ```
2. Open the URL shown by Vite (usually `http://localhost:5173`).

### Optional: run servers separately

- Backend only:
  ```bash
  npm run dev:server
  ```
- Frontend only:
  ```bash
  npm run dev:frontend
  ```

## Run locally with Docker

1. Build the image:
   ```bash
   docker compose build
   ```
2. Start the app:
   ```bash
   docker compose up
   ```
3. Open `http://localhost:4000`

## App features

- Glasses product catalog
- Add to cart and checkout
- React frontend, Node.js backend
- Docker ready for deployment
