//!Se importan las dependencias necesarias:

require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const express = require('express');
const bodyParser = require('bodyParser');
const { Pokemon, Type } = require('./db');


const app = express();
const PORT= process.env.PORT || 3000;

app.use(bodyParser.json())


//! Rutas:

//? Inicio de sección de Rutas:
//* GET | /pokemons

app.get('/pokemons', async (req, res) => {
   try {
      const pokemons = await Pokemon.findAll({
         include : Type,
      });
      res.json(pokemons);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

//* GET | /pokemons/:idPokemon

app.get ('/pokemons/:idPokemon', async (req, res) => {
   try {
      const { idPokemon } = req.params;
      const Pokemon = await Pokemon.findbyPK(idPokemon, {
         include : Type,
      });
      if (!pokemon){
         return res.status(404).json({ error: 'Pokemon not found' });
      }
      res.json(pokemon);
   } catch (error){
      console.error(error);
      req.status(500).json({ error: 'Internal Server Error' });
   }
});

//* GET | /pokemons/name?="..."

app.get('/pokemons/name', async (req, res) => {
   try {
      const { name } = req.query;
      const pokemons = await Pokemon.findAll({
         where: { name: { [sequelize.Op.iLike]: `%${name}%` } },
         include: Type,
      });
      if (pokemons.length === 0){
         return res.status(404).json({ error: 'No matching Pokemon found'})
      }
      res.json(pokemons);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

//* POST | /pokemons

app.post('/pokemons', async (req, res) => {
   try {
      //! implementar logica para crear un nuevo pokemon
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

//* GET | /types

app.get('/types', async (req, res) => {
   try {
     const types = await Type.findAll();
     if (types.length === 0) {
       //! Si no hay tipos en la base de datos, obtener los tipos de la API y guárdarlos
       //! manejar esto de manera asincrónica para que no bloquee la ejecución del servidor
     }
     res.json(types);
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });
 
// Inicia el servidor
app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
 });
 


const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
