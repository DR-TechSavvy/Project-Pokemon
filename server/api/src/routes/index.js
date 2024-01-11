const { Router } = require('express');
const { GETpokeid } = require ('../controllers/getpokeid');
const { GETAllPokemons } = require ('../controllers/getallpokes');
const { GETPokename } = require ('../controllers/getpokename');
const { createPokemon } = require ('../controllers/postpoke');
const { GETTypes } = require ('../controllers/gettypes');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/pokemon/name', GETPokename);
router.get('/pokemon/:id', GETpokeid);
router.get('/pokemon', GETAllPokemons);
router.post('/pokemon', createPokemon);
router.get('/types', GETTypes);



module.exports = router;
