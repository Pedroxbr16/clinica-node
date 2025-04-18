#!/bin/sh

# Argumentos: host e porta
HOST="$DB_HOST"
PORT="$DB_PORT"

# Valores padrão, caso não estejam no .env
: "${HOST:=db}"
: "${PORT:=3306}"

echo "⏳ Aguardando o banco MySQL (${HOST}:${PORT}) estar disponível..."

# Aguarda conexão com o host/porta até estar pronto
while ! nc -z "$HOST" "$PORT"; do
  sleep 1
done

echo "✅ Banco de dados está pronto! Iniciando aplicação..."

# Executa o comando que foi passado após o wait (npm start, por exemplo)
exec "$@"
