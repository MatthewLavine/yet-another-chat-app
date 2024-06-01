import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { createClient } from 'redis';

const PORT = 4000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
app.use(cors());
const redisClient = createClient(
    {
        socket: {
            host: 'database',
            port: 6379,
        },
    }
);

redisClient.on('connect', async () => {
    console.log('Connected to Redis');
    const messages = await redisClient.json.get('messages', '$', []);
    if (!messages) {
        await redisClient.json.set('messages', '$', []);
    }
});

redisClient.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
});

process.on('SIGINT', () => {
    redisClient.quit();
    process.exit();
});

io.on('connection', async (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    console.log(`total connections: ${io.engine.clientsCount}`);

    let user;

    await redisClient.json.get('messages', '$').then((messages) => {
        console.log('📨: sending history: %o', messages);
        for (const message of messages) {
            socket.emit('chat message', message);
        }
    });

    socket.on('disconnect', () => {
        console.log(`🔥: ${socket.id} user disconnected`);
        console.log(`total connections: ${io.engine.clientsCount}`);

        io.emit('chat message', {
            time: new Date().toISOString().split('T')[1],
            sender: "SYSTEM",
            content: `🔥: ${user} left the chat`,
        });
    });

    socket.on('join', async (username) => {
        console.log('🚪: user joined: %s', username);
        user = username;
        io.emit('chat message', {
            time: new Date().toISOString().split('T')[1],
            sender: "SYSTEM",
            content: `🚪: ${user} joined the chat`,
        });
    });

    socket.on('chat message', async (msg) => {
        console.log('📨: broadcasting message: %o', msg);

        await redisClient.json.arrAppend('messages', '$', msg);

        io.emit('chat message', msg);
    });
});

app.get('/', (req, res) => {
    res.send('Backend Online');
})

redisClient.connect();

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
