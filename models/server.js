const express = require('express')
const cors = require('cors')

const { bdmysql } = require('../database/mySqlConnection');


class Server {


    constructor() {
    this.app = express();
    this.port = process.env.PORT;

   this.pathsMySql = {

    lugares: '/api/lugares',
    categorias: '/api/categoria',
    usuarios: '/api/usuarios',
    multimedia: '/api/contenido_multimedia',
    rutas: '/api/rutas',
    lugarMultimedia: '/api/lugar_multimedia',
    rutaCompartida: '/api/ruta_compartida',
    rutaLugar: '/api/ruta_lugar',
    usuarioFavorito: '/api/usuario_favorito',
    lugarCategoria: '/api/lugar_categoria'

}

    this.app.get('/', function (req, res) {
        res.send('Hola Mundo a todos...')
    })

    this.dbConnection();

    this.middlewares();

    this.routes();
}




   
    async dbConnection() {
        try {
            await bdmysql.authenticate();
            console.log('Connection OK a MySQL.');
        } catch (error) {
            console.error('No se pudo Conectar a la BD MySQL', error);
        }
    }
   

    
    
    routes(){

    this.app.use(this.pathsMySql.lugares, require('../routes/lugares.route'));

    this.app.use(this.pathsMySql.categorias, require('../routes/categoria.route'));

    this.app.use(this.pathsMySql.usuarios, require('../routes/usuarios.route'));

    this.app.use(this.pathsMySql.multimedia, require('../routes/contenido_multimedia.route'));

    this.app.use(this.pathsMySql.rutas, require('../routes/ruta.route'));

    this.app.use(this.pathsMySql.lugarMultimedia, require('../routes/lugar_multimedia.route'));

    this.app.use(this.pathsMySql.lugarCategoria, require('../routes/lugar_categoria.route'));

    this.app.use(this.pathsMySql.rutaCompartida, require('../routes/ruta_compartida.route'));

    this.app.use(this.pathsMySql.rutaLugar, require('../routes/ruta_lugar.route'));

    this.app.use(this.pathsMySql.usuarioFavorito, require('../routes/usuario_lugar_favorito.route'));

}

    
    




    
    middlewares() {
        //CORS
        //Evitar errores por Cors Domain Access
        //Usado para evitar errores.
        this.app.use(cors());




        //Lectura y Parseo del body
        //JSON
       
        //JSON (JavaScript Object Notation)
        //es un formato ligero de intercambio de datos.
        //JSON es de fácil lectura y escritura para los usuarios.
        //JSON es fácil de analizar y generar por parte de las máquinas.
        //JSON se basa en un subconjunto del lenguaje de programación JavaScript,
        //Estándar ECMA-262 3a Edición - Diciembre de 1999.
       
        this.app.use(express.json());




        //Directorio publico
        this.app.use(express.static('public'));




    }
    



    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }




}

module.exports = Server;
