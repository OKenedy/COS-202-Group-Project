FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
COPY prisma ./prisma
RUN npm install

COPY . .
RUN npm run pg

EXPOSE 5001
CMD ["npm", "run", "dev"]
