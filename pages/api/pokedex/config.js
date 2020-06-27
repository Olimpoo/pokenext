const Pokedex = require('pokeapi-js-wrapper');

const options = {
  cache: false,
  timeout: 60 * 1000, // 10s
};
const P = new Pokedex.Pokedex(options);

export default P;
