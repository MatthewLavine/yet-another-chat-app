# yet-another-chat-app

I made this to learn React and play with websockets.

# TODO List

- [x] Basic chat room functionality
- [x] Basic message history retrieveal
- [x] Basic message history persistence
- [x] Basic UI
- [ ] Multi-room support
- [ ] Settings page
  - [ ] Username
  - [ ] Hide join/part messages
  - [ ] Light / Dark theme
- [ ] Better UI
- [ ] Username conflict detection
- [ ] Real-time redis persistence
- [ ] Backend code organization
- [ ] DM support

## Running

### With Docker

`$ docker compose up -d`

#### Dev mode

`$ docker compose up --watch --build`

### Directly

Frontend

`$ npm start`

Backend

`$ (cd ./server && npm start)`

Database

`$ docker run --rm -p 6379:6379 redis`
