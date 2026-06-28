# Build frontend and backend in one image
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package definitions
COPY server/package*.json ./server/
COPY frontend/package*.json ./frontend/

# Install dependencies for frontend and backend
RUN npm install --prefix frontend
RUN npm install --prefix server

# Copy all app files
COPY frontend ./frontend
COPY server ./server

# Build the React frontend
RUN npm run build --prefix frontend

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Copy server and built frontend output
COPY --from=builder /app/server ./server
COPY --from=builder /app/frontend/dist ./frontend/dist

WORKDIR /app/server
RUN npm install --production

ENV PORT=4000
EXPOSE 4000
CMD ["node", "index.js"]
