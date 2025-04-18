FROM node:20.14

WORKDIR /app

# Instala netcat corretamente
RUN apt-get update && apt-get install -y netcat-openbsd

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm install

# Copia os demais arquivos
COPY . .

# Copia e dá permissão ao script de espera pelo banco
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

EXPOSE 3001

# Espera o banco subir antes de iniciar
CMD ["/wait-for-db.sh", "npm", "start"]
