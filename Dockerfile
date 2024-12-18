# 1. Node.js resmi imajını kullanarak başla
FROM node:18

# 2. Çalışma dizinini belirle
WORKDIR /app

# 3. package.json ve package-lock.json'ı kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Tüm dosyaları kopyala
COPY . .

RUN npx prisma generate

# 6. Uygulamanın çalışacağı portu belirle
EXPOSE 3000

# 7. Uygulamayı başlat
CMD ["npm", "run", "start"]
