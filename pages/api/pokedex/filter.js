import Pokedex from './config';

export default async (req, res) => {
  const {
    query: { type },
  } = req;
  try {
    const results = await Pokedex.getTypeByName(type);
    const order = (url) => url.slice(-4).split('/')[1];

    results.pokemon = await results.pokemon.map((pokemon) => ({
      ...pokemon[0],
      name: pokemon.pokemon.name,
      order: order(pokemon.pokemon.url),
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${order(pokemon.pokemon.url)}.png`,
      image: `https://pokeres.bastionbot.org/images/pokemon/${order(pokemon.pokemon.url)}.png`,
      url: `api/pokedex/${pokemon.pokemon.name}`,
    }));

    res.status(200).json({
      success: true,
      message: 'Pokémon listed!',
      results: results.pokemon,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};
