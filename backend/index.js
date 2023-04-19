const express = require('express');
const app = express()
const http = require('http').Server(app);
const User = require('./Schema/User')
const dbconnect = require('./db')
app.use(express.json());
dbconnect()
console.log("-----------------------------------------------------------")
let userInfo = {}

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const port = 8000;
const cors = require('cors')
app.use(cors())
let count = 0;
io.on('connection', (socket) => {

    console.log(`connected ${count++}`);

    socket.on('new user', (user) => {
        const key = 'name'
        const obj = {}
        obj[key] = 'sagar sharma'
        userInfo[user.email] = socket.id

        console.log(user)
        console.log('object => ', userInfo, userInfo[user.email])
        console.log(`new user ${user.email} with id ${socket.id}`)
        io.emit('user', user)
    })

    socket.on('chat message', (data, user, receiver) => {
        // const receiverSocketId = userInfo[receiver];
        console.log('testEvent received:', userInfo);
        console.log(`message ${data}`)
        console.log('sender ', user, 'receiver ', receiver, "receiver id ", userInfo[receiver], userInfo)
        io.emit('message',
            {
                receiver_id: userInfo[user.receiver],
                message: data,
                sender: user,
                receiver
            })
    });


});

app.post('/user', async (req, res) => {
    const obj = {
        name: req.body.name,
        email: req.body.email,
        picture: req.body.picture
    }
    const result = await User.create(obj)
    if (!result) return res.status(501).send({ msg: 'unsuccessfull', user: obj })
    res.status(200).send({ msg: 'successfull', user: obj, success: true })
})

app.post('/userdata', async (req, res) => {
    const result = await User.findOne({ email: req.body.email })
    if (!result) return res.status(501).send({ msg: 'unsuccessfull' })
    res.status(200).send({ msg: 'successfull', user: result, success: true })
})

http.listen(port, () => {
    console.log('Server running on port 8000');
});