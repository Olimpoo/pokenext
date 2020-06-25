import Pokedex from './config';

export default async (req, res) => {
  const interval = {
    limit: req.query.limit || 15,
    offset: req.query.offset || 0,
  };

  const promises = [];
  try {
    const pokemonList = await Pokedex.getPokemonsList(interval);

    pokemonList.next = `api/pokedex?offset=${parseFloat(interval.offset) + parseFloat(interval.limit)}&limit=${interval.limit}`;
    pokemonList.previous = (parseFloat(interval.offset) - parseFloat(interval.limit) >= 0) ? `api/pokedex?offset=${parseFloat(interval.offset) - parseFloat(interval.limit)}&limit=${interval.limit}` : null;

    pokemonList.results = await pokemonList.results.map((pokemon, i) => ({
      ...pokemon,
      order: i + 1 + parseFloat(interval.offset),
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1 + parseFloat(interval.offset)}.png`,
      image: `https://pokeres.bastionbot.org/images/pokemon/${i + 1 + parseFloat(interval.offset)}.png`,
      url: `api/pokedex/${pokemon.name}`,
    }));

    pokemonList.results.forEach((pokemon) => {
      const request = Pokedex.getPokemonByName(pokemon.name);
      promises.push(request);
    });

    await Promise.all(promises).then((values) => {
      values.forEach((pokemon, i) => {
        pokemonList.results[i].types = pokemon.types;
        pokemonList.results[i].abilities = pokemon.abilities;
      });
    });

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
