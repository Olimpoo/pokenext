import Pokedex from './pokeapi';

export default async (req, res) => {
  const {
    query: { pokemonName },
  } = req;
  try {
    const pokemon = await Pokedex.getPokemonSpeciesByName(pokemonName);
    res.status(200).json({
      success: true,
      message: 'Pokémon listed!',
      pokemon,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};
