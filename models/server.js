const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser')
const sequelize = require('../database/database');
/* Conexion Sockets */
const { conectarCliente } = require('../sockets/usuario-socket');
const { actualizarAlertaCiudadano } = require('../sockets/alertas-socket');
const { AlertaDerivadaSocket, borrarAlertaDerivada, actualizarAlertaDerivada } = require('../sockets/alerta-derivada-socket');
const { loginUser, logoutUser } = require('../sockets/sesion-socket');
const { registrarAlertaGenerada } = require('../sockets/alerta-registrada-socket');

class Server{
    static _intance=Server;
    io=socketIO.Server;
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            ciudadano: '/api/ciudadano',
            detalleciudadano:'/api/detalleciudadano',
            cargo:'/api/cargo',
            validarsunat:'/api/validarsunat',
            mensaje:'/api/enviarmensaje',
            uploads: '/api/uploads',
            tipoalerta:'/api/tipoalerta',
            alerta:'/api/alerta',
            usuario:'/api/usuarios',
            authusuario:'/api/authusuario',
            tipoatencion:'/api/tipoatencion',
            uploadgeneral:'/api/uploadgeneral',
            centroatencion:'/api/centroatencion',
            opcionfoto:'/api/opcionfoto',
            alertaderivada:'/api/alertaderivada',
            politicaprivacidad:'/api/politicaprivacidad',
            alertagenerada:'/api/alertagenerada',
            grafica:'/api/grafica'
        }
        //Connect to socket
        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer,{
            cors:{
                origin:true,
                credentials:true
            }
        })
        // Connect to database
        this.connectDB();
        //  listen Sockets
        this.listenSockets();
        // Middlewares
        this.middlewares();
        // Routes application
        this.routes();
    }
    static get instance(){
        return this._intance || (this._intance=new this());
    }
    async connectDB(){
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    listenSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente=>{
            console.log('Cliente conectado');
            conectarCliente(cliente, this.io);
            actualizarAlertaCiudadano(cliente,this.io);
            AlertaDerivadaSocket(cliente,this.io);
            actualizarAlertaDerivada(cliente,this.io)
            borrarAlertaDerivada(cliente, this.io);
            loginUser(cliente,this.io)
            logoutUser(cliente,this.io);
            registrarAlertaGenerada(cliente,this.io)
            
        })
    }
    middlewares(){
        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        // Cors
        this.app.use(cors());
        // Body
        this.app.use(bodyParser.urlencoded({ extended: false }))
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
        
    }
    routes(){
        this.app.use(this.paths.cargo, require('../routes/cargos'));
        this.app.use(this.paths.validarsunat, require('../routes/validar-sunat'));
        this.app.use(this.paths.ciudadano, require('../routes/ciudadanos'));
        this.app.use(this.paths.mensaje, require('../routes/mensajes'));
        this.app.use(this.paths.detalleciudadano, require('../routes/detalle-ciudadano'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.tipoalerta, require('../routes/tipo-alertas'));
        this.app.use(this.paths.alerta, require('../routes/alertas'));
        this.app.use(this.paths.usuario, require('../routes/usuarios'));
        this.app.use(this.paths.authusuario, require('../routes/auth-usuario'));
        this.app.use(this.paths.tipoatencion, require('../routes/tipo-atencion'));
        this.app.use(this.paths.uploadgeneral, require('../routes/uploads-general'));
        this.app.use(this.paths.centroatencion, require('../routes/centro-atencion'));
        this.app.use(this.paths.opcionfoto, require('../routes/opcion-foto'));
        this.app.use(this.paths.alertaderivada, require('../routes/alertas-derivadas'));
        this.app.use(this.paths.alertagenerada, require('../routes/alertas-generadas'));
        this.app.use(this.paths.grafica, require('../routes/grafica'));
        this.app.use(this.paths.politicaprivacidad, require('../routes/politicas-privacidad'));
        /* this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuario, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads')); */
    }
    listen(){
        this.httpServer.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;