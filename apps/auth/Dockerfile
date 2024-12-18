FROM node:18

# Çalışma dizinini belirleyin
WORKDIR /app

# Uygulama dosyalarını kopyalayın
COPY . .

# Mikroservis için hangi portun kullanılacağını belirtin
EXPOSE 3001

# Mikroservisi başlatacak komut
CMD ["npm", "run", "start"]
