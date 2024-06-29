# yet-another-chat-app

I made this to learn React and play with websockets.

# TODO List

- [x] Basic chat room functionality
- [x] Basic message history retrieveal
- [x] Basic message history persistence
- [x] Basic UI
- [ ] Multi-room support
- [ ] Username conflict detection
- [ ] DM support
- [x] Better UI
  - [ ] Proper home page
  - [x] Light / Dark theme
    - [x] Settings page
    - [x] Username
    - [ ] Hide join/part messages
- [x] Real-time redis persistence
- [ ] Backend code organization
- [ ] Backend sharding

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
