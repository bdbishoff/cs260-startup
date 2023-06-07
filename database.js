const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

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

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
  updateScores,
};

