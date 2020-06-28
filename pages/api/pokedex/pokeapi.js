const Pokedex = require('pokeapi-js-wrapper');

const options = {
  cache: false,
  timeout: 10 * 1000, // 10s
};
const P = new Pokedex.Pokedex(options);

export default P;
