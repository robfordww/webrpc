all:
	@echo "please read Makefile source or README to see available commands"

bootstrap:
	rm -rf server/node_modules && rm -rf webapp/node_modules
	cd server && yarn
	cd webapp && yarn

generate:
	webrpc-gen -schema=service.ridl -target=typescript -server -out=./server/server.gen.ts
	webrpc-gen -schema=service.ridl -target=typescript -client -out=./webapp/client.gen.ts

run-server:
	yarn --cwd ./server start

run-client:
	yarn --cwd ./webapp start
