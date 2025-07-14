FROM node:18-alpine

# Dependências de SO
RUN apk add --no-cache \
      bash \
      git \
      curl \
      python3 \
      openjdk11-jdk

# Expo CLI global (cacheável)
RUN npm install --global expo-cli@latest

WORKDIR /app

# 1) Copie somente package.json e package-lock.json
COPY package*.json ./

# 2) Ajuste o npm para redes instáveis
ENV NPM_CONFIG_FETCH_RETRIES=5 \
    NPM_CONFIG_FETCH_RETRY_FACTOR=10 \
    NPM_CONFIG_FETCH_TIMEOUT=600000 \
    NPM_CONFIG_FETCH_RETRY_MINTIMEOUT=20000

# 3) Instale pacotes com ci
RUN npm ci

# 4) Copie o restante do projeto
COPY . .

EXPOSE 19000 19001 19002

CMD ["expo", "start", "--tunnel", "--host", "0.0.0.0"]
