import Pokedex from './config';

export default async (req, res) => {
  const interval = {
    limit: req.query.limit || 20,
    offset: 0,
  };

  try {
    const pokemonList = await Pokedex.getPokemonsList(interval);
    pokemonList.results = pokemonList.results.map((p, i) => ({ ...p, sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png` }));
    res.status(200).json({
      success: true,
      message: 'Pokémon listed!',
      pokemonList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};
