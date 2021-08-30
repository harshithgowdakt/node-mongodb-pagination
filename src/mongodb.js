const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'pagination-pco';

exports.getDb = async function () {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return db;
}
