const url = require('url');
const { MongoClient } = require('mongodb');

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  const db = await client.db(url.parse(uri).pathname.substr(1));

  cachedDb = db;
  return db;
}

module.exports = async (req, res) => {
  const interval = {
    limit: req.query.limit || 20,
    offset: req.query.offset || 0,
  };

  try {
    const db = await connectToDatabase(process.env.MONGODB_URI);

    const collection = await db.collection('pokedex');
    const pokedex = await collection.find({})
      .skip(parseFloat(interval.offset))
      .limit(parseFloat(interval.limit))
      .toArray();

    res.status(200).json({
      success: true,
      message: 'Pokémon listed!',
      next: `api/pokedex?offset=${parseFloat(interval.offset) + parseFloat(interval.limit)}&limit=${interval.limit}`,
      previous: parseFloat(interval.offset) === 0 ? null : `api/pokedex?offset=${parseFloat(interval.offset) - parseFloat(interval.limit)}&limit=${interval.limit}`,
      pokedex,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};
