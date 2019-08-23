const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const auth = require('./middleware/auth');
const redis   = require("redis");
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const logger = require('./logger/logger');
const uuid = require('uuidv4');
require('./db/db');
const User = require('./model/user');

const client  = redis.createClient({host : 'redis-server', port : '6379'});

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

client.on('error', (err)=>{
    console.log('Redis error: ', err); 
});

app.use(session({
    secret: 'keyboard cat',
    store: new redisStore({ host: 'redis-server', port: 6379, client: client}),
    saveUninitialized: true,
    resave: false,
    cookie : {secure : false}
}));

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(express.urlencoded());


const userouter = require('./router/user');
app.use(userouter);

app.get('/', auth , async (req, res)=>{
    let user = await User.getUserFromToken(req.session.user_id);
    if(!user){
        res.render('signIn');
    }else{
        res.render('index', {footer: {name : 'Narayanan'}, user : user});
    }
    
});

module.exports = app;
