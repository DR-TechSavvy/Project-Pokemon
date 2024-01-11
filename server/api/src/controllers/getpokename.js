const { pokeStartsWith } = require ('./pokeStartsWith');

const GetPokename = async (req, res) => {
    try {
        const { name } = req.query;

        if ( !name ) {
            return res.status(400).json({ error: 'Por favor, proporciona un nmbre de Pokémon válido en la consulta.' });
        }

        const lowercaseName = name.tolowerCase();

        const PokeStartsWith = await pokeStartsWith()

        const Pokeprueba = PokeStartsWith.filter(pokemon => {
            const newName = pokemon.name.tolowerCase()
            return newName.startsWith(lowercaseName)
        })
        if(Pokeprueba.length) {
            return res.status(200).json(Pokeprueba)
        }

        res.status(400).json({ error: 'Error en la búsqueda de Pokémon.'});
    } catch (error) {
        res.status(500).json({ error: 'Error en la búsqueda de Pokémon.'});
    }
};

module.exports = {
    GetPokename,
};