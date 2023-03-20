
const express = require('express');
const {connectionSocket} = require('./utils/soket.io')
const handlebars = require('express-handlebars');
const productsRoute = require('./routes/products.routes');
const cardsRoute = require ('./routes/carts.routes')
const productsRouteBd = require('./routes/products.router.bd')
const cartsRouteBd = require('./routes/carts.router.bd')
const viewRoute = require('./routes/views.route')
const chatsRouter = require('./routes/chats.router')
const server = express();
const mongoose = require('mongoose');
const Session = require('express-session');
//const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const sessionRoute = require('./routes/session.routes')



const httpServer = server.listen(8080, ()=> {
    console.log('Servidor Listo en puerto 8080')
})

const DB_NAME = 'Ecommerce'
const DB_HOST = 'localhost'
const DB_PORT = 27017


const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}` ;

//Mongo Con Session


server.use(
  Session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL , 
      mongoOptions: {
        useNewUrlParser: true,
        useUniFiedTopology: true
      },
      ttl: 20
    }),
    secret: 'Coder',
    resave: true,
    saveUninitialized: true,
  })
)

//handlerbars
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');
//express
server.use(express.static(__dirname+'/public'));
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(cookieParser());
//rutas
server.use("/api/products/", productsRoute);
server.use("/api/carts/", cardsRoute);
server.use("/", viewRoute);
server.use("/api/productsBd/", productsRouteBd );
server.use("/api/cartsBd/", cartsRouteBd );
server.use("/api/chats/", chatsRouter );
server.use("/api/session" , sessionRoute)

///Mongosse
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/Ecommerce',

(error)=>{
  if (error) {
    console.log('error de conexion', error);
    process.exit();
  }else {
    console.log('Conexion exitosa');
  }
});

connectionSocket (httpServer);



