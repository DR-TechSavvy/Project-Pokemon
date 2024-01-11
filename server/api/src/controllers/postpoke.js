const { Pokemon, type } = require('../db');


const createPokemon = async (req, res) => {
    try {
        const { name, types, hp, attack, defense, image } = req.body;
        
        if ( !name || !types || !hp || !attack || !defense || !image ) {
            return res.status(400).json({ error: 'Por favor, propociona todos los datos necesarios para crear un Pokémon.'});
        }

        //* Comprueba si el Pokémon ya existe en la base de datos
        const repeatedPokemonBD = await Pokemon.findOne({ where: { name } });
        if (repeatedPokemonBD) {
            return res.status(400).json({ error: 'El Pokémon ya existe en la base de datos.'})
        }

        const newPokemon = await Pokemon.create({
            name,
            hp: parseInt(hp),
            attack: parseInt(attack),
            defense: parseInt(defense),
            image,
        });


        const typeRecords = await type.findAll({ //* Buscar y relacionar los tipos con el Pokémon
            where: {
                name: types,
            },
        });

        if( typeRecords.length === types.length){

            await newPokemon.setTypes(typeRecords); //* Relacionar los tipos encontrados con el nueo Pokémon

            return res.status(201).json(newPokemon);
        }
        return res.status(400).json({ message: "Alguno de los tipos específicados, no existe"});

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createPokemon,
};