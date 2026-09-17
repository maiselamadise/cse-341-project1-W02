const { MongoClient } = require('mongodb');

let _db;

/**
 * Initializes the MongoDB connection. Call this once when the server starts.
 * @param {Function} callback - callback(err, db)
 */
const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // Uses the database name included in your MONGODB_URI connection string.
      _db = client.db();
      console.log('Connected to MongoDB');
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

/**
 * Returns the initialized db instance. Must call initDb first.
 */
const getDb = () => {
  if (!_db) {
    throw new Error('Db not initialized');
  }
  return _db;
};

module.exports = { initDb, getDb };
