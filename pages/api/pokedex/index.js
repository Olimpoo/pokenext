import Pokedex from './config';

export default async (req, res) => {
  try {
    const pokemonList = await Pokedex.getPokemonsList();
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
