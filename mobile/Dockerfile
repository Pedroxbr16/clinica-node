# Imagem base com Node e Watchman (essencial pro RN)
FROM node:18

# Instalações essenciais
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    unzip \
    python3 \
    python3-pip \
    openjdk-11-jdk \
    watchman \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência primeiro para cache de build
COPY package*.json ./

# Instala dependências do projeto
RUN npm install -g expo-cli && npm ci

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe as portas do Expo (LAN, tunnel, web)
EXPOSE 19000 19001 19002

# Comando padrão para iniciar o Expo com tunnel
CMD ["npx", "expo", "start", "--tunnel"]