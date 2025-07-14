# 1) Use Node oficial
FROM node:20.14

# 2) Defina o diretório de trabalho
WORKDIR /app

# 3) Copie e instale as dependências
COPY package*.json ./
RUN npm install

# 4) Copie todo o código-fonte
COPY . .

# 5) Exponha a porta da aplicação
EXPOSE 5000

# 6) Inicialize a aplicação
CMD ["npm", "start"]
