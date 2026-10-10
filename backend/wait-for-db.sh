#!/bin/sh

# Argumentos: host e porta
HOST="$MONGODB_HOST"
PORT="$MONGODB_PORT"

# Valores padrão, caso não estejam no .env
: "${HOST:=db}"
: "${PORT:=27017}"

echo "⏳ Aguardando o MongoDB (${HOST}:${PORT}) estar disponível..."

# Aguarda conexão com o host/porta até estar pronto
while ! nc -z "$HOST" "$PORT"; do
  sleep 1
done

echo "✅ Banco de dados está pronto! Iniciando aplicação..."

# Executa o comando que foi passado após o wait (npm start, por exemplo)
exec "$@"
