import Pokedex from './config';

export default async (req, res) => {
  const colors = [
    '#575738',
    '#A12721',
    '#5628E2',
    '#833483',
    '#695316',
    '#61551F',
    '#51580E',
    '#705898',
    '#565681',
    '#AF510D',
    '#1C59E9',
    '#437C27',
    '#896F06',
    '#DC0949',
    '#2D7B7B',
    '#7038F8',
    '#705848',
    '#D23747',
  ];

  try {
    const types = await Pokedex.getTypesList();
    types.results = await types.results.map((type, i) => ({
      ...type,
      url: `api/pokedex/filter?type=${type.name}`,
      color: colors[i],
    }));

    await types.results.pop();
    await types.results.pop();

    res.status(200).json({
      success: true,
      message: 'Pokémon listed!',
      types,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};
