# yet-another-chat-app

I made this to play with websockets.

## Running

### With Docker

`$ docker compose up`

#### Dev mode

`$ docker compose down; docker compose up --watch --build`

### Directly

Frontend

`$ npm start`

Backend

`$ (cd ./server && npm start)`

Database

`$ docker run --rm -p 6379:6379 redis`
