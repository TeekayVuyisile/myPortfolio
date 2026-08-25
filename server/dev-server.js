// Local-only Express server that mounts the Vercel-style serverless functions from /api
// so they're reachable during `npm start` (CRA's dev server proxies /api/* here — see the
// "proxy" field in package.json). Not used in production: Vercel invokes the files in /api
// directly as serverless functions.
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sendEmail = require('../api/send-email');
const chat = require('../api/chat');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-email', (req, res) => sendEmail(req, res));
app.post('/api/chat', (req, res) => chat(req, res));

const PORT = process.env.API_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Local API dev server running on http://localhost:${PORT}`);
});
