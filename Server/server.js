// Create express app
var express = require("express")
var app = express()

// Server port
var HTTP_PORT = 8001
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const user = require('./route');
app.use('/route', user);

app.get('/', function (req, res) {
    res.send('hello world');
})

const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://admin:png8M8iaHEFiZARc@cluster0-ikzak.mongodb.net/XMLearn';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




