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
  const limit = parseFloat(req.query.limit) || 20;
  const skip = parseFloat(req.query.skip) || 0;
  const type = req.query.type || '';

  try {
    const db = await connectToDatabase(process.env.MONGODB_URI);
    const collection = await db.collection('pokedex');

    const pokedex = await collection.find({ 'types.type.name': type })
      .skip(skip)
      .limit(limit)
      .project({ _id: 0 })
      .toArray();

    res.status(200).json({
      success: true,
      message: 'Pokémon listed!',
      next: pokedex.length < limit ? null : `api/pokedex/filter?type=${type}&skip=${skip + limit}&limit=${limit}`,
      previous: skip === 0 ? null : `api/pokedex/filter?type=${type}&skip=${skip - limit}&limit=${limit}`,
      pokedex,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};
