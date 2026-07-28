FROM node:22-slim AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=7860
ENV HOST=0.0.0.0

COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY --from=build /app/vite.config.ts ./vite.config.ts

EXPOSE 7860
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "7860"]
