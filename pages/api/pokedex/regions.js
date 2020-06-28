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
  try {
    const db = await connectToDatabase(process.env.MONGODB_URI);
    const collection = await db.collection('regions');

    const regions = await collection.find({}).project({ _id: 0, pokemon_species: 0 }).toArray();

    res.status(200).json({
      success: true,
      message: 'Regions listed!',
      regions,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};
