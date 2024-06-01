const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');
const redis = require('redis');

const redisClient = redis.createClient(
    {
        socket: {
            host: 'database',
            port: 6379,
        },
    }
);

redisClient.connect();

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
});

redisClient.set('key', 'value', (error, reply) => {
    if (error) {
        console.error('Error setting value in Redis:', error);
    } else {
        console.log('Value set in Redis:', reply);
    }
});

process.on('SIGINT', () => {
    redisClient.quit();
    process.exit();
});

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    console.log(`total connections: ${socketIO.engine.clientsCount}`);

    socket.on('disconnect', () => {
        console.log(`🔥: ${socket.id} user disconnected`);
        console.log(`total connections: ${socketIO.engine.clientsCount}`);
    });

    socket.on('chat message', (msg) => {
        console.log('📨: %o', msg);

        redisClient.json.arrAppend('noderedis:jsondata', '$.messages', msg, (error, reply) => {
            if (error) {
                console.error('Error adding message to Redis:', error);
            } else {
                console.log('Message added to Redis:', reply);
            }
        });

        socketIO.emit('chat message', msg);
    });
});

socketIO.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
