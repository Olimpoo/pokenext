import Pokedex from './pokeapi';

export default async (req, res) => {
  try {
    const kanto = await Pokedex.getGenerationByName('generation-i');
    kanto.generation = 'I';
    kanto.name = kanto.main_region.name;
    kanto.pokemon_species = kanto.pokemon_species.map((p, i) => (
      {
        ...p,
        url() { delete kanto.pokemon_species[i].url; },
      }
    ));

    delete kanto.abilities;
    delete kanto.main_region;
    delete kanto.id;
    delete kanto.moves;
    delete kanto.names;
    delete kanto.types;
    delete kanto.version_groups;

    const johto = await Pokedex.getGenerationByName('generation-ii');
    johto.generation = 'II';
    johto.name = johto.main_region.name;
    johto.pokemon_species = johto.pokemon_species.map((p, i) => (
      {
        ...p,
        url() { delete johto.pokemon_species[i].url; },
      }
    ));

    delete johto.abilities;
    delete johto.main_region;
    delete johto.id;
    delete johto.moves;
    delete johto.names;
    delete johto.types;
    delete johto.version_groups;

    const hoenn = await Pokedex.getGenerationByName('generation-iii');
    hoenn.generation = 'III';
    hoenn.name = hoenn.main_region.name;
    hoenn.pokemon_species = hoenn.pokemon_species.map((p, i) => (
      {
        ...p,
        url() { delete hoenn.pokemon_species[i].url; },
      }
    ));

    delete hoenn.abilities;
    delete hoenn.main_region;
    delete hoenn.id;
    delete hoenn.moves;
    delete hoenn.names;
    delete hoenn.types;
    delete hoenn.version_groups;

    const sinnoh = await Pokedex.getGenerationByName('generation-iv');
    sinnoh.generation = 'IV';
    sinnoh.name = sinnoh.main_region.name;
    sinnoh.pokemon_species = sinnoh.pokemon_species.map((p, i) => (
      {
        ...p,
        url() { delete sinnoh.pokemon_species[i].url; },
      }
    ));

    delete sinnoh.abilities;
    delete sinnoh.main_region;
    delete sinnoh.id;
    delete sinnoh.moves;
    delete sinnoh.names;
    delete sinnoh.types;
    delete sinnoh.version_groups;

    const unova = await Pokedex.getGenerationByName('generation-v');
    unova.generation = 'V';
    unova.name = unova.main_region.name;
    unova.pokemon_species = unova.pokemon_species.map((p, i) => (
      {
        ...p,
        url() { delete unova.pokemon_species[i].url; },
      }
    ));

    delete unova.abilities;
    delete unova.main_region;
    delete unova.id;
    delete unova.moves;
    delete unova.names;
    delete unova.types;
    delete unova.version_groups;

    const kalos = await Pokedex.getGenerationByName('generation-vi');
    kalos.generation = 'VI';
    kalos.name = kalos.main_region.name;
    kalos.pokemon_species = kalos.pokemon_species.map((p, i) => (
      {
        ...p,
        url() { delete kalos.pokemon_species[i].url; },
      }
    ));

    delete kalos.abilities;
    delete kalos.main_region;
    delete kalos.id;
    delete kalos.moves;
    delete kalos.names;
    delete kalos.types;
    delete kalos.version_groups;

    const alola = await Pokedex.getGenerationByName('generation-vii');
    alola.generation = 'VI';
    alola.name = alola.main_region.name;
    alola.pokemon_species = alola.pokemon_species.map((p, i) => (
      {
        ...p,
        url() { delete alola.pokemon_species[i].url; },
      }
    ));

    delete alola.abilities;
    delete alola.main_region;
    delete alola.id;
    delete alola.moves;
    delete alola.names;
    delete alola.types;
    delete alola.version_groups;

    res.status(200).json({
      kanto,
      johto,
      hoenn,
      sinnoh,
      unova,
      kalos,
      alola,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};
