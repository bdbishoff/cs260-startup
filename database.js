const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const scoreCollection = db.collection('score');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addScore(score) {
    const result = await scoreCollection.insertOne(score);
    return result;
}

function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

async function updateScores(score) {
    const query = {name: score.name};
    const newValues = { $set: {score: score.score}};
    const update = await scoreCollection.updateOne(query, newValues, function(err, res) {
        console.log(`${score.name} score is updated to ${score.score}`);
    });
    if (update.matchedCount == 0) {
        addScore(score);
    }
}

module.exports = { addScore, getHighScores, updateScores };
