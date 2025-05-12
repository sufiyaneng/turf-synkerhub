# Stage 1: Build the app
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the app
FROM node:20 AS runner

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Use a static file server for production, like `serve`
RUN npm install -g serve

EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
