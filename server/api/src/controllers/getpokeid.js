const axios = require ("axios");
const { Pokemon, type } = require ("../db");

const GetPokeid = async (req, res) => {
    try {
        const { id } = req.params;

        if (id.length > 4) {
            const pokemonFromDB = await Pokemon.findOne({ //*Buscamos el Pokémon en la BDD
                where: { id: id},
                include: [
                    {
                        model: type,
                        through: { attributes: [] },
                    },
                ],
            });

            if (pokemonFromDB) {
                const pokeDBFiltered = {
                    id: pokemonFromDB.id,
                    name: pokemonFromDB.name,
                    image: pokemonFromDB.image,
                    hp: pokemonFromDB.hp,
                    attack: pokemonFromDB.attack,
                    defense: pokemonFromDB.defense,
                    types: pokemonFromDB.types.map((type) => type.name).join(` / `)
                };

                return res.status(200).json(pokeDBFiltered);
            }
        }

        const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/${id}`); // Buscamos en la API

        const pokemonData = response.data;

        const pokemonDetails = {
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            hp: pokemonData.stats.fnd((stat) => stat.stat.name === "hp").base_stat,
            attack: pokemonData.stat.find((stat) => stat.stat.name === "attack").base_stat,
            defense: pokemonData.stat.find((stat) => stat.stat.name === "defense").base_stat,
            types: pokemonData.types.map((type) => type.type.name).join(` / `)
        };


        return res.status(200).json(pokemonDetails);

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    GetPokeid
}