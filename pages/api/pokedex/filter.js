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
  const type = req.query.type || false;
  const region = req.query.region || false;

  try {
    const db = await connectToDatabase(process.env.MONGODB_URI);
    const collection = await db.collection('pokedex');

    let pokedex = '';

    if (type && !region) {
      pokedex = await collection
        .find({ 'types.type.name': type })
        .skip(skip)
        .limit(limit)
        .project({ _id: 0 })
        .toArray();
    }

    if (region && !type) {
      pokedex = await collection
        .aggregate([
          {
            $lookup: {
              from: 'regions',
              localField: 'name',
              foreignField: 'pokemon_species.name',
              as: 'region',
            },
          },
          {
            $match: { 'region.name': region },
          },
        ])
        .skip(skip)
        .limit(limit)
        .project({ _id: 0, 'region.pokemon_species': 0, 'region._id': 0 })
        .toArray();
    }

    if (region && type) {
      pokedex = await collection
        .aggregate([
          {
            $match: { 'types.type.name': type },
          },
          {
            $lookup: {
              from: 'regions',
              localField: 'name',
              foreignField: 'pokemon_species.name',
              as: 'region',
            },
          },
          {
            $match: { 'region.name': region },
          },
        ])
        .skip(skip)
        .limit(limit)
        .project({ _id: 0, 'region.pokemon_species': 0, 'region._id': 0 })
        .toArray();
    }

    const nextPage = () => {
      if (type && !region) {
        return `api/pokedex/filter?type=${type}&skip=${skip + limit}&limit=${limit}`;
      }

      if (region && !type) {
        return `api/pokedex/filter?region=${region}&skip=${skip + limit}&limit=${limit}`;
      }
      return `api/pokedex/filter?region=${region}&type=${type}&skip=${skip + limit}&limit=${limit}`;
    };

    const previuosPage = () => {
      if (type && !region) {
        return `api/pokedex/filter?type=${type}&skip=${skip - limit}&limit=${limit}`;
      }

      if (region && !type) {
        return `api/pokedex/filter?region=${region}&skip=${skip - limit}&limit=${limit}`;
      }
      return `api/pokedex/filter?region=${region}&type=${type}&skip=${skip - limit}&limit=${limit}`;
    };

    res.status(200).json({
      success: true,
      message: 'Pokémon listed!',
      next: pokedex.length < limit ? null : nextPage(),
      previous: skip === 0 ? null : previuosPage(),
      pokedex,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};
