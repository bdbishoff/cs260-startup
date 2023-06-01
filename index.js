const express = require('express');
const app = express();
require('dotenv').config();
const GEN = require('./generate.js');
console.log(process.env.OPENAI_API_KEY);

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json()); // do further research

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

apiRouter.get('/Comptopic', async (req, res) => {
    // get prompt response from generate js
    // change html to reponse options
    let compOptions =  await GEN.competitiveGenerate();
    console.log("COMP OPTIONS:");
    console.log(compOptions);
    res.send(compOptions);
});

apiRouter.get('/Freetopic', async (req, res) => {
  // get prompt response from generate js
  // change html to reponse options
  let compOptions =  await GEN.freePlayGenerateGenerate();
  console.log("COMP OPTIONS:");
  console.log(compOptions);
  res.send(compOptions);
});


// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];
function updateScores(newScore, scores) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

// keep things that you don't want everyone to see on the backend
// Aka topic prompts


