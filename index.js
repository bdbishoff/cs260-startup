const express = require('express');
const app = express();
const GEN = require('./generate.js');
const DB = require('./database.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json()); // do further research

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetScores
apiRouter.get('/scores', async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', async (req, res) => {
  DB.addScore(req.body);
  const scores = await DB.getHighScores();
  res.send(scores);
});

// // SubmitScore
// secureApiRouter.post('/score', async (req, res) => {
//   const score = { ...req.body, ip: req.ip };
//   await DB.addScore(score);
//   const scores = await DB.getHighScores();
//   res.send(scores);
// });

// updateScore
apiRouter.post('/updateScore', async (req, res) => {
  await DB.updateScores(req.body);
});

apiRouter.post('/highStreak', async (req, res) => {
  highStreak = await DB.getHighStreak(req.body.user);
  console.log(highStreak);
  res.send(highStreak);
})

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

apiRouter.get('/Comptopic', async (req, res) => {
    // get prompt response from generate js
    // change html to reponse options
    let compOptions =  await GEN.competitiveGenerate();
    res.send(compOptions);
});

apiRouter.post('/Freetopic', async (req, res) => {
  // get prompt response from generate js
  // change html to reponse options
  let compOptions =  await GEN.freePlayGenerate(req.body.userPrompt);
  res.send(compOptions);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

// keep things that you don't want everyone to see on the backend
// Aka topic prompts


