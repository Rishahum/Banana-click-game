const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/db');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const Users = require('./models/User'); 
const app = express();
app.use((req, res, next) => {
    res.removeHeader("X-Powered-By"); 
    next();
  });

dotenv.config();

app.use(cors({
    origin: ['http://localhost:3000'], 
    credentials: true, 
    methods: ["GET", "POST"] 
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use('/api/auth', require('./routes/authRouter'));
app.use('/api', require('./routes/admin'));
app.use('/api/socket', require('./routes/profile'))
app.use('/api/user', require('./routes/block'))

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    }
  });

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('getClickCount', async (email) => {
        const user = await Users.findOne({ email });
            if (user) {
                socket.emit('updateCount', user.clickCount || 0);
            } else {
                socket.emit('updateCount', 0);
            } 
    });

socket.on('bananaClick', async (email) => {
    try {
        const user = await Users.findOneAndUpdate(
            { email },
            { $inc: { clickCount: 1 } },
            { new: true, upsert: true, fields: 'email clickCount' } // Return updated fields only
        );
        socket.emit('updateCount', user.clickCount);

        const users = await Users.find({}, 'email clickCount');
        const userClickCounts = users.map(user => ({
            email: user.email,
            clickCount: user.clickCount || 0
        }));

        io.emit('allClickCounts', userClickCounts);
    } catch (error) {
        console.error("Error updating click count:", error);
        socket.emit('allClickCountsError', { message: "Failed to update click count." });
    }
});


    
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 5000; 
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
