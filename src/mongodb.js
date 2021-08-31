const { MongoClient } = require('mongodb');

exports.getDb = async function () {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const dbName = 'pagination-pco';
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return db;
}
