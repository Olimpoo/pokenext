import Pokedex from './config';

export default async (req, res) => {
  try {
    const types = await Pokedex.getTypesList();

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
