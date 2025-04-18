





# Caminhos
FRONTEND_DIR=./frontend
BACKEND_DIR=./backend
MOBILE_DIR=./mobile
DOCKER_COMPOSE=docker compose

# --------- NODE + REACT COMMANDS ---------- #

install:
	cd $(FRONTEND_DIR) && npm install
	cd $(BACKEND_DIR) && npm install
	cd $(MOBILE_DIR) && npm install

build:
	cd $(FRONTEND_DIR) && npm run build

dev:
	gnome-terminal -- bash -c "cd $(BACKEND_DIR) && node server/app.js; exec bash"
	cd $(FRONTEND_DIR) && npm start

lint:
	cd $(FRONTEND_DIR) && npm run lint || true
	cd $(BACKEND_DIR) && npm run lint || true
	cd $(MOBILE_DIR) && npm run lint || true

test:
	cd $(FRONTEND_DIR) && npm test || true
	cd $(BACKEND_DIR) && npm test || true
	cd $(MOBILE_DIR) && npm test || true

clean:
	rm -rf $(FRONTEND_DIR)/node_modules $(BACKEND_DIR)/node_modules $(MOBILE_DIR)/node_modules

restart-backend:
	pkill -f "node server/app.js" || true
	cd $(BACKEND_DIR) && node server/app.js &

# --------- DOCKER COMMANDS ---------- #

docker-build:
	$(DOCKER_COMPOSE) build

docker-up:
	$(DOCKER_COMPOSE) up --build

docker-down:
	$(DOCKER_COMPOSE) down -v

docker-logs:
	$(DOCKER_COMPOSE) logs -f

docker-restart-backend:
	$(DOCKER_COMPOSE) restart backend

# --------- GIT COMMANDS ---------- #

push-https:
	git remote set-url origin https://github.com/Pedroxbr16/clinica-node.git
	git add .
	git commit -m "Atualizações via Makefile" || echo "Nada para commitar"
	git push origin main

push-ssh:
	git remote set-url origin git@github.com:Pedroxbr16/clinica-node.git
	git add .
	git commit -m "Atualizações via Makefile" || echo "Nada para commitar"
	git push origin main

# --------- MOBILE DEV ---------- #

mobile:
	cd $(MOBILE_DIR) && npx expo start --tunnel