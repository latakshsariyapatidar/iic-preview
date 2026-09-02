FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy application code
COPY . .

# Ensure entrypoint script is executable
RUN chmod +x entrypoint.sh

# Expose backend port
EXPOSE 3000

# Run entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "src/index.js"]
